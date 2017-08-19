$(function(){
    categoryTitle();
    clickContent();
})

function categoryTitle(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcategorytitle',
        success:function(data){
            //console.log(data);
            var html=template('categoryIP',{data:data.result});
            $('#cg').html(html);
        }
    })
}

function clickContent(){
    $('#cg').on('click','.categoryTitle',function(){
        var tag=parseInt($(this).attr('title'));
        $.ajax({
            url:'http://182.254.146.100:3000/api/getcategory',
            data:{titleid:tag},
            success:function(data){
                var html=template('categoryContentIp',{data:data.result});
                $('.categoryList'+tag).html(html);
            },
            complete:function(){
                $('.categoryList').hide();
                $('.categoryList'+tag).show();
            }
        })
        return false;
    })

}