const fs = require('fs');

// 1. Update BrutalistPortfolio.tsx
let portfolio = fs.readFileSync('src/components/BrutalistPortfolio.tsx', 'utf8');
portfolio = portfolio.replace(/src=\{photoUrl\}/g, "src={photoUrl || '/image-1.jpg'}");
fs.writeFileSync('src/components/BrutalistPortfolio.tsx', portfolio, 'utf8');

// 2. Update useCreatorCollab.ts (Shift image numbers by 10)
let collab = fs.readFileSync('src/utils/useCreatorCollab.ts', 'utf8');
for (let i = 24; i >= 14; i--) {
  collab = collab.replace(new RegExp(`/image-${i}\\.jpg`, 'g'), `/image-${i + 10}.jpg`);
}
fs.writeFileSync('src/utils/useCreatorCollab.ts', collab, 'utf8');

