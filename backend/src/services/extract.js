const { PDFParse } = require('pdf-parse');

const fs  = require('fs') ; 



async function extractText(filepath, mimetype) {

    console.log(filepath + " "+ mimetype);
    if(mimetype === "application/pdf"){
        const buffer  = fs.readFileSync(filepath) ; 

        const uint8  = new Uint8Array(buffer) ; 

        const parser = new   PDFParse(uint8); 

        const data  = await parser.getText(); 

        await parser.destroy();
        console.log("data " + data.text) ; 
        return data.text ; 

       
    }

    return "" ; 
    
}


module.exports = extractText ; 