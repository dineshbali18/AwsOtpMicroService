const mongoose=require("mongoose")
const reports=require('../models/reports')

exports.createReport=(req,res)=>{
    // console.log("hi................")
    const report=new reports(req.body);
    report.save((err, reportData) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save otpData in DB"
          });
        }
        res.json(reportData)
      });
}
