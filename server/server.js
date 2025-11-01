require('dotenv').config({ path: "./utils/.env" });
const express= require("express")
const cors=require("cors");
const app=express();
const router=require("./router/auth-router");
const connectDb=require("../server/utils/db");
const corsOptions ={
    origin:" http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/",router);

const PORT=5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`)
});
})
