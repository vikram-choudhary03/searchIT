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
        
        //auto tags 
        const topic = extractKeywords(content) ;
        console.log(topic) ; 
        const project = "Q4 campaign"  ; 
        const team = "Marketing"      ;  


        

        //save to milliserch

        const doc  = {
            id : String(Date.now()), 
            title : file.originalname, 
            filename : file.filename, 
            mimetype : file.mimetype, 
            content : content , 
            topic, 
            project, 
            team
        }
       
        await index.addDocuments([
            doc
        ])

        await index.updateFilterableAttributes(["topic" , "project" , "team" , "mimetype"]);

        res.json({message : "Uploaded + indexed", doc , success : true })
    }catch(err){
        console.log(err) ; 

        res.status(500).json({error : "Upload failed"}) ; 
    }
})



function extractKeywords (text){


    if(!text)  return []  ;

    const words  = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [] ;
    const freq =  {} ; 

    words.forEach(w=> (freq[w] = (freq[w] || 0)+1)) ; 
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]) ; 
    return sorted.slice(0,5).map(x=>x[0]) ;    // top 5 keywords  ; 


}
module.exports = router ; 