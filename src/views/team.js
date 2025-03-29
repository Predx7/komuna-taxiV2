export function renderTeam(container, teamName) {
  if (!teamName) {
    container.innerHTML = '<div class="text-red-400 p-4">שגיאה: יש לגשת לעמוד עם שם צוות. לדוגמה: #/team/hulda</div>';
    return;
  }

  container.innerHTML = `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">צוות ${teamName}</h1>
      <div class="space-y-2">
        <p><strong>תקציב התחלתי:</strong> ₪0</p>
        <p><strong>סה"כ יציאות:</strong> ₪0</p>
        <p><strong>יתרה נוכחית:</strong> ₪0</p>
      </div>
      <div class="mt-4 text-sm text-gray-400">
        <p>שמות חברי הצוות:</p>
        <ul class="list-disc ml-6 mt-2">
          <li>שם 1</li>
          <li>שם 2</li>
        </ul>
      </div>
    </div>
  `;
}