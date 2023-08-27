# install cordova development enviroment

1. Install "node JS"

2. move to emsoncall folder under cordova.

3. change mobile web URL to your mobile web URL in /cordova/emsoncall/www/js/index.js

```
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById('deviceready').classList.add('ready');
    window.open = cordova.InAppBrowser.open;
    window.open('https://ems.jandslab.com', null, 'location=no');
}
```

3. cordova platform add browser

```
cordova platform add browser
cordova run browser
```

4. Download JDK. Make sure to save the path/location of where you're downloading the JDK (we'll have to use this path later).

5. in your computer, open environment variables edit page. 
```
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

ref) on the apache.cordova.org>createyourfirstapp>developforplatforms>android page that you were at, scroll down to "setting environment variables" section.

6. set some important environment variables to be able to run cordova on android.

in the environment variables edit panel, add JAVA_HOME as "system variable" under the path/location of where we downloaded the JDK (you should've saved this path earlier. if not, try installing JDK again to see at what path/location you downloaded JDK).

add ANDROID_SDK_ROOT as system variable, path and should be found this way: open android studio > click tools tab > sdk manager > android sdk location. (if you don't have android studio, install that first).

add ANDROID_HOME as system variable at the same path as above.

6. now we're going to set some important PATH variables.

in android studio > sdk manager, open the sdk tools tab. click on the android sdk command line tools and click "apply" to download that. once that's done, go to environment variables, system variables, double click on Path (must be unsder system variables and not user variables), and click "New" to update the Path variable to include the following directories:

cmdline-tools/latest/bin
emulator
platform-tools
build-tools

these directories should be in the android sdk folder (see your file explorer, and go to the path/location where you downloaded your sdk).

in the file explorer android sdk folder, click on the folders in there to find each of the directories listed above, copy each of their paths, and paste the directory paths as "New" path variables.

7. download Gradle, and set the path/location as another new path environement variable.

go to the download gradle link.
for windows users, download manually.
make a new directory C:\Gradle with File Explorer.
open a second file explorer window and drag the unzipped gradle-8.2.1 folder into your newly created C:\Gradle folder.

configure your path environment variable to include the "bin" dircotry of the unzipped distribution. for example:
C:\gradle\gradle-8.2.1-bin\gradle8.2.1.\bin

8. ONe more thing!! You need the 33.0.2 Android build tool in order to buil android.

in android studio > sdk manager, open the sdk tools tab. click show package details option on the bottom right. select Android SDK Build TOols 33.0.2. Click Apply to download.

NOWW you can build!

close your cmd panel, and reopen it. 
add the android platform: 
$ cordova platform add android

Now, try $cordova requirements
to see if all requirements are met. if not, download and set variables and do what you gotta do until all requirements are met.

After double checking that you meet all requirements, build!
$ cordova build android
if errors occur, read error messages and fix problems until you can build successfully.

9. Now go find your android phone. change your android phone in to developer mode, 
plug in your android phone to your pc, 
on your android phone, allow pc to access your phone.
change phone setting so it doesn't go to sleep.

10. $ cordova run android
see the app run on your phone!!!