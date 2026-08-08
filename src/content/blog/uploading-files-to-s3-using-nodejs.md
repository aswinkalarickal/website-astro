---
title: "Uploading local files to S3 using Node.js"
description: "Learn to upload files to S3 using Node.js"
pubDate: 2015-07-03T14:00
---

This is the simplest way of uploading files in your system to AWS S3 bucket using Node.js.
For that, first of all you need a Node.js application. I'm working on OSX so I will be using UNIX commands.

So let's start building!

First, make a new directory in your workspace:

```bash
mkdir upload-code
```

Now get into the directory you just created and make a file **package.json**:

```bash
cd upload-code
touch package.json
```

Now configure your package.json file:

```json
{
  "name": "upload-code",
  "version": "0.1.1",
  "description": "Upload local files to S3.",
  "main": "app.js",
  "author": "Aswin Kalarickal",
  "dependencies": {
    "s3fs": "^2.0.1"
  }
}
```

Now execute this command in your terminal:

```bash
npm install
```

This will install the dependency [s3fs](https://www.npmjs.com/package/s3fs) to our _upload-code_ application.

Create a file **app.js**, which is going to be your main file:

```bash
touch app.js
```

Open the file and add the script:

```js
var fs = require("fs");
var s3fs = require("s3fs");
```

These are the packages we require. [fs](https://nodejs.org/api/fs.html) is the File System API of Node.js.

As we are going to communicate with an AWS service, we need to sign the requests that we make to AWS.
For that purpose we need to create access keys which signs the requests. For creating access key, follow these steps:

1. Open the [IAM console](https://console.aws.amazon.com/iam/home?#home)
2. From the navigation menu, click **Users**
3. Click **Create New Users**
4. You can add multiple users from here, but for now we need only one user.
   So type in a username, for example, upload-code-s3, and click **Create**. You can choose any name of your choice
5. Click **Download Credentials**, and store the keys in a secure location

For using the S3, you need to give the user permission. You need to attach policy for giving permission to your user.
In order to do that, do this:

1. Select the user you created
2. Navigate to **Permissions** tab
3. Click on **Attach Policy**
4. Select **AmazonS3FullAccess** from the given policies
5. Now click **Attach Policy**

> If you don't have Access Key, you can't make requests to AWS. Different AWS service has different permission policy.
> You can't communicate with a service without its policy attached to your Access Key.

Back to coding. In you _app.js_ file, add the following script:

```js
var s3fsImpl = new s3fs(BUCKET_NAME, {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
```

This will enable the request to communicate with S3 using the credential you created.

```js
var dir = "/path/to/local/folder";
var files = getFiles(dir);
console.log("fetched " + files.length + " files\n");
function getFiles(dir, _files) {
  _files = _files || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, _files);
    } else {
      _files.push(name);
    }
  }
  return _files;
}
```

This will fetch all the file paths of the files in the folder into an array _files_.
Now to upload these files to S3, add the script:

```js
saveFile(files, 0);
function saveFile(files, index) {
  if (files.length > 0) {
    var file = files[0];
    var stream = fs.createReadStream(file);
    var _file_name = file.replace(dir, "");
    s3fsImpl.writeFile(_file_name, stream).then(
      function () {
        console.log("uploaded " + file + " --> " + _file_name);
        files.splice(0, 1);
        saveFile(files, ++index);
      },
      function (reason) {
        console.error("unable to upload " + file);
        throw reason;
      },
    );
  } else {
    console.log("\ntotal: " + index + " files copied");
  }
}
```

This will read each file in the array as streams, and write the streams into files in your S3 bucket.
Each file upload will be logged in the console, thereby you can keep a track of the files.
To run this application, run the command:

```bash
node app.js
```

Happy uploading! 😊
