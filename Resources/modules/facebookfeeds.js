exports.get = function(_callback) {
	function getFeed() {
		var path = '/Mertens.Photography/feed?locale=de_DE';
		Ti.Facebook.requestWithGraphPath(path, {}, 'GET', function(_fb) {
			if (_fb.success) {
				var result = JSON.parse(_fb.result);
				if (result.data.length == 0) {
					_callback(null);
					return;
				}
				_callback(result.data);
			} else {
				_callback(null);
			}
		});
	}
	Ti.Facebook.appid = '202972656504444';
	Ti.Facebook.permissions = ['read_friendlists', 'publish_stream', 'read_stream', 'user_likes', 'friends_likes'];
	if (Ti.Facebook.loggedIn == false) {
		Ti.Facebook.authorize();
		Ti.Facebook.addEventListener('login', function(_e) {
			if (_e.success == true) {
				getFeed();
			}
		});
	} else
		getFeed();
};


