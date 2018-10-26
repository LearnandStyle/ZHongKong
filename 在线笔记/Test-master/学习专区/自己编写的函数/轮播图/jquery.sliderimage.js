/*
 *	img_box:图片的盒子； 
 * 	point_box:指示点盒子；
 * 	active:选中状态
 * 	left_btn:左按钮
 * 	right:右按钮
 * 	speed:轮播图的速度
 * 	bgcolor:指示点背景色
 */

Object.prototype.sliderimage = function(opt) {
	var aLi = $(opt.img_box).children();
	var aPoint = $(opt.point_box).children();
	var active = opt.active;
	var oPrev = $(opt.left_btn);
	var oNext = $(opt.right_btn);
	var currIndex = 0;
	var flag = true;
	var timer = null;
	var speed = opt.speed ? opt.speed : 2500;
	var bgcolor = opt.bgcolor ? opt.bgcolor : 'black';
	var isNar = opt.isNar;
	//左箭头
	oPrev.click(function() {
		flag = false;
		clearInterval(timer);
		if(currIndex == 0) {
			currIndex = aLi.length;
		};
		currIndex--;
		selectPic(currIndex);
	});

	//右箭头
	oNext.click(function() {
		flag = false;
		clearInterval(timer);
		currIndex++;
		selectPic(currIndex);
	});

	//指示点切换
	aPoint.click(function() {
		currIndex = $(this).index();
		selectPic(currIndex);
	});

	//鼠标移入
	$("#banner").hover(function() {
		clearInterval(timer);
		flag = false;
	}, function() {
		flag = true;
		timer = setInterval(go, speed);
	});

	//自动行走
	function autoGo(bol) {
		if(bol) {
			timer = setInterval(go, speed);
		};
	};
	autoGo(flag);

	//计时器函数
	function go() {
		currIndex++;
		selectPic(currIndex);
	};

	//轮播处理函数
	function selectPic(num) {
		if(isNar) {
			aPoint.eq(num).css({ "background": bgcolor }).siblings().css({ "background": "" });
		} else {
			aPoint.eq(num).addClass(active).siblings().removeClass(active);
		}

		aLi.eq(num).show().siblings().hide();
		if(currIndex == aLi.length - 1) {
			currIndex = -1;
		};
	};
};