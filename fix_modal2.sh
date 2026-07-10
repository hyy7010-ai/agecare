sed -i 's/if (e.target.files <button.*/if (e.target.files \&\& e.target.files[0]) {/g' src/components/CareTaskModal.tsx
sed -i 's/             <\/button>\n             <button className="flex-1 py-3 px-4 bg-indigo-600/             <\/label>\n             <button className="flex-1 py-3 px-4 bg-indigo-600/g' src/components/CareTaskModal.tsx
