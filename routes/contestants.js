const express=require("express");
const router=express.Router();
const {getAllContestants}=require("../controllers/contestants")

router.get("/all/contestants",getAllContestants)
module.exports=router;