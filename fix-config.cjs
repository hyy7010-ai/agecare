const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

// The metadata says: The user's firestore db is ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03
config.projectId = "ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03";
delete config.firestoreDatabaseId;

fs.writeFileSync('./firebase-applet-config.json', JSON.stringify(config, null, 2));
