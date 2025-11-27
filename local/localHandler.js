import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const LOCAL_BUCKET = path.join(process.cwd(), "localBucket");
if (!fs.existsSync(LOCAL_BUCKET)) fs.mkdirSync(LOCAL_BUCKET);

export const upload = async (event) => {
  const body = JSON.parse(event.body);
  const { imageBase64 } = body;

  const id = uuidv4();
  const buffer = Buffer.from(imageBase64, "base64");

  fs.writeFileSync(path.join(LOCAL_BUCKET, `${id}.jpg`), buffer);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Uploaded",
      id,
      imageUrl: `localBucket/${id}.jpg`,
    }),
  };
};

export const listWithUrls = async () => {
  const files = fs.readdirSync(LOCAL_BUCKET);
  const items = files.map((file) => ({
    id: path.basename(file, ".jpg"),
    url: `localBucket/${file}`,
    createdAt: new Date().toISOString(),
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

