/*
	lastDate:指定的一段时间;
	aElements:元素集合 如：document.querySelectorAll('span')
					 	
 */
function AcquaintanceTime(lastDate, aElements) {
	var timer;
	timer = setInterval(function() {
		//获取指定的日期与时间
		var last_date = new Date(lastDate);
		//获取指定日期与时间的毫秒数
		var last = Date.parse(last_date);
		//现在的时间
		var now_date = new Date();
		//获取现在时间的毫秒数
		var now = Date.parse(now_date);

		//获取两个日期相差的秒数
		var differ_seconds = (now - last) / 1000;

		//获取相差的天数
		var differ_days = Math.floor(differ_seconds / (24 * 3600));

		//获取相差的小时数
		differ_seconds = differ_seconds % (24 * 3600);
		var differ_hours = Math.floor(differ_seconds / 3600);

		if(differ_hours < 10) {
			differ_hours = "0" + differ_hours;
		};

		//获取相差的分钟数
		differ_seconds = differ_seconds % (3600);
		var differ_minutes = Math.floor(differ_seconds / 60);

		if(differ_minutes < 10) {
			differ_minutes = "0" + differ_minutes;
		};

		//获取相差的秒数
		differ_seconds = Math.floor(differ_seconds % (60));

		if(differ_seconds < 10) {
			differ_seconds = '0' + differ_seconds;
		};

		//获取几号
		var date = now_date.getDate();

		//获取周几
		var week = now_date.getDay();

		//获取月份
		var month = now_date.getMonth() + 1;

		//获取年份
		var year = now_date.getFullYear();

		//获取小时
		var hours = now_date.getHours();
		if(hours < 10) {
			hours = "0" + hours;
		};

		//获取分钟
		var minutes = now_date.getMinutes();
		if(minutes < 10) {
			minutes = "0" + minutes;
		};

		//获取秒数
		var seconds = now_date.getSeconds();
		if(seconds < 10) {
			seconds = "0" + seconds;
		};

		var info = [year, month, date, hours, minutes, differ_days, differ_hours, differ_minutes, differ_seconds];
		var message = ['年', '月', '日', '时', '分', '天', '时', '分', '秒'];
		for(var i = 0; i < aElements.length; i++) {
			aElements[i].innerHTML = info[i] + message[i];
		};

	}, 1000);

};