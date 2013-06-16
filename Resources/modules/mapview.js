exports.create = function(region) {
	Ti.include('/panos.js');
	var self = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		top : 0,
		region : region,
		animate : true,
		regionFit : true,
		userLocation : true

	});
	for (var i = 0; i < panos.length; i++) {
		var p = panos[i];
		p.panopath = '/assets/panos/' + p.title + '_' + p.subtitle.toLowerCase() + '.jpg';
		self.addAnnotation(Titanium.Map.createAnnotation({
			latitude : p.latlon.split(',')[0],
			longitude : p.latlon.split(',')[1],
			title : p.title,
			subtitle : p.subtitle,
			leftView : Ti.UI.createImageView({
				width : 70,
				height : 30,
				image : '/assets/' + p.title + '.png'
			}),
			animate : true,
			image : '/assets/rad.png',
			pano : p
		}));
	}
	self.addEventListener('click', function(_e) {
		if (_e.annotation && _e.annotation.pano)
			self.fireEvent('setpano', {
				pano : _e.annotation.pano
			});
	});
	return self;

}
