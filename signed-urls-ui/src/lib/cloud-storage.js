import axios from 'axios';

// Gets all files in a bucket
const getBucketFiles = async () => {
  const { data } = await axios.get(process.env.REACT_APP_GET_BUCKET_FILES);
  return data;
};

// Requests a Signed URL, and then saves to cloud storage
const saveFile = async file => {
  const body = {
    filename: file.name,
    bucket: process.env.REACT_APP_FILE_UPLOAD_BUCKET,
    contentType: file.type,
  };

  // get signed url
  const { data } = await axios.post(process.env.REACT_APP_GET_SIGNED_URL, body);

  // upload image using signed url
  await axios.put(
    data.url,
    {
      body: file,
    },
    {
      headers: { 'content-type': file.type },
    },
  );
};

export { getBucketFiles, saveFile };
