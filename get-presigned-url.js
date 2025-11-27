import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "us-east-1",
});

const bucketName = "dev-image-api-230674328963-uploads";
const key = "b12bba5d-855b-42c0-8b66-74a9bd566669.jpg"; // the image id from upload

const url = s3.getSignedUrl("getObject", {
  Bucket: bucketName,
  Key: key,
  Expires: 60 * 5, // link valid for 5 minutes
});

console.log("Pre-signed URL:", url);

