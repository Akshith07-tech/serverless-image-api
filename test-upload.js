import fs from "fs";
import { upload, list } from "./handler.js"; // Your handler functions

// 1️⃣ Test upload
const base64 = fs.readFileSync("img.txt", "utf-8");
const uploadEvent = { body: JSON.stringify({ imageBase64: base64 }) };

upload(uploadEvent)
  .then((res) => {
    console.log("Upload Response:", res);

    // 2️⃣ After upload, test list
    list()
      .then((listRes) => {
        console.log("List Response:", listRes);
      })
      .catch(console.error);
  })
  .catch(console.error);


