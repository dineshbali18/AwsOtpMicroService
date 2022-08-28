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

exports.createContestant=(req,res)=>{
  // console.log(req.body);
    const new_contestant=new contestant(req.body)
    new_contestant.save((err,contestant)=>{
        if (err) {
          console.log(err);
            return res.status(400).json({
              error: "NOT able to save contestantin DB"
            });
          }
          res.json({ contestant});
    })
}
