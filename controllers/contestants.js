const mongoose=require("mongoose")
const contestant=require("../models/contestants")


exports.getAllContestants=(req,res)=>{
    contestant.find().exec((err,contestants1)=>{
      if (err || !contestants1) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      res.json({contestants1})
    })
  }