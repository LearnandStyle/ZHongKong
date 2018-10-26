$(function() {
	var Game = function() {
		this.btn = $("#btn");
		this.data = {
			time: $(".view-box p:first").html(),
			grade: $(".view-box p:last").html()
		}
	};
	Game.prototype = {
		//开始游戏
		startGame: function() {
			//保存当前对象
			var This = this;
			this.btn.on("click", function() {
				$(this).css("display", "none");
				$(this).parent("#startPage").css("display", "none");
			});
			var timer = setInterval(function() {
				This.createPacket();
			}, 1000);

		},
		//创建红包
		createPacket: function() {
			var Packet = $("<div class='packet'></div>");
			$("#gamePage").append(Packet);
			var left = Math.random() * ($("#window").width() - Packet.width()) + "px";
			Packet.css("left", left);
			this.packetMove(Packet);
		},
		//红包下落
		packetMove: function(obj) {
			obj.animate({
				'top': $(window).height() + 10
			},5000);

			
		},
	};
	//实例化一个对象
	var game = new Game();
	game.startGame();
});