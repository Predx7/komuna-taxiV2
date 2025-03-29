
export async function renderTeam(container, teamName) {
  container.innerHTML = '<div class="p-6 text-center text-white">טוען נתונים...</div>';

  const supabaseUrl = "https://zehjecgkpjnmnbfqlkba.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaGplY2drcGpubW5iZnFsa2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTA0NzAsImV4cCI6MjA1ODgyNjQ3MH0.uWSy84K8j4UMxsjDnx0ZReAymxfOb96fzINH_P3LnSo";

  const headers = {
    apikey: supabaseKey,
    Authorization: "Bearer " + supabaseKey
  };

  try {
    // Step 1: Get names for this team
    const nameRes = await fetch(\`\${supabaseUrl}/rest/v1/name_to_team?team=eq.\${teamName}\`, { headers });
    const namesData = await nameRes.json();
    const names = namesData.map(n => n.name);

    // Step 2: Get all receipts from this month
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const receiptRes = await fetch(\`\${supabaseUrl}/rest/v1/receipts?date=gte.\${firstOfMonth}\`, { headers });
    const receipts = await receiptRes.json();

    // Step 3: Filter receipts by names in this team
    const teamReceipts = receipts.filter(r => names.includes(r.name));
    const totalSpent = teamReceipts.reduce((sum, r) => sum + (r.amount || 0), 0);

    // Step 4: Get team budget
    const teamRes = await fetch(\`\${supabaseUrl}/rest/v1/teams?name=eq.\${teamName}\`, { headers });
    const teamData = await teamRes.json();
    const budget = teamData.length > 0 ? teamData[0].budget : 0;

    const remaining = budget - totalSpent;

    // Render
    container.innerHTML = \`
      <div class="p-6 text-white">
        <h1 class="text-2xl mb-4 font-bold">צוות \${teamName}</h1>
        <div class="bg-gray-800 rounded-lg p-4 shadow mb-6">
          <p>💰 תקציב חודשי: <strong>\${budget} ₪</strong></p>
          <p>💸 הוצאות החודש: <strong>\${totalSpent} ₪</strong></p>
          <p>📦 נשאר: <strong>\${remaining} ₪</strong></p>
        </div>
        <h2 class="text-xl mb-2">רשימת קבלות:</h2>
        <ul class="bg-gray-800 rounded-lg p-4">
          \${teamReceipts.map(r => \`<li class="mb-2 border-b border-gray-700 pb-2">\${r.name} – \${r.amount} ₪ – \${new Date(r.date).toLocaleDateString('he-IL')}</li>\`).join("")}
        </ul>
      </div>
    \`;
  } catch (error) {
    container.innerHTML = '<div class="p-6 text-red-500 text-center">שגיאה בטעינת הנתונים.</div>';
    console.error(error);
  }
}
