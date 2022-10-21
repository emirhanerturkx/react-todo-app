const express = require("express");
var mysql = require('mysql');
const app = express();
var cors = require('cors');
const port = 8080;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asdqwe123",
    database: "todoapp"
});
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })

);
app.use(cors());

//SQL INJECTION PROTECTION
app.post('/api/insertTodo', (req, res) => {
    let todoName = req.body.todoName;
    let SQL = "INSERT INTO `todos` SET todoTexT=?"
    con.query(SQL, todoName, function (err, result, fields) {
        res.json({ 'results': result })
    });
});
app.post('/api/updateTodo', (req, res) => {
    let todoId = req.body.todoId;
    let todoStatus = req.body.todoStatus;
    let SQL = "UPDATE `todos` SET status=? WHERE id=?"
    con.query(SQL, [todoStatus, todoId], function (err, result, fields) {
        res.json({ 'results': result })
    });
});

app.get('/api/getTodos', (req, res) => {
    let SQL = "SELECT * FROM todos"
    con.query(SQL, function (err, result, fields) {
        res.json({ 'results': result })
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});