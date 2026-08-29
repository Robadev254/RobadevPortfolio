// One-off generator: assembles the six inner pages from index.html's shared
// shell so the hand-duplicated nav/footer stay byte-identical. Output is plain
// static HTML; this file is not part of the site and is deleted after running.
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const sprite = index.slice(index.indexOf('<svg width="0"'), index.indexOf('</svg>\n\n<a class="skip"') + 7);
const header = index.slice(index.indexOf('<a class="skip"'), index.indexOf('</header>') + 9);
const footer = index.slice(index.indexOf('<footer class="register">'), index.indexOf('</footer>') + 9);

const pages = JSON.parse(fs.readFileSync(path.join(root, '.impeccable', 'pages.json'), 'utf8'));

for (const page of pages) {
  const body = fs.readFileSync(path.join(root, '.impeccable', 'partials', page.file), 'utf8');

  let head = header
    .replace(' aria-current="page"', '')
    .replace(`<a class="room" href="./${page.file}">`, `<a class="room" href="./${page.file}" aria-current="page">`);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="icon" href="./favicon.ico" sizes="any">
  <link rel="preload" href="./fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
${sprite}

${head}

<main id="record">
${body.trim()}
</main>
${footer}
<script src="./script.js" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, page.file), html);
  console.log('wrote', page.file);
}
