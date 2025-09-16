import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
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
      alert("File uploaded: " + res.data.file);
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
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
