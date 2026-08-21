const fs = require('fs');
let content = fs.readFileSync('src/utils/usePortfolioAlbums.ts', 'utf8');

// Fix image-14
content = content.replace(
  /{ id: 'nyc-default-2', type: 'image', url: '\/image-14\.jpg'/g,
  "{ id: 'nyc-default-2', type: 'video', url: '/image-14.mp4'"
);

// Fix image-21
content = content.replace(
  /{ id: 'lifestyle-default-7', type: 'image', url: '\/image-21\.jpg'/g,
  "{ id: 'lifestyle-default-7', type: 'video', url: '/image-21.mp4'"
);

// Fix image-22
content = content.replace(
  /{ id: 'lifestyle-default-8', type: 'image', url: '\/image-22\.jpg'/g,
  "{ id: 'lifestyle-default-8', type: 'video', url: '/image-22.mp4'"
);

fs.writeFileSync('src/utils/usePortfolioAlbums.ts', content, 'utf8');
console.log('Fixed videos');
