import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(request) {
  try {
    const { token } = await request.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Token is invalid" }, { status: 400 });
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "User verified successfully", success: true },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
