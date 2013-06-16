exports.create = function() {
	var self = Titanium.UI.createWindow({
		navBarHidden : true
	});
	var panoObj = require('/modules/panoramaview');
	self.panoContainer = Ti.UI.createView({
		bottom : 0,
		height : 320,
		width : Ti.UI.FILL
	});
	var Pano = new panoObj({
		total : 7,
		view : self.panoContainer
	});
	self.add(self.panoContainer);
	self.listView = Ti.UI.createTableView();
	Ti.include('/panos.js');
	for (var i = 0; i < panos.length; i++) {
		self.listView.appendRow(require('/modules/listrow').create(panos[i]));
	}
	self.add(self.listView);
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == Ti.UI.PORTRAIT || e.orientation == Ti.UI.UPSIDE_PORTRAIT) {
			self.panoContainer.height = 0;
			self.listView.show();
			self.listView.height = 480;
		} else {
			self.panoContainer.height = Ti.UI.FILL;
			self.listView.hide();
		}
	});
	return self;
}