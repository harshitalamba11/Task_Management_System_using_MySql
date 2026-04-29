import db from '../config/sql.js';

const Task = {
    createTask: (task,callback) => {
        const sql = "INSERT INTO tasks (project_id,title,description,status,assigned_to,due_date) VALUES (?,?,?,?,?,?);"
        db.query(sql,[task.project_id,task.title,task.description,task.status,task.assigned_to,task.due_date],callback);
    },
    deleteTask: (id,callback) => {
        const sql = "DELETE from tasks WHERE id = ?";
        db.query(sql,[id],callback);
    },
    updateTask: (data,id,callback) => {
        const sql = "UPDATE tasks SET status = ?, assigned_to = ?, due_date = ? WHERE id = ?";
        db.query(sql,[data.status,data.assigned_to,data.due_date,id],callback);
    },
    find: (id,callback) => {
        const sql= "SELECT * FROM tasks WHERE id = ? ";
        db.query(sql, [id], callback);
    },
    findByAssignedTo: (id,callback) => {
        const sql= "SELECT * FROM tasks WHERE assigned_to = ? ";
        db.query(sql, [id], callback);
    },
    pendingTasks: (id,callback) => {
        const sql= "SELECT * FROM tasks WHERE assigned_to = ? && status = 'todo' ";
        db.query(sql, [id], callback);
    },
    completedTasks: (id,callback) => {
        const sql= "SELECT * FROM tasks WHERE assigned_to = ? && status = 'completed' ";
        db.query(sql, [id], callback);
    }
}

export default Task;