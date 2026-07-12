const fs = require('fs');
let code = fs.readFileSync('check-fs.mjs', 'utf8');
code = code.replace(
  `const db = getFirestore(app);`,
  `const db = getFirestore(app, "ai-studio-remixagedcaresma-66a35d64-bc1d-4167-af76-060348b23b03");`
);
fs.writeFileSync('check-fs.mjs', code);
