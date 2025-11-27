import { upload, listWithUrls } from "./localHandler.js"; // <-- local mock

import fs from "fs";

const base64 = fs.readFileSync("img.txt", "utf-8");
const uploadEvent = { body: JSON.stringify({ imageBase64: base64 }) };

(async () => {
  const uploadRes = await upload(uploadEvent);
  console.log("Upload Response:", uploadRes);

  const listRes = await listWithUrls();
  console.log("List Response:", listRes);
})();

