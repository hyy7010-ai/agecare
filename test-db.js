const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("firebase-applet-config.json"));
const app = initializeApp(config);
const dbId = config.firestoreDatabaseId || "(default)";
const db = getFirestore(app, dbId);

async function test() {
  try {
    console.log("Fetching residents...");
    const snap = await getDocs(collection(db, "residents"));
    console.log("Success! Count:", snap.size);
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
