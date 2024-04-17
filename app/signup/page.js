"use client";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function () {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [signingUp, setSigningUp] = React.useState(false);

  const toastOptions = {
    duration: 3000,
    position: "bottom-right",
    icon: "❌",
    style: {
      background: "white",
      color: "black",
      fontSize: "14px",
    },
  };
  const toastPopup = (error) => toast.error(error, toastOptions);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (signingUp) return;

    //Validations
    if (email == "") {
      toast.remove();
      toastPopup("Please enter your email");
      return;
    }
    if (username == "") {
      toast.remove();
      toastPopup("Please enter username");
      return;
    }

    if (password == "") {
      toast.remove();
      toastPopup("Please enter password");
      return;
    }

    if (confirmPassword == "") {
      toast.remove();
      toastPopup("Please enter your password again to confirm");
      return;
    }

    if (password != confirmPassword) {
      toast.remove();
      toastPopup("Confirmation password didn't match");
      return;
    }

    const body = {
      username,
      email,
      password,
    };
    const signUpUser = async () => {
      try {
        toast.loading("Signing Up...");
        setSigningUp(true);
        const res = await axios.post("/api/users/signup", body);
        toast.remove();
        toast.success(res.data.message);
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
        setSigningUp(false);
      } catch (error) {
        console.log(error.message);
        toast.remove();
        toast.error(error.response.data.error);
        setSigningUp(false);
      }
    };
    signUpUser();
  };
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2">
      <Toaster />
      <h1 className="text-4xl text-white font-bold">Auth404</h1>
      <div className="bg-white p-5 shadow-md rounded-md flex flex-col mt-4 w-[300px] gap-5">
        <h2 className="text-center text-xl font-bold">Sign Up</h2>
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Create Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-black border-white border-2 rounded-md text-white hover:opacity-85 transition-all"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div className="text-sm text-gray-800">
          Already have an account?{" "}
          <Link href="/signin" className="text-black">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
