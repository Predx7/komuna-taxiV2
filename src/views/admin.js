export function renderAdmin(container) {
  container.innerHTML = `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">ניהול אדמין</h1>
      <div class="flex space-x-2 rtl:space-x-reverse mb-6">
        <button class="tab bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" data-tab="receipts">קבלות</button>
        <button class="tab bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" data-tab="names">שיוך שמות</button>
        <button class="tab bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" data-tab="reset">תחילת חודש</button>
      </div>
      <div id="tabContent" class="mt-4 text-lg text-gray-300">
        <p>כאן תוצג התוכן לפי הלשונית הנבחרת.</p>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll('.tab');
  const content = container.querySelector('#tabContent');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-purple-600'));
      tab.classList.add('bg-purple-600');
      const type = tab.dataset.tab;
      loadTab(type);
    });
  });

  function loadTab(type) {
    if (type === 'receipts') {
      content.innerHTML = '<p>לשונית הקבלות הרגילה תישאר כאן (בהמשך נעדכן אותה מחדש).</p>';
    } else if (type === 'names') {
      renderNameAssignment(content);
    } else if (type === 'reset') {
      renderMonthStart(content);
    }
  }

  function renderNameAssignment(el) {
    const teams = ["חולדה", "מזכרת", "חבצלת", "אלמוג", "גבעה"];
    el.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${teams.map(team => `
          <div class="bg-gray-800 p-4 rounded-xl shadow">
            <h2 class="text-xl font-bold mb-2">${team}</h2>
            <input type="text" placeholder="הוסף שם" class="input-name w-full text-black rounded px-2 py-1 mb-2" data-team="${team}">
            <ul class="name-list space-y-1 text-sm"></ul>
          </div>
        `).join('')}
      </div>
    `;

    const inputs = el.querySelectorAll('.input-name');
    inputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const name = input.value.trim();
          if (name) {
            const ul = input.parentElement.querySelector('.name-list');
            const li = document.createElement('li');
            li.textContent = name;
            ul.appendChild(li);
            input.value = '';
          }
        }
      });
    });
  }

  function renderMonthStart(el) {
    const teams = ["חולדה", "מזכרת", "חבצלת", "אלמוג", "גבעה"];
    el.innerHTML = `
      <table class="w-full text-right">
        <thead>
          <tr>
            <th class="border-b pb-2">צוות</th>
            <th class="border-b pb-2">תקציב התחלתי</th>
          </tr>
        </thead>
        <tbody>
          ${teams.map(team => `
            <tr>
              <td class="py-2 font-bold">${team}</td>
              <td><input type="number" class="budget-input text-black rounded px-2 py-1" placeholder="0" data-team="${team}"></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <button class="bg-green-600 hover:bg-green-700 mt-4 px-4 py-2 rounded">שמור</button>
    `;
  }
}