// server.index.js

const path = require("path");

const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.resolve(__dirname, '../client/build')));


const connection = mysql.createPool({
        connectionLimit: 10,
        host: "us-cdbr-east-06.cleardb.net",
        user: "b5721249977246",
        password: "70e7fc15",
        database: "heroku_60419c2ecd0fdd3"

        
    });
    connection.getConnection((error, s)=>{
        console.log(error);
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

deleteComentario = async (req, res)=>{
    const {id} = req.params
    const response = await db_query(`DELETE FROM comentarios WHERE id = ${id};`);
    res.json(response);
    res.end();
}

putQuote = async (req, res)=>{
    const{id} = req.params
    const {quoteCharacter} = req.body;
    const response = await db_query(`UPDATE quotes SET quoteCharacter = "${quoteCharacter}" WHERE id= 1;`);
    res.json(response);
    res.end();
}

getPersonajes = async (req, res)=>{
    const response = await db_query("SELECT * FROM personajes ");
    res.json(response);
    res.end();
}


getComentarios = async (req, res)=>{
    const response = await db_query("SELECT * FROM comentarios ");
    res.json(response);
    res.end();
}

getQuote = async (req, res)=>{
    const response = await db_query("SELECT * FROM quotes");
    res.json(response[0]);
    res.end();
}

postComentarios = async (req, res)=>{
    const {comentario} = req.body;
    const response = await db_query(`INSERT INTO comentarios(comentario) VALUES ("${comentario}")`);
    res.json(response);
    res.end();
}



app.delete("/api/deleteComentario/:id", deleteComentario);
app.put("/api/Quote/", putQuote);
app.get("/api/personajes", getPersonajes);
app.get("/api/comentarios", getComentarios);
app.get("/api/Quote", getQuote);
app.post("/api/comentarios", postComentarios);

//  ************** Peticiones get que no manejamos ***************

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

//  ************** Listen hasta abajo ***************

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});