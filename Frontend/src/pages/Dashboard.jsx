import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Users, FolderKanban, CheckSquare, LogOut } from "lucide-react";


const Card = ({ title, value, icon: Icon }) => (
  <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
    </div>
    <Icon className="text-indigo-400" size={28} />
  </div>
);

const AdminDashboard = () => {
  const {token} = useAuth();
  const [managers,setmanagers]= useState(0);
  const [projects,setprojects]= useState(0);
  const [tasks,settasks]= useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/user/managers",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setmanagers(data.data.length);
    })
    .catch(err => console.log(err));


    fetch("http://localhost:3000/project/projects",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setprojects(data.data.length);
    })
    .catch(err => console.log(err));

    fetch("http://localhost:3000/task/tasks",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      settasks(data.data.length);
    })
    .catch(err => console.log(err));

  },[]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Total Managers" value={managers} icon={Users} />
        <Card title="Total Projects" value={projects} icon={FolderKanban} />
        <Card title="Total Tasks" value={tasks} icon={CheckSquare} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">User Management</h2>

        <div className="flex gap-4">
          <Link to="/register"><button className="bg-indigo-600 px-4 py-2 rounded-lg text-white">
            Create User
          </button></Link>
          <Link to="/allUsers"><button className="bg-gray-700 px-4 py-2 rounded-lg text-white">
            Update User
          </button></Link>
          <Link to="/allUsers"><button className="bg-red-600 px-4 py-2 rounded-lg text-white">
            Delete User
          </button></Link>
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard = () => {
  const [totalProjects,settotalProjects]= useState(0);
  const [teamMembers,setTeamMembers]= useState(0);
  const [pendingTasks,set]= useState(0);

  const { token } = useAuth();
  useEffect(() => {
    fetch("http://localhost:3000/project/my-projects",{
      headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      settotalProjects(data.data.length); // correct
    })
    .catch(err => console.log(err));


    fetch("http://localhost:3000/project/manager/users",{
      headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setTeamMembers(data.data.length); // correct
    })
    .catch(err => console.log(err));


    fetch("http://localhost:3000/project/tasks-pending",{
      headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setpendingTasks(data.data.length); // correct
    })
    .catch(err => console.log(err));

}, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Project Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="My Projects" value={totalProjects} icon={FolderKanban} />
        <Card title="Team Members" value={teamMembers} icon={Users} />
        <Card title="Pending Tasks" value={pendingTasks} icon={CheckSquare} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Project Control</h2>

        <div className="flex gap-4">
          <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white">
            Create Project
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded-lg text-white">
            Assign Member
          </button>
          <button className="bg-green-600 px-4 py-2 rounded-lg text-white">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamDashboard = () => {
     const [tasks, setTasks] = useState(0);
  const { token } = useAuth();
    const [pending,setPending] = useState(0);
    const [completed,setCompleted] = useState(0);
//   const { token } = useAuth();

useEffect(() => {
    // console.log("TOKEN:", token);
  fetch("http://localhost:3000/task/findTasks", {
    
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setTasks(data.totalTasks);
      setPending(data.pendingTasks);
      setCompleted(data.completedTasks);
    })
    .catch(err => console.log(err));

}, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Team Member</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="My Tasks" value={tasks} icon={CheckSquare} />
        <Card title="Pending" value={pending} icon={FolderKanban} />
        <Card title="Completed" value={completed} icon={Users} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">My Tasks</h2>

        <ul className="space-y-3">
          <li className="bg-gray-700 p-3 rounded-lg flex justify-between">
            Design Login Page
            <span className="text-yellow-400">In Progress</span>
          </li>
          <li className="bg-gray-700 p-3 rounded-lg flex justify-between">
            API Integration
            <span className="text-green-400">Completed</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { signin, role, logout, name } = useAuth();

  if (!signin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-5">
    
        <nav className="space-y-2">
          <button className="text-xl text-gray-400 bold w-full text-left px-3 py-2 rounded-lg hover:bg-gray-900">
            {role?.
              charAt(0).toUpperCase() + role?.slice(1)
            } - {name}
          </button>
          <Link to="/projects"><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Projects
          </button>
          </Link>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Tasks
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Project Mangers
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Team Members
          </button>
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-gray-800 p-3 rounded-xl">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold">{name}</p>
            <button
              onClick={logout}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-red-600 py-2 rounded-lg"
            >
              <LogOut onClick={logout} size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {role === "admin" && <AdminDashboard />}
        {role === "project_manager" && <ManagerDashboard />}
        {role === "team_member" && <TeamDashboard />}
      </main>
    </div>
  );
}
