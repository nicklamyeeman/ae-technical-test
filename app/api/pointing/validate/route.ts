import { NextRequest, NextResponse } from "next/server";

import Pointer from "@/data/mongodb/models/pointer";
import User from "@/data/mongodb/models/user";
import UserSchedule from "@/data/mongodb/models/user_schedule";
import { UserScheduleEntry } from "@/data/types/pointing";

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
    if (pointer.userId.toString() !== userId) {
      return NextResponse.json(
        { error: "Code does not belong to user" },
        { status: 400 }
      );
    }

    const date = new Date(
      new Date().toLocaleDateString("fr-FR", { timeZone: "Indian/Reunion" })
    );

    let userSchedule = await UserSchedule.findOne({ userId });

    if (pointer.type === "check-out") {
      const todaysHistory = (userSchedule?.history || []).find(
        (history: UserScheduleEntry) =>
          new Date(history.date).getTime() === date.getTime()
      );
      if (!todaysHistory) {
        return NextResponse.json(
          { error: "Can't check-out without check-in" },
          { status: 400 }
        );
      }
      todaysHistory.checkout = new Date(pointer.timestamp);
    } else {
      if (!userSchedule) {
        userSchedule = new UserSchedule({
          userId,
          history: [],
        });
      }
      userSchedule.history.push({
        date: date,
        checkin: new Date(pointer.timestamp),
      });
    }
    await userSchedule.save();

    const response = NextResponse.json({
      message: `${pointer.type} successful`,
      success: true,
    });
    return response;
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
