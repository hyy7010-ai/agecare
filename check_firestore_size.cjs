const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, getDocs, collection } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "dummy",
  projectId: "ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
  const snapshot = await getDocs(collection(db, "residents"));
  console.log("RESIDENTS COUNT IN DB:", snapshot.size);
  process.exit(0);
})();
