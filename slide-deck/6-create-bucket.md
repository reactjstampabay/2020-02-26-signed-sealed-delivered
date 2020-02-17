## Cloud Storage Bucket

We will use a cloud storage bucket to store files uploaded from our UI. We will use the _gsutil_ command-line tool to create the bucket with the default options.

```
gsutil mb -p signed-sealed-delivered gs://ssd-image-upload/
```

Links:

[Creating a Bucket](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-gsutil)
