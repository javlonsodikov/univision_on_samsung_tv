alert('SceneLoading.js loaded');

function SceneLoading() {

};

SceneLoading.prototype.initialize = function () {
	alert("SceneLoading.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#loadingImage').sfLoading('show');
	$('#statusMessage').sfLabel({
		text: 'Loading'
	});
};

SceneLoading.prototype.handleShow = function (data) {
	alert("SceneLoading.handleShow()");
	// this function will be called when the scene manager show this scene
	
	Univision.login();
};

SceneLoading.prototype.handleHide = function () {
	alert("SceneLoading.handleHide()");
	// this function will be called when the scene manager hide this scene
	
	$('#loadingImage').sfLoading('hide');
};

SceneLoading.prototype.handleFocus = function () {
	alert("SceneLoading.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneLoading.prototype.handleBlur = function () {
	alert("SceneLoading.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneLoading.prototype.handleKeyDown = function (keyCode) {
	alert("SceneLoading.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
