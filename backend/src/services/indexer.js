const { MeiliSearch } = require('meilisearch')
// With the `import` syntax:



const client = new MeiliSearch({
  host: process.env.MEILI_HOST || "http://localhost:7700",
  apiKey: process.env.MEILI_API_KEY 
})



// s const deleteDoc = async ()=>{
//   await client.deleteIndex("documents");
//   console.log("All docs deleted");
// }



// deleteDoc(); 

const index  = client.index('documents') ; 

const configure = async ()=>{
  await index.updateSortableAttributes(['createdAt']);

}

configure(); 
module.exports = index  ; 