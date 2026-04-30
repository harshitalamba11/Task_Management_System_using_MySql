import db from "../config/sql.js";

const project = {

    create: (project, callback) => {
        const sql = "INSERT INTO projects (project_name, description, created_by, assigned_to) VALUES (?, ?, ?, ?)";
        db.query(sql, [project.project_name, project.description, project.created_by, project.assigned_to], callback);
    },

    getAllProjects: (callback) => {
        db.query("SELECT * FROM projects", callback);
    },

    deleteProject: (id, callback) => {
        db.query("DELETE FROM projects WHERE id = ?", [id], callback);
    },

    updateProject: (id, project, callback) => {
        const sql = "UPDATE projects SET project_name = ?, description = ?, assigned_to = ? WHERE id = ?";
        db.query(sql, [project.project_name, project.description, project.assigned_to, id], callback);
    },

    find: (id, callback) => {
        const sql = "SELECT * FROM projects WHERE id = ?";
        db.query(sql, [id], callback);
    },

    findByName: (name, callback) => {
        const sql = "SELECT * FROM projects WHERE project_name = ?";
        db.query(sql, [name], callback);
    },

    getProjectsById: (id, callback) => {
        const sql = "SELECT * FROM projects WHERE assigned_to = ?";
        db.query(sql, [id], callback);
    },

    getUsersUnderManager: (managerId, callback) => {
        const sql = `
            SELECT u.*, p.project_name
            FROM users u
            JOIN projects p ON u.id = p.assigned_to
            WHERE p.assigned_to = ?
        `;
        db.query(sql, [managerId], callback);
    },

    getPendingTasks: (managerId, callback) => {
        const sql = `
            SELECT * 
            FROM tasks 
            WHERE status="TODO" 
            AND project_id IN (
                SELECT id FROM projects WHERE assigned_to = ?
            )
        `;
        db.query(sql, [managerId], callback);
    }
    
};

export default project;