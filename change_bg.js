const fs = require('fs');
const path = require('path');

const targetColor = '#0a1128';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    
    // 1. Remove background-image completely and force our navy blue
    content = content.replace(/background-image:\s*url\([^)]+\)[^;]*;/gi, `background-color: ${targetColor} !important; background-image: none !important;`);
    
    // 2. Remove shorthand background urls and replace with navy blue
    content = content.replace(/background:\s*url\([^)]+\)[^;]*;/gi, `background: ${targetColor} !important;`);
    
    // 3. Update dashboard CSS variables
    content = content.replace(/--bg-color:\s*#[0-9a-fA-F]+/g, `--bg-color: ${targetColor}`);
    
    // 4. Replace black backgrounds in the deepblack theme CSS
    content = content.replace(/background-color:\s*#000(?:000)?\s*;/gi, `background-color: ${targetColor};`);
    
    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated background in:', filePath);
    }
}

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                walk(fullPath);
            }
        } else if (/\.(html|css)$/.test(file)) {
            processFile(fullPath);
        }
    }
}

walk(__dirname);
console.log('Deep Navy Blue background globally applied.');
