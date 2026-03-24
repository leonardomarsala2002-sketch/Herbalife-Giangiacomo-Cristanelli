import fs from 'fs';
import https from 'https';

const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Herbalife_Nutrition_logo.svg/1024px-Herbalife_Nutrition_logo.svg.png";
const file = fs.createWriteStream("public/herbalife-logo.png");

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log("Download Completes");
  });
});
