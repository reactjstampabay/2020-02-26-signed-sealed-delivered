import axios from 'axios';

const saveFile = async (file) => {
    const body = {
        filename: file.name,
        bucket: process.env.REACT_APP_FILE_UPLOAD_BUCKET,
        contentType: file.type,
    };

    // get signed url
    const { data } = await axios.post(process.env.REACT_APP_SIGNED_URL, body);

    // upload image using signed url
    await axios.put(
        data.url,
        {
            body: file,
        },
        {
            headers: { 'content-type': file.type }
        });
};

export {
    saveFile,
};
