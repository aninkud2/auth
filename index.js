const express=require("express")
const userRouter=require("./router/signrouter")
const port=9854
const app=express();
app.use(express.json())
app.use("/api",userRouter)
app.listen(port,()=>{
    console.log("listening on port:"+port)
})