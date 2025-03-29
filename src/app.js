
document.getElementById("app").innerHTML = `
  <input id="nameInput" type='text' placeholder='הכנס שם משתמש' />
  <input id="teamInput" type='text' placeholder='הכנס צוות' />
  <button onclick="save()">שמור</button>
  <div id="result"></div>
`;

function save() {
  const name = document.getElementById('nameInput').value;
  const team = document.getElementById('teamInput').value;

  document.getElementById('result').innerHTML = 
    `<p>שמרת את <strong>${name}</strong> בצוות <strong>${team}</strong>.</p>`;
}
