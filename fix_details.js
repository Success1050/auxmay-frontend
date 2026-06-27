const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // 1. Replace Address
    content = content.replace(/225 West Main St\. Lewistown MT 59458, USA/g, '30, 1920 E Serene Ave, NV 89123, Las Vegas, USA.');

    // 2. Replace Email
    content = content.replace(/info@coinexcrypto\.trade/g, 'info@coinex.com');

    // 3. Replace Toll Free No (Phone)
    content = content.replace(/<span>Toll Free No<\/span>/g, '<span>+16786530369</span>');
    content = content.replace(/<p>Toll Free No<\/p>/g, '<p>+16786530369</p>');

    // 4. Directors images in dashboard.html
    if (filePath.endsWith('dashboard.html')) {
        content = content.replace(
            /<img src="https:\/\/via\.placeholder\.com\/200x200\/1a1a1a\/d4af37\?text=CEO" alt="Director">/g,
            '<img src="assets/uploads/logo/img2.jpeg" alt="John Doe" style="width: 200px; height: 200px; object-fit: cover;">'
        );
        content = content.replace(
            /<img src="https:\/\/via\.placeholder\.com\/200x200\/1a1a1a\/d4af37\?text=CFO" alt="Director">/g,
            '<img src="assets/uploads/logo/img3.jpeg" alt="Jane Smith" style="width: 200px; height: 200px; object-fit: cover;">'
        );
        
        // Also fix the John Doe missing border radius issue if any, but the parent has border-radius 50%
        // And fix the text visibility for the inputs in dashboard
        content = content.replace(/background: #111;/g, 'background: #ffffff; color: #1e293b; border: 1px solid #e2e8f0;');
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed details in:', filePath);
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
        }
    }
}

walk(__dirname);
console.log('Done replacing address, phone, email, and directors.');
