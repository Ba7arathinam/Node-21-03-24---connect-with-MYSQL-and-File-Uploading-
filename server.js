const express=require('express')
const cors=require('cors')
const app=express()
const multer=require('multer')
app.use(cors())
app.use(express.json())
const mysql=require('mysql')
// for below content "npm i mysql-async-simple"
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
// from here we create Endpoint and insert into our real MYSQL Table and get respone 
app.get("/getData",async(req,res)=>{
    var connection=sqlconnect()
    await db.connect(connection);
    const dbRes=await db.query(connection,'select * from Departments_Balarathinam_T;')
    console.log(dbRes)
    res.json({message:"Work success"})
})
//post a data into MYSQL
app.post("/postData",async(req,res)=>{
    var connection=sqlconnect()
    let body=req.body
    await db.connect(connection);
    const dbRes=await db.query(connection,`INSERT into Departments_Balarathinam_T values(${body.depid},"${body.depname}");`)
    //for Above query you have to give this value in body feild"{
//     "depid":113,
//     "depname":"MERN"
//   }"
    console.log(dbRes)
    res.json({message:"Posted"})
})

//Update
//POST PATCH both are for Updating datas PUT for major update PATCH for minor update
app.patch('/upadteData',async(req,res)=>{
    var connection=sqlconnect()
    let body=req.body
    await db.connect(connection);
    const dbRes=await db.query(connection,`UPDATE Departments_Balarathinam_T set department_id=${body.depid} where department_name="${body.depname}";`)
    //in postman body feild
    // {
    //     "depid":114,
    //     "depname":"MERN"
    // }
    console.log(dbRes)
    res.json({message:"Updated"})

})
app.post('/upadteData',async(req,res)=>{
    var connection=sqlconnect()
    let body=req.body
    await db.connect(connection);
    const dbRes=await db.query(connection,`UPDATE Departments_Balarathinam_T set department_id=${body.depid} where department_name="${body.depname}";`)
    //in postman body feild
    // {
    //     "depid":114,
    //     "depname":"MERN"
    // }
    console.log(dbRes)
    res.json({message:"Updated"})

})

//DELETE
app.delete('/deleteData',async(req,res)=>{
    var connection=sqlconnect()
    let body=req.body
    await db.connect(connection);
    const dbRes=await db.query(connection,`DELETE from Departments_Balarathinam_T where department_name="${body.depname}";`)
    //in postman body feild
    // {
    //     "depname":"MERN"
    // }
    console.log(dbRes)
    res.json({message:"Delete"})

})

//SELECT users by strating value
app.get("/getByName",async(req,res)=>{
    var connection=sqlconnect()
    await db.connect(connection);
    // const dbRes=await db.query(connection,`select * from Departments_Balarathinam_T where department_name='${req.query.name}';`)
    const dbRes1=await db.query(connection,`select * from Departments_Balarathinam_T where department_name like '${req.query.name}%';`)
  if(dbRes1.length===0){
    res.json({message:"This Value not in the Table field"})
  }else{
    console.log(dbRes1)
    res.json({message:"Work success"})
  }
    
})

//INSERT email Id to SQL database if it was unique and IMPORT email through HTML FORM for that refers "insertEmail.html"

app.post('/insertEmail',async(req,res)=>{
    let body=req.body
    var connection=sqlconnect()
    await db.connect(connection);
    const dbRes1=await db.query(connection,`SELECT * from UserInformation where email='${body.email}';`)
    if(dbRes1.length===0){
        const finalres=await db.query(connection,`    INSERT INTO UserInformation (email) VALUES ('${body.email}');`)
        res.status(200).json({message:"EMAIL INSERTED SUCCSSESFULLY"})
        console.log(finalres)

    }else{
        res.status(400).json({message:"it already exist"})
    }
})

//Upload a files 

//"https://www.npmjs.com/package/multer" below code get from this website 
const storage = multer.diskStorage({//for this you have to install "npm i multer"
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  const upload=multer({storage:storage})
app.post('/postFile',upload.single('files'),(req,res,next)=>{
    let id=req.body.id
        res.json({message:"succsess" +id})
        console.log(id)

        
})
//This End Point is use display image/file/documents from his local location
app.get('/showFile',(req,res)=>{
    let image=req.query.name
   
    res.sendFile(`/uploads/${image}`,{root:__dirname})

})

//Tomorow

app.listen(8080,()=>{
    console.log("welcome to the Great Girikhalam magic show✨🌹")
})