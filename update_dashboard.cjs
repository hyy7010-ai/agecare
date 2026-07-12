const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardContainer.tsx', 'utf8');

// Add audit import
code = code.replace(
  /import \{ getOfflineQueue, removeQueueItem \} from "\.\.\/lib\/offlineQueue";/,
  `import { getOfflineQueue, removeQueueItem } from "../lib/offlineQueue";\nimport { logAuditAction } from "../lib/audit";`
);

// Add audit logging inside removePendingReview
code = code.replace(
  /        if \(review\.aiResult\.observationType === "care_note"\) \{/,
  `        if (review.aiResult.observationType === "care_note") {
          await logAuditAction({
            action: "RN_APPROVED_CARE_NOTE",
            userId: userProfile?.uid || "unknown",
            userEmail: userProfile?.email || "unknown",
            userRole: userProfile?.role || "rn",
            details: \`RN approved AI-generated care note for resident \${review.residentId}\`,
            resourceId: review.residentId
          });`
);

code = code.replace(
  /        \} else \{/g,
  `        } else {
          await logAuditAction({
            action: "RN_APPROVED_OBSERVATION",
            userId: userProfile?.uid || "unknown",
            userEmail: userProfile?.email || "unknown",
            userRole: userProfile?.role || "rn",
            details: \`RN approved AI-generated physical observation for resident \${review.residentId}\`,
            resourceId: review.residentId
          });`
);

fs.writeFileSync('src/components/DashboardContainer.tsx', code);
