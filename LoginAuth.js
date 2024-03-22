const express=require('express')
const cors=require('cors')
const app=express()
const multer=require('multer')
var jwt = require('jsonwebtoken');
app.use(cors())
app.use(express.json())
const mysql=require('mysql')
const {makeDb}=require('mysql-async-simple')
function sqlconnect(){
    return mysql.createConnection({
    //Refer Company Mail for Sql datas
    host:'3.7.198.191',
    user:'bu-trausr',
    password:'r9*rwr$!usFw0MCPj#fJ',
    database:'bu-training',
    port:'8993'
})
}
const db=makeDb()
//get data from user to generate a Token for specific UserData
app.post('/loginAuth',(req,res)=>{
    let emailss=req.body.email
    let password=req.body.password
    console.log(emailss,password)
    let tokens=jwt.sign({email:emailss,password:password},'shhhshhsh',{expiresIn:'4m'})
    console.log(tokens)
    res.json({token:tokens})
})
//Verify the Token 
app.post('/verifyToken',(req,res)=>{
    var token=req.body.token
    // jwt.verify(token, 'shhhshhsh', function(err, decoded) {
    //     if (err) {
    //         res.json(err)
    //     }else{
    //         console.log(decoded)
    //         res.json(decoded)
    //     }
    //   });
      try {
        var decoded = jwt.verify(token, 'shhhshhsh');
         res.json(decoded)
      } catch(err) {
        res.json(err)
      }
})

app.listen(8080,()=>{
    console.log("saragalaigal Arambam😉")
})