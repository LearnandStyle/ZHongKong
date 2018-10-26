function getByClass(oParent, sClass) {
	var elements = [];
	var aEl = oParent.getElementsByTagName("*");

	for (var i = 0; i < aEl.length; i++) {
		if (aEl[i].className == sClass) {
			elements.push(aEl[i]);
		}
	}
	return elements;
}