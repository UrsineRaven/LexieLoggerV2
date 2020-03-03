# To-do's
* [ ] Complete any TODO: comments in the code
* [X] ~~***Create a Repo for LexieLoggerV2***~~ [2020-02-26]
* [X] ~~*Update everything to use the new logo*~~ [2020-03-03]
* [X] ~~*Determine which resolutions of PNG I need to generate (and update the relevant places)*~~ [2020-03-03]
* [ ] Consolidate configuration (siteConfig.json, .env, package.json, etc.)
* [ ] Separate GenerateFavicons.js into functions, and call them all at the end
* [ ] Maybe rename the configs folder and/or GenerateFavicons.js (just remember to update all of the places that reference it in comments, code, package.json, etc)
* [ ] Update About Page
* [ ] Make more stuff configurable (see LexieLogger's siteConfig.json)
* [ ] Add SSL support (and update README accordingly)
* [ ] Use Banners appropriately (https://material.io/components/banners/#usage)
* [ ] Use Snackbars appropriately (https://material.io/components/snackbars/#)
* [ ] Finish ServiceWorker
    - [ ] https://create-react-app.dev/docs/making-a-progressive-web-app/
    - [ ] Add Snackbar for cache being downloaded  (src/serviceWorker.js)
    - [ ] Add Banner for needing to close all tabs  (src/serviceWorker.js)
    - [ ] Add something saying that it can be installed to homescreen (https://developers.google.com/web/fundamentals/app-install-banners/) (https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile)
    - [ ] enable it in index.js
    - [ ] 
* [ ] Add way to add test data to the Local Storage (and maybe database?)
* [ ] Use Lighthouse (in Audit tab of Chrome DevTools) to audit and fix problems
* [ ] write more tests (see App.test.js)
* [ ] Maybe re-organize the file structure (I'm not super fond of Create React App's generated file structure) 
* [X] ~~*Fix the last grouping not showing up in history page (when grouping by day..)*~~ [2020-01-30]
* [X] ~~*Validate that All fields have been filled out before allowing submit in Add Event modal on History page*~~ [2020-01-30]
* [ ] 

## Logo SVG

* [ ] Try simplifying each layer individually
* [ ] Simplify Logo SVG and tweak it
* [ ] Should probably use two tones for the red (bow) and maybe the gold (around the bow)
* [ ] Try to Draw SVG from scratch
* [ ] 

### Notes

* Potential SVG colors for the icon:
    - ```
      Black: 000000
      Brown: 62402A
      Lighter-Brown: 977248
      Lightest-Brown: C8A881
      Red: 901E20
      Gold: BB954A
      Light-Grey: 
      ```
* Site to generate an SVG: [https://www.pngtosvg.com/](https://www.pngtosvg.com/)
    - settings:
        + Colors: 5 (use first 5 above)
        + Simplify: 5

## Favicon

* [X] ~~*run generation on build*~~ [2020-03-03]
* [ ] ideally only regenerate when the icon or one of the config files change
* [ ] 

### Notes

* Site to generate the favicons from the SVG: [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
* the api makes it sound like you can just set "versioning" to true instead of an object, and it will use a hashed timestamp for the value, if you don't want to manually update the version

* Generate your icons:
```shell
mkdir outputDir
real-favicon generate faviconDescription.json faviconData.json outputDir
```

* Inject the HTML code in your pages:
```shell
real-favicon inject faviconData.json outputDir htmlFiles/*.html
```

* Check for updates (to be run from time to time, ideally by your continuous integration system):
```shell
real-favicon check-for-update --fail-on-update faviconData.json
```

## README

* [ ] Complete "Usage" in the README
* [ ] Clean up/organize the readme  
* [ ] Add screenshot(s) to the readme  
* [ ] See what kind of credit I need to give Bootswatch for their Lumen theme  
* [ ] Quickly run through setting up LetsEncrypt and DuckDNS  
* [ ] 
