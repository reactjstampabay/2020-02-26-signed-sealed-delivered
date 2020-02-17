import axios from 'axios';

// returns a signed URL
const getSignedUrl = async body => {
  const { data } = await axios.post(process.env.REACT_APP_GET_SIGNED_URL, body);
  return data.url;
};

// Gets all files in a bucket
const getBucketFiles = async () => {
  const { data } = await axios.get(process.env.REACT_APP_GET_BUCKET_FILES);
  return data;
};

// Deletes a bucket file
const deleteFile = async url => {
  await axios.delete(url);
};

// Requests a write Signed URL, and then saves to cloud storage
const saveFile = async file => {
  const config = {
    filename: file.name,
    bucket: process.env.REACT_APP_FILE_UPLOAD_BUCKET,
    contentType: file.type,
  };

  // get write signed url
  const url = await getSignedUrl(config);

  // upload image using signed url
  await axios.put(url, file, { headers: { 'content-type': file.type } });
};

export { getBucketFiles, saveFile, deleteFile };
