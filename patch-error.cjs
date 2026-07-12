const fs = require('fs');
const file = './src/lib/residents.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {`,
  `function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const isPermissionDenied = error instanceof Error && error.message.includes("Missing or insufficient permissions");
  if (isPermissionDenied && !auth.currentUser) {
    console.log("Ignored expected permission error during logout.");
    return;
  }`
);

fs.writeFileSync(file, code);
