var Univision = {
	
};

Univision.AVAILABLE_BITRATES = [1200000, 750000, 500000];

Univision.CHANNEL_IDS = [1, 24, 23, 3, 22, 4, 26, 25, 27, 31, 32, 5, 2, 38, 39, 9, 41, 42];
Univision.CHANNEL_NAMES = ["mnb", "mnb_2", "edu", "ubs", "mn25", "ntv", "tv5", "eagle", "sbn", "tv9", "sportbox", "etv", "mongolhd", "royal", "mnc", "ehoron", "bloomberg", "parliament"];

Univision.CURRENT_TV_SCHEDULE_CHANNEL_ORDER = [1, 17, 0, 4, 3, 7, 5, 11, 2, 6, 8, 9, 15, 16, 12, 10, 13, 14];
Univision.CURRENT_TV_SCHEDULE_NAMES = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
Univision.CURRENT_TV_SCHEDULE_TIMES = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

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
	var url = 'http://202.70.32.50/hls/_definst_/tv_mid/smil:'
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
		url: "http://my.univision.mn/index.php/login",
		type: "get",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var response = XMLHttpRequest.responseText;
			var csrfTokenIndex = response.indexOf("_csrf_token");
			if (csrfTokenIndex > 0) {
				var csrfToken = response.substring(csrfTokenIndex + 21, csrfTokenIndex + 21 + 32);
				alert("csrf: " + csrfToken);
				
				$.ajax({
					url: "http://my.univision.mn/index.php/login",
					type: "post",
					data: {
						"signin[_csrf_token]": csrfToken,
						"signin[username]": Account.USERNAME,
						"signin[password]": Account.PASSWORD,
						"submit": "Нэвтрэх"
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						Univision.onLoginFailed();
					},
					success: function(data) {
						Univision.onLoginSuccessful();
					}
				});
			} else {
				Univision.onLoginSuccessful();
			}
		},
		success: function(data) {
			Univision.onLoginSuccessful();
		}
	});
};

Univision.onLoginFailed = function() {
	alert("login failed");
	Univision.showMessageInLoadingScene("login failed!");
};

Univision.onLoginSuccessful = function() {
	alert("login successful");
	Univision.showMessageInLoadingScene("login successful");
	
	// fetch current TV schedule
	Univision.fetchCurrentTvSchedule();
	
	// fetch session id
	$.ajax({
		url: "http://tv.univision.mn/24/watch",
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
		url: "http://tv.univision.mn/",
		type: "get",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
		},
		success: function(data) {
			var tvlist = $(data).find('ul.tvlist');
			if (tvlist != null) {
				var channelIndex = 0;
	            tvlist.children().each(function() {
	            	var liElement = $(this);
	            	var scheduleHtmlText = liElement.find('div.schedule-now').html().trim().replace('<em>', '').replace('</em>', '');
	            	if (scheduleHtmlText.indexOf('<br>') >= 0) {
		            	var scheduleTime = scheduleHtmlText.split('<br>')[0];
		            	var scheduleName = scheduleHtmlText.split('<br>')[1];
		            	Univision.CURRENT_TV_SCHEDULE_TIMES[Univision.CURRENT_TV_SCHEDULE_CHANNEL_ORDER[channelIndex]] = scheduleTime;
		            	Univision.CURRENT_TV_SCHEDULE_NAMES[Univision.CURRENT_TV_SCHEDULE_CHANNEL_ORDER[channelIndex]] = scheduleName;
	            	}
	            	channelIndex++;
	            });
	            
	            sf.scene.get('MainMenu').updateCurrentTvSchedule();
			}
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
