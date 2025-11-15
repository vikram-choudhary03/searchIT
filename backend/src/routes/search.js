const express = require('express') ; 
const index = require('../services/indexer');


const router  = express.Router(); 



//
router.get("/" , async (req, res)=>{

    try {

        const query   = req.query.q || "" ; 
        
        const results  = await index.search(query) ; 


       
        
        res.json(results.hits) ; 
        
    }catch(err){
        console.log(err) ; 
        res.status(500).json({err : "search failed"})

    }

})


module.exports = router  ; 
