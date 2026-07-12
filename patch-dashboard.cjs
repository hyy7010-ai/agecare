const fs = require('fs');
const file = './src/components/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `const filteredResidents = residents.filter(`,
  `console.log("DASHBOARD RENDER RESIDENTS:", residents.length);
  const filteredResidents = residents.filter(`
);

fs.writeFileSync(file, code);
