$(function(){
    var hide_proDetails=$("#hide_proDetails").val();
    var hide_joinDetails=$("#hide_joinDetails").val();
    //上传图片上传
    var ctx= "",academyId ="1",maximumWords=5000;
    var editor = UE.getEditor('workIntroduction', {
        zIndex: 1,
        toolbars: [
            [ 'undo', 'redo', '|', 'bold', 'justifyleft', 'justifycenter', 'justifyright',  'simpleupload']
        ],
        initialFrameWidth: 1028,
        initialFrameHeight: 180,
        wordCount: true,  
        maximumWords:5000, 
        autoClearinitialContent: false,
        wordCountMsg: "{#count}/" + maximumWords   , 
        wordOverFlowMsg: "字数超出最大允许值",
        autoHeightEnabled : true,
        elementPathEnabled: false, 
        topOffset: 0
    });
    var editor2 = UE.getEditor('joinIntroduction', {
        zIndex: 1,
        toolbars: [
            [ 'undo', 'redo', '|', 'bold', 'justifyleft', 'justifycenter', 'justifyright',  'simpleupload']
        ],
        initialFrameWidth: 1028,
        initialFrameHeight: 180,
        wordCount: true,  //{Boolean} [默认值：true] //是否开启字数统计
        maximumWords:5000, //{Number} [默认值：10000] //允许的最大字符数
        autoClearinitialContent: false,
        wordCountMsg: "{#count}/" + maximumWords   , //{String} [默认值：] //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符，字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数，留空支持多语言自动切换，否则按此配置显示
        wordOverFlowMsg: "字数超出最大允许值",
        autoHeightEnabled : false,
        elementPathEnabled: false, //{Boolean} [默认值：true] //是否启用元素路径，默认是显示
        topOffset: 0
    });
    UE.Editor.prototype.placeholder = function (justPlainText) {
		var _editor = this;
		_editor.addListener("focus", function () {
			var localHtml = _editor.getPlainTxt();
			if ($.trim(localHtml) === $.trim(justPlainText)) {
				_editor.setContent('<p>' + "" + '</p>');
			}
		});
		_editor.addListener("blur", function () {
			var localHtml = _editor.getContent();
			if (!localHtml) {
				_editor.setContent('<p style="color: #CDCDCD">' + justPlainText + '</p>');
				//_editor.setContent(justPlainText);
			}
		});
		_editor.ready(function () {
			_editor.fireEvent("blur");
		});
	};
    //        副文本提交
	var settxt='包括解决思路、算法说明、主界面截图等，作品排版精美有利于获取更高关注；'
	var settxt2='参赛者介绍图文，内容包含但不限于作品介绍（创意来源、主题介绍等）、参赛者介绍（为何喜欢编程等）、指导老师或父母对参赛者及作品的评价。'
    editor.ready(function(){
    	footerpossition();
    	editor.setContent(hide_proDetails);
        //确认提交
        var subAllow=true
        $('#subSave').on('click',function(){
        	if(subAllow==false){
                return false;
            }
            var txt = editor.getContent();
            var workName=$("#workName").val();
            if(workName==""){
                subLose('请填写作品名称');
                return false
            }
            var workCover=$('#hide_proStyleUrl').val();
            if(workCover==""){
                subLose('请上传作品封面');
                return false
            }
            if(txt==""||txt==settxt){
                subLose('作品介绍不能为空');
                return false
            }
            if(editor.getContentLength(true)>5000){
            	subLose('作品介绍字数超过最大允许值');
                return false
            }
            $("#hide_proDetails").val(editor.getContent());
            var contestId=$("#contestId").val();
            if(contestId=="7"){
            	var txt2 = editor2.getContent();
            	if(txt2==""||txt2==settxt2){
            		subLose('参赛介绍不能为空');
                    return false
            	}
            	if(editor2.getContentLength(true)>5000){
                	subLose('参赛介绍字数超过最大允许值');
                    return false
                }
            	$("#hide_joinDetails").val(editor2.getContent());
            }
            subAllow=false;
            $("#proInputForm").ajaxSubmit({
                url : gameBaseUrl+"/game/gameProSave",
                type : "POST",
                clearForm : false,
                beforeSubmit:function () {
                    subAllow=false;
                },
                success:function (rt, tt) {
                    subAllow=true;
                    var tt = eval('(' + rt.toString() + ')');
                    if(tt.resultcode != "200") {
                        subLose(tt.msg);
                        return false;
                    } else {
                        //提交成功
                        subSuccess();
                    }
                },
                error:function(e){
                    subAllow=true;
                }
            });
        })
		editor.placeholder(settxt);
    })
    editor2.ready(function(){
    	editor2.placeholder(settxt2);
    	editor2.setContent(hide_joinDetails);
    });
    $('#UploadImg').on('click',function(){
        $('#workCover').trigger('click')
    });


})
//editor.ready(function(){
//
//})


//获取图片路径
//function getPhoto(node) {
//    var imgURL = "";
//    try{
//        var file = null;
//        if(node.files && node.files[0] ){
//            file = node.files[0];
//        }else if(node.files && node.files.item(0)) {
//            file = node.files.item(0);
//        }
//        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
//        try{
//            imgURL =  file.getAsDataURL();
//        }catch(e){
//            imgRUL = window.URL.createObjectURL(file);
//        }
//    }catch(e){
//        if (node.files && node.files[0]) {
//            var reader = new FileReader();
//            reader.onload = function (e) {
//                imgURL = e.target.result;
//            };
//            reader.readAsDataURL(node.files[0]);
//        }
//    }
//    creatImg(imgURL);
//    return imgURL;
//}
//显示头像
//function creatImg(idname,imgURL){
//
//    var html= '<img src= "'+imgRUL+'" alt=""/>'
//    $('#'+idname).html(html)
//}
function uploadFM(el, imgtype,contestId){
	if (!chkFileSzie(el)) {
		 subLose("请上传大小5M内文件！")
		$(el).val("");
		return false;
	}
	$.ajaxFileUpload({		
		url: "../uploadByKey?type=" + imgtype + "&contestId="+contestId,
		secureuri:false,
		async: false,
		fileElementId:"workCover",
		dataType: 'json',
		success : function(data) {
			//alert(data);
			if(data.msg.code != "200") {
				$(el).val("");
				subLose(data.msg.message);
				return false;
			} else {
				var html= '<img src= "../showImg?url='+data.data.path+'" alt=""/>';
				$("#UploadImg").html(html);
				$("#hide_proStyleUrl").val(data.data.path);
				$(el).val("");
			} 
		},
		error:function(){ 
			$(el).val("");
			 subLose("图片上传失败")
		}		
	});
}
//处理ie9pleceholder兼容
supportPlaceholder='placeholder'in document.createElement('input'),
    placeholder=function(input){
        var text = input.attr('placeholder'),
            defaultValue = input.defaultValue;

        if(!defaultValue){

            input.val(text).addClass("phcolor");
        }

        input.focus(function(){

            if(input.val() == text){

                $(this).val("");
            }
        });


        input.blur(function(){

            if(input.val() == ""){

                $(this).val(text).addClass("phcolor");
            }
        });

        input.keydown(function(){
            $(this).removeClass("phcolor");
        });
    };


if(!supportPlaceholder){

    $('input,textarea').each(function(){

        text = $(this).attr("placeholder");


        placeholder($(this));

    });
}

//提交成功
function subSuccess(){
    $('body,html').addClass('maskShow');
    $('.mask').fadeIn().addClass('subSuccess');
    //var t=setTimeout(function(){
    //    window.location.href="";
    //
    //},5000)
}
//提交失败
function subLose(loseContent){
    $('body,html').addClass('maskShow');
    $('.mask').fadeIn().addClass('subLose');
    $('.lose .dialogContent').text(loseContent)

}
//关闭弹窗
function closeDialog(){
    $('body,html').removeClass('maskShow');
    $('.mask').fadeOut().removeClass('subLose');
    $('.lose .dialogContent').text('')
}


