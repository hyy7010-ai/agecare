const admin = require('firebase-admin');
const cert = require('./firebase-applet-config.json');

// Initialize with service account
if (cert.serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(cert.serviceAccount)
    });
} else {
    admin.initializeApp({
      credential: admin.credential.cert(cert)
    });
}

const db = admin.firestore();

async function checkAndSeed() {
  const snap = await db.collection('residents').get();
  console.log('Current residents:', snap.size);
  
  snap.forEach(doc => {
      console.log(doc.id, '=>', doc.data().name, doc.data().room);
  });
}
checkAndSeed().catch(console.error);
