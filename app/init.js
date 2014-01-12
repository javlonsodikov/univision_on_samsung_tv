
function onStart () {
	// Check if common application folder is created
	// and if not, create it
	alert("--------------- init started with id: " + curWidget.id);
	var fs = new FileSystem();
	if(fs.isValidCommonPath(curWidget.id) == 0){
		fs.createCommonDir(curWidget.id);
	}
	// check if a account file exists
	var accfile = fs.openCommonFile(curWidget.id + "/accdata.dat", "w"); // use "r+" for update
	var strLine = '';
	var uname = "username=";
	var pass = "password=";
	var acdata = new Array();
	while(strLine = accfile.readLine()){
		if( (strLine.substring(0, uname.length) == uname) || 
				(strLine.substring(0, pass.length) == pass)){
			acdata.push(strLine);
		}
	}

	fs.closeCommonFile(accfile);
	
	if(acdata.length == 0){
		// show login window
		sf.scene.show('Login');
		sf.scene.focus('Login');
	}else{
		alert("--- written lines: " + acdata.length);
		alert("================================================================ account data found! ====");
	}
	
}
function onDestroy () {
	//stop your XHR or Ajax operation and put codes to distroy your application here
	
}

alert("init.js loaded.");
