require('dotenv').config();

const express = require('express');
const cors = require('cors') ;
const path  = require('path'); 

const uploadRoute  = require("./routes/upload") ; 
const searchRoute  = require("./routes/search") ;
const documentsRoute = require("./routes/documents");


const app  = express(); 

const PORT = 3000; 
app.use(cors()); 
app.use(express.json()); 

app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "uploads"))
  );

app.use("/upload" , uploadRoute) ; 
app.use("/search" , searchRoute) ; 
app.use("/api", documentsRoute);


app.listen(PORT, ()=>{
    console.log("server is running on "+ PORT) ; 
})

