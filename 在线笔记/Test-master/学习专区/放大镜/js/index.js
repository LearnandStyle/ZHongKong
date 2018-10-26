$(function  () {
	//中图的数组
	/*
	var arrimg = [
		"url(images/1.jpg)",
		"url(images/2.jpg)",
		"url(images/3.jpg)",
		"url(images/4.jpg)",
		"url(images/5.jpg)"
	];
	//大图背景
	var arrBigImg = [
		"url(images/1.jpg)",
		"url(images/2.jpg)",
		"url(images/3.jpg)",
		"url(images/4.jpg)",
		"url(images/5.jpg)"
	]
	*/
	var arrimg = [
		"red",
		"yellow",
		"pink",
		"blue",
		"orange"
	];
	
	var arrBigImg = [
		"red",
		"yellow",
		"pink",
		"blue",
		"orange"
	];
	
	//点小图看中图
	$(".hd img").on("mouseover",function  () {
		var i =$(this).index();
		$(".bd").css("background",arrimg[i]);
		$("#bigImg").css("background",arrBigImg[i]);
		$(this).css("border","2px solid red").siblings()
			.css("border","2px solid transparent");
	});
	
	//移动放大镜
	$(".bd").on("mousemove",function  (e) {
		var x = e.pageX,
			y = e.pageY;
		bdLeft = $(".bd").offset().left;
		bdTop = $(".bd").offset().top;
		zoomW = $(".zoom").outerWidth();
		zoomH = $(".zoom").outerHeight();
		bdW = $(".bd").innerWidth();
		bdH = $(".bd").innerHeight();
		var dx = x - bdLeft - zoomW/2,
			dy = y - bdTop - zoomH/2;
		$(".zoom").css({"left":dx+"px","top":dy+"px"});
		//获取放大镜片的内部定位值
		var zoomLeft  = parseFloat($(".zoom").css("left")),
			zoomTop = parseFloat($(".zoom").css("top"));
		//限定左边界
		if (zoomLeft<= 0) {
			$(".zoom").css("left","0");
			zoomLeft  = 0; // 镜片移动到左边界时，zoomLeft 设置为 0 
		}else if(zoomLeft >= (bdW - zoomW)){	//限制右边界
			$(".zoom").css("left",(bdW-zoomW)+"px");
			zoomLeft = bdW-zoomW;
		}
		//限制上边界
		if (zoomTop <= 0) {
			$(".zoom").css("top","0");
			zoomTop = 0;
		}else if(zoomTop >= (bdH - zoomH)){		//限制下边界
			$(".zoom").css("top",(bdH - zoomH)+"px");
			zoomTop = bdH - zoomH;
		}
		
		var posiX ,posiY;
		posiX = -zoomLeft*(350/120)+"px";
		posiY = -zoomTop*(449/154)+"px";
		var bigScale = (350/120*100)+"%";
		
		//显示放大镜区域
		$("#bigImg").css({
			"display":"block",
			"backgroundPositonX":posiX,
			"backgroundPositionY":posiY,
			"background-size":bigScale
		});
	});
	//鼠标离开中图区域，放大镜回归原始位置
	$(".bd").on("mouseleave",function  () {
		$(".zoom").css("left","-120px");
		$("#bigImg").css("display","none");
	});
});