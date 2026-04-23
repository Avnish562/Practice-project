// mongodb url ->mongodb+srv://avnishsingh10727_db_user:zvZRXvOrMMqc8ZLS@clusterbro.rulfgey.mongodb.net/?appName=Clusterbro

const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const Student=require('./models/student');
const app=express();
app.use(express.json());
const PORT=process.env.PORT || 3000;
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Route for creating a student
app.post('/students', async(req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Added GET route to retrieve all students
app.get('/students', async(req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//to get the student details
app.get('/students/:id',async(req,res)=>{
  try{
    const student=await Student.findById(req.params.id);
    res.json(student);
  }catch(err){
    res.status(404).json({message: err.message});
  }
})

//to delete the student details
app.delete('/students/:id',async(req,res)=>{
  try{
    const student=await Student.findByIdAndDelete(req.params.id);
    res.json(student);
  }catch(err){
    res.status(404).json({message: err.message});
  }
})
 
//to update the student details
app.put('/students/:id',async(req,res)=>{
  try{
    const student=await Student.findByIdAndUpdate(req .params.id,
      req.body,
      {
        new:true,
        runValidators:true
      }
    );
    res.json(student);
  }catch(err){
    res.status(404).json({message: err.message});
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
