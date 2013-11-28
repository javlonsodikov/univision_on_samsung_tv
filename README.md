#Univision Anywhere on Samsung Smart TV

A simple Samsung Smart TV streaming app for Univision Anywhere: http://tv.univision.mn

## How to use it?

### Samsung Smart TV SDK
1. Download and install the IDE for Samsung Smart TV SDK 4.5 (See: http://www.samsungdforum.com/Devtools/Sdkdownload)
2. Download the emulator image for Samsung Smart TV SDK 4.5 and import in VirtualBox.
3. For emulator settings, see: http://www.samsungdforum.com/Guide/d07/index.html

### Univision App
1. Clone the app `git clone git@github.com:tugstugi/univision_on_samsung_tv.git`
2. Import the app in Samsung Smart TV SDK IDE.
3. Change your Univision login data in `app/javascript/account.js`

### Emulator
1. To start the univision app in the emulator, select the project and click the __Samsung Smart TV SDK__ menu and select __Run Samsung Smart TV Emulator__ or __Run Current Project in Samsung Smart TV Emulator__

### Samsung Smart TV
1. You need a web server.
1. To create installation package, click the __Samsung Smart TV SDK__ menu and select __Packaging__ and insert your server IP.
2. Copy the created `widgetlist.xml` file and `Widget` folder to your web server's root folder.
3. Put your TV in developer mode
4. ...
