## Set CORS configuration on a bucket

In order to access a bucket from the browser, we will need to set the correct CORS configuration.

We will demo this using the _gsutil_ command-line tool.

```
gsutil cors set bucket-cors.json gs://ssd-image-upload
```

```json
[
  {
    "origin": ["http://localhost:3002"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "HEAD", "DELETE", "PUT"],
    "maxAgeSeconds": 3600
  }
]
```

Links:

https://cloud.google.com/storage/docs/configuring-cors
