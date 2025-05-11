import e from "express";
import mysql2 from "mysql2";
import bcrypt from "bcrypt";

const app = e();

app.get('/',(req,res)=>{
    res.send("Bonjour dans le backend ! ");
})

app.listen( port ,()=>{
    console.log("Back end runing on port: "+port)
})