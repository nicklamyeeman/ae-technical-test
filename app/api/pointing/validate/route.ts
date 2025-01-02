import { NextRequest, NextResponse } from "next/server";

import Pointer from "@/data/mongodb/models/pointer";
import User from "@/data/mongodb/models/user";
import UserSchedule from "@/data/mongodb/models/user_schedule";
import { UserScheduleEntry } from "@/data/types/pointing";
import { isSameDate, localeFormattedDate } from "@/data/utils/date";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { code, userId } = reqBody;

    const pointer = await Pointer.findOne({ code });
    if (!pointer) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // if (pointer.userId.toString() !== userId) {
    //   return NextResponse.json(
    //     { error: "Code does not belong to user" },
    //     { status: 400 }
    //   );
    // }

    const date = new Date(localeFormattedDate());
    const pointerDate = new Date(pointer.timestamp);

    // if (!isSameDate(date, pointerDate)) {
    //   return NextResponse.json({ error: "Code is expired" }, { status: 400 });
    // }

    let userSchedule = await UserSchedule.findOne({ userId });
    const todaysHistoryIndex = (userSchedule?.history || []).findIndex(
      (history: UserScheduleEntry) =>
        isSameDate(history.date, new Date("01/01/2011"))
    );

    if (pointer.type === "check-out") {
      if (todaysHistoryIndex === -1) {
        return NextResponse.json(
          { error: "Can't check-out without check-in" },
          { status: 400 }
        );
      }
      userSchedule.history[todaysHistoryIndex] = {
        date: userSchedule.history[todaysHistoryIndex].date,
        checkin: userSchedule.history[todaysHistoryIndex].checkin,
        checkout: pointerDate,
      };
    }
    if (pointer.type === "check-in") {
      if (!userSchedule) {
        userSchedule = new UserSchedule({
          userId,
          history: [],
        });
      }
      if (todaysHistoryIndex === -1) {
        userSchedule.history.push({
          date: date,
          checkin: pointerDate,
        });
      } else {
        userSchedule.history[todaysHistoryIndex] = {
          date: userSchedule.history[todaysHistoryIndex].date,
          checkin: pointerDate,
        };
      }
    }

    await userSchedule.save();

    const response = NextResponse.json({
      message: `${pointer.type} successful`,
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
