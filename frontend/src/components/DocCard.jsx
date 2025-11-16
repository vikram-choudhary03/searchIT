export default function DocCard({ doc }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold">{doc.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{doc.content?.slice(0,150)}</p>
        <div className="flex gap-2 mt-3 text-xs">
          {doc.project && <span className="px-2 py-1 bg-gray-100 rounded">{doc.project}</span>}
          {doc.team && <span className="px-2 py-1 bg-gray-100 rounded">{doc.team}</span>}
          {Array.isArray(doc.topic) ? doc.topic.slice(0,3).map(t => <span className="px-2 py-1 bg-gray-100 rounded text-xs" key={t}>{t}</span>) : null}
        </div>
      </div>
    );
  }
  