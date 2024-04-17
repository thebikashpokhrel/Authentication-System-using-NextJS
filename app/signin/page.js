"use client";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);

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

  const handleSignIn = (e) => {
    e.preventDefault();

    if (signingIn) return;

    //Validations
    if (email == "") {
      toast.remove();
      toastPopup("Please enter your email");
      return;
    }

    if (password == "") {
      toast.remove();
      toastPopup("Please enter password");
      return;
    }

    const body = {
      email,
      password,
    };
    const signInUser = async () => {
      try {
        toast.loading("Signing In...");
        setSigningIn(true);
        await axios.post("/api/users/signin", body);
        setSigningIn(false);
        toast.remove();
        router.push("/profile");
      } catch (error) {
        console.log(error.message);
        toast.remove();
        toast.error(error.response.data.error);
        setSigningIn(false);
      }
    };

    signInUser();
  };
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2">
      <Toaster />
      <h1 className="text-4xl text-white font-bold">Auth404</h1>
      <div className="bg-white p-5 shadow-md rounded-md flex flex-col mt-4 w-[300px] gap-5">
        <h2 className="text-center text-xl font-bold">
          Sign in to your account
        </h2>
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="py-2 border-b-[1.5px] border-gray-400 outline-none transition-all focus:border-black w-full"
          placeholder="Create Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-black border-white border-2 rounded-md text-white hover:opacity-85 transition-all"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <div className="text-sm text-gray-800">
          No account?{" "}
          <Link href="/signup" className="text-black">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
