alert('SceneUnivisionVideoPlayer.js loaded');

function SceneUnivisionVideoPlayer() {

};

SceneUnivisionVideoPlayer.prototype.initialize = function () {
	alert("SceneUnivisionVideoPlayer.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	sf.service.VideoPlayer.init({
		onerror:function(error){
			alert(error);
		}
	});
	//sf.service.VideoPlayer.setKeyHandler(sf.key.RETURN, 
	//function(){
	//	sf.service.VideoPlayer.setFullScreen(false);
	//});
	var vLeft = parseInt($("#videoPlayer").css('left'));
	var vTop = parseInt($("#videoPlayer").css('top'));
	var vHeight = parseInt($("#videoPlayer").css('height'));
	var vWidth = parseInt($("#videoPlayer").css('width'));
	var vInfoBarWidth = parseInt($("#sf-service-videoplayer-mini-infobar").css('width'));
	sf.service.VideoPlayer.setPosition({
		left:vLeft,
		top:vTop,
		width:vWidth,
		height:vHeight+vInfoBarWidth
	});
	
	// disable info bar
	//$('#sf-service-videoplayer-mini-infobar').hide();
};

SceneUnivisionVideoPlayer.prototype.gotoMainMenu = function () {
	sf.scene.hide('UnivisionVideoPlayer');
	sf.scene.show('MainMenu');
	sf.scene.focus('MainMenu');
};

SceneUnivisionVideoPlayer.prototype.showCurrentChannelInfo = function () {	
	$("#channelName").text(Univision.CHANNEL_NAMES[Univision.currentChannelIndex]);
	$("#channelCurrentProgramInfo").text(Univision.CURRENT_TV_SCHEDULE_NAMES[Univision.currentChannelIndex]);
	$("#channelCurrentProgramTime").text(Univision.CURRENT_TV_SCHEDULE_TIMES[Univision.currentChannelIndex]);
	
	$("#channelInfo").show();
	setTimeout(function() {
		$("#channelInfo").hide();
	}, 10000);
};

SceneUnivisionVideoPlayer.prototype.handleShow = function (data) {
	alert("SceneUnivisionVideoPlayer.handleShow()");
	// this function will be called when the scene manager show this scene
	
	sf.service.VideoPlayer.show();
	Univision.playCurrentChannel();
};

SceneUnivisionVideoPlayer.prototype.handleHide = function () {
	alert("SceneUnivisionVideoPlayer.handleHide()");
	// this function will be called when the scene manager hide this scene
	
	sf.service.VideoPlayer.stop();
	sf.service.VideoPlayer.hide();
};

SceneUnivisionVideoPlayer.prototype.handleFocus = function () {
	alert("SceneUnivisionVideoPlayer.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneUnivisionVideoPlayer.prototype.handleBlur = function () {
	alert("SceneUnivisionVideoPlayer.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneUnivisionVideoPlayer.prototype.handleKeyDown = function (keyCode) {
	alert("SceneUnivisionVideoPlayer.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.LEFT:
			this.gotoMainMenu();
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.CH_UP:
			Univision.channelUp();
			Univision.playCurrentChannel();
			break;
		case sf.key.CH_DOWN:
			Univision.channelDown();
			Univision.playCurrentChannel();
			break;
		case sf.key.ENTER:
			this.gotoMainMenu();
			break;
		case sf.key.INFO:
			this.showCurrentChannelInfo();
			break;
		case sf.key.N1:
			Univision.setCurrentBitrateIndex(0);
			Univision.playCurrentChannel();
			break;
		case sf.key.N2:
			Univision.setCurrentBitrateIndex(1);
			Univision.playCurrentChannel();
			break;
		case sf.key.N3:
			Univision.playCurrentChannel();
			Univision.setCurrentBitrateIndex(2);
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
