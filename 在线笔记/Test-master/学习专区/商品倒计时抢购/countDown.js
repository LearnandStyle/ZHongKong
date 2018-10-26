function countDown(startTime, endTime) {
	if(arguments.length == 1){
		endTime = arguments[0];
		n = new Date();
	}else {
		n = new Date(startTime);
		endTime = arguments[1];
	}
	timeTo(endTime);
	function timeTo(dd) {
		var t = new Date(dd); //取得指定时间的总毫秒数  
		n = n.getTime() + 1000;
		n = new Date(n);
		c = t - n; //得到时间差  
		if(c <= 0) { //如果差小于等于0  也就是过期或者正好过期，则退出程序  
			clearInterval(timer); //清除计时器  
			return; //结束执行 
		}
		var ds = 60 * 60 * 24 * 1000, //一天共多少毫秒
			d = parseInt(c / ds), //总毫秒除以一天的毫秒 得到相差的天数
			h = parseInt((c - d * ds) / (3600 * 1000)), //然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
			m = parseInt((c - d * ds - h * 3600 * 1000) / (60 * 1000)), //减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
			s = parseInt((c - d * ds - h * 3600 * 1000 - m * 60 * 1000) / 1000); //得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可 
		//最后这句讲定义好的显示 更新到 ID为 timer的 div中 
		var dateStr = '<span>' + d + '天</span><span>' + h + '小时</span><span>' + m + '分钟</span><span>' + s + '秒</span>';
		$("#timer").html(dateStr);
	}
	return timer = setInterval(function() {
			timeTo(endTime);
		}, 1000);;
}