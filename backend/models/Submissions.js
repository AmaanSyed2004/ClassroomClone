const mongoose= require('mongoose');
const submissionSchema= new mongoose.Schema({
    assignmentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Assignment',
        required:true,
    },
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    marks:{
        type:Number,
        default:0,
    },
    submittedAt:{
        type:Date,
        default:Date.now,
    },
    status:{
        type:String,
        enum:['submitted','graded'],
        default:'submitted',
    },
    files:[{
        type:String,
    }],
    comments:[{
        type:String,
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default: Date.now,
    },
    submissionStatus:{
        type:String,
        enum:['active','archived'],
        default:'active',
    }

})
submissionSchema.pre('save',function(next){
    this.updatedAt= Date.now();
    next();
})
submissionSchema.pre('save',function(next){
    if(this.submittedAt<Date.now()){
        this.status='archived';
    }
    next();
})
const Submission= mongoose.model('Submission',submissionSchema);
module.exports=Submission;