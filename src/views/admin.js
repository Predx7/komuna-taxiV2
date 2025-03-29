
const SUPABASE_URL = "https://zehjecgkpjnmnbfqlkba.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaGplY2drcGpubW5iZnFsa2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTA0NzAsImV4cCI6MjA1ODgyNjQ3MH0.uWSy84K8j4UMxsjDnx0ZReAymxfOb96fzINH_P3LnSo";

// ... (rest of the admin.js rendering logic)

window.addNameToTeam = async (team) => {
  const input = document.getElementById("input-" + team);
  const name = input.value.trim();
  if (!name) return;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json"
  };
  await fetch(`${SUPABASE_URL}/rest/v1/name_to_team`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, team })
  });
  location.reload();
};
