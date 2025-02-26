//npm init -y
//npm install express
//node index.js
//npm install nodemon
//npm install mysql2
//npm install knex
//npm install cors

const express = require('express'); 
const cors = require('cors');
 
const router = require('./src/routes/routes');

const app = express();
app.use(cors())
app.use(express.json());
app.use(router);

app.listen(3001,() => {
    console.log("Rodando");
})