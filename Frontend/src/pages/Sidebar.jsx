import React from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout, name } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">

      {/* TOP NAV */}
      <div>
        <nav className="space-y-2">

          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/allusers")}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Users
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Users
          </button>

        </nav>
      </div>

      {/* USER INFO */}
      <div className="bg-gray-800 p-3 rounded-xl">
        <p className="text-sm text-gray-400">Logged in as</p>
        <p className="font-semibold">{name}</p>

        <button
          onClick={logout}
          className="mt-2 w-full bg-red-600 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;