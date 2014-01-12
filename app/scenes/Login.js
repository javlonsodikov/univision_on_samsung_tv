alert('SceneLogin.js loaded');

function SceneLogin() {

};

SceneLogin.prototype.initialize = function () {
	alert("SceneLogin.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#usernameTextInput').sfTextInput({
		text:'',
		maxlength:20,
		ontextchanged: function (text) {
			
		},
		oncomplete: function (text) {
			
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
	$('#passwordTextInput').sfTextInput({
		text:'',
		maxlength:20,
		ontextchanged: function (text) {
			alert("**************************************** texi");
		},
		oncomplete: function (text) {
			alert("*********************************** compi");
		},
		onkeypadchanged: function (keypadtype) {
			alert("---------------------------------------- keypad changed");
			var width = $('#passwordTextInput').width();
			var offset = $('#passwordTextInput').offset();
			if (keypadtype.toLowerCase() === '12key') {
				alert( "------************************************ 12key ");
			} else {
				alert("**************************************************** ktype:  " + keypadtype.toLowerCase());
			}
			$('#passwordTextInput').sfTextInput('setKeypadPos', offset.left + width + 10, offset.top);
		}
	});
	$('#loginButton').sfButton({
		text:'Login'
	});
	$('#usernameLabel').sfLabel({
		text:'Username:'
	});
	$('#passwordLabel').sfLabel({
		text:'Password:'
	});
};

SceneLogin.prototype.handleShow = function (data) {
	alert("SceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene
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
			break;
		case sf.key.RIGHT:
			
			break;
		case sf.key.UP:
			
			break;
		case sf.key.DOWN:
			alert("Down key pressed -----");
			if($('#usernameTextInput').hasClass('active')){
				alert("*********************************************************Username has focus");
			}else if($('#passwordTextInput').hasClass('active')){
				alert("*********************************************************Password has focus");
			}
			//$('#passwordTextInput').sfTextInput('focus');
			break;
		case sf.key.ENTER:
			
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
