import axios from 'axios';

// Gets all files in a bucket
const getBucketFiles = async () => {
  const { data } = await axios.get(process.env.REACT_APP_GET_BUCKET_FILES);
  return data;
};

// returns a signed URL
const getSignedUrl = async body => {
  const { data } = await axios.post(process.env.REACT_APP_GET_SIGNED_URL, body);
  return data.url;
};

// Requests a write Signed URL, and then saves to cloud storage
const saveFile = async file => {
  const config = {
    filename: file.name,
    bucket: process.env.REACT_APP_FILE_UPLOAD_BUCKET,
    contentType: file.type,
    action: 'write',
  };

  // get write signed url
  const url = await getSignedUrl(config);

  // upload image using signed url
  await axios.put(
    url,
    {
      body: file,
    },
    {
      headers: { 'content-type': file.type },
    },
  );
};

export { getBucketFiles, saveFile };
