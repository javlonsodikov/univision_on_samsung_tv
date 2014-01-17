var Account = {
		
};

Account.ACCOUNT_FILE = 'accdata.dat';
Account.USERNAME_PREFIX = 'username=';
Account.PASSWORD_PREFIX = 'password=';

Account.username = '';
Account.password = '';

Account.loadFromFile = function() {
	var fs = new FileSystem();
	if(fs.isValidCommonPath(curWidget.id) == 0) {
		fs.createCommonDir(curWidget.id);
	}
	
	var af = fs.openCommonFile(curWidget.id + "/" + Account.ACCOUNT_FILE, "a+");
	
	var line = '';
	while(line = af.readLine()){
		if (line.substring(0, Account.USERNAME_PREFIX.length) == Account.USERNAME_PREFIX) {
			alert('username found');
			Account.username = line.substring(Account.USERNAME_PREFIX.length, line.length);
		}
		if (line.substring(0, Account.PASSWORD_PREFIX.length) == Account.PASSWORD_PREFIX) {
			alert('password found');
			Account.password = line.substring(Account.PASSWORD_PREFIX.length, line.length);
		}
	}
	
	fs.closeCommonFile(af);
};

Account.saveToFile = function() {
	var fs = new FileSystem();
	if(fs.isValidCommonPath(curWidget.id) == 0) {
		fs.createCommonDir(curWidget.id);
	}
	
	var af = fs.openCommonFile(curWidget.id + "/" + Account.ACCOUNT_FILE, "w");
	
	af.writeAll(Account.USERNAME_PREFIX + Account.username + "\n" + Account.PASSWORD_PREFIX + Account.password);
	
	fs.closeCommonFile(af);
};