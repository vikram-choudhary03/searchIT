const express = require('express')
const multer  = require('multer');
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

const index = require('../services/indexer');
const extractTextFromBuffer = require('../services/extract');

const router  = express.Router(); 


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });
  
      // 1) upload to cloudinary
      const cloud = await uploadToCloudinary(file.buffer, file.originalname);
  
      // 2) extract text from buffer
    
      const content = await extractTextFromBuffer(file.buffer, file.mimetype);
  
      // 3) auto tags
      const topic = extractKeywords(content);
      const project = "Q4 campaign";
      const team = "Marketing";
  
      // 4) create doc object for MeiliSearch
      console.log(content);
      const doc = {
        id: String(Date.now()),
        title: file.originalname,
        filename: file.originalname,
        fileurl: cloud.secure_url ,      //  CLOUD URL
        createdAt: new Date().toISOString(),
        mimetype: file.mimetype,
        content,
        topic,
        project,
        team
      };
      console.log(doc);
      await index.addDocuments([doc]);
  
      await index.updateFilterableAttributes(["topic", "project", "team", "mimetype"]);
      await index.updateSortableAttributes(["createdAt"]);
  
      res.json({ message: "Uploaded + indexed", doc, success: true });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Upload failed", details: err.message });
    }
  });
  



function extractKeywords (text){


    if(!text)  return []  ;

    const words  = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [] ;
    const freq =  {} ; 

    words.forEach(w=> (freq[w] = (freq[w] || 0)+1)) ; 
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]) ; 
    return sorted.slice(0,5).map(x=>x[0]) ;    // top 5 keywords  ; 


}

function uploadToCloudinary(buffer, originalname) {
    return new Promise((resolve, reject) => {
      const safeName = path.parse(originalname).name.replace(/\s+/g, "_"); 
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: `docs/${Date.now()}_${safeName}` },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      ).end(buffer);
    });
  }
module.exports = router ; 