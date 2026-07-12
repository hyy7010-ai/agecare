const fs = require('fs');
let code = fs.readFileSync('src/components/ResidentProfile.tsx', 'utf8');

code = code.replace(
  /import \{ scrubPII \} from "\.\.\/lib\/piiScrubber";/,
  `import { scrubPII } from "../lib/piiScrubber";\nimport { logAuditAction } from "../lib/audit";\nimport { useAuth } from "../contexts/AuthContext";`
);

// inside ResidentProfile component
code = code.replace(
  /export function ResidentProfile\(\{[\s\S]*?\}\) \{/,
  `export function ResidentProfile({ resident, onBack, onSubmitObservation }: ResidentProfileProps) {\n  const { userProfile } = useAuth();`
);

// handleSaveCareNote
code = code.replace(
  /await addDoc\(collection\(db, "rnReviewQueue"\), \{/g,
  `await logAuditAction({
        action: "SUBMIT_FOR_RN_REVIEW",
        userId: userProfile?.uid || "unknown",
        userEmail: userProfile?.email || "unknown",
        userRole: userProfile?.role || "caregiver",
        details: \`Submitted AI care note for resident \${resident.id} for RN review\`,
        resourceId: resident.id
      });
      await addDoc(collection(db, "rnReviewQueue"), {`
);

fs.writeFileSync('src/components/ResidentProfile.tsx', code);
