alert('SceneLogin.js loaded');

function SceneLogin() {
	
};

SceneLogin.selected = 0;

SceneLogin.selectNext = function(direction) {
	this.selected += direction;
	if (this.selected < 0) {
		this.selected = 2;
	}
	if (this.selected > 2) {
		this.selected = 0;
	}
	
	if (this.selected == 0) {
		$('#passwordTextInput').sfTextInput('blur');
		$('#loginButton').sfButton('blur');
		$('#usernameTextInput').sfTextInput('focus');
	} else if (this.selected == 1) {
		$('#usernameTextInput').sfTextInput('blur');
		$('#loginButton').sfButton('blur');
		$('#passwordTextInput').sfTextInput('focus');
	} else {
		$('#passwordTextInput').sfTextInput('blur');
		$('#usernameTextInput').sfTextInput('blur');
		$('#loginButton').sfButton('focus');
	}
};

SceneLogin.login = function() {
	Account.saveToFile();
	
	sf.scene.hide('Login');
    sf.scene.show('Loading');
    sf.scene.focus('Loading');
};

SceneLogin.prototype.initialize = function () {
	alert("SceneLogin.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	$('#usernameLabel').sfLabel({
		text:'Username:'
	});
	$('#passwordLabel').sfLabel({
		text:'Password:'
	});
	
	_g_ime.keySet = 'qwerty';
	
	$('#usernameTextInput').sfTextInput({
		text: '',
		maxlength:20,
		ontextchanged: function (text) {
			
		},
		oncomplete: function (text) {
			if (text) {
				Account.username = text;
			} else {
				$('#usernameTextInput').find('input:not("button")').val(Account.username);
			}
			SceneLogin.selected = 1;
			$('#passwordTextInput').sfTextInput('focus');
		},
		onkeypadchanged: function (keypadtype) {
			var width = $('#usernameTextInput').width();
			var offset = $('#usernameTextInput').offset();
			if (keypadtype.toLowerCase() === '12key') {
				
			} else {
				
			}
			$('#usernameTextInput').sfTextInput('setKeypadPos', offset.left + width + 50, offset.top);
		}
	});
	$('#usernameTextInput').find('input:not("button")').val(Account.username);
	
	$('#passwordTextInput').sfTextInput({
		text:'',
		maxlength:20,
		ontextchanged: function (text) {
			
		},
		oncomplete: function (text) {
			if (text) {
				Account.password = text;
			} else {
				$('#passwordTextInput').find('input:not("button")').val(Account.password);
			}
			SceneLogin.selected = 2;
			$('#loginButton').sfButton('focus');
		},
		onkeypadchanged: function (keypadtype) {
			var width = $('#passwordTextInput').width();
			var offset = $('#passwordTextInput').offset();
			if (keypadtype.toLowerCase() === '12key') {
				
			} else {
				
			}
			$('#passwordTextInput').sfTextInput('setKeypadPos', offset.left + width + 50, offset.top);
		}
	});
	$('#passwordTextInput').find('input:not("button")').val(Account.password);
	
	$('#loginButton').sfButton({
		text:'Login'
	});
	$('#mainHeader').sfLabel({
		text:'Univision AnywhereTV'
	});
};

SceneLogin.prototype.handleShow = function (data) {
	alert("SceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene
	
	$('#passwordTextInput').removeClass("focused", 0);
	$('#loginButton').sfButton('blur');
	$('#usernameTextInput').sfTextInput('focus');
	
	document.getElementById('passwordTextInput').children[1].children[0].setAttribute('type', 'password');
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
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			this.selectNext(-1);
			break;
		case sf.key.RIGHT:
			SceneLogin.selectNext(1);
			break;
		case sf.key.UP:
			SceneLogin.selectNext(-1);
			break;
		case sf.key.DOWN:
			SceneLogin.selectNext(1);
			break;
		case sf.key.ENTER:
			if (SceneLogin.selected == 2) {
				SceneLogin.login();
			}
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
