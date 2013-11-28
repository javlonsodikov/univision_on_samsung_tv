var Univision = {
	
};

Univision.CHANNEL_NAMES = ["mnb", "mnb_2", " edu", "ubs", "mn25", "ntv", "tv5", "eagle", "sbn", "tv9", "sportbox", "etv", "mongolhd", "royal", "mnc", "ehoron", "bloomberg", "parliament"];
Univision.AVAILABLE_BITRATES = [1200000, 750000, 500000];

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
	Univision.showError("LOGF");
};

Univision.onLoginSuccessful = function() {
	alert("login successful");
	
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
	Univision.showError("SESERR");
};

Univision.onSessionIdFound = function(sessionId) {
	this.sessionId = sessionId;
	alert(sessionId + " found!");
		
	Univision.playCurrentChannel();
};

Univision.playCurrentChannel = function() {
	sf.service.VideoPlayer.stop();
	var currentChannel = Univision.getCurrentChannel();
	if (currentChannel != null) {
		alert("video url: " + currentChannel.url);
		Univision.showCurrentChannelName();
		sf.service.VideoPlayer.play(Univision.getCurrentChannel());
	} else {
		Univision.showError("INVCH");
	}
};

Univision.showCurrentChannelName = function() {
	$("#channelName").text(Univision.CHANNEL_NAMES[this.currentChannelIndex]);
}

Univision.showError = function(error) {
	$("#channelName").text(error);
};
