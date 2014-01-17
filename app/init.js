
function onStart () {
	// TODO : Add your Initilize code here
	// NOTE : In order to start your app, call "sf.start()" at the end of this function!!
	
	Account.loadFromFile();
	
	if (Account.username.length == 0 || Account.password.length == 0) {
		sf.scene.show('Login');
		sf.scene.focus('Login');
	} else {
		sf.scene.show('Loading');
		sf.scene.focus('Loading');
	}
}
function onDestroy () {
	//stop your XHR or Ajax operation and put codes to distroy your application here
	
}

alert("init.js loaded.");
