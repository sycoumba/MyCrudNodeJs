const mysql = require('mysql');
const express =require('express');
var app =express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
host:'localhost',
user: 'root',
password: '',
database: 'employeedb'

})
mysqlConnection.connect((err)=>{
if(!err)
console.log('la connection à la base de donnée a reussi');
else
console.log('la connection à la base de donnée a echoué\n Error:'+JSON.stringify(err,undefined,2));

});

app.listen(3000,()=>console.log('le serveur Express run au port:3000'));

//Get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
if (!err)
res.send(rows);
else
console.log(err);
    })
})
//Get an employees
app.get('/employees/:id/',(req,res) =>{
    mysqlConnection.query('SELECT * FROM employee WHERE id_employee = ?',[req.params.id],(err,rows,fields)=>{
if (!err)
res.send(rows);
else
console.log(err);
    })
})
//Delete an employees
app.delete('/employees/:id/',(req,res) =>{
    mysqlConnection.query('DELETE FROM employee WHERE id_employee = ?',[req.params.id],(err,rows,fields)=>{
if (!err)
res.send('Delete successfully.');
else
console.log(err);
    })
})
//Insert an employees
app.post('/employees',(req,res) =>{
    let emp = req.body;
    var sql = "SET @id_employee = ?; SET @nom = ?; SET @code_employee = ?; SET salaire = ?;\
    CALL employeeAddorEdit(@id_employee,@nom,@code_employe,@salaire);"
    mysqlConnection.query(sql,[emp.id_employee, em.nom, em.code_employee, em.salaire],(err,rows,fields)=>{
if (!err)
res.send('rows');
else
console.log(err);
    })
})