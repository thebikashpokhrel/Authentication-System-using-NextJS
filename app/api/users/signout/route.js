import { dbConnect } from "@/database/config";
import { NextResponse } from "next/server";
import { extractDataFromToken } from "@/utils/extractDataFromToken";
import User from "@/models/User";

dbConnect();
export async function GET(request) {
  try {
    const res = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    const userId = await extractDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { success: 400 });
    }

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
