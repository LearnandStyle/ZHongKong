	function AcquaintanceTime(obj) {
		//days	hours	minutes	 seconds 天	小时	分钟	秒
		function getTime() {
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
			if(hours < 10) {
				hours = "0" + hours;
			}
			//设置分钟数
			seconds = seconds % (3600);
			var minutes = Math.floor(seconds / 60);
			if(minutes < 10) {
				minutes = "0" + minutes;
			}
			//设置秒数
			seconds = seconds % (60);
			if(seconds < 10) {
				seconds = "0" + seconds;
			}
			 
			dateArr = [days+"天",hours+"小时",minutes+"分钟",seconds+"秒"];
			
			for (var i =0;i<dateArr.length;i++) {
				obj.elems.eq(i).html(dateArr[i]);
			}
		}
		getTime();
		setInterval(getTime, 1000);
	}