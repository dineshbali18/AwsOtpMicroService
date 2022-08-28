const express=require("express");
const router=express.Router();
const {getAllContestants,createContestant}=require("../controllers/contestants")

router.get("/bali/all/contestants",getAllContestants)
router.post("/bali/contestant/create",createContestant)
module.exports=router;
