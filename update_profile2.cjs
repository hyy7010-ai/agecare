const fs = require('fs');
let code = fs.readFileSync('src/components/ResidentProfile.tsx', 'utf8');

code = code.replace(
  /export function ResidentProfile\(\{([^]+?)\}: ResidentProfileProps\) \{/,
  `export function ResidentProfile({$1}: ResidentProfileProps) {\n  const { userProfile } = useAuth();`
);

fs.writeFileSync('src/components/ResidentProfile.tsx', code);
