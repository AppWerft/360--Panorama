exports.create = function() {
	var self = Ti.UI.createWindow({
		navBarHidden : true,
		backgroundColor : 'transparent'
	});
	self.web = Ti.UI.createWebView({
		url : 'https://www.facebook.com/Mertens.Photography?locale=de_DE',
		backgroundColor : 'transparent'
	});
	self.add(self.web);
	return self;
	self.container = Ti.UI.createScrollView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		layout : 'vertical'
	});
	self.add(self.container);

	require('/modules/facebookpage').get(function(_data) {

		self.cover = Ti.UI.createView({
			width : 320,
			height : 160,
			backgroundImage : _data.cover.source,
			top : 0
		});
		self.cover.addEventListener('click', function() {
			self.tab.open(require('/modules/fbphotowindow').create());
		});
		self.cover.add(Ti.UI.createLabel({
			text : _data.name,
			bottom : 5,
			color : 'white',
			font : {
				fontSize : 22,
				fontWeight : 'bold'
			}
		}));

		self.container.add(self.cover);
		self.feed = Ti.UI.createTableView({
			top : 0
		});
		self.container.add(self.feed);
		require('/modules/facebookfeeds').get(function(_data) {
			var rows = [];
			for (var i = 0; i < _data.length; i++) {
				if (_data[i].name)
					rows[i] = require('/modules/facebookfeed').create(_data[i]);
			}
			self.feed.setData(rows);
			self.feed.addEventListener('click', function(_e) {
				self.tab.open(require('/modules/feedfull').create(_e.rowData.feed));
			})
		});
	});
	return self;
}
