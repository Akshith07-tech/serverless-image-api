import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({ region: process.env.AWS_REGION || "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

export const upload = async (event) => {
  const body = JSON.parse(event.body);
  const { imageBase64 } = body;

  const id = uuidv4();
  const buffer = Buffer.from(imageBase64, "base64");

  await s3.putObject({
    Bucket: process.env.BUCKET_NAME,
    Key: `${id}.jpg`,
    Body: buffer,
    ContentType: "image/jpeg",
  }).promise();

  await dynamo.put({
    TableName: process.env.TABLE_NAME,
    Item: { id, createdAt: new Date().toISOString() },
  }).promise();

  const imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${id}.jpg`;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Uploaded", id, imageUrl }),
  };
};

export const listWithUrls = async () => {
  const data = await dynamo.scan({ TableName: process.env.TABLE_NAME }).promise();

  // Generate pre-signed URLs
  const itemsWithUrls = data.Items.map((item) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: process.env.BUCKET_NAME,
      Key: `${item.id}.jpg`,
      Expires: 60 * 5, // URL valid for 5 minutes
    });
    return { ...item, url };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(itemsWithUrls),
  };
};

