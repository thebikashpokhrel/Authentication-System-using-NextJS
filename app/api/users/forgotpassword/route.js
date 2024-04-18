import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

dbConnect();
export async function POST(request) {
  try {
    const { token, password } = await request.json();
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    const res = NextResponse.json({
      message: "Password reset successfully",
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
