import express from 'express';

import { register, deleteUser, updateUser, getAllUsers, login, find, managers } from "../controllers/authController.js";

const router= express.Router();

router.post('/register',register);
router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id',updateUser);
router.get('/getUsers',getAllUsers);
router.post('/login',login);
router.get('/find/:id',find);
router.get('/managers',managers);

export default router;