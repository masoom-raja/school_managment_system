import express from 'express';
import { updateStudent ,deleteStudent,getStudent,getStudents,createStudent,getIdByName,getStudentsForm,getStudentFeesSum} from '../controllers/studentController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', createStudent);
router.post('/update/:id',updateStudent);
router.delete('/delete/:id',deleteStudent);
router.get('/get',getStudents);
router.get('/get/:id',getStudent);
router.get('/getIdByName/:name',getIdByName);
router.get('/getForm',getStudentsForm);
router.get('/getStudentFeesSum',getStudentFeesSum)
export default router;