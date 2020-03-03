const fs = require('fs');
const path = require('path');
const siteConfig = require('../../ExpressWrapper/siteConfig.json');
const BuildDirPath = path.resolve(__dirname, '..', '..', 'build');

// Massage index.html TODO: reference function from GenerateFavicons.js
const indexHtmlPath = path.join(BuildDirPath, 'index.html');
const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8')
                   .replace(/<title>[^<]*<\/title>/, `<title>${siteConfig.Site.Name}</title>`)
                   .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
                            `<meta name="description" content="${siteConfig.Site.Description}" />`);
fs.writeFileSync(indexHtmlPath, htmlContent);

// Rename manualManifest.json to manifest.json
const manifestPath = path.join(BuildDirPath, 'manifest.json');
const manualManifestPath = path.join(BuildDirPath, 'manualManifest.json');
fs.renameSync(manualManifestPath, manifestPath);

// Copy logo to build folder
const srcLogoPath = path.resolve(__dirname, '..', '..', 'src', 'resources', 'LexieIcon.svg');
const destLogoPath = path.join(BuildDirPath, 'logo.svg');
fs.copyFileSync(srcLogoPath, destLogoPath);
