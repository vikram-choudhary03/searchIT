export default function Filters({ filters, setFilters }) {
    function update(name, value) {
      setFilters(prev => ({
        ...prev,
        [name]: value || undefined, // remove empty filters
      }));
    }
  
    return (
      <div className="bg-white p-4 rounded-xl shadow mt-4">
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
  
        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Topic"
            value={filters.topic || ""}
            onChange={(e) => update("topic", e.target.value)}
            className="border p-2 rounded-lg"
          />
  
          <input
            placeholder="Project"
            value={filters.project || ""}
            onChange={(e) => update("project", e.target.value)}
            className="border p-2 rounded-lg"
          />
  
          <input
            placeholder="Team"
            value={filters.team || ""}
            onChange={(e) => update("team", e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
      </div>
    );
  }
  