require('dotenv').config();

const express = require('express');
const cors = require('cors') ;

const uploadRoute  = require("./routes/upload") ; 
const searchRoute  = require("./routes/search") ;

const app  = express(); 

const PORT = 3000; 
app.use(cors()); 
app.use(express.json()); 


app.use("/upload" , uploadRoute) ; 
app.use("/search" , searchRoute) ; 


app.listen(PORT, ()=>{
    console.log("server is running on "+ PORT) ; 
})

