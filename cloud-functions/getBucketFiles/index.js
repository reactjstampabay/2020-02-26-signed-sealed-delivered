const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// get a signed url for each file
const getSignedUrl = async (file, urlConfig) => {
  const config = Object.assign({}, urlConfig, {
    expires: Date.now() + 5000 * 60, // five minutes
  });

  console.log(config);

  const [url] = await file.getSignedUrl(config);

  return url;
};

// gets all files in a bucket, creates signed URLs to read/delete/save
const getFiles = async (req, res) => {
  const results = [];
  const [files] = await storage.bucket('sub-image-upload').getFiles();

  // simple iteration to return a subset of file data
  for (f of files) {
    const file = {
      name: f.name,
      createdAt: f.metadata.timeCreated,
      contentType: f.metadata.contentType,
    };

    file.readUrl = await getSignedUrl(f, {
      action: 'read',
    });

    file.saveUrl = await getSignedUrl(f, {
      action: 'read',
      promptSaveAs: f.name,
    });

    file.delUrl = await getSignedUrl(f, {
      action: 'delete',
    });

    results.push(file);
  }

  return res.send(results);
};

/**
 * HTTP triggered function that returns all files in a given bucket
 *
 * @param {Object} req Cloud Function request context
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.getBucketFiles = (req, res) => {
  try {
    // determines if the response can be shared with the given origin
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
    res.set('Access-Control-Allow-Origin', '*');
    // determines if the actual request can be made using credentials
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
    res.set('Access-Control-Allow-Credentials', 'true');

    // set headers for preflight requests
    if (req.method === 'OPTIONS') {
      // allowed methods when accessing the resource
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
      res.set('Access-Control-Allow-Methods', 'GET');
      // allowed headers can be used during the actual request
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
      res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      // how long in seconds the results of a preflight request can be cached
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
      res.set('Access-Control-Max-Age', '3600');
      // returns no content status code
      return res.status(204).send('');
    }

    // only allow GET
    if (req.method !== 'GET') {
      // returns method not allowed status code
      return res.status(405).end();
    }

    return getFiles(req, res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Could not get files in requested bucket', error: error.message });
  }
};
