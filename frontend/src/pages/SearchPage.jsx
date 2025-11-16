import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import DocCard from "../components/DocCard";
import SkeletonCard from "../components/SkeletonCard";
import api from "../lib/api";
import { useNavigate } from "react-router";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function doSearch() {
    setLoading(true); setResults([]);
    try {
      const res = await api.get("/search", { params: { q, ...filters } });
      // backend: return array directly or { results: [] }
      setResults(res.data.hits || res.data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Search</h1>
      <SearchBar query={q} setQuery={setQ} onSearch={doSearch} />
      <Filters filters={filters} setFilters={setFilters} />

      <div className="mt-6">
        {loading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {Array.from({length:6}).map((_,i)=>(<SkeletonCard key={i}/>))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {results.map(r => <div key={r.id} onClick={()=>nav(`/doc/${encodeURIComponent(r.id)}`)}><DocCard doc={r} /></div>)}
          </div>
        )}
      </div>
    </div>
  );
}
