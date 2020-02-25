## Cloud Functions

This project consists of two [cloud functions](https://cloud.google.com/functions/docs/first-nodejs#creating_a_function) written with node. We could have also written these with [Go or Python](https://cloud.google.com/functions/docs/concepts/exec).

`getSignedUrl` - generate and return a signed url that allows a client to upload (PUT) a file to a specific cloud storage bucket

`getBucketFiles` - returns a list of file metadata and signed URLs (stream, download, and delete) for each uploaded file

## Why use cloud functions?

We could have just as easily created 2 routes in a standard REST API to generate signed URLs and return a list of the bucket files. I think functions are a good use case for creating signed URLs - they can scale up and down as needed and it is very easy to provide the bare minimum access in order to do their job or write them in different languages than your typical tech stack. Cloud functions were also a quick way to demo this functionality.

## Functions Framework

Google's [Functions Framework](https://cloud.google.com/functions/docs/functions-framework) allows you to quickly spin up a local development environment.

When running locally, we need to specify a service account that has permissions to access our GCP resources. Once created, we will select the _Create key_ option for this Service Account and save this key as JSON.

These functions only need access to Cloud Storage, so we will assign the role of _Storage Admin_.

We can then set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path to the JSON key. Make sure to exclude the key from git.

Example npm _start_ script:

```javascript
"start": "GOOGLE_APPLICATION_CREDENTIALS='../.service-account.json' npx functions-framework --port=5864 --target=getSignedUrl --signature-type=http"
```

## Review Functions code

https://gitlab.com/jhampton/signed-sealed-delivered/-/blob/master/cloud-functions/getSignedUrl/index.js

https://gitlab.com/jhampton/signed-sealed-delivered/-/blob/master/cloud-functions/getBucketFiles/index.js

## Manual Function Deploy

```
./cloud-functions/getSignedUrl

gcloud functions deploy getSignedUrl --runtime nodejs8 --trigger-http --project signed-urls-beta
```
