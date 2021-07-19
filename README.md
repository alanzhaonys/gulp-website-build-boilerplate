# Version
Node version 12 is required

# Usage
`yarn install` & `gulp build` (complile for first time)

# Develop
`gulp`

# Folder Structures
## `src`
## `assets`

# Change main logo
`src/include/_header`, search for `main-logo` and update the `src` or `srcset` for the `img` tag

# To create a new page

# Homepage
`src/index.pug`

# 404 page
`src/404/index.pug`

# Configurations
`src/includes/_configs.pug`

# Metadata

# Browser support


# Features
Menu
`src/includes/_menu-config.pug`

Hamburger Menu

ISI - Important Site Information
When you enable ISI, two components will show up on the page
Sticky ISI
Inline ISI appears before the footer

`.toggle-isi` class
`<a href="#" onclick="return false" class="toggle-isi">Important Site Information</a>`

`src/includes/_isi.pug`
`src/includes/_isi-body.pug`

## Additional configurations
`assets/js/ISI.js`
`shinkIsi`
`persistShinkIsi`

By default, ISI will show up on all pages except the standalone `/isi`, `/404` and `/search` pages.
To disable ISI for a particular page, add the page slug to `disableIsiPageSlugs` variable.

# Favicon
1. Go to https://www.favicon-generator.org, generate your favicons and download the package
2. Unzip the package and put all files into `assets/favicons`
3. Run `gulp favicons` to update the `dist` folder

# PUG Mixins
Mixin functions are located in `src/includes/mixins`

# Upgrade

Yarn
Running `yarn upgrade --latest` will upgrade all the packages inside `node_modules` to the latest versions and update `package.json` file. You're free to upgrade, but we might not be able to support the particular version of the package.

