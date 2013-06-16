exports.create = function(tabGroup) {
	var REGION = {
		latitude : 50,
		longitude : 10,
		latitudeDelta : 7,
		longitudeDelta : 7
	};
	var self = Titanium.UI.createWindow({
		navBarHidden : true
	});
	var panoObj = require('/modules/panoramaview');
	self.panoContainer = Ti.UI.createView({
		bottom : 0,
		height : 300,
		width : Ti.UI.FILL
	});
	var Pano = new panoObj({
		total : 7,
		parent : self,
		view : self.panoContainer
	});
	self.add(self.panoContainer);
	self.mapView = require('/modules/mapview').create(REGION);
	self.add(self.mapView);
	self.mapView.addEventListener('setpano', function(_e) {
		;
		self.mapselected = true;
		self.mapView.height = 200;
		self.mapView.region = {
			latitude : _e.pano.latlon.split(',')[0],
			longitude : _e.pano.latlon.split(',')[1],
			latitudeDelta : 0.07,
			longitudeDelta : 0.07
		};
		Pano.setImage(_e.pano);
	});
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		Ti.API.debug(e);
		if (e.orientation == 1 || e.orientation == 2 ||  e.orientation == 5 ) {
			tabGroup.bottom = 0;
			self.panoContainer.height = 300;
			setTimeout(function() {
				self.mapView.show();
				self.mapView.startLayout();
				self.mapView.height = 430;
				self.mapView.setRegion(REGION);
				self.mapView.finishLayout();
			}, 700);
		} else {
			tabGroup.bottom = -50;
			if (self.mapselected) {
				self.panoContainer.height = Ti.UI.FILL;
				self.mapView.hide();
			}
		}
	});
	return self;
}