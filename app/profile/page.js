"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function profilePage() {
  const [user, setUser] = React.useState({});
  const router = useRouter();
  const handleSubmit = () => {
    const signOut = async () => {
      try {
        const res = await axios.get("/api/users/signout");
        console.log(res);
        router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    };

    signOut();
  };

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.post("/api/users/profile");
        setUser(res.data.user);
        console.log(res.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-2 text-white">
      <h1 className="text-4xl font-bold">Auth404</h1>
      {!user ? (
        "No any account signed in"
      ) : (
        <>
          <h2 className="mt-4 text-2xl">
            Signed in as <b>{user.username}</b>
          </h2>
          <div>Email: {user.email}</div>
          <div>
            Email Verified: {user.isVerified ? "Verified" : "Not verified"}
          </div>
          <button
            className="px-3 py-1 bg-black border-white border-2 rounded-md text-white hover:opacity-85 transition-all mt-4"
            onClick={handleSubmit}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}

export default profilePage;
