import { NextRequest, NextResponse } from "next/server";

import User from "@/data/mongodb/models/user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idLias: string }> }
) {
  try {
    const idLias = (await params).idLias;

    const userFromId = await User.findOne({ _id: idLias })
      .select("-password")
      .catch(() => null);
    const userFromUsername = await User.findOne({ username: idLias })
      .select("-password")
      .catch(() => null);

    const user = userFromId || userFromUsername;

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
