import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function fix() {
  const snap = await getDocs(collection(db, "residents"));
  console.log("Current residents:", snap.size);
  if (snap.size < 6) {
      console.log("Deleting incomplete mock data...");
      for (const d of snap.docs) {
          await deleteDoc(doc(db, "residents", d.id));
      }
      console.log("Deleted. Now the app will re-seed on next load.");
  } else {
      console.log("Database has enough residents.");
  }
  process.exit(0);
}
fix().catch(console.error);
