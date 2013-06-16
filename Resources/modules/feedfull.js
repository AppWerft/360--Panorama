exports.create = function(feed) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	Ti.API.log(feed.picture	);
	var picture = Ti.UI.createImageView({
		image : feed.picture.replace(/_s\.jpg/, '_b.jpg'),
		top : 0
	});
	picture.width = 320;
	picture.height = picture.toImage().height / picture.toImage().width * 320;

	self.add(picture);
	return self;
}
