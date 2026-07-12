const fs = require('fs');
let code = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf8');

// add logAuditAction import
code = code.replace(
  /import \{ auth, db \} from "\.\.\/lib\/firebase";/,
  `import { auth, db } from "../lib/firebase";\nimport { logAuditAction } from "../lib/audit";`
);

// find login logic and add audit log
code = code.replace(
  /setUserProfile\(profile\);/,
  `setUserProfile(profile);
          logAuditAction({
            action: "USER_LOGIN",
            userId: user.uid,
            userEmail: user.email || "unknown",
            userRole: profile.role,
            details: "User logged into the system"
          });`
);
fs.writeFileSync('src/contexts/AuthContext.tsx', code);
