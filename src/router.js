import { renderLogin } from './views/login.js';
import { renderAdmin } from './views/admin.js';
import { renderTeam } from './views/team.js';

export function router() {
  const hash = location.hash || '#/';
  const app = document.getElementById('app');

  if (hash.startsWith('#/admin')) {
    renderAdmin(app);
  } else if (hash.startsWith('#/team')) {
    renderTeam(app, hash.split('/')[2]);
  } else {
    renderLogin(app);
  }
}