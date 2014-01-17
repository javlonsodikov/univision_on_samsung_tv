alert('SceneLogin.js loaded');

function SceneLogin() {
	var selected = 0;
	
	this.selectNext = function(direction) {
		selected += direction;
		if (selected < 0) {
			selected = 2;
		}
		if (selected > 2) {
			selected = 0;
		}
		
		if (selected == 0) {
			$('#passwordTextInput').sfTextInput('blur');
			$('#loginButton').sfButton('blur');
			$('#usernameTextInput').sfTextInput('focus');
		} else if (selected == 1) {
			$('#usernameTextInput').sfTextInput('blur');
			$('#loginButton').sfButton('blur');
			$('#passwordTextInput').sfTextInput('focus');
		} else {
			$('#passwordTextInput').sfTextInput('blur');
			$('#usernameTextInput').sfTextInput('blur');
			$('#loginButton').sfButton('focus');
		}
	};
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
				Account.USERNAME = text;
			} else {
				$('#usernameTextInput').find('input:not("button")').val(Account.USERNAME);
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
			$('#usernameTextInput').sfTextInput('setKeypadPos', offset.left + width + 10, offset.top);
		}
	});
	$('#usernameTextInput').find('input:not("button")').val(Account.USERNAME);
	
	$('#passwordTextInput').sfTextInput({
		text:'',
		maxlength:20,
		ontextchanged: function (text) {
			
		},
		oncomplete: function (text) {
			if (text) {
				Account.USERNAME = text;
			} else {
				$('#passwordTextInput').find('input:not("button")').val(Account.PASSWORD);
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
			$('#passwordTextInput').sfTextInput('setKeypadPos', offset.left + width + 10, offset.top);
		}
	});
	$('#passwordTextInput').find('input:not("button")').val(Account.PASSWORD);
	
	$('#loginButton').sfButton({
		text:'Login'
	});
};

SceneLogin.prototype.handleShow = function (data) {
	alert("SceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene
	
	$('#usernameTextInput').sfTextInput('focus');
	$('#passwordTextInput').removeClass("focused", 0);
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
			this.selectNext(1);
			break;
		case sf.key.UP:
			this.selectNext(-1);
			break;
		case sf.key.DOWN:
			this.selectNext(1);
			break;
		case sf.key.ENTER:
			if (this.selected == 2) {
				alert("Please login!");
			}
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
