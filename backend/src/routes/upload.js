const express = require('express')
const multer  = require('multer');
const path = require("path");

const extractText = require('../services/extract');
const index = require('../services/indexer');

const router  = express.Router(); 

const storage =  new multer.diskStorage({
    destination : "uploads/", 
    filename : (req, file, cb)  =>{
        cb(null, Date.now() + "_"+ file.originalname);
    }
})



const upload = multer({storage}) ; 


router.post("/" , upload.single('file') , async (req, res)=>{

    try {
        const file  = req.file ; 

        
        const content  = await extractText(file.path, file.mimetype) ; 
        
        //save to milliserch
       
        await index.addDocuments([
            {
                id : String(Date.now()), 
                title : file.originalname, 
                filename : file.filename, 
                mimetype : file.mimetype, 
                content : content 
            }
        ])

        res.json({messge : "Uploaded + indexed"})
    }catch(err){
        console.log(err) ; 

        res.status(500).json({error : "Upload failed"}) ; 
    }
})


module.exports = router ; 