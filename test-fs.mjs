import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import fs from "fs";
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function check() {
  const querySnapshot = await getDocs(collection(db, "residents"));
  console.log("Found", querySnapshot.size, "residents");
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data().name, doc.data().room);
  });
  process.exit(0);
}
check().catch(console.error);
