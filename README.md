#Gulp basic environment

This setup provides you with basic CSS/JS/Sass changes detection and compilation.
<br><br>
<i>gulpfile.js hold all the configuration how files will be compiled.</i>
###Setup:
1. Clone this repo. Whenever you clone it, that location will be relative path for path you set in settings.js
2. Run `npm install`, this will install all necessary dependencies
3. Jump into settings.js and change both variables according to your cloned directories path and set URL to one that shows up in your browser when you run your Wordpress site.
4. <B>For local flywheel users: You can just clone this repo inside app directory of your created project and you will be fine with themeLocation variable. However you will need to change name of theme and also URL according to theme you are developing.</b>


If you do not change it configuration is like this: 

###CSS
- Inside your theme directory you should have `css` directory, this directory and all its ancestors will be watched by gulp and will trigger changes. 
- You can structure directories and files inside this(css) directory however you wish but note that you must have `style.css` file in root of this directory. Here you should import all your other styles if you have any. 
- This file will be compiled into `style.css` of root directory of your theme(which is file used by Wordpress). 
<br>
<b>IMPORTANT</b>: Comment holding definition for your theme and other stuff should be placed on top of `css/style.css` file and not style.css is root directory of your theme since this file will be overriden whenever you change any of the css files.

###JS
- Inside your theme directory you should have `js` directory, this directory needs to contain `scripts.js` file which should import all modules you create. These modules should be placed in directory called `modules` which will be watched by gulp for changes.
- Final scripts directory will be located in root of `js` directory and called `scripts-bundled.js`. This file should be imported in your theme.

###Sass
- Inside your theme directory you should have `scss` directory, this directory and all its ancestors will be watched by gulp and will trigger changes.
- You can structure directories and files inside this(scss) directory however you wish but note that you must have `style.scss` file in root of this directory. Here you should import all your other styles if you have any.
- This file will be compiled into `style.css` of root directory of your theme(which is file used by Wordpress).

<br>
<br>
<br>