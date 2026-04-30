const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.css')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  if (content.includes('neon-green')) {
    content = content.replace(/neon-green/g, 'primary-cyan');
    changed = true;
  }
  if (content.includes('blink-green')) {
    content = content.replace(/blink-green/g, 'blink-cyan');
    changed = true;
  }
  if (content.includes('#00ff88')) {
    content = content.replace(/#00ff88/gi, '#00F0FF');
    changed = true;
  }
  if (content.includes('#00cc6a')) {
    content = content.replace(/#00cc6a/gi, '#00C2FF');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(f, content);
  }
});
console.log('Color classes globally renamed to force Tailwind rebuild.');
