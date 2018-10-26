/*
    sPrice: 开始价格
    ePrice: 结束价格

*/

function judge(sPrice,ePrice) {
    if(sPrice/1>ePrice/1&&ePrice!=""){
        ksAlert("结束价格不能小于开始价格 ，请您确认价格区间是否输入正确");
        return false;
    }
    if(isNaN(sPrice)){
        ksAlert("开始价格请输入数字 ，请您确认！");
        return false;
    }
    if(isNaN(ePrice)){
        ksAlert("结束价格请输入数字 ，请您确认！");
        return false;
    }
}