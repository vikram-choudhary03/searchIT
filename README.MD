# Smart Document Search

A  internal search tool for marketing teams to **index documents, perform  search, and auto-categorize by topic, project, and team**.

- **Frontend:** [https://search-it-ht76.vercel.app/](https://search-it-ht76.vercel.app/)
- **Backend API:** [https://searchit-p7zt.onrender.com](https://searchit-p7zt.onrender.com)
- **GitHub Repository:** [SearchIT](https://github.com/vikram-choudhary03/searchIT)
- **MeiliSearch Service:** []()

To see the  project in action, first visit the MeiliSearch Service link , wait till it get started. Then try to upload the document , it will work.  

---

## Demo

<div align="center">

[![Watch the demo](https://drive.google.com/thumbnail?id=1QCfpVPDDeSB0m9I_pbPJGLV3LsTcgZ0h&sz=w1000)](https://drive.google.com/file/d/1QCfpVPDDeSB0m9I_pbPJGLV3LsTcgZ0h/view?usp=sharing)

</div>

---

## Features (v2)

- Upload and index PDF documents  
- Keyword-based search with filtering (foundation for semantic search) 
- Automatic categorization: topic / project / team  
- Preview or download documents directly  
- Clean, responsive UI built with **Tailwind CSS** + **Shadcn UI**  

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn UI, Axios  
- **Backend:** Node.js, Express  
- **Search:** Meilisearch  
- **File Storage:** Cloudinary  

---

## Setup (Local)

```bash
# Clone repository
git clone <repo_url>
cd <repo_folder>

# Install backend dependencies
npm install

# Start backend server
npm run dev

# Frontend
cd frontend
npm install
npm start


# Environment variables
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MEILI_MASTER_KEY=your_master_key

```
---

## Usage

1. **Upload PDF files** through the web interface.  
2. **Documents are automatically indexed and categorized.**  
3. **Search** using keywords or filters: `topic`, `project`, `team`.  
4. **Click a document** to preview or download.  


## Notes
Uses a **fast keyword-based search** optimized for  speed and reliability.  
- The architecture is **designed to extend into semantic search** (embeddings + vector search) in the next phase.  
- Clean and minimal UI built for quick document exploration.  
- Future-ready for enhancements:  
  - Multi-format ingestion (DOCX, TXT, MD)  
  - Embedding-based semantic search  
  - LLM-driven summaries and recommendations