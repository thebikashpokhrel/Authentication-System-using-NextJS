import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/utils/sendMail";

dbConnect();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      sendMail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });

      return NextResponse.json({
        message: "User saved successfully",
        success: true,
        savedUser,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
