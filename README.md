# Arquivo da Música 🎶

A static multi-page website for a music events portal — concerts, festivals, news, and event-planning services. Built as a university front-end coursework project using plain HTML, CSS, and JavaScript, with no frameworks and no build step.

## Features

- Home page with a hero carousel and upcoming-events cards
- Dedicated pages per event category (jazz, fado, opera, symphonic, electronic, Christmas concerts)
- News section with individual articles
- "Featured" section (festivals, artist residencies)
- Event-planning pages (corporate events, concert organization, music production services)
- Ticketing (`bilheteria`) and ensembles (`agrupamentos`) pages
- Shared header/footer injected dynamically on every page via JavaScript, so navigation only needs to be edited in one place

## Tech stack

Plain HTML5, CSS3, and vanilla JavaScript (`fetch` API for partial includes). No dependencies, no build tools.

## Running locally

Because the header and footer are loaded dynamically via `fetch()`, opening the HTML files directly (`file://`) will leave the navigation empty — browsers block `fetch()` on the `file://` protocol for security reasons. Serve the folder over HTTP instead:

```bash
# Option 1: VS Code Live Server — right-click index.html → "Go Live"

# Option 2: Python
python -m http.server 5500
# then open http://localhost:5500

# Option 3: Node
npx serve .
```

## How the shared header/footer works

`js/layout.js` fetches `partials/header.html` and `partials/footer.html` and injects them into any page that has a matching placeholder:

```js
async function injectFragment(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return;
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Erro ao carregar ${url}`);
  const html = await res.text();
  host.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  injectFragment('header[data-include]', '/partials/header.html');
  injectFragment('footer[data-include]', '/partials/footer.html');
});
```

Each page just needs `<header data-include></header>` and `<footer data-include></footer>` — the actual markup lives once in `partials/`.

## Project structure

```
arquivo-da-musica/
├── index.html                 # Home page
├── agenda.html                # Events calendar
├── agrupamentos.html          # Music ensembles
├── bilheteria.html            # Ticketing
├── contact_us.html
├── sobre_nos.html             # About us
├── styles.css                 # Global styles
├── js/
│   └── layout.js              # Dynamic header/footer injection
├── partials/
│   ├── header.html
│   └── footer.html
├── eventos/                   # One page per event category
│   ├── jazz.html
│   ├── fado.html
│   ├── opera.html
│   ├── sinfonico.html
│   ├── eletronica.html
│   └── natal.html
├── noticias/                  # News articles
│   ├── mariahCarey.html
│   ├── CarlosDoCarmo.html
│   └── plutonio.html
├── emDestaque/                # Featured content
│   ├── festival.html
│   ├── residencia.html
│   └── emDestaque.css
├── planearEventos/            # Event-planning services
│   ├── organizeConcerto.html
│   ├── eventosCorporativos.html
│   ├── producaoMusical.html
│   └── planearEventos.css
└── img/                       # Site imagery
```

## Notes on paths

Partial includes use absolute paths (`/partials/header.html`), which assumes the site is served from the root of its domain/local server. If you deploy it into a subdirectory, adjust the paths in `layout.js` or add a `<base>` tag to each page's `<head>`.

## Authors

Built for a university front-end coursework assignment by:
- Nicolas de Matos Mariano
- Diego Teran

## License

MIT — see [LICENSE](LICENSE).
