const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    regno:{
        type:Number,
        required:true,
        min:10000000
    },
    program:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model('Student',studentSchema);
console.log("Student model created");