# Portfolio — setup and deployment

Four files matter: `index.html`, `styles.css`, `script.js`, `Chaithanya_Virupaksha_CV.pdf`, plus `profile.jpg`.

---

## 1. Fill in your links (5 minutes, do this first)

Open **`script.js`**. The first block is the only place links live:

```js
const LINKS = {
  linkedin:      'https://www.linkedin.com/in/your-handle',
  github:        'https://github.com/your-handle',
  proj1_code:    'https://github.com/your-handle/bookstore-platform',
  ...
};
```

Anything left as `''` is **hidden automatically** — the page never shows a dead link.
So it is safe to publish before every repo is ready, and to fill them in later.

Priority order: `github`, `linkedin`, `proj1_code`. Those three carry most of the weight.

---

## 2. Publish it free on GitHub Pages

You need a free GitHub account. Total time: about ten minutes.

1. Go to **github.com/new**. Name the repository exactly: `chai6699.github.io`
2. Set it to **Public**. Do not tick "Add a README". Click **Create repository**.
3. On the next screen click **uploading an existing file**.
4. Drag in all five files — `index.html`, `styles.css`, `script.js`, `profile.jpg`,
   `Chaithanya_Virupaksha_CV.pdf`. Do **not** upload the folder; upload the files themselves,
   or `index.html` will not sit at the root and the site will 404.
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under "Build and deployment", Source = `Deploy from a branch`,
   Branch = `main`, folder = `/ (root)`. Save.
7. Wait a few minutes, then open `https://chai6699.github.io`.

**Alternative, no account juggling:** go to **app.netlify.com/drop** and drag the folder in.
It publishes instantly on a random URL you can rename. Good for testing; GitHub Pages is
better for a permanent address because the URL itself signals you use version control.

---

## 3. After it's live

The canonical and Open Graph URLs are already set to `chai6699.github.io`, so link previews on
LinkedIn and in email will render correctly.

Put the URL in three places: your LinkedIn headline/contact section, your CV header, and your email signature.

---

## 4. A custom domain (optional, ~£10/year)

`chaithanyav.com` or similar from Namecheap or Cloudflare. In GitHub → Settings → Pages,
enter it under "Custom domain", then add the DNS records GitHub shows you at your registrar.
HTTPS is automatic once it verifies. Not required — a `.github.io` address is completely
normal for engineers — but it reads slightly more deliberate on a CV.

---

## Editing notes

- Fonts load from Google Fonts, so the page needs a connection to render as designed;
  it degrades to system fonts gracefully if not.
- Dark mode follows the visitor's OS setting automatically. There is no toggle by design.
- Everything is static HTML/CSS/JS. No build step, no dependencies, nothing to break.
- To change a project, edit the `<article class="proj">` block in `index.html`. Keep the
  `Hard part` / `What I did` rows — they are the reason the page reads differently from
  every other graduate portfolio.
