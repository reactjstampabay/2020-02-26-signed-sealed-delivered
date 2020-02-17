import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Table from './components/Table';
import { getBucketFiles, deleteFile } from './lib/cloud-storage';

// Handles delete button click
const deleteBucketFile = async e => {
  const delUrl = e.currentTarget.dataset.delUrl;
  const filename = e.currentTarget.dataset.fileName;
  await deleteFile(delUrl);
  toastr.success(`Deleted ${filename}!`); // eslint-disable-line no-undef
};

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

        <Table headers={['File Name', 'Created At', 'Content Type']} data={files} deleteBucketFile={deleteBucketFile} />
      </header>
    </div>
  );
}

export default App;
