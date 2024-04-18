import User from "@/models/User";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function sendMail({ email, emailType, userId }) {
  try {
    const token = uuidv4();

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 36000000,
        },
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 36000000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const subject =
      emailType == "VERIFY" ? "Verify your account" : "Reset your password";

    const emailContent =
      emailType == "VERIFY"
        ? `Verify your account through this link ${process.env.DOMAIN_URI}/verifymail?token=${token}<br/>
        or Click <a href="${process.env.DOMAIN_URI}/verifymail?token=${token}">here</a> to verify.`
        : `<h2>Do not share this link with anyone </h2>
        Reset your password through this link ${process.env.DOMAIN_URI}/forgotpassword?token=${token}<br/>
        or Click <a href="${process.env.DOMAIN_URI}/forgotpassword?token=${token}">here</a> to reset.`;

    const options = {
      from: "thebikash@test.com",
      to: email,
      subject: subject,
      html: emailContent,
    };

    const emailResponse = await transport.sendMail(options);
    return emailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
}
