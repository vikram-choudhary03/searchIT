import React, { useState } from "react";
import api from "../lib/api";

export const UploadForm = ({onUploaded}) => {
  const [file, setFile] = useState(null);

  const [project, setProject] = useState("");
  const [team, setTeam] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Choose file");

    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      if (project) fd.append("project", project);

      if (team) fd.append("team", team);

      await api.post("/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      setProject("");
      setTeam("");

      if (onUploaded) onUploaded();

      alert("Uploaded");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white p-4 rounded-xl shadow-sm "
    >
      <div className="grid gap-3 md:grid-cols-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="md:col-span-2"
        ></input>

        <input
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border rounded p-2"
        />

        <input
          placeholder="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};
