import { dbConnect } from "@/database/config";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Couldn't find the user with given email" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
    };

    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: "1hr",
    });

    const res = NextResponse.json({
      message: "User found",
      success: true,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
