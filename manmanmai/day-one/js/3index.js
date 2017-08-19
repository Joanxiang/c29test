$(function(){
    var arr=getRequest();//获取地址栏内容

    var page=1;//默认第一页
    var maxPage;//最大页码
    getProductTitle(arr);//渲染导航首页
    renderData(arr,page,maxPage);//渲染数据

})

//渲染导航首页
function getProductTitle(arr){
    var userName=arr['category'];
    $('#userName').html(userName);
}

//渲染产品具体分类数据
function renderData(arr,page,maxPage){
    var productid=parseInt(arr['categoryId']);
    $.ajax({
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            categoryid:productid,
            pageid:page
        },
        success:function(data){
            flag=false;
            //console.log(data);
            var html=template('categoryId',{data:data.result});
            $('#productContent').html(html);
            var optionHtml='';
            var totaleNumber=Math.ceil(data.totalCount/data.pagesize)-0;
            for(var i=0; i<totaleNumber; i++){
                optionHtml+='<option value='+(i+1)+'>'+(i+1)+'</option>';
            }
            $('#productListSelect').html(optionHtml);
            //默认选中的option
            $('#productListSelect option').each(function(i,item){
                if((i+1)==page){
                    $(item).attr('selected','selected');
                }
            })
            maxPage=totaleNumber;
            currentid=page;
        },
        complete:function(){
            nextClick(arr,page,maxPage);//下一页
            prevClick(arr,page,maxPage);//上一页
        }

    })
}


//上一页
function prevClick(arr,page){
    $('#btnPre').unbind('click').click(function(){//先解绑，在绑定事件
        if(page<=1){
            page=1;
            return false;
        }
        else{
            page--;
            renderData(arr,page);//渲染
            return false;
        }
        return false;
    })

}

//下一页
function nextClick(arr,page,maxPage){
    $('#btnNext').unbind('click').click(function(){
        if(page>=maxPage){
            page=maxPage;
            return false;
        }
        else{
            page++;
            renderData(arr,page,maxPage);
        }
        return false;
    })
}


//获取地址栏内容
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}