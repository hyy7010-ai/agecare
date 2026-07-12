const fs = require('fs');
const file = './src/contexts/AuthContext.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `console.warn("Real user creation failed, trying anonymous:", signUpErr);`,
  `console.warn("Real user creation failed, trying anonymous:", signUpErr.code, signUpErr.message);`
);
code = code.replace(
  `console.warn("Anonymous fallback failed (this is expected if not enabled).");`,
  `console.warn("Anonymous fallback failed:", anonErr.code, anonErr.message);`
);

fs.writeFileSync(file, code);
