import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import  Sidebar  from "./Sidebar";

const UpdateUser = () => {
    // const {token}= useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, name, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // FETCH USER
  useEffect(() => {
    fetch(`http://localhost:3000/user/find/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const user = data.data?.[0];
        if (!user) return;

        setForm({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "",
          password: user.password || ""
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(
        `http://localhost:3000/user/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            ,
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("User updated successfully!");
        navigate("/allusers");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setUpdating(false);
    navigate('/allUsers');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  return (
  <div className="flex min-h-screen">

    {/* SIDEBAR */}
    <Sidebar/>

    {/* MAIN CONTENT */}
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update User
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
        />

        {/* KEEPING YOUR PASSWORD LOGIC SAME */}
        <input
          name="password"
          readOnly
          value={form.password}
          className="w-full p-2 border rounded-lg"
        />

        {/* ROLE DISPLAY (AS YOU DID) */}
        <div className="w-full p-2 border rounded-lg">
          {form.role}
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          {updating ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>

  </div>
);
};

export default UpdateUser;