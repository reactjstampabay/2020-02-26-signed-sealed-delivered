## What is a Signed URL?

- A signed URL provides limited permission and time to make a request.
- Signed URLs contain authentication information in their query string, allowing users without credentials to perform specific actions on a resource.
- When you generate a signed URL, you specify a user or service account which must have sufficient permission to make the request that the signed URL will make.
- After you generate a signed URL, anyone who possesses it can use the signed URL to perform specified actions, such as reading an object, within a specified period of time.

_source: https://cloud.google.com/storage/docs/access-control/signed-urls_

## What problem are we trying to solve?

A product I was working on allowed users to upload a bunch of photos, and create/view/download PDFs. Photos were typically taken from mobile devices and could become quite large. PDFs could include up to 8 images per page and averaged ~200 pages.

Our API exposed an endpoint to upload photos, however the size and volume started to cause memory and performance issues. An initial band aid was to limit the size of the photos, which immediately resulted in user complaints. This also didn't solve the problem as volume continued to be a concern. Increasing available memory helped, but our cloud costs also increased quite a bit. We also ran into challenges when streaming PDFs and photos to the UI from cloud storage via the server.

We stepped back and performed a Root Cause Analysis, which led us to researching Signed URLs.
