const fs = require('fs');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = dir + '/' + file;
    if (fs.statSync(p).isDirectory()) { walk(p); }
    else { console.log(p); }
  }
}
walk('.');
