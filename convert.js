import fs from "fs";
import fetch from "node-fetch";

// Read your image
const imagePath = "test.jpg"; // change if your file name is different
const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

// Your Lambda endpoint
const endpoint = "https://7wo65s7bg6.execute-api.us-east-1.amazonaws.com/upload";

const body = JSON.stringify({ imageBase64: base64Image });

fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
})
  .then((res) => res.json())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("Error:", err));


