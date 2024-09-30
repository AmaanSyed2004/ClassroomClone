const mongoose= require('mongoose');
const courseSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    announcements:[{
        type:String,
    }],
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    assignments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assignment',
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
courseSchema.pre('save',function(next){
    this.updatedAt= Date.now();
    next();
});
const Course= mongoose.model('Course',courseSchema);
module.exports=Course;