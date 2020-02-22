## Setup

### Create Google Cloud Project

- We will utilize the free tier - 2 million function invocations per month
  - https://console.cloud.google.com/
- Storage requires that you enable billing (5 GB of cloud storage)
- Firebase console - add firebase to existing project
  - Using Firebase for hosting the React App
- Firebase also has a great free tier

### Create React App

This is a demo application that will allow us to upload files to a cloud storage bucket.

Once files are uploaded, the UI will allow us to view, download, and delete files.

The UI was created using `create-react-app`.

```
npx create-react-app cloud-storage-ui
```

#### npx

**npx** is not a typo — it’s a package runner tool that comes with npm 5.2+

npx installs a temporary create-react-app and calls it, without polluting global installs

Links:

https://reactjs.org/docs/create-a-new-react-app.html#create-react-app

### Install Google Cloud SDK

The gcloud CLI manages authentication, local configuration, developer workflow, and interactions with Google Cloud APIs.

#### macOS

```
brew cask install google-cloud-sdk
```

#### Authenticate

```
gcloud auth login
```

#### Set Default Project (optional)

```
gcloud config set project PROJECT_ID
```

Links:

[SDK Overview](https://cloud.google.com/sdk/)

[Other Install Options](https://cloud.google.com/sdk/install)

### Create Cloud Storage Bucket

We will use a cloud storage bucket to store files uploaded from our UI. We will use the _gsutil_ command-line tool to create the bucket with the default options.

```
gsutil mb -p signed-sealed-delivered gs://ssd-image-upload/
```

Links:

[Creating a Bucket](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-gsutil)
