alert('SceneMainMenu.js loaded');

function SceneMainMenu() {

};

SceneMainMenu.prototype.initialize = function () {
	alert("SceneMainMenu.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#channelList').sfList({
		data: Univision.CHANNEL_NAMES,
		index: 0,
		itemsPerPage: 14
	});
};

SceneMainMenu.prototype.handleShow = function (data) {
	alert("SceneMainMenu.handleShow()");
	// this function will be called when the scene manager show this scene
	
	$('#channelList').sfList('move', Univision.currentChannelIndex);
};

SceneMainMenu.prototype.handleHide = function () {
	alert("SceneMainMenu.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneMainMenu.prototype.handleFocus = function () {
	alert("SceneMainMenu.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneMainMenu.prototype.handleBlur = function () {
	alert("SceneMainMenu.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneMainMenu.prototype.handleKeyDown = function (keyCode) {
	alert("SceneMainMenu.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			Univision.channelDown();
			$('#channelList').sfList('move', Univision.currentChannelIndex);
			break;
		case sf.key.DOWN:
			Univision.channelUp();
			$('#channelList').sfList('move', Univision.currentChannelIndex);
			break;
		case sf.key.ENTER:
			sf.scene.hide('MainMenu');
			sf.scene.show('UnivisionVideoPlayer');
			sf.scene.focus('UnivisionVideoPlayer');
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};