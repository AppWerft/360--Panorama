

exports.get = function(_callback) {
	function getFeed() {
		var path = '/Mertens.Photography/albums';
		var params = {
			fields : 'photos',
			locale : 'de_DE'
		};
		path = '/fql?q=' + encodeURI('SELECT url,id FROM object_url WHERE url IN ("http://hamburger-appwerft.de/referenzen/miba-piano-radiostation/")');
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
		Ti.Facebook.requestWithGraphPath('/100000612371896/og.likes', {
			object : 'http://hamburger-appwerft.de/referenzen/miba-piano-radiostation/'
		}, 'POST', function(_fb) {
			Ti.API.log(_fb);
		});
	}


	Ti.Facebook.appid = '171558046317269';
	Ti.Facebook.permissions = ['read_friendlists', 'publish_actions', 'read_stream', 'user_likes', 'friends_likes'];
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

