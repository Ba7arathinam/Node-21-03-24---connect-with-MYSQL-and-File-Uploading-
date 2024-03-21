// for this you have to Install "npm i mysql" and 'npm init'
const mysql=require('mysql')
// for below content "npm i mysql-async-simple"
const {makeDb}=require('mysql-async-simple')
const connection=mysql.createConnection({
    //Refer Company Mail for Sql datas
    host:'3.7.198.191',
    user:'bu-trausr',
    password:'r9*rwr$!usFw0MCPj#fJ',
    database:'bu-training',
    port:'8993'
})



//  function mysqlConnection(){
//     //whenever we strat our Db we have to give ".connect()" to start and ".end()" for End od action
//      connection.connect()
//      //we can impliment our MYSQL querys in here
//      connection.query('Select * from Subjects_Balarathinam_T',(err,dbResult)=>{
//         //This Function is use print result on our console
//         console.log(dbResult)
//     });

//      connection.query('delete from  Departments_Balarathinam_T where department_id=10;',(err,dbResult)=>{
//         console.log(dbResult)
//     });

// connection.end()
// }

// mysqlConnection()

//Another method (shot-cut) for this only we install "npm i mysql-async-simple"

const db=makeDb()
async function dbval(){
    await db.connect(connection)

try{
    const users=await db.query(connection,'INSERT into Departments_Balarathinam_T values(110,"AIDS");');
    console.log(users)
}catch(e){
  console.log(e)
}finally{
    await db.close(connection)
}
}
dbval()
