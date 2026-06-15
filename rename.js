const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace "CoinEx" with "CoinEx"
    content = content.replace(/CoinEx/g, 'CoinEx');
    // Replace "coinex" with "coinex"
    content = content.replace(/coinex/g, 'coinex');
    // Replace "CoinEx" with "CoinEx"
    content = content.replace(/CoinEx/g, 'CoinEx');
    // Replace "coinex" with "coinex"
    content = content.replace(/coinex/g, 'coinex');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                walkDir(fullPath);
            }
        } else {
            const ext = path.extname(fullPath);
            if (['.html', '.js', '.css', '.json'].includes(ext)) {
                replaceInFile(fullPath);
            }
        }
    }
}

walkDir(__dirname);
console.log('Done replacing site name.');
