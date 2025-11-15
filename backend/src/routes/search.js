const express = require('express') ; 
const index = require('../services/indexer');


const router  = express.Router(); 



//
router.get("/" , async (req, res)=>{

    try {

        const {q,topic , project, team }    = req.query ; 

        const filters = [] ; 
        
        if(topic) filters.push(`topic = "${topic}"`) ; 
        if(project) filters.push(`project = "${project}"`) ; 
        if(team)  filters.push(`team = "${team}"` ) ; 

        console.log(filters) ; 

        const results  = await index.search(q || "" , {
            filter : filters.length ? filters : undefined 
        }) ; 

        console.log(await index.getFilterableAttributes()) ; 
        console.log(results);
        res.json(results.hits) ; 
        
    }catch(err){
        console.log(err) ; 
        res.status(500).json({err : "search failed"})

    }

})


module.exports = router  ; 
