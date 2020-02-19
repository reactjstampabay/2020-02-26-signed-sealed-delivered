import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveFile, getBucketFiles } from '../lib/cloud-storage';

function FileUpload({ loading, setLoading, setFiles }) {
  const onDrop = useCallback(
    async acceptedFiles => {
      setLoading(true);
      // upload first file only, we might upload all files in a real scenario
      const file = acceptedFiles[0];
      await saveFile(file);

      toastr.success(`Uploaded ${file.name}`); // eslint-disable-line no-undef
      const files = await getBucketFiles();
      setFiles(files);
      setLoading(false);
    },
    [setFiles, setLoading],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="flex items-center content-center flex-wrap bg-gray-200 h-64 w-3/4 rounded-lg p-6"
      {...getRootProps()}
    >
      {loading ? (
        <div className="flex-1">
          <div className="lds-hourglass"></div>
        </div>
      ) : (
        <React.Fragment>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="flex-1 text-blue-600">Drop files here!!</p>
          ) : (
            <p className="flex-1 text-blue-600">Add files by clicking or dragging into this area</p>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default FileUpload;
