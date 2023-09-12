# LightBox_Js_Plugin

This is a modern , simplistic and light-weight plugin for a Light-Box.
Repo contains 3 files : 
  - index.htm  // HTML file (dummy implementation)
  - lightBoxStyle.css  // CSS file
  - lightBoxPLugin.js //  JS file

To use the plugin : 
- Attach the lightBoxStyle.css stylesheet to your HTML file ( <link rel="stylesheet" type="text/css" href="./LightBox_Js_Plugin
/lightBoxStyle.css"> )

- Give a special class to all the images that you want the Light-Box to detect ( say , class = "lightBoxImages" )

- Import the default function of lightBoxPLugin.js file ( import {default as lightBox} from './LightBox_Js_Plugin
/lightBoxPlugin.js'; )

- Pass the unique className given to the images , to the default function. (  lightBox('lightBoxImages'); )

- Check for message in log  : "plugin installed successfully" for successful plugin install.
