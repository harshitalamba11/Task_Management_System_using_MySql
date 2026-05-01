import project from '../db/project.js';
import jwt from "jsonwebtoken";
import activity_log from '../db/activity_log.js';

/* ================= CREATE PROJECT ================= */
export const createProject = (req, res) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const project_data = {
        project_name: req.body.name,
        description: req.body.description,
        created_by: decoded.id,
        assigned_to: req.body.assigned_to
    };

    project.findByName(project_data.project_name, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error checking project" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Project already exists" });
        }

        project.create(project_data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error creating project",
                    error: err
                });
            }

            activity_log.create(
                decoded.id,
                `Project Created name=${project_data.project_name}`,
                () => {}
            );

            return res.status(201).json({
                message: "Project created successfully",
                projectId: result.insertId
            });
        });
    });
};


/* ================= GET ALL PROJECTS (ADMIN) ================= */
export const getAllProjects = (req, res) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    project.getAllProjects((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching projects",
                error: err
            });
        }

        return res.status(200).json({
            message: `All projects fetched by Admin ${decoded.name}`,
            data: results
        });
    });
};


/* ================= GET PROJECTS BY USER ================= */
export const getProjectsById = (req, res) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    project.getProjectsById(decoded.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching projects",
                error: err
            });
        }
        // console.log("USER ID:", decoded.id);
        // console.log("RESULTS:", results);
        return res.status(200).json({
            message: `Projects fetched for ${decoded.name}`,
            data: results
            
        });
    });
};


/* ================= DELETE PROJECT ================= */
export const deleteProjects = (req, res) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const id = req.params.id;

    project.find(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error checking project" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.deleteProject(id, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Error deleting project"
                });
            }

            activity_log.create(
                decoded.id,
                `Project Deleted id=${id}`,
                () => {}
            );

            return res.status(200).json({
                message: "Project deleted successfully"
            });
        });
    });
};
export const getUsersUnderManager = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    
    if (decoded.role !== "project_manager" && decoded.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    project.getUsersUnderManager(decoded.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching users",
                error: err
            });
        }

        return res.status(200).json({
            message: "Users under manager fetched successfully",
            data: results
        });
    });
};

export const getPendingTasks = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, "secretkey");
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    
    if (decoded.role !== "project_manager" && decoded.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    project.getPendingTasks(decoded.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching users",
                error: err
            });
        }

        return res.status(200).json({
            message: "Users under manager fetched successfully",
            data: results
        });
    });
};