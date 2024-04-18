"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

function verifyMailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  React.useEffect(() => {
    setToken(searchParams.get("token"));
  }, []);

  const handleVerify = () => {
    const body = {
      token,
    };
    const verify = async () => {
      try {
        setIsVerifying(true);
        toast.loading("Verifying token");
        const res = await axios.post("/api/users/verifymail", body);
        toast.remove();
        toast.success(res.data.message);
        setIsVerified(true);
        setIsVerifying(false);
      } catch (error) {
        toast.remove();
        toast.error(error.response.data.error);
        console.log(error.message);
        setIsVerifying(false);
      }
    };

    if (!isVerified && !isVerifying) {
      verify();
    }
  };
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2 text-white">
      <Toaster />
      <h1 className="text-4xl font-bold">Auth404</h1>
      {isVerified ? (
        <Link
          className="px-3 py-1 bg-black border-white border-2 rounded-md text-white hover:opacity-85 transition-all mt-2"
          href="/signin"
        >
          Account verified Sign in Now
        </Link>
      ) : (
        <button
          className="px-3 py-1 bg-black border-white border-2 rounded-md text-white hover:opacity-85 transition-all mt-2"
          onClick={handleVerify}
        >
          Verify Account
        </button>
      )}
      <h2 className="mt-2">Token: {token}</h2>
    </div>
  );
}

export default verifyMailPage;
