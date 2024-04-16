import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { extractDataFromToken } from "@/utils/extractDataFromToken";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
  try {
    const userId = await extractDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { success: 400 });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { success: 500 });
  }
}
