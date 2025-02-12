import Class from '../models/class_model.js'
import Student from '../models/student_model.js'
import { errorHandler } from '../utils/error.js'

export const createStudent = async (req,res,next)=>{
    try{
        const className=req.body.class;
        // console.log(className)
        //find class by the name
        const foundClass = await Class.findOne({name:className})
        // console.log(foundClass.students.length)
        //if class not found return error class not found
        if(!foundClass){
            return res.status(404).json({message:"class not found"})
        }
      // checking capacity of class
      if(foundClass.currentCapacity>=foundClass.maxCapacity){
        return res.status(400).json({message:"class is full.cannot add more students"})
      }
      // creating the student with class associations
      const newStudent= await Student.create({
        ...req.body,
        class:foundClass._id  // assign class id to the student
      })

      // update the class with newly created student and increse current capacity
      foundClass.students.push(newStudent )
      foundClass.currentCapacity++;
      await foundClass.save();
      res.status(200).json(newStudent)
    }catch(error){
        next(error);
    }
}

// delete student function
export const deleteStudent = async(req,res,next)=>{

    try{
    // find the student to be deleted 
    const student = await Student.findById(req.params.id);
    if(!student){
        return res.status(404).json({message: 'student not found'})
    }
    // delete the student 
    await Student.findByIdAndDelete(req.params.id);

    // remove the student id from associated class
    const foundClass = await Class.findOneAndUpdate(
        {
            students:req.params.id
        },
        {$pull:{students:req.params.id}},
        {new:true}
    )
    if(!foundClass){
        return res.status(404).json({message:'Associated class not found'})
    }
    res.status(200).json({message:'student has been deleted'})
    }catch(error){
        next(error);
    }
}

export const updateStudent = async (req, res, next) => {
    const student= await Student.findById(req.params.id);
    if (!student) {
      return next(errorHandler(404, 'Student not found!'));
    }
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  };

  
  export const getStudent = async (req, res, next) => {
    try {
      const student = await Student.findById(req.params.id).populate("class");
      if (!student) {
        return next(errorHandler(404, 'Student not found!'));
      }
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  };

  export const getStudents = async (req, res, next) => {
    try {
      const students = await Student.find().populate("class")
      return res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };


  export const getIdByName = async (req, res, next) => {
    try {
      const studentName = req.params.name;
      const studentData = await Student.findOne({ name: studentName });
      if (!studentData) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json( studentData._id );
    } catch (error) {
      next(error);
    }
  };

  export const getStudentsForm = async (req, res, next) => {
    try {
      const students = await Student.find({}, { _id: 0,__v:0,createdAt:0,updatedAt:0,role:0});
      return res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };


  export const getStudentFeesSum = async (req, res, next) => {
    try {
      const result = await Student.aggregate([
        {
          $group: {
            _id: null,
            sum: { $sum: "$feesPaid" }
          }
        }
      ]);
  
      if (result.length > 0) {
        res.status(200).json({ sum: result[0].sum });
      } else {
        res.status(200).json({ sum: 0 }); 
      }
    } catch (error) {
      next(error); 
    }
  };