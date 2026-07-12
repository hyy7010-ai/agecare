const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

config.projectId = "my-kitchen-rule";
config.firestoreDatabaseId = "ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03";

fs.writeFileSync('./firebase-applet-config.json', JSON.stringify(config, null, 2));
