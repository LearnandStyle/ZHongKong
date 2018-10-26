$(function  () {
	$(".btn").on("click",function  () {
		if($(this).attr("data-key")=="on"){
			$(this).addClass("on");
			var num = Number($(this).find("b").html())+1;
			$(this).find("b").html(num);
			$(this).attr("data-key","");
		}else{
			$(this).removeClass("on");
			var num = Number($(this).find("b").html())-1;
			$(this).find("b").html(num);
			$(this).attr("data-key","on");
		}
		
	});
});