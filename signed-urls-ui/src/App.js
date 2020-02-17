import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Table from './components/Table';
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
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <FileUpload loading={loading} setLoading={setLoading} />

        <Table headers={['File Name', 'Created At', 'Content Type']} data={files} />
      </header>
    </div>
  );
}

export default App;
