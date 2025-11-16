import React, { useEffect, useState } from "react";
import { UploadForm } from "../components/UploadForm";
import api from "../lib/api";
import DocCard from "../components/DocCard";
import SkeletonCard from "../components/SkeletonCard";

export const Dashboard = () => {
  const [recent, setRecent] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchRecent() {
    setLoading(true);

    try {
      const res = await api.get("/api/recent");

      setRecent(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecent();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <UploadForm onUploaded={fetchRecent}></UploadForm>

      <section className="mt-6">
        <h2 className="text-lg font-medium mb-3">Recently indexed</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <p className="text-gray-500">No documents yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map((d) => (
              <DocCard key={d.id} doc={d} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
