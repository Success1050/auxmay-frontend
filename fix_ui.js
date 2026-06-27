const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // Replace old ugly preloader GIF with modern Bootstrap spinner
    const oldPreloaderRegex = /<div id="preloader">[\s\S]*?<img src="assets\/themes\/deepblack\/img\/bitcoin\.gif" alt="preloader" class="loader" \/>[\s\S]*?<\/div>/g;
    
    const newPreloader = `<div id="preloader">
    <div class="loader" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <div class="spinner-border" style="width: 4rem; height: 4rem; color: #0ea5e9;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>`;

    content = content.replace(oldPreloaderRegex, newPreloader);
    
    // Some html files might have a different path to the gif
    const altPreloaderRegex = /<div id="preloader">[\s\S]*?<img src="\.\.\/assets\/themes\/deepblack\/img\/bitcoin\.gif" alt="preloader" class="loader" \/>[\s\S]*?<\/div>/g;
    content = content.replace(altPreloaderRegex, newPreloader);
    
    const alt2PreloaderRegex = /<div id="preloader">[\s\S]*?<img src="\.\.\/\.\.\/assets\/themes\/deepblack\/img\/bitcoin\.gif" alt="preloader" class="loader" \/>[\s\S]*?<\/div>/g;
    content = content.replace(alt2PreloaderRegex, newPreloader);

    // Also just a catch-all for any preloader div with an img inside
    const catchAllPreloader = /<div id="preloader">\s*<img[^>]+class="loader"[^>]*>\s*<\/div>/g;
    content = content.replace(catchAllPreloader, newPreloader);

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed preloader in:', filePath);
    }
}

function processCssFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // Force all form controls to have a clean light background
    content = content.replace(/\.form-control \{[\s\S]*?\}/g, (match) => {
        // Just inject the right background, color, and border if it's a deepblack style block
        return match.replace(/background:\s*#000;/g, 'background: #ffffff !important;')
                    .replace(/background:\s*#f0f4f8;/g, 'background: #ffffff !important;')
                    .replace(/border:\s*2px solid #000;/g, 'border: 1px solid #e2e8f0 !important;')
                    .replace(/border-left:\s*3px solid #000;/g, '')
                    .replace(/color:\s*#1e293b;/g, 'color: #1e293b !important;');
    });
    
    // Also inject a universal fix at the end of the file just to be absolutely certain
    const universalFix = `\n\n/* UNIVERSAL FORM INPUT FIX */\n.form-control, .form-control:focus, .input-group .form-control {\n    background-color: #ffffff !important;\n    color: #1e293b !important;\n    border: 1px solid #e2e8f0 !important;\n}\n\n.input-group .img {\n    background-color: #f8fafc !important;\n    border: 1px solid #e2e8f0 !important;\n    border-right: none !important;\n}\n`;
    if (!content.includes('UNIVERSAL FORM INPUT FIX')) {
        content += universalFix;
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed form inputs in:', filePath);
    }
}

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                walk(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            processHtmlFile(fullPath);
        } else if (fullPath.endsWith('style.css')) {
            processCssFile(fullPath);
        }
    }
}

walk(__dirname);
console.log('Done fixing preloader and inputs.');
