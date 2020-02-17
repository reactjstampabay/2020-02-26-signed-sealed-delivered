const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// creates a signed url
const getSignedUrl = async (req, res) => {
  const { bucket, filename, contentType } = req.body;

  // Get a reference to the destination file in GCS
  // filename can also include a directory path
  const file = storage.bucket(bucket).file(filename);

  // Set URL expiration time
  const expiresAtMs = Date.now() + 1000 * 60; // one minute

  // URL config object
  const config = {
    action: 'write',
    expires: expiresAtMs,
    contentType: contentType,
  };

  // promise api returns array, callback api does not
  // just a note when using the node cloud storage
  const [url] = await file.getSignedUrl(config);

  return res.send({ url });
};

/**
 * HTTP triggered function that returns a signed URL
 *
 * @param {Object} req Cloud Function request context
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.getSignedUrl = (req, res) => {
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
      res.set('Access-Control-Allow-Methods', 'POST');
      // allowed headers can be used during the actual request
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
      res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      // how long in seconds the results of a preflight request can be cached
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
      res.set('Access-Control-Max-Age', '3600');
      // returns no content status code
      return res.status(204).send('');
    }

    // only allow POST
    if (req.method !== 'POST') {
      // returns method not allowed status code
      return res.status(405).end();
    }

    return getSignedUrl(req, res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Could not create signed URL', error: error.message });
  }
};
