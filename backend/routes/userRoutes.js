import express from 'express';
import { signUp,signOut,signin,updateUser,deleteUser } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post("/signin",signin);
router.get("/signout",signOut);
router.post('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)

export default router;
