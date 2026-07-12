import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "dummy",
  projectId: "my-kitchen-rule",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03");

async function check() {
  const querySnapshot = await getDocs(collection(db, "residents"));
  console.log("Found", querySnapshot.size, "residents");
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data().name, doc.data().room);
  });
  
  if (querySnapshot.size < 6) {
      console.log("Deleting existing and returning size to trigger re-seed...");
      for (const d of querySnapshot.docs) {
          await deleteDoc(doc(db, "residents", d.id));
      }
      console.log("Deleted. Refresh the app to re-seed.");
  }
}
check().catch(console.error);
