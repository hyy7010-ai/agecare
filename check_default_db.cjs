const { initializeApp } = require('firebase/app');
const { getFirestore, getDocs, collection } = require('firebase/firestore');
const firebaseConfig = { projectId: "my-kitchen-rule" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // uses (default)
(async () => {
  const snapshot = await getDocs(collection(db, "residents"));
  console.log("DEFAULT DB RESIDENTS:", snapshot.size);
  process.exit(0);
})();
