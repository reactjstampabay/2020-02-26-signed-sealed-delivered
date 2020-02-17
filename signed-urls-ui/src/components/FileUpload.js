import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveFile } from '../lib/cloud-storage';

function FileUpload() {
  const onDrop = useCallback(async acceptedFiles => {
    // upload first file only, we might upload all files in a real scenario
    const file = acceptedFiles[0];
    await saveFile(file);

    toastr.success(`Uploaded ${file.name}`); // eslint-disable-line no-undef
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="flex items-center content-center flex-wrap bg-gray-200 h-64 w-3/4 rounded-lg p-6"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="flex-1 text-blue-600">Drop files here!!</p>
      ) : (
        <p className="flex-1 text-blue-600">Add files by clicking or dragging into this area</p>
      )}
    </div>
  );
}

export default FileUpload;
