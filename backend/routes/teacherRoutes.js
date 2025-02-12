import express from 'express';
import { createTeacher, updateTeacher, deleteTeacher, getTeacher, getTeachers, getIdByName, getTeachersForm, getTeacherSalariesSum } from '../controllers/teacherController.js';
import { verifyToken } from '../utils/verifyUser.js'; 
const router = express.Router();

router.post('/create', createTeacher);
router.post('/update/:id',updateTeacher);
router.delete('/delete/:id',deleteTeacher);
router.get('/get',getTeachers);
router.get('/get/:id',getTeacher);
router.get('/getIdByName/:name',getIdByName);
router.get('/getForm',getTeachersForm);
router.get('/getTeacherSalariesSum',getTeacherSalariesSum);

export default router;