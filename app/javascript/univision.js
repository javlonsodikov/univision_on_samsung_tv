var Univision = {
	
};

Univision.AVAILABLE_BITRATES = [1200000, 750000, 500000];

Univision.CHANNEL_IDS = [1, 24, 23, 3, 22, 4, 26, 25, 27, 31, 5, 2, 38, 39, 9, 41, 42];
Univision.CHANNEL_NAMES = ["mnb", "mnb_2", "edu", "ubs", "mn25", "ntv", "tv5", "eagle", "sbn", "tv9", "etv", "mongolhd", "royal", "mnc", "ehoron", "bloomberg", "parliament"];

Univision.CURRENT_TV_SCHEDULE_CHANNEL_ORDER = [1, 16, 0, 4, 3, 7, 5, 10, 2, 6, 8, 9, 14, 15, 11, 12, 13];
Univision.CURRENT_TV_SCHEDULE_NAMES = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
Univision.CURRENT_TV_SCHEDULE_TIMES = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

Univision.VERSION=99;

Univision.currentChannelIndex = 0;
Univision.sessionId = null;
Univision.currentBitrateIndex = 0;

Univision.channelUp = function() {
	this.currentChannelIndex += 1;
	if (this.currentChannelIndex >= Univision.CHANNEL_NAMES.length) {
		this.currentChannelIndex = 0;
	}
};

Univision.channelDown = function() {
	this.currentChannelIndex -= 1;
	if (this.currentChannelIndex < 0) {
		this.currentChannelIndex = Univision.CHANNEL_NAMES.length - 1;
	}
};

Univision.setCurrentBitrateIndex = function(i) {
	if (i >= 0 && i < Univision.AVAILABLE_BITRATES.length) {
		this.currentBitrateIndex = i;
	}
};

Univision.getCurrentChannel = function() {
	if (this.sessionId == null) {
		Univision.onSessionIdNotFound();
		return null;
	}
	var url = 'http://202.70.45.36/hls/_definst_/tv_mid/smil:'
								+ Univision.CHANNEL_NAMES[this.currentChannelIndex]
								+ '.smil/playlist.m3u8?' + this.sessionId + '|BITRATES=' + Univision.AVAILABLE_BITRATES[this.currentBitrateIndex] + '|COMPONENT=HLS';
	return { url: url, title: Univision.CHANNEL_NAMES[this.currentChannelIndex]};
};

Univision.logout = function() {
	$.ajax({
		url: "http://my.univision.mn/logout",
		type: "get",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("logout error");
			Univision.login();
		},
		success: function(data) {
			alert("logout success");
			Univision.login();
		}
	});
};

Univision.login = function() {
	$.ajax({
		url: "http://my.univision.mn/user/loginformobile",
		type: "post",
		data: {
			"username": Account.username,
			"password": Account.password
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Univision.onLoginFailed();
		},
		success: function(data) {
			if (data.indexOf("1") >= 0) {
				Univision.onLoginSuccessful();
			} else {
				Univision.onLoginFailed();
			}
		}
	});
};

Univision.onLoginFailed = function() {
	alert("login failed");
	Univision.showMessageInLoadingScene("login failed!");
	
	setTimeout(function () {
        sf.scene.hide('Loading');
        sf.scene.show('Login');
        sf.scene.focus('Login');
	}, 2000);
};

Univision.onLoginSuccessful = function() {
	alert("login successful");
	Univision.showMessageInLoadingScene("login successful");
	
	// fetch current TV schedule
	Univision.fetchCurrentTvSchedule();
	
	// fetch session id
	$.ajax({
		url: "http://tv.univision.mn/tv/getStreamUrl?version="+Univision.VERSION+"&username="+Account.username+"&live=",
		type: "get",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Univision.onSessionIdNotFound();
		},
		success: function(data) {
			var m3u8Index = data.indexOf("m3u8?");
			if (m3u8Index > 0) {
				Univision.onSessionIdFound(data.substring(m3u8Index + 5, m3u8Index + 5 + 32));
			} else {
				Univision.onSessionIdNotFound();
			}
		}
	});
};

Univision.onSessionIdNotFound = function() {
	alert("session id not found!");
	Univision.showMessageInLoadingScene("session id not found!");
};

Univision.onSessionIdFound = function(sessionId) {
	this.sessionId = sessionId;
	alert(sessionId + " found!");
	Univision.showMessageInLoadingScene("session id found");
	
	sf.scene.hide('Loading');
	sf.scene.show('MainMenu');
	sf.scene.focus('MainMenu');
};

Univision.fetchCurrentTvSchedule = function() {
	$.ajax({
		url: "http://tv.univision.mn/tv/xml?id=" + Account.username,
		type: "get",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
		},
		success: function(data) {
			$(data).find("item").each(function() {
				var channelId = parseInt($(this).find("id").text());
				var schedule = $(this).find("schedule").text();
				var splitIndex = schedule.lastIndexOf(":");
				var scheduleTime = schedule.substring(0, splitIndex);
				var scheduleName = schedule.substring(splitIndex+1);
				
				var channelIndex = Univision.CHANNEL_IDS.indexOf(channelId);
				Univision.CURRENT_TV_SCHEDULE_TIMES[channelIndex] = scheduleTime;
				Univision.CURRENT_TV_SCHEDULE_NAMES[channelIndex] = scheduleName;
			});
			sf.scene.get('MainMenu').updateCurrentTvSchedule();
		}
	});
};

Univision.playCurrentChannel = function() {
	sf.service.VideoPlayer.stop();
	var currentChannel = Univision.getCurrentChannel();
	if (currentChannel != null) {
		alert("video url: " + currentChannel.url);
		sf.scene.get('UnivisionVideoPlayer').showCurrentChannelInfo();
		sf.service.VideoPlayer.play(Univision.getCurrentChannel());
	} else {
		Univision.showError("INVCH");
	}
};

Univision.showError = function(error) {
	alert(error);
};

Univision.showMessageInLoadingScene = function(message) {
	$("#statusMessage").sfLabel("option", "text", message);
};
