
// /js/layout.js
async function injectFragment(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return;

  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Falha ao carregar ${url}: ${res.status} ${res.statusText}`);
    const html = await res.text();
    host.innerHTML = html;

    // Executa scripts contidos no fragmento (header/footer)
    host.querySelectorAll('script').forEach(oldScript => {
      const s = document.createElement('script');
      if (oldScript.src) {
        s.src = oldScript.src;
      } else {
        s.textContent = oldScript.textContent;
      }
      document.body.appendChild(s);
      oldScript.remove();
    });
  } catch (err) {
    console.error(err);
    host.innerHTML = '<!-- Erro ao carregar fragmento -->';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectFragment('header[data-include]', '/partials/header.html');
  injectFragment('footer[data-include]', '/partials/footer.html');
});
