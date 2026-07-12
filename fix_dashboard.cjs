const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardContainer.tsx', 'utf8');

code = code.replace(
  /          await logAuditAction\(\{[\s\S]*?\}\);\s*allergies/g,
  `            allergies`
);

fs.writeFileSync('src/components/DashboardContainer.tsx', code);
