const proc = require('child_process');
const fs = require('fs');
const path = require('path');

const siteConfig = require('../ExpressWrapper/siteConfig.json');

const BasePath = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8')
                   .match(/PUBLIC_URL=[^\r\n]+/)[0]
                   .split('=')[1]
                   .replace(/\/+$/,'');
const RealFaviconPath = path.resolve(__dirname, '..', 'node_modules',
                                     'cli-real-favicon', 'real-favicon.js');
const BuildDirPath = path.resolve(__dirname, '..', 'build');

const GeneratedPath = path.resolve(__dirname, 'generated');
const FavTemplatePath = path.resolve(__dirname, 'faviconTemplate.json');
const FavConfigPath = path.resolve(GeneratedPath, 'faviconConfig.json');
const FavDataPath = path.resolve(GeneratedPath, 'faviconData.json');

if (!fs.existsSync(GeneratedPath)) fs.mkdirSync(GeneratedPath);

//#region Massage Favicon Configuration
const faviconConfig = require(FavTemplatePath);

// Try to load the config that was generated last time, otherwise use template
let oldConfig;
try {
    oldConfig = require(FavConfigPath);
} catch (error) {
    oldConfig = faviconConfig;
}

// Set base path
faviconConfig.iconsPath = BasePath;

// Set app name
faviconConfig.design.ios.appName = siteConfig.Site.Name;
faviconConfig.design.windows.appName = siteConfig.Site.Name;
faviconConfig.design.androidChrome.manifest.name = siteConfig.Site.Name;

// Increment version
faviconConfig.versioning.paramValue = (parseInt(oldConfig.versioning.paramValue)+1).toString();

fs.writeFileSync(FavConfigPath, JSON.stringify(faviconConfig, null,"\t"));
//#endregion


//#region Generate Favicons
// TODO: Check that the icon or the configuration changed before regenerating (will likely need to chache assets somewhere)
proc.execSync(`node ${RealFaviconPath} generate ${FavConfigPath} ${FavDataPath} ${BuildDirPath}`);
//#endregion


//#region Massage faviconData
const faviconDataConfig = require(FavDataPath);

faviconDataConfig.favicon.html_code = faviconDataConfig.favicon.html_code
                                                .replace(/\n/g, '')
                                                .replace('site.webmanifest', 'manifest.json');

fs.writeFileSync(FavDataPath, JSON.stringify(faviconDataConfig));
//#endregion


//#region Inject Favicon HTML
const builtHtml = path.join(BuildDirPath, '*.html');
proc.execSync(`node ${RealFaviconPath} inject ${FavDataPath} ${BuildDirPath} ${builtHtml}`);
fs.unlinkSync(FavDataPath);
//#endregion


//#region Generate manifest.json
const faviconManifestPath = path.join(BuildDirPath, 'site.webmanifest.json');
fs.renameSync(path.join(BuildDirPath, 'site.webmanifest'), faviconManifestPath);
const faviconManifest = require(faviconManifestPath);

const manualManifestPath = path.join(BuildDirPath, 'manualManifest.json');
const manualManifest = require(manualManifestPath);

const manifestPath = path.join(BuildDirPath, 'manifest.json');
const generatedManifest = {};

generatedManifest.name = faviconManifest.name;
generatedManifest.short_name = faviconManifest.short_name;
generatedManifest.start_url = BasePath;
generatedManifest.display = faviconManifest.display;
generatedManifest.theme_color = faviconManifest.theme_color;
generatedManifest.background_color = manualManifest.background_color;
generatedManifest.icons = faviconManifest.icons;

fs.unlinkSync(manualManifestPath);
fs.unlinkSync(faviconManifestPath);
fs.writeFileSync(manifestPath, JSON.stringify(generatedManifest, null, 2));
//#endregion


//#region Massage index.html
const indexHtmlPath = path.join(BuildDirPath, 'index.html');
const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8')
                   .replace(/<title>[^<]*<\/title>/, `<title>${siteConfig.Site.Name}</title>`)
                   .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
                            `<meta name="description" content="${siteConfig.Site.Description}" />`);
fs.writeFileSync(indexHtmlPath, htmlContent);
//#endregion
