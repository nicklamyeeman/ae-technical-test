import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import UserSchedule from "@/data/mongodb/models/user_schedule";

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, entryId } = reqBody;

    if (!userId || !entryId) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const { modifiedCount } = await UserSchedule.updateOne(
      { userId },
      {
        $pull: {
          history: { _id: Types.ObjectId.createFromHexString(entryId) },
        },
      }
    );

    if (!modifiedCount) {
      return NextResponse.json(
        { error: "User schedule entry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "User schedule entry deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
