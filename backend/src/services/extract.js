const { PDFParse } = require('pdf-parse');

const fs  = require('fs') ; 



async function extractTextFromBuffer(buffer, mimetype) {
    if (mimetype === "application/pdf") {
      const data = await pdf(buffer);
      return data.text;
    }
    return ""; // fallback
  }
  

module.exports = extractTextFromBuffer ; 