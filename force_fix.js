const fs = require('fs');
const path = require('path');

const targetColor = '#0a1128';

const newLogo = `<a class="navbar-brand golden-text" href="index.html" style="display: flex; align-items: center; gap: 10px; color: #d4af37; text-decoration: none;">
                    <i class="fa-brands fa-bitcoin" style="font-size: 32px;"></i>
                    <span style="font-weight: bold; font-size: 20px; line-height: 1.2;">COINEX<br>CRYPTOS</span>
                </a>`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    
    // 1. Forcefully replace ALL navbar logos
    content = content.replace(/<a class="navbar-brand golden-text"[^>]*>[\s\S]*?<\/a>/gi, newLogo);
    
    // 2. Bruteforce strip all background-image urls even without semicolons
    content = content.replace(/background-image:\s*url\([^)]+\);?/gi, `background-color: ${targetColor} !important; background-image: none !important;`);
    content = content.replace(/background:\s*url\([^)]+\);?/gi, `background: ${targetColor} !important;`);
    
    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', filePath);
    }
}

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                walk(fullPath);
            }
        } else if (/\.html$/.test(file)) {
            processFile(fullPath);
        }
    }
}

walk(__dirname);
console.log('Logos and stubborn backgrounds completely fixed.');
