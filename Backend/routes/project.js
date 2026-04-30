import express from 'express';
import {
  createProject,
  deleteProjects,
  getAllProjects,
  getPendingTasks,
  getProjectsById,
  getUsersUnderManager
} from "../controllers/project.js";

const router = express.Router();

// Admin routes
router.post('/projects', createProject);        // create
router.get('/projects', getAllProjects);        // get all (admin)

// User route
router.get('/my-projects', getProjectsById);    // logged-in user's projects

// Delete
router.delete('/projects/:id', deleteProjects);

router.get('/manager/users', getUsersUnderManager);
router.get("/tasks-pending", getPendingTasks);

export default router;