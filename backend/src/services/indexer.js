const { MeiliSearch } = require('meilisearch')
// With the `import` syntax:

console.log("apikey " + process.env.apiKey);


const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.apiKey 
})


const index  = client.index('documents') ; 

// const deleteDoc = async ()=>{
//   await index.deleteAllDocuments();
//   console.log("All docs deleted");
// }

// deleteDoc(); 


module.exports = index  ; 