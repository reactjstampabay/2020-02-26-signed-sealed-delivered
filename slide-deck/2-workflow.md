## Architectural Overview

1. A client (on a browser in our example) initiates a file upload.
2. React Application requests a Signed URL that allows _PUT_ requests to be executed against a specific cloud storage bucket.
3. Cloud function receives the request and returns a Signed URL that is valid for _1 Minute_.
4. React Application initiates a _PUT_ request to the Signed URL returned from the cloud function.

<div style="width: 640px; height: 480px; margin: 10px; position: relative;">
<iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/5619faad-485c-4290-9e08-d1feeaafde8d" id="lANydzavPVMF">
</iframe>
</div>
