
export async function renderAdmin(container) {
  container.innerHTML = '<div class="p-6 text-center text-white">טוען קבלות...</div>';

  const supabaseUrl = "https://zehjecgkpjnmnbfqlkba.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaGplY2drcGpubW5iZnFsa2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTA0NzAsImV4cCI6MjA1ODgyNjQ3MH0.uWSy84K8j4UMxsjDnx0ZReAymxfOb96fzINH_P3LnSo";

  const headers = {
    apikey: supabaseKey,
    Authorization: "Bearer " + supabaseKey,
    "Content-Type": "application/json"
  };

  const teams = ["hulda", "mazkeret", "habatselet", "almog", "giva"];

  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // שליפת קבלות מהחודש הנוכחי
    const receiptsRes = await fetch(\`\${supabaseUrl}/rest/v1/receipts?date=gte.\${firstOfMonth}\`, { headers });
    const receipts = await receiptsRes.json();

    // שליפת שיוכים קיימים
    const namesRes = await fetch(\`\${supabaseUrl}/rest/v1/name_to_team\`, { headers });
    const nameToTeam = await namesRes.json();

    // בניית HTML
    let html = \`
      <div class="p-6 text-white">
        <h1 class="text-2xl mb-4 font-bold">אזור ניהול</h1>
        <table class="w-full bg-gray-800 rounded-lg text-right">
          <thead>
            <tr class="border-b border-gray-600">
              <th class="p-3">שם</th>
              <th class="p-3">סכום</th>
              <th class="p-3">תאריך</th>
              <th class="p-3">צוות</th>
              <th class="p-3">שיוך</th>
            </tr>
          </thead>
          <tbody>
    \`;

    receipts.forEach((receipt) => {
      const existing = nameToTeam.find(n => n.name === receipt.name);
      const currentTeam = existing ? existing.team : null;

      html += \`
        <tr class="border-b border-gray-700">
          <td class="p-3">\${receipt.name}</td>
          <td class="p-3">\${receipt.amount} ₪</td>
          <td class="p-3">\${new Date(receipt.date).toLocaleDateString('he-IL')}</td>
          <td class="p-3">\${currentTeam || '-'}</td>
          <td class="p-3">
      \`;

      if (!currentTeam) {
        html += \`
          <select id="select-\${receipt.name}" class="bg-gray-900 border border-gray-600 rounded p-1 text-white">
            \${teams.map(team => \`<option value="\${team}">\${team}</option>\`).join("")}
          </select>
          <button onclick="assignTeam('\${receipt.name}')" class="ml-2 bg-blue-600 px-3 py-1 rounded">שייך</button>
        \`;
      }

      html += '</td></tr>';
    });

    html += '</tbody></table></div>';

    container.innerHTML = html;

    // פונקציית שיוך
    window.assignTeam = async (name) => {
      const select = document.getElementById("select-" + name);
      const team = select.value;

      const res = await fetch(\`\${supabaseUrl}/rest/v1/name_to_team\`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, team })
      });

      if (res.ok) {
        alert("השם שויך בהצלחה 🎉");
        location.reload();
      } else {
        alert("שגיאה בשיוך השם");
      }
    };

  } catch (err) {
    console.error(err);
    container.innerHTML = '<div class="p-6 text-red-500 text-center">שגיאה בטעינת הקבלות.</div>';
  }
}
