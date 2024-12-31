import { NextRequest, NextResponse } from "next/server";

import { fetchUserFromIdlias } from "@/data/fetchers/users";
import UserSchedule from "@/data/mongodb/models/user_schedule";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idLias: string }> }
) {
  try {
    const idLias = (await params).idLias;
    const user = await fetchUserFromIdlias(idLias);

    const userSchedule = await UserSchedule.findOne({ userId: user.id });

    return NextResponse.json({
      message: "User schedule found",
      data: userSchedule,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
