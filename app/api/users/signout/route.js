import { dbConnect } from "@/database/config";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(request) {
  try {
    const res = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
