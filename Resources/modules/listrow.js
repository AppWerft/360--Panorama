exports.create = function(p) {
	var self = Ti.UI.createTableViewRow({
		height : 40
	});
	self.add(Ti.UI.createLabel({
		text : p.subtitle,
		left : 160
	}))
	self.add(Ti.UI.createImageView({
		width: 120,
		height:50,
		image : '/assets/panos/thumbs/' + p.title + '_' + p.subtitle.toLowerCase() + '.jpg',
		left : 0
	}));
	return self;
}
