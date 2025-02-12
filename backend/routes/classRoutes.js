import express from 'express';
import { deleteClass, updateClass, getClass, getClasses, createClass, getClassByName, getIdByName, getClassesForm } from '../controllers/classController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', createClass);
router.post('/update/:id',updateClass);
router.delete('/delete/:id',deleteClass);
router.get('/get',getClasses);
router.get('/get/:id',getClass);
router.get('/getByName/:name',getClassByName);
router.get('/getIdByName/:name',getIdByName);
router.get('/getForm',getClassesForm);

export default router;