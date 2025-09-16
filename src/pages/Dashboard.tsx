import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      console.log("Upload success:", res.data);
      alert("File uploaded: " + res.data.filename);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Dashboard;
