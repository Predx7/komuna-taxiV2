export function renderLogin(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-3xl font-bold mb-6">התחברות</h1>
      <input id="username" placeholder="שם משתמש" class="mb-4 p-2 text-black rounded" />
      <input id="password" placeholder="סיסמה" type="password" class="mb-4 p-2 text-black rounded" />
      <button id="loginBtn" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">התחבר</button>
    </div>
  `;

  document.getElementById('loginBtn').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin') {
      location.hash = '#/admin';
    } else {
      location.hash = '#/team/' + user;
    }
  });
}