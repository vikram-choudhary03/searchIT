const  {PDFParse} = require("pdf-parse");

 async function extractTextFromBuffer(buffer, mimetype) {
    if (!buffer) {
        throw new Error("No buffer provided");
    }

    if (mimetype === "application/pdf") {

      const uint8 = new Uint8Array(buffer) ;
      const parser = new PDFParse(uint8);
      
      console.log(parser);
      const result = await parser.getText();
      console.log(result.text);


      return result.text;
    }

    return "";
}


module.exports = extractTextFromBuffer