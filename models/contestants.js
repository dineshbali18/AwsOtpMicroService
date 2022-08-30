const mongoose=require("mongoose");
const contestantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    //role ===> nominated
    description:{
        type:String,
        required:true
    },
    safe:{
        type:Number,
        default:0
    },
    eliminatedWeek:{
        type:Number,
        default:1
    }
})

module.exports=mongoose.model("contestants",contestantSchema);
