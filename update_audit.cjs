const fs = require('fs');
let code = fs.readFileSync('src/components/PlatformFeatures.tsx', 'utf8');

const importAudit = `import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState, useEffect } from "react";
`;
code = code.replace(/import React from "react";/, `import React from "react";\n${importAudit}`);

const newAuditComponent = `export function PlatformAuditLogs({ onBack }: BaseProps) {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    const q = query(collection(db, "auditLogs"), orderBy("timestamp", "desc"), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
        <h1 className="text-2xl font-bold text-slate-800">System Audit Logs (Aged Care Act Retention: 7 Years)</h1>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700">Recent Activity</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {logs.map(log => (
            <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                  {log.userRole?.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{log.action}</p>
                  <p className="text-xs text-slate-500">By {log.userEmail} | {log.details}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">{log.timestamp?.toDate().toLocaleString()}</div>
            </div>
          ))}
          {logs.length === 0 && (
             <div className="p-4 text-center text-sm text-slate-500">No audit logs found.</div>
          )}
        </div>
      </div>
    </div>
  );
}`;

code = code.replace(/export function PlatformAuditLogs[\s\S]*?\}\s*\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/, newAuditComponent);
fs.writeFileSync('src/components/PlatformFeatures.tsx', code);
