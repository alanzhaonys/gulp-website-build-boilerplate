# Usage
`yarn install` & `gulp build` (complile for first time)

# Develop
`gulp`

# Folder Structures
## `src`
## `assets`

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

`src/includes/_isi.pug`
`src/includes/_isi-body.pug`

By default, ISI will show up on all pages except 404 page.
To disable ISI for a particular page, add the page slug to `disableIsiPageSlugs` variable.

# Favicon
1. Go to https://www.favicon-generator.org, generate your favicons and download the package
2. Unzip the package and put all files into `assets/favicons`
3. Run `gulp favicons` to update the `dist` folder

# PUG Mixins
Mixin functions are located in `src/includes/mixins`

# Upgrade

Yarn
Running `yarn upgrade` will upgrade all the packages inside `node_modules` to the latest versions and update `package.json` file. You're free to upgrade, but we might not be able to support the particular version of the package.

