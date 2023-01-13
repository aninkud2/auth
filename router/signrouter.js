const express=require("express")
const router=express.Router()
const {signup}=require("../controller/authcontroller")
router
.route("/users")
.post(signup)
module.exports=router