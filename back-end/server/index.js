// server.index.js

const path = require('path');

const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

var connection = mysql.createConnection({
    host: "localhost",
    user: "apibasededatos",
    password: "TC2005B-Web",
    database: "empresanuevo"
});

app.get("/api/hello", (req, res) => { // lo mismo que poner request, response
    res.json({ message: "Hello from the server siiiideeeee"});
});

app.get("/api/house", (req, res) => {
    fs.readFile(__dirname + "/house.json", "utf8", (err, data) => {
        console.log(data);
        res.end(data);
    });
});

app.post("/api/house", (req, res) => {
    console.log("El cuerpo de la petición es: ", req.body);
    res.sendStatus(201);
});




//  ************** MySQL Connection ***************

app.get("/api/basededatos", (req, res) => { // lo mismo que poner request, response
    // connection.connect();

    connection.query('SELECT * FROM EMPLOYEE', (err, results, fields) => {
        if (err) throw err;
        // console.log('The solution is: ', results[0].solution);
        res.json({result: results[0].Emp_LName});
        console.log(results)
    });
      
    // connection.end();
});

//  ************** Peticiones get que no manejamos ***************

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

//  ************** Listen hasta abajo ***************

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});