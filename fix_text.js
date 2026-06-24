const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // 1. The #1 invisible text culprit: white rgba text on light background
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)\s*;/g, 'color: #475569;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\)\s*;/g, 'color: #64748b;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.5\)\s*;/g, 'color: #64748b;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.4\)\s*;/g, 'color: #94a3b8;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.3\)\s*;/g, 'color: #94a3b8;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*1\)\s*;/g, 'color: #1e293b;');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\)\s*;/g, 'color: #334155;');

    // 2. White rgba borders/backgrounds on light bg
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\)\s*;/g, 'background: rgba(14, 165, 233, 0.06);');
    content = content.replace(/border-bottom:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.05\)\s*;/g, 'border-bottom: 1px solid #e2e8f0;');
    content = content.replace(/border-top:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.05\)\s*;/g, 'border-top: 1px solid #e2e8f0;');
    content = content.replace(/border-bottom:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.1\)\s*;/g, 'border-bottom: 1px solid #e2e8f0;');
    content = content.replace(/border:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.1\)\s*;/g, 'border: 1px solid #e2e8f0;');

    // 3. Old gold text colors that are hard to read on light bg
    content = content.replace(/color:\s*#fcf6ba\s*;/g, 'color: #0284c7;');
    content = content.replace(/color:\s*#faaf3a\s*;/g, 'color: #0ea5e9;');

    // 4. White text-fill-color that makes text invisible
    content = content.replace(/-webkit-text-fill-color:\s*#fff\s*!important\s*;/g, '-webkit-text-fill-color: #1e293b !important;');
    content = content.replace(/-webkit-text-fill-color:\s*#1e293b\s*;/g, '-webkit-text-fill-color: #1e293b;');

    // 5. Remaining dark bg that creates contrast issues
    content = content.replace(/background-color:\s*#222222\s*;/g, 'background-color: #ffffff;');
    
    // 6. Fix scrollbar colors for light theme
    content = content.replace(/background:\s*#444\s*;/g, 'background: #cbd5e1;');
    content = content.replace(/background:\s*#555\s*;/g, 'background: #94a3b8;');
    content = content.replace(/background:\s*#666\s*;/g, 'background: #94a3b8;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Text fixed:', filePath);
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
console.log('\n=== TEXT VISIBILITY FIX COMPLETE ===');
console.log('All rgba(255,255,255) text -> dark slate tones');
console.log('All light gold text -> sky blue tones');
