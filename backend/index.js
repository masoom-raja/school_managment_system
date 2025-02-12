import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import studentRouter from './routes/studentRoutes.js';
import classRouter from './routes/classRoutes.js'
import teacherRouter from './routes/teacherRoutes.js'
dotenv.config();
import cors from 'cors';



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database connection established'))
  .catch((err) => console.error('Error connecting to database:', err));

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body
app.use('/api/auth', userRouter);
app.use('/api/student',studentRouter);
app.use('/api/class', classRouter);
app.use('/api/teacher',teacherRouter)

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message || "Internal Server Error";
  return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
  })
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
