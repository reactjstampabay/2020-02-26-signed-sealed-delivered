import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { getBucketFiles } from './lib/cloud-storage';

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const files = await getBucketFiles();
      setFiles(files);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <FileUpload />

        {files.map(f => {
          return <span key={f.name}>{f.name}</span>;
        })}
      </header>
    </div>
  );
}

export default App;
