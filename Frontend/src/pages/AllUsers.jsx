import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const navigate=useNavigate();
  // store locked state per user
  const { LogOut }= useAuth();
   const { signin, role, logout, name } = useAuth();
  
    if (!signin) {
      return <Navigate to="/login" />;
    }

  const [lockedUsers, setLockedUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) getUsers();
  }, [token]);

  // toggle lock based on role
  const handleCheck = (id, role) => {
    if (role === "admin") {
      setLockedUsers((prev) => ({
        ...prev,
        [id]: true,
      }));
    } else {
      setLockedUsers((prev) => ({
        ...prev,
        [id]: false,
      }));
      navigate(`/update-user/${id}`);
    }
  };

  const handleUpdate = (id) => {
    alert("Update user with id: " + id);
  };

  return (
  <div className="flex min-h-screen">

    {/* SIDEBAR */}
    <Sidebar/>

    {/* MAIN CONTENT */}
    <div className="flex-1 bg-gray-100 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-5"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleCheck(user.id, user.role)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {lockedUsers[user.id] ? "Locked" : "Update"}
              </button>

              <button
                onClick={() => handleUpdate(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                {user.role}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
);
};

export default AllUsers;