const fs = require('fs');
const path = require('path');

// ===== NEW COLOR PALETTE =====
// Primary: Sky Blue (#0ea5e9)  
// Primary Light: (#38bdf8)
// Primary Dark: (#0284c7)
// Background: White (#f0f4f8)
// Sidebar/Cards: (#ffffff)
// Text Primary: (#1e293b) dark slate
// Text Secondary: (#64748b)
// Borders: (#e2e8f0)
// Accent gradient: sky blue shimmer

const newGradient = 'linear-gradient(135deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1)';
const newBorderGradient_dark = 'linear-gradient(#1e293b 0 0) padding-box, linear-gradient(135deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1) border-box';
const newBorderGradient_222 = 'linear-gradient(#ffffff 0 0) padding-box, linear-gradient(135deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1) border-box';
const newBorderGradient_111 = 'linear-gradient(#f8fafc 0 0) padding-box, linear-gradient(135deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1) border-box';

function processCSS(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // === STYLE.CSS specific replacements ===

    // 1. Replace gold gradient text coloring
    content = content.replace(
        /background:\s*linear-gradient\(135deg,\s*#b38728,\s*#fcf6ba,\s*#bf953f,\s*#fbf5b7,\s*#aa771c\)\s*;/g,
        `background: ${newGradient};`
    );

    // 2. Replace border-box gradient patterns with #222 inner
    content = content.replace(
        /background:\s*linear-gradient\(#222\s+0\s+0\)\s+padding-box,\s*linear-gradient\(135deg,\s*#b38728,\s*#fcf6ba,\s*#bf953f,\s*#fbf5b7,\s*#aa771c\)\s+border-box\s*;/g,
        `background: ${newBorderGradient_222};`
    );

    // 3. Replace border-box gradient patterns with #000 inner
    content = content.replace(
        /background:\s*linear-gradient\(#000\s+0\s+0\)\s+padding-box,\s*linear-gradient\(135deg,\s*#b38728,\s*#fcf6ba,\s*#bf953f,\s*#fbf5b7,\s*#aa771c\)\s+border-box\s*;/g,
        `background: ${newBorderGradient_dark};`
    );

    // 4. Replace border-box gradient patterns with #111 inner
    content = content.replace(
        /background:\s*linear-gradient\(#111\s+0\s+0\)\s+padding-box,\s*linear-gradient\(135deg,\s*#b38728,\s*#fcf6ba,\s*#bf953f,\s*#fbf5b7,\s*#aa771c\)\s+border-box\s*;/g,
        `background: ${newBorderGradient_111};`
    );

    // 5. Catch multiline border-box gradients  
    content = content.replace(
        /linear-gradient\(135deg,\s*#b38728,\s*#fcf6ba,\s*#bf953f,\s*#fbf5b7,\s*#aa771c\)\s+border-box\s*;/g,
        `linear-gradient(135deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1) border-box;`
    );

    // 6. Replace body background from black to light
    content = content.replace(/background:\s*#000\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background:\s*#0a1128\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background-color:\s*#0a1128\s*;/g, 'background-color: #f0f4f8;');
    content = content.replace(/background-color:\s*#0a1128\s*!important\s*;/g, 'background-color: #f0f4f8 !important;');

    // 7. Replace dark section backgrounds
    content = content.replace(/background:\s*#111\s*;/g, 'background: #f8fafc;');
    content = content.replace(/background:\s*#222\s*;/g, 'background: #ffffff;');
    content = content.replace(/background:\s*#1a1a2e\s*;/g, 'background: #f0f4f8;');
    content = content.replace(/background-color:\s*#000\s*;/g, 'background-color: #f0f4f8;');
    content = content.replace(/background-color:\s*#111\s*;/g, 'background-color: #f8fafc;');
    content = content.replace(/background-color:\s*#222\s*;/g, 'background-color: #ffffff;');

    // 8. Replace text colors for readability on light bg
    content = content.replace(/color:\s*#FFFFFF\s*;/g, 'color: #1e293b;');
    content = content.replace(/color:\s*#ffffff\s*;/g, 'color: #1e293b;');
    content = content.replace(/color:\s*#fff\s*;/g, 'color: #1e293b;');
    content = content.replace(/color:\s*#f7f7f8\s*;/g, 'color: #1e293b;');

    // 9. Replace the green navbar border / active colors
    content = content.replace(/border-bottom:\s*3px\s+solid\s+#4a8b3f\s*;/g, 'border-bottom: 3px solid #0ea5e9;');
    content = content.replace(/#4a8b3f/g, '#0ea5e9');
    content = content.replace(/#3d7a35/g, '#0284c7');

    // 10. Replace border colors  
    content = content.replace(/border:\s*1px\s+solid\s+#333\s*;/g, 'border: 1px solid #e2e8f0;');
    content = content.replace(/border-bottom:\s*1px\s+solid\s+#333\s*;/g, 'border-bottom: 1px solid #e2e8f0;');
    content = content.replace(/border:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.1\)\s*;/g, 'border: 1px solid #e2e8f0;');

    // 11. Replace dark section bg colors in style.css
    content = content.replace(/background-color:\s*#1a1a1a\s*;/g, 'background-color: #ffffff;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('CSS Updated:', filePath);
    }
}

function processHTML(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // 1. Replace inline style gold colors  
    content = content.replace(/color:\s*#d4af37/g, 'color: #0ea5e9');
    content = content.replace(/color:\s*#D4AF37/g, 'color: #0ea5e9');

    // 2. Replace inline background colors
    content = content.replace(/background-color:\s*#0a1128\s*!important/g, 'background-color: #f0f4f8 !important');
    content = content.replace(/background:\s*#0a1128\s*!important/g, 'background: #f0f4f8 !important');

    // 3. Replace navbar logo inline styles
    content = content.replace(
        /style="display: flex; align-items: center; gap: 10px; color: #d4af37; text-decoration: none;"/g,
        'style="display: flex; align-items: center; gap: 10px; color: #0ea5e9; text-decoration: none;"'
    );

    // 4. Replace inline background: none !important patterns from old script
    content = content.replace(/background-color:\s*#0a1128\s*!important;\s*background-image:\s*none\s*!important;/g,
        'background-color: #f0f4f8 !important; background-image: none !important;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('HTML Updated:', filePath);
    }
}

function processDashboardCSS(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // Replace CSS variables
    content = content.replace('--bg-color: #0a1128;', '--bg-color: #f0f4f8;');
    content = content.replace('--sidebar-bg: #1a1a1a;', '--sidebar-bg: #ffffff;');
    content = content.replace('--card-bg: #222222;', '--card-bg: #ffffff;');
    content = content.replace('--text-primary: #ffffff;', '--text-primary: #1e293b;');
    content = content.replace('--text-secondary: #a0a0a0;', '--text-secondary: #64748b;');
    content = content.replace('--gold: #d4af37;', '--gold: #0ea5e9;');
    content = content.replace('--gold-hover: #f2c84b;', '--gold-hover: #38bdf8;');
    content = content.replace('--border-color: #333333;', '--border-color: #e2e8f0;');

    // Replace button gradients
    content = content.replace(
        'linear-gradient(135deg, #f2c84b 0%, #b8860b 100%)',
        'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
    );

    // Replace dark stat icon background
    content = content.replace('background: #111;', 'background: #e0f2fe;');

    // Replace table header bg
    content = content.replace('background-color: #1a1a1a;', 'background-color: #f0f9ff;');

    // Replace wallet address bg
    content = content.replace('background: #111;', 'background: #f0f9ff;');

    // Replace dashed border color for wallet
    content = content.replace('border: 1px dashed var(--gold);', 'border: 1px dashed var(--gold);');

    // Replace profile icon
    content = content.replace('background: #fff;', 'background: #0ea5e9;');

    // Replace sidebar active bg  
    content = content.replace('rgba(212, 175, 55, 0.05)', 'rgba(14, 165, 233, 0.08)');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Dashboard CSS Updated:', filePath);
    }
}

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                walk(fullPath);
            }
        } else if (file === 'dashboard.css') {
            processDashboardCSS(fullPath);
        } else if (/\.css$/.test(file)) {
            processCSS(fullPath);
        } else if (/\.html$/.test(file)) {
            processHTML(fullPath);
        }
    }
}

walk(__dirname);
console.log('\n=== COMPLETE COLOR OVERHAUL DONE ===');
console.log('Old: Dark black/green + Gold gradient');
console.log('New: Clean light (#f0f4f8) + Sky Blue (#0ea5e9)');
