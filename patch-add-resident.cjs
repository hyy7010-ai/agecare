const fs = require('fs');
const file = './src/lib/residents.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);`,
  `console.error("ADD RESIDENT ERROR:", error);`
);

fs.writeFileSync(file, code);
