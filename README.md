This is a clean slate - CJM

Open bash via the mac terminal
Navigate to the desktop or to a folder you want to copy the repo, 
any where will work - you can navigate this by using ( ls ) to list you current file folder
and ( cd ) to pick that file folder.

Open terminal by pressing cmd-space and type terminal and press enter.
Then type these commands in one by one and saying yes to all prompts shown
by our new awesome cli.

git clone https://github.com/BrogrammerGV/beta.git
cd beta
ionic serve
ionic cordova build ios
ionic cordova plugin add call-number
npm install --save @ionic-native/call-number
ionic cordova platform rm ios
ionic cordova platform add ios

cd  platforms/ios/
open..

Now follow the timestamped screen shots.
1. Click on the blue EventApp.xpoj which will open xcode
2. Top left corner of xcode click on the device selecion drop down then 
select you connected device.
3. Press the Play Button

(first 3 screen shots show input of cli)


