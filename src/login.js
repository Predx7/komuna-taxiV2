
const users = [
  { username: "hulda", password: "1234" },
  { username: "mazkeret", password: "1234" },
  { username: "havazelet", password: "1234" },
  { username: "almog", password: "1234" },
  { username: "givaa", password: "1234" },
  { username: "admin", password: "admin123" }
];

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const found = users.find(user => user.username === u && user.password === p);
  const msg = document.getElementById("msg");

  if (found) {
    msg.innerHTML = "התחברת בהצלחה! מעביר...";
    setTimeout(() => {
      if (u === "admin") window.location.href = "index.html";
      else window.location.href = "team.html?team=" + u;
    }, 1000);
  } else {
    msg.innerHTML = "שם משתמש או סיסמה שגויים";
  }
}
