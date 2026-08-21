const fs = require('fs');

const files = [
  'src/utils/usePortfolioAlbums.ts',
  'src/utils/useCreatorCollab.ts',
  'src/components/BrutalistPortfolio.tsx'
];

let counter = 1;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Unsplash
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[a-zA-Z0-9=&%_]+/g, () => {
      const newUrl = `/image-${counter}.jpg`;
      counter++;
      return newUrl;
    });

    // Mixkit video
    content = content.replace(/https:\/\/assets\.mixkit\.co\/videos\/preview\/mixkit-[a-zA-Z0-9\-]+\.mp4/g, '/about-video.mp4');

    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('Replaced images.');
