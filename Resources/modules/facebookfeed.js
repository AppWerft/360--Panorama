exports.create = function(feed) {
	var image = feed.picture;
	var row = Ti.UI.createTableViewRow({
		hasChild : true,
		feed: feed,
		image: image
	});
	row.add(Ti.UI.createImageView({
		image : feed.picture,
		width : 90,
		height : 90,
		left : 0,
		top : 0
	}));
	row.container = Ti.UI.createView({
		left : 100,
		layout : 'vertical',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	row.container.add(Ti.UI.createLabel({
		text : feed.name,
		color: 'gray',
		left:0,
		font : {
			fontWeight : 'bold',
			fontSize : 21
		}
	}));
	row.container.add(Ti.UI.createLabel({
		text : feed.caption,
		height:40,
		left:0,
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	row.add(row.container);
	return row;
}
