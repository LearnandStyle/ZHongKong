$(function () {
    //点击登陆按钮时进行的判断
    $(".login_bt").on("click", function () {
        if ($("#usertxt").val() == "" || $("#pwdtxt").val() == "") {
            $(".Error_prompt").fadeIn(800).html("员工编号或密码不能为空！");
            return false;
        } else {
            $(".Error_prompt").fadeOut(400);
            //前端初步判断数据类型成功以后像后台发出请求来判断登陆是否成功
            $.ajax({
                type: "post",
                url: "data.json",//这里的data.json 是我模拟的一个json文件名。url放的是当前页面请求的后台地址。
                dataType: "json",
                data: $('#ajaxForm').serialize(),
                success: function (data) {
                    var result = data.result;
                    //用户名和密码校验错误
                    if (result == "0") {
                        $(".Error_prompt").fadeIn(800).html("该用户不存在或密码错误");
                        $(".Error_prompt").fadeIn("fast", "linear");
                    }
                },
                error: function () {
                    alert("请求失败！");
                }
            });
        }
    });
    //用户键盘按下enter键判断的事件
    document.onkeypress = function (event) {
        e = event ? event : (window.event ? window.event : null);
        var currKey = 0;
        currKey = e.keyCode || e.which || e.charCode;
        if (currKey == 13) {
            if ($("#usertxt").val() == "" || $("#pwdtxt").val() == "") {
                $(".Error_prompt").fadeIn(800).html("员工编号或密码不能为空！");
                return false;
            } else {
                $(".Error_prompt").fadeOut(400);
                //前端初步判断数据类型成功以后像后台发出请求来判断登陆是否成功
                $.ajax({
                    type: "post",
                    url: "data.json",//这里的data.json 是我模拟的一个json文件名。url放的是当前页面请求的后台地址。
                    dataType: "json",
                    data: $('#ajaxFrm').serialize(),
                    success: function (data) {
                        //请求成功之后要做的事情
                    },
                    error: function () {
                        alert("请求失败！");
                    }
                });
            }
        }
    };
});