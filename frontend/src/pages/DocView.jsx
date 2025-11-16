import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/api";

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.get(`api/document/${encodeURIComponent(id)}`);
      console.log(res.data) ;
      setDoc(res.data);
    }
    load();
  }, [id]);

  if (!doc) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">{doc.title}</h1>

      <div className="bg-white p-4 rounded shadow">
        {/* iframe preview works for PDF / images / many file types */}
        <iframe src={doc.url} className="w-full h-[80vh]" title={doc.title} />
      </div>

      <div>
        <a href={doc.fileurl} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Open in new tab
        </a>

        <a href={doc.fileurl} download className="ml-3 inline-block bg-gray-200 px-4 py-2 rounded">
          Download
        </a>
      </div>
    </div>
  );
}
