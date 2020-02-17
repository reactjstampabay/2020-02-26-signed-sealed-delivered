## Architectural Overview

1. A client (on a browser in our example) initiates a file upload.
2. React Application requests a Signed URL that allows _PUT_ requests to be executed against a specific cloud storage bucket.
3. Cloud function receives the request and returns a Signed URL that is valid for _1 Minute_.
4. React Application initiates a _PUT_ request to the Signed URL returned from the cloud function.

![alt text](https://www.lucidchart.com/publicSegments/view/fd9ed9a7-5906-4d37-8758-3c07d497c1d4/image.png "Architecture Flow")

