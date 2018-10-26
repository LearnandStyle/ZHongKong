
function random(min,max){
	if(isArray(min)){
		return min[Math.random()*min.length];
	}else {
		return min+Math.random()*(max - min);
	}
}

function isArray (object) {
	return Object.prototype.toString.call(object)==="[object Array]";
}