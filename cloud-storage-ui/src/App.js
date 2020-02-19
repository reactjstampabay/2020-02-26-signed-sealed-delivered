import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Table from './components/Table';
import { getBucketFiles, deleteFile } from './lib/cloud-storage';

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

  // Handles delete button click
  // if table was massive and changed often, might consider using useMemo or useCallback here
  const deleteBucketFile = async e => {
    const deleteUrl = e.currentTarget.dataset.deleteUrl;
    const filename = e.currentTarget.dataset.fileName;
    await deleteFile(deleteUrl);
    toastr.success(`Deleted ${filename}!`); // eslint-disable-line no-undef

    const files = await getBucketFiles();
    setFiles(files);
  };

  return (
    <div className="App">
      <header className="App-header">
        <FileUpload loading={loading} setLoading={setLoading} setFiles={setFiles} />

        <Table headers={['File Name', 'Created At', 'Content Type']} data={files} deleteBucketFile={deleteBucketFile} />
      </header>
    </div>
  );
}

export default App;
