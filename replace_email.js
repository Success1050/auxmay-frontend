const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                replaceInDir(fullPath);
            }
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const oldEmail = 'coinexbtc@infocoinex.space';
            const newEmail = 'coinexbtc@infocoinex.space';
            
            if (content.includes(oldEmail)) {
                content = content.replace(new RegExp(oldEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newEmail);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir(__dirname);
console.log("Done updating emails to coinexbtc@infocoinex.space!");
