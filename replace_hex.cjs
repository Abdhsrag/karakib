const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace old hex codes with new ones
  // D4AF37 (gold) -> C47A2C (primary)
  // 211b12 (dark text) -> 6B4F3A (dark text)
  // fff8f3 (light bg) -> EADBC8 (surface/bg)
  // eadbc8 is already EADBC8
  
  content = content.replace(/#D4AF37/gi, '#C47A2C');
  content = content.replace(/#211b12/gi, '#6B4F3A');
  content = content.replace(/#fff8f3/gi, '#EADBC8');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Replaced hex codes in ${file}`);
  }
}
