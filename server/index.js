// server.index.js

const path = require("path");

const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

if (process.env.DATABASE_URL) {// o puede ser CLEARDB_DATABASE_URL
    const connection = mysql.createConnection({
        host: "us-cdbr-east-06.cleardb.net",
        user: "b5721249977246",
        password: "70e7fc15",
        database: "heroku_60419c2ecd0fdd3"
    });
} else { 
    const connection = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "",
        port : "3306",
        database : "minireto"
    });

    function db_query(query){
        try{
            return new Promise((resolve, reject) => {
              connection.query(query, function (err, result) {
                    if (err) throw err;
                    resolve(Object.values(result));
                });
              });
        }catch(except){}
      }
    
}


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



getPersonajes = async (req, res)=>{
    const response = await db_query("SELECT * FROM personajes ");
    res.json(response);
    res.end();
}




app.get("/api/personajes", getPersonajes);

//  ************** Peticiones get que no manejamos ***************

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

//  ************** Listen hasta abajo ***************

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});