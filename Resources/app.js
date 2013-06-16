Ti.UI.iPhone.hideStatusBar();

var self = Titanium.UI.createTabGroup();
var tab0 = Titanium.UI.createTab({
	icon : '/assets/59-flag.png',
	title : 'Karte',
	window : require('/modules/mapwindow').create(self)
});
var tab2 = Titanium.UI.createTab({
	icon : '/assets/208-facebook.png',
	title : 'Facebook',
	window : require('/modules/facebookwindow').create()
});
var tab1 = Titanium.UI.createTab({
	icon : '/assets/259-list.png',
	title : 'Liste',
	window : require('/modules/listwindow').create()
});
self.addTab(tab0);
self.addTab(tab1);
self.addTab(tab2);

self.open();
