exports.create = function() {
	var self= Ti.UI.createWindow({});
	require('/modules/facebookphoto').get(function(data){
		Ti.API.log(data);
	}); 
	return self;
}
