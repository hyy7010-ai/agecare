const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("firebase-applet-config.json"));
const app = initializeApp(config);
const dbId = config.firestoreDatabaseId || "(default)";
const db = getFirestore(app, dbId);

async function test() {
  try {
    const residents = await getDocs(collection(db, "residents"));
    console.log("residents:", residents.size);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit(0);
}

test();
