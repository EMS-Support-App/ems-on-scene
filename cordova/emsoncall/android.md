# Set Up Your Cordova Development Environment (+ try running the web app on android)

This guide will help beginners set up their development environment for running a Cordova app on Android devices!

## Step 0: Pre-requisites

Make sure you have this project repo cloned in your work environment (we recommend Visual Studio).

Also, try running the app on the browser first. To do this, see our guide on [Setting Up Your Cordova Development Environment (+ try running the web app on the browser)](https://github.com/J-S-Lab/ems-on-scene/edit/main/cordova/emsoncall/README.md).


## Step 1: Set Up Java Development Kit (JDK)

1.  Download the Java Development Kit (JDK) for your system. Remember the path where you install it, as you'll need it later.

## Step 2: Configure Environment Variables for Running Your App on Android.

1.  Open your system's environment variables settings:
    
    `rundll32.exe sysdm.cpl,EditEnvironmentVariables` 
    
2.  Add the following system variables:
    
    -   `JAVA_HOME`: Set it to the path where you installed the JDK.
    -   `ANDROID_SDK_ROOT`: Set it to the location of your Android SDK. You can find this in Android Studio > Tools > SDK Manager > Android SDK Location.
    -   `ANDROID_HOME`: Set it to the same path as `ANDROID_SDK_ROOT`. 
    
    (This variable is not mentioned in the apache cordova website - at least at the time this guide was created - so we had some trouble! Make sure to include this variable.)
    
3.  Update the `Path` system variable by adding the following directories (adjust the paths according to your installation):
    
    -   `cmdline-tools/latest/bin`
    -   `emulator`
    -   `platform-tools`
    -   `build-tools`

## Step 3: Download and Set Up Gradle

1.  Download Gradle manually from the official website. Go to https://gradle.org/install/, and scroll down to the "Install Manually" section.
    
2.  Create a new directory `C:\Gradle` using File Explorer.
    
3.  Extract the downloaded Gradle package and drag the extracted folder into the `C:\Gradle` directory.
    
4.  Configure your `Path` environment variable to include the `bin` directory of the extracted Gradle distribution (e.g., `C:\gradle\gradle-8.2.1-bin\gradle8.2.1\bin`).
    

## Step 4: Install Android Build Tools

1.  In Android Studio (if you don't have android studio, download it first), open the SDK Manager, and under the SDK Tools tab, select "Show Package Details."
    
2.  Check the box next to "Android SDK Build Tools 33.0.2" and click "Apply" to download.
    

## Step 5: Build Your Cordova App (Android)

1.  Close and reopen your command prompt terminal.
    
2.  Add the Android platform to your Cordova project:
        
    `cordova platform add android` 
    
3.  Check if all requirements are met by running:
       
    `cordova requirements` 
    
    If not, make sure you've set up all the necessary environment variables correctly.
    
4.  Build your Cordova app for Android:
        
    `cordova build android` 
    
    If errors occur, read the error messages and resolve them before proceeding.
    

## Step 6: Run Your App on an Android Device (if you have an android device)

If you don't have an android device with you right now, don't worry. You can use emulators on android studio instead:) But, if you want to try running the app on your physical device, follow the steps below:

1.  Make sure your Android device is in developer mode. 
    
2.  Connect your Android device to your computer via USB.
    
3.  On your Android device, allow your computer to access your phone.
    
4.  Adjust your phone's settings to prevent it from going to sleep.
    
5.  In your command prompt terminal, run your Cordova app on the Android device:
        
    `cordova run android` 

	

## Step 7: Run your App on Android

Now you should see your Cordova app running on your Android device. 

Congratulations! You've successfully set up your Cordova development environment and run your app on Android devices!
