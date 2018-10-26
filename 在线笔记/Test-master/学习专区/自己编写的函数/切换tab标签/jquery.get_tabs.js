Object.prototype.get_tabs = function(opt) {
	var aLis = $(opt.tabsid).children();
	var aContents = $(opt.contentid).children();
	var bgcolor = opt.bgcolor ? opt.bgcolor : 'cornflowerblue';
	
	if (aLis.eq(0).css("background-color") != bgcolor || aLis.eq(0).css("background-color") == "") {
		aLis.eq(0).css({"background-color":bgcolor});
	};
	
	if (aContents.css("display") != "none") {
		aContents.css({"display":"none"});
	};
	
	if (aContents.eq(0).css("display") != "block" || aContents.eq(0).css("display") == "none") {
		aContents.eq(0).css({"display":"block"});
	};
	
	aLis.click(function() {
		var index = $(this).index();
		$(this).css({ "background-color": bgcolor }).siblings().css({ "background-color": "" });
		aContents.eq(index).css({ "display": "block" }).siblings().css({ "display": "none" });
	});
};