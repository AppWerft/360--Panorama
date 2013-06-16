function Panorama(options) {
	return this.init(options);
}

Panorama.prototype.removeImages = function() {
	for (var i = 0; i < this.options.total; i++) {
		try {
			this.panocontainer.remove(this.images[i]);
		} catch(E) {
		}
	}
};      

Panorama.prototype.init = function(options) {
	this.options = options;
	if (!options || typeof (options.view) != 'object') {
		Ti.API.log('view is not object');
		return null;
	}
	this.images = [];
	this.panocontainer = Ti.UI.createScrollView({
		showVerticalScrollIndicator : false,
		showHorizontalScrollIndicator : false,
		contentHeight : this.options.view.getHeight(),
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		visible : true
	});
	this.options.view.add(this.panocontainer);
	for (var i = 0; i < this.options.total; i++) {
		this.images[i] = Ti.UI.createImageView({
			top : 0,
			height : Ti.UI.FILL,
		});
		this.panocontainer.add(this.images[i]);
	}
	this.navi = Ti.UI.createView({
		bottom : 0,
		height : 40,
		opacity : 0.3,
		backgroundColor : 'black'
	});
	this.titlelabel = Ti.UI.createLabel({
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		left : 10,
		color : 'white'
	});
	this.navi.add(this.titlelabel);
	this.options.view.add(this.navi);
	return this;
}

Panorama.prototype.setImage = function(_pano) {
	this.titlelabel.text = _pano.title + ' ' + _pano.subtitle;
	this.imagepath = _pano.panopath;
	var self = this;
	Ti.API.log(this.imagepath);
	var testImg = Ti.UI.createImageView({
		image : this.imagepath,
		height : Ti.UI.FILL,
		width : Ti.UI.SIZE || 'auto',
		visible : true
	});
	var img = testImg.toImage();
	var width = self.panocontainer.getSize().height * img.width / img.height;
	self.panocontainer.contentWidth = self.options.total * width;
	for (var i = 0; i < self.options.total; i++) {
		self.images[i].setImage(img);
		self.images[i].left = width * i;
		self.images[i].height = self.options.view.getHeight();
		self.images[i].width = width;
	}
	self.panocontainer.contentOffset = {
		x : self.options.total * width / 2,
		y : 0
	};
	self.options.view.fireEvent('complete', {
		image : self.image
	});
};

module.exports = Panorama;
