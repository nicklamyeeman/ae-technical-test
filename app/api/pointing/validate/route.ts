import { NextRequest, NextResponse } from "next/server";

import { Pointer } from "@/data/mongodb/models/pointer";
import { User } from "@/data/mongodb/models/user";
import { UserSchedule } from "@/data/mongodb/models/user_schedule";
import { PointerType } from "@/data/types/pointing";
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
    if (pointer.userId.toString() !== userId) {
      return NextResponse.json(
        { error: "Code does not belong to user" },
        { status: 400 }
      );
    }

    const today = new Date(
      localeFormattedDate()
        .replace(/\d{1,2}:\d{2}:\d{2}/gi, "00:00:00")
        .replace(/PM/g, "AM")
    );
    const pointerDate = new Date(pointer.timestamp);

    if (!isSameDate(today, pointerDate)) {
      return NextResponse.json({ error: "Code is expired" }, { status: 400 });
    }

    let userSchedule = await UserSchedule.findOne(
      { userId },
      {
        history: {
          $elemMatch: {
            date: today,
          },
        },
      }
    );
    if (!userSchedule) {
      userSchedule = new UserSchedule({
        userId,
        history: [],
      });
      await userSchedule.save();
    }

    if (pointer.type === PointerType.CHECKOUT) {
      if (!(userSchedule.history || []).length) {
        return NextResponse.json(
          { error: "Can't check-out without check-in" },
          { status: 400 }
        );
      }
      await UserSchedule.updateOne(
        { userId, "history.date": today },
        {
          $set: {
            "history.$.checkout": pointerDate,
          },
        }
      );
    }
    if (pointer.type === PointerType.CHECKIN) {
      if (!(userSchedule.history || []).length) {
        await UserSchedule.updateOne(
          { userId },
          {
            $push: {
              history: {
                date: today,
                checkin: pointerDate,
              },
            },
          }
        );
      } else {
        await UserSchedule.updateOne(
          { userId, "history.date": today },
          {
            $set: {
              "history.$.checkin": pointerDate,
            },
          }
        );
      }
    }

    const response = NextResponse.json({
      message: `${pointer.type} successful`,
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
