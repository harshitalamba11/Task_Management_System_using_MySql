import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Sidebar from "./Sidebar";

const Project = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/project/projects", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProjects(data.data || []);
      })
      .catch(err => console.log(err));
  }, [token]);

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 p-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          All Projects
        </h1>

        {/* PROJECT GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {project.title}
              </h2>

              <p className="text-gray-500 mb-3">
                {project.description || "No description"}
              </p>

              <div className="text-sm text-gray-600 mb-4">
                <p>📅 Due: {project.due_date || "N/A"}</p>
                <p>👤 Created By: {project.created_by}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  View
                </button>

                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No projects found
          </p>
        )}
      </div>
    </div>
  );
};

export default Project;