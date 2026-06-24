const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // 1. Replace dark overlays with light translucent overlays
    content = content.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.8\)\s*;/g, 'background: rgba(240, 244, 248, 0.95);');
    content = content.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.6\)\s*;/g, 'background: rgba(240, 244, 248, 0.9);');
    content = content.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.2\)\s*;/g, 'background: rgba(14, 165, 233, 0.05);');

    // 2. Replace remaining hex dark backgrounds
    content = content.replace(/background:\s*#0f0f0f\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background:\s*#0d0d0d\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background:\s*#1a1a1a\s*;/g, 'background: #ffffff;');
    content = content.replace(/background:\s*#2a2a2a\s*;/g, 'background: #ffffff;');
    content = content.replace(/background:\s*#1e1e1e\s*;/g, 'background: #ffffff;');
    content = content.replace(/background:\s*#181818\s*;/g, 'background: #f8fafc;');
    content = content.replace(/background:\s*#141414\s*;/g, 'background: #f8fafc;');
    content = content.replace(/background:\s*#0c0c0c\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background-color:\s*#000000\s*;/g, 'background-color: #f0f4f8;');

    // 3. Replace border colors
    content = content.replace(/border-color:\s*#333\s*;/g, 'border-color: #e2e8f0;');
    content = content.replace(/border:\s*1px\s+solid\s+#444\s*;/g, 'border: 1px solid #e2e8f0;');
    content = content.replace(/border:\s*2px\s+solid\s+#333\s*;/g, 'border: 2px solid #e2e8f0;');

    // 4. Any remaining inline dark bg !important patterns
    content = content.replace(/background:\s*#0a1128\s*!important\s*;/g, 'background: #f0f4f8 !important;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Pass 2 Updated:', filePath);
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
console.log('Pass 2 cleanup complete.');
