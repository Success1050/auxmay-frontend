const fs = require('fs');

const file = 'assets/themes/deepblack/scss/style.css';
let content = fs.readFileSync(file, 'utf8');
const orig = content;

// Replace 45-degree gold gradients (missed by first script which only targeted 135deg)
content = content.replace(
    /linear-gradient\(45deg,\s*#bf953f,\s*#fcf6ba,\s*#b38728,\s*#fbf5b7,\s*#aa771c\)/g,
    'linear-gradient(45deg, #0284c7, #38bdf8, #0ea5e9, #7dd3fc, #0369a1)'
);

// Replace remaining gold borders
content = content.replace(/border:\s*2px\s+solid\s+#bf953f\s*;/g, 'border: 2px solid #0ea5e9;');

// Replace remaining gold backgrounds
content = content.replace(/background:\s*#bf953f\s*;/g, 'background: #0ea5e9;');

if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned remaining gold colors from style.css');
} else {
    console.log('No changes needed');
}
