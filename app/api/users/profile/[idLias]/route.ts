import { NextRequest, NextResponse } from "next/server";

import { fetchUserFromIdlias } from "@/data/fetchers/users";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idLias: string }> }
) {
  try {
    const idLias = (await params).idLias;
    const user = await fetchUserFromIdlias(idLias);

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
