$(function(){
    getIndexMenu();
    getIndexProdct();
    showMenu();
    fh();

})

function getIndexMenu(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getindexmenu',
        success:function(result){
            var html=template('indexmenu',result);
            $('#menuBox .row').html(html);
        }
    })
}


function getIndexProdct(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl',
        success:function(result){
            var html=template('indexProduct',result);
            $('.media').html(html);
        }
    })
}

function showMenu(){
    $('.row').on('click','.item:nth-child(8)',function(){
        $('.row .item:nth-last-child(-n+4)').toggle();
    })
}

function fh(){
    $('#fh').on('click',function(){
        animate({scrollTop:0},200);
    })
}

