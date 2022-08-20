require('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")


const app=express();
app.use(bodyParser.json())
app.use(cors());

mongoose
  .connect("mongodb+srv://Bali:DiNeSh5@cluster0.n1uvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e)=>{
      console.log(e);
      console.log("DB NOT CONNECTED SUCCESFULLY");
  });

const otpRoutes=require("./routes/otp")
const contestantRoutes=require("./routes/contestants")
const reports = require('./routes/reports')


app.use("/api",contestantRoutes);
app.use("/api",otpRoutes);
app.use("/api",reports)

app.get("/",(req,res)=>{
  var result = JSON.stringify({status:200, message:"First Node JS Application"})
    res.send(result)
})

app.listen(4000,()=>{
    console.log(`otpService is running at my own configured port 4000`)
})
