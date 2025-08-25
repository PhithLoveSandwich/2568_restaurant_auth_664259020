import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <div className="relative flex justify-center">
      <div
        className="avatar avatar-online cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
  <div className="w-12 rounded-full overflow-hidden">
          <img
            src={user?.photo || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {open && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded shadow z-20 flex flex-col text-left">
          <button className="btn btn-ghost justify-start" onClick={() => { setOpen(false); navigate("/profile"); }}>View Profile</button>
          <button className="btn btn-ghost justify-start" onClick={() => { setOpen(false); navigate("/settings"); }}>Settings</button>
          <div className="border-t my-1" />
          <button className="btn btn-outline btn-error mt-1" onClick={handleLogOut}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;