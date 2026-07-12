const admin = require('firebase-admin');
const cert = require('./firebase-applet-config.json');

admin.initializeApp({
  credential: admin.credential.cert(cert.serviceAccount)
});

const db = admin.firestore();
db.collection('residents').get().then(snapshot => {
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().name, doc.data().room);
  });
}).catch(console.error);
