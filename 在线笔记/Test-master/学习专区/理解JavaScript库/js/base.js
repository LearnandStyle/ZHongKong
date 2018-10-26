//类形式
/*前台调用*/
var $ = function (_this) {
		return new Base(_this);
	}
	/*基础库*/
function Base(_this) {
	//创建一个数组，保存获取的节点和节点数组
	this.elements = [];
	if (_this != undefined) { //_this是一个对象，undefined也是一个对象
		this.elements[0] = _this;
	}
}
//获取id节点
Base.prototype.getId = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};
//获取元素节点
Base.prototype.getTagName = function (tagName) {
		var tags = document.getElementsByTagName(tagName);
		for (var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i]);
		}
		return this;
	}
	//通过classname 获取节点数组
Base.prototype.getClass = function (className, idName) {
	var node = null;
	if (arguments.length == 2) {
		node = document.getElementById(idName);
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++) {
		if (all[i].className == className) {
			this.elements.push(all[i]);
		}
	}
	return this;
};
//添加class类
Base.prototype.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
				this.elements[i].className += '' + className;
			}
		}
		return this;
	}
	//移除class
Base.prototype.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
			}
		}
		return this;
	}
	//添加link或stule的css规则
Base.prototype.addRule = function (num, selectorText, cssText, position) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.insertRule != 'undefined') {
			sheet.insertRule(selectorText + '{' + cssText + '}', position);
		} else if (typeof sheet.addRule != 'undefined') {
			sheet.addRule(selectorText, cssText, position);
		}
		return this;
	}
	//移除link或style的css规则
Base.prototype.removeRule = function (num, index) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.insertRule != 'undefined') {
			sheet.deleteRule(index);
		} else if (typeof sheet.removeRule != 'undefined') {
			sheet.removeRule(index);
		}
		return this;
	}
	//获取某一个节点
Base.prototype.getElement = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

/*设置css样式*/
Base.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			if (typeof window.getComputedStyle != 'undefined') {
				return window.getComputedStyle(this.elements[i], null)[attr];
			} else if (typeof this.elements[i].currentStyle != 'undefined') {
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
/*设置innerhtml*/
Base.prototype.text = function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}; /*触发点击事件*/
Base.prototype.click = function (fun) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].onclick = fun;
		}
		return this;
	}
	//设置鼠标移入移除效果
Base.prototype.hover = function (over, out) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].onmouseover = over;
			this.elements[i].onmouseout = out;
		}
		return this;
	}
	//设置显示
Base.prototype.show = function (fun) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'block';
		}
		return this;
	}
	//设置隐藏
Base.prototype.hide = function (fun) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};
//设置物体居中
Base.prototype.center = function (width, height) {
	var top = (document.documentElement.clientWidth - width) / 2;
	var left = (document.documentElement.clientHeight - height) / 2;
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
};
//触发浏览器窗口事件
Base.prototype.resize = function (fun) {
	window.onresize = fun;
	return this;
};
Base.prototype.gettime = function (id) {
	setInterval(function () {
		//获得指定的时间与日期	实际时间是   2016年1月11日
		var date = new Date(2015, 12, 11, 20, 30, 00);
		var da = Date.parse(date);
		//获得现在的时间与日期
		var time = new Date();
		var ti = Date.parse(time);
		//获得相差的秒数
		var seconds = (ti - da) / 1000;
		//秒数/一天的秒数==天数
		var days = Math.floor(seconds / (24 * 3600));
		//设置小时数
		seconds = seconds % (3600 * 24);
		var hours = Math.floor(seconds / 3600);
		if (hours < 10) {
			hours = "0" + hours;
		}
		//设置分钟数
		seconds = seconds % (3600);
		var minutes = Math.floor(seconds / 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		//设置秒数
		seconds = seconds % (60);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		document.getElementById(id).innerHTML = days + '&nbsp;' + '天' + '&nbsp;' +
			hours + '&nbsp;' + '小时' + '&nbsp;' + minutes + '&nbsp;' + '分' + '&nbsp;' +
			seconds + '&nbsp;' + '秒';
	}, 1000);
	return this;
};