const fs = require('fs');
let content = fs.readFileSync('src/components/CreatorCollabSection.tsx', 'utf8');

content = content.replace(/allowtransparency/g, 'allowTransparency');

fs.writeFileSync('src/components/CreatorCollabSection.tsx', content, 'utf8');
console.log('Fixed React warnings');
