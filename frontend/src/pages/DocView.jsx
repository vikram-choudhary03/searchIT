import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/api";


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
// import.meta.url
// ).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    async function fetchDoc() {
      try {
        const res = await api.get(`/api/document/${encodeURIComponent(id)}`); // implement backend route to fetch metadata & fileUrl
        console.log(res.data);
        setDoc(res.data);
      } catch(e) { console.error(e) }
    }
    fetchDoc();
  }, [id]);

  if (!doc) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">{doc.title}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <Document file={"http://localhost:3000/fileUrl"} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from({length: Math.min(numPages || 1, 5)}).map((_, i) => (
              <Page key={i} pageNumber={i+1} />
            ))}
          </Document>
        </div>

        <aside className="bg-white p-4 rounded shadow space-y-2">
          <p><strong>Project:</strong> {doc.project}</p>
          <p><strong>Team:</strong> {doc.team}</p>
          <p><strong>Topics:</strong> {Array.isArray(doc.topic) ? doc.topic.join(", ") : doc.topic}</p>
          <a href={doc.fileUrl} target="_blank" className="text-blue-600">Open raw file</a>
        </aside>
      </div>
    </div>
  );
}
