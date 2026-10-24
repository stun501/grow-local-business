const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
// Only this fixed output directory may be replaced; never traverse source symlinks.
if (fs.existsSync(out) && fs.lstatSync(out).isSymbolicLink()) throw new Error('Refusing linked output');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
const dirs = ['about','assets','book','booking','flyer','planner','qr','quote','reply','resources','review','scorecard','valuation'];
const files = ['index.html','BingSiteAuth.xml','llms.txt','robots.txt','sitemap.xml','signature.png'];
const extensions = new Set(['.html','.css','.js','.png','.jpg','.jpeg','.webp','.svg','.ico','.woff','.woff2','.pdf','.txt','.xml']);
function copy(src, dest) {
  const stat = fs.lstatSync(src);
  if (stat.isSymbolicLink()) throw new Error('Refusing source symlink: ' + src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) if (!entry.startsWith('.')) copy(path.join(src,entry),path.join(dest,entry));
  } else if (extensions.has(path.extname(src).toLowerCase())) fs.copyFileSync(src,dest);
}
for (const item of [...dirs,...files]) copy(path.join(root,item),path.join(out,item));
console.log('Built public website in dist; operational files and prototypes excluded.');
