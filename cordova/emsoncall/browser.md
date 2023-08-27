
# Setting Up Your Cordova Development Environment (+ try running the web app on the browser)

This guide will help beginners set up their development environment for running a Cordova app on the browser and Android devices.

Make sure you have this project repo cloned in your work environment (we recommend Visual Studio) first!

## [](https://github.com/J-S-Lab/ems-on-scene/tree/main/cordova/emsoncall#step-1-install-nodejs)Step 1: Install Node.js

1.  Install  [Node.js](https://nodejs.org/en/download)  on your computer. Node.js is required for Cordova development.

## [](https://github.com/J-S-Lab/ems-on-scene/tree/main/cordova/emsoncall#step-2-prepare-your-cordova-project)Step 2: Prepare Your Cordova Project

1.  Download or create your Cordova project folder.
    
2.  Open a command prompt terminal and navigate to your Cordova project folder:
    
    `cd path/to/your/cordova/project`
    

## [](https://github.com/J-S-Lab/ems-on-scene/tree/main/cordova/emsoncall#step-3-configure-your-cordova-app)Step 3: Configure Your Cordova App

1.  Open the  `index.js`  file located at  `/cordova/emsoncall/www/js/index.js`.
    
2.  Locate the line that starts with  `window.open`  and change the URL within the parentheses to the URL of  **your**  mobile web application.
    
    `window.open('YOUR_MOBILE_WEB_URL_HERE', null, 'location=no');`
    

(If you don't have a mobile web URL yet, follow our  [instructions on how to deploy a new web application to a hosting server.](https://github.com/J-S-Lab/ems-on-scene/blob/main/web/ems-onscene/README.md)  )

## [](https://github.com/J-S-Lab/ems-on-scene/tree/main/cordova/emsoncall#step-4-add-browser-platform)Step 4: Add Browser Platform

1.  In your command prompt terminal, add the browser platform to your Cordova project:

```
        cordova platform add browser
        
        cordova run browser
```

Now you should see your Cordova app running on your browser.

Congratulations- you've successfully set up your Cordova development environment and run your app on the browser!
