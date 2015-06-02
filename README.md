# weddingApp

Android:
--------

Using Crosswalk - build is outside cordova:

Running:

`cordova prepare android`

`cd platforms/android`

`./cordova/run`


###Building for app store:

`./build --release`

Considerando que o APK foi renomeado de release para 'wedding.apk':

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../my-release-key.keystore wedding.apk cassio`

(Passphrase: wedding)

`jarsigner -verify -verbose -certs wedding.apk`

`zipalign -v 4 wedding.apk wedding-final.apk`