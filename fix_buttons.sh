sed -i 's/disabled={!status}/disabled={!status} style={{ opacity: !status ? 0.5 : 1, cursor: !status ? "not-allowed" : "pointer" }}/g' src/components/CareTaskModal.tsx
sed -i 's/capture="environment" //g' src/components/CareTaskModal.tsx
