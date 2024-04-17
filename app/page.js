import Link from "next/link";
import React from "react";

export default function homePage() {
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2">
      <h1 className="text-4xl text-white font-bold">Auth404</h1>
      <h2 className="text-white text-xl text-center">
        A simple authnentication system using NextJS and MongoDB
      </h2>
      <div className="flex gap-3 mt-4">
        <Link
          className="px-6 py-2 bg-black border-white border-2 rounded-md text-white hover:bg-white hover:text-black transition-all"
          href="/signup"
        >
          Sign Up
        </Link>
        <Link
          className="px-6 py-2 bg-black border-white border-2 rounded-md text-white hover:bg-white hover:text-black transition-all"
          href="/signin"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
