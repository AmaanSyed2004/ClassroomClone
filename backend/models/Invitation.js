const mongoose= require('mongoose');
const invitationSchema= new mongoose.Schema({
    email:{
        type: String,
        required:true,
    },
    courseID:{
        type: String,
        required:true,
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    dateInvited:{
        type:Date,
        default:Date.now,
    },

});
const Invitation= mongoose.model('Invitation',invitationSchema);
module.exports=Invitation;