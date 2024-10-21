const mongoose=require('mongoose');
const AssignmentsSchema= new mongoose.Schema({
    courseID:{
        type:String,
        ref:'Course',
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,  
        required:true,
    },
    maxMarks:{
        type:Number,
        required:true,
    },
    submissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Submission',
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default: Date.now,
    },
    status:{
        type:String,
        enum:['active','archived'],
        default:'active',
    }

});
AssignmentsSchema.pre('save',function(next){
    this.updatedAt= Date.now();
    next();
});
//automatically close the assignment after due date
AssignmentsSchema.pre('save',function(next){
    if(this.dueDate<Date.now()){
        this.status='archived';
    }
    next();
});
const Assignment= mongoose.model('Assignment',AssignmentsSchema);
module.exports=Assignment;
// Example JSON data to test the Assignments model
