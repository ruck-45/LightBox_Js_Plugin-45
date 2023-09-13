# LightBox_Js_Plugin

This is a modern , simplistic and light-weight plugin for a Light-Box.
Repo contains 3 files : 
  - index.htm  // HTML file (dummy implementation)
  - lightBoxStyle.css  // CSS file
  - lightBoxPLugin.js //  JS file

To use the plugin : 
- Attach the lightBoxStyle.css stylesheet to your HTML file 
        <link rel="stylesheet" type="text/css" href="...Path of lightBoxStyle.css File">

- Give a special class to all the images that you want the Light-Box to detect ( say , class = "lightBoxImages" )

- Import the LightBox class from lightBoxPLugin.js file and create an object of it, and pass the class name you chose in earlier step
        import {LightBox} from '...Path of lightBoxPLugin.js File';
        new LightBox("lightBoxImages");

- [ Optional ] You can choose to disable the key Actions of LightBox ( to allow lightbox to be closed/navigated using keyboard). To do that while creating object pass 'allowKeyAction' parameter as false
      new LightBox("lightBoxImages",false);

- Check for message in log  : "plugin installed successfully" for successful plugin install.
