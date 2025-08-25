import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-error">Not Logged In</h1>
            <p className="mt-2">Please sign in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">👤 Profile</h2>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Roles:</span>{" "}
                {user.authorities?.join(", ") || "No roles"}
              </p>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
