alert('SceneLogin.js loaded');

function SceneLogin() {
	var ime = {};
	var element = {}; // input id
	
	var ItemCursor = 0;
	
	this.createIME = function (id) {
		var imeReady = function(imeObject) {
			installStatusCallbacks(imeObject);
			document.getElementById(id).focus();
		};
		ime = new IMEShell(id, imeReady);
		element = document.getElementById(id);
	};
	
	this.init = function () {
		$("#div_obj_" + ItemCursor).css('outline', 'solid 4px #FF4500');
		this.createIME("input_obj_" + ItemCursor);
	};
	
	this.enter = function () {
		if( ItemCursor == 2) {
			alert("Now login need ----");
			var uname = $("#input_obj_0").val().trim();
			var pass = $("#input_obj_1").val().trim();
			if(uname == ''){
				this.nextItem(+1);
			}else if (pass == ''){
				this.nextItem(-1);
			}else{
				// save username password
				alert("saving username password..");
				var fs = new FileSystem();
				if(fs.isValidCommonPath(curWidget.id) == 0){
					fs.createCommonDir(curWidget.id);
				}
				// check if a account file exists
				var accfile = fs.openCommonFile(curWidget.id + "/accdata.dat", "w"); // use "r+" for update
				var unamestr = "username=" + uname;
				var passstr = "password=" + pass;
				accfile.writeAll(unamestr + "\n" + passstr);
				fs.closeCommonFile(accfile);
				Univision.username = uname;
				Univision.password = pass;
				sf.scene.hide('Login');
				sf.scene.show('Loading');
				sf.scene.focus('Loading');
			}
		}else{
			element.focus();
		}
	};
	
	this.nextItem = function (dir) {
		$("#div_obj_" + ItemCursor).css('outline', 'solid 1px #666666');
		
		ItemCursor = ItemCursor + dir;
		
		if (ItemCursor < 0) {
			ItemCursor = 2;
		} else if (ItemCursor > 2) {
			ItemCursor = 0;
		}
		
		$("#div_obj_" + ItemCursor).css('outline', 'solid 4px #FF4500');
		
		if(ItemCursor != 2){
			this.createIME("input_obj_" + ItemCursor);
		}
	};
	
	var onReturnScene = function () {
		element.blur();
	};
	
	var onComplete = function() {
		alert("onComplete: Letter entry completed in " + element.id + ", text is " + element.value);
		var mode = ['_latin_small', '_latin_big', '_num', '_special'];
		ime.setMode(mode[ItemCursor]);
		alert("mode[ " + ItemCursor + " ] = " + mode[ItemCursor]);
	};
	
	var onEnter = function(string) {
		alert("  onEnter: Enter key pressed in " + element.id + ", string is " + string);
		
		ime.hide();
		sf.scene.returnFocus();
	};
	
	var installStatusCallbacks = function(_ime) {
		alert("installStatusCallbacks. [START]");
		_ime.setOnCompleteFunc(onComplete);		
		_ime.setEnterFunc(onEnter);
		_ime.setKeyFunc(sf.key.RETURN, onReturnScene);
		alert("installStatusCallbacks. [End] " );
	};
};

SceneLogin.prototype.initialize = function () {
	alert("SceneLogin.initialize()");
	this.init();
};

SceneLogin.prototype.handleShow = function (data) {
	alert("SceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene
	$("#input_obj_0").val(Univision.username);
	$("#input_obj_1").val(Univision.password);
};

SceneLogin.prototype.handleHide = function () {
	alert("SceneLogin.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneLogin.prototype.handleFocus = function () {
	alert("SceneLogin.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneLogin.prototype.handleBlur = function () {
	alert("SceneLogin.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneLogin.prototype.handleKeyDown = function (keyCode) {
	alert("SceneLogin.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
	case sf.key.LEFT:
		this.nextItem(-1);
		break;
	case sf.key.RIGHT:
		this.nextItem(+1);
		break;
	case sf.key.UP:
		this.nextItem(-1);
		break;
	case sf.key.DOWN:
		this.nextItem(+1);
		break;
	case sf.key.ENTER:
		this.enter();
		break;
	}
};
