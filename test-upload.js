import fs from "fs/promises";
import { upload, listWithUrls } from "./handler.js"; // correct export

// 1️⃣ Test upload
(async () => {
  try {
    const base64 = await fs.readFile("img.txt", "utf-8");
    const uploadEvent = { body: JSON.stringify({ imageBase64: base64 }) };

    const uploadRes = await upload(uploadEvent);
    console.log("Upload Response:", uploadRes);

    // 2️⃣ Test list
    const listRes = await listWithUrls();
    console.log("List Response:", listRes);

  } catch (err) {
    console.error("Error:", err);
  }
})();

