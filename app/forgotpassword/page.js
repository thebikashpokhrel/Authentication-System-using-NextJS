"use client";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import axios from "axios";
import Link from "next/link";

function forgotPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [actionCompleted, setActionCompleted] = React.useState(false);
  const handleReset = () => {
    const body = {
      token,
      password,
    };

    const resetPassword = async () => {
      try {
        toast.loading("Resetting password");
        const res = await axios.post("/api/users/forgotpassword", body);
        toast.remove();
        toast.success(res.data.message);
        setActionCompleted(true);
      } catch (error) {
        toast.remove();
        toast.error(error.response.data.error);
        console.log(error.message);
      }
    };
    resetPassword();
  };
  const handleSend = () => {
    const body = {
      email,
    };

    const sendMail = async () => {
      try {
        toast.loading("Generating link");
        const res = await axios.post("/api/users/forgotpasswordmail", body);
        toast.remove();
        toast.success(res.data.message);
        setActionCompleted(true);
      } catch (error) {
        toast.remove();
        toast.error(error.response.data.error);
        console.log(error.message);
      }
    };
    sendMail();
  };

  React.useEffect(() => {
    setToken(searchParams.get("token"));
  }, []);

  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2 text-white">
      <Toaster />
      {token && token != "" ? (
        <>
          {actionCompleted ? (
            <>
              <h1 className="text-xl font-bold">
                Password reset successfully.{" "}
              </h1>
              <Link href="/signin">Sign In Now</Link>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <input
                className="mt-2 py-2 px-1 border-[1.5px] border-gray-400 outline-none transition-all focus:border-black text-black"
                placeholder="Create new password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="px-3 py-1 bg-black border-white border-2 rounded-md text-white transition-all mt-2 hover:bg-white hover:text-black"
                onClick={handleReset}
              >
                Reset
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {actionCompleted ? (
            <>
              <h1 className="text-xl font-bold">
                Please check your inbox for the password reset link{" "}
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                Enter your email to send forgot password link
              </h1>
              <input
                className="mt-2 py-2 px-1 border-[1.5px] border-gray-400 outline-none transition-all focus:border-black text-black"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-3 py-1 bg-black border-white border-2 rounded-md text-white transition-all mt-2 hover:bg-white hover:text-black"
                onClick={handleSend}
              >
                Send
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default forgotPasswordPage;
