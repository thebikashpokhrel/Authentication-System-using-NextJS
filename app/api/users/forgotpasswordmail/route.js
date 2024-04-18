import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(request) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Couldn't find the user with given email" },
        { status: 400 }
      );
    }
    sendMail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Forgot password link has been mailed.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
