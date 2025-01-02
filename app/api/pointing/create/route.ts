import { NextRequest, NextResponse } from "next/server";

import { Pointer } from "@/data/mongodb/models/pointer";
import { PointerType } from "@/data/types/pointing";
import { localeFormattedDate } from "@/data/utils/date";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { type, userId } = reqBody;

    if (type !== PointerType.CHECKIN && type !== PointerType.CHECKOUT) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const timestamp = new Date(localeFormattedDate()).getTime();
    const pointerCode = timestamp >> 7;
    if (!timestamp || !pointerCode) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const newPointer = new Pointer({
      userId,
      timestamp,
      code: pointerCode,
      type,
    });
    const savedPointer = await newPointer.save();

    return NextResponse.json({
      message: "Pointer code created successfully",
      success: true,
      data: savedPointer,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
