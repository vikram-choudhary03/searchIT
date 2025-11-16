export default function SearchBar({ query, setQuery, onSearch }) {
    return (
      <div className="flex gap-3">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..." className="flex-1 p-3 rounded-lg border"/>
        <button onClick={onSearch} className="px-4 py-2 rounded-lg bg-black text-white">Search</button>
      </div>
    );
  }
  