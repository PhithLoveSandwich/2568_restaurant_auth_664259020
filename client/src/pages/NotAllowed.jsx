import React from "react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500 mb-6">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-6">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          กลับไปหน้าแรก
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
