//增加大项事件
$(function(){
    
    $('#btn_addCustomTmp').click(function(){
        $('#customTemplates').modal();        
    });
    $('#btn_repeat_ok').click(function(){

    });
    $('.templates li').click(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    $('#btn_custom_ok').click(function(){
        var selected = $('.templates li.active');
        if(selected.length==0){
            alert('请选择模板');
            return;
        }
        var index   = selected.eq(0).data('index'),
            screen  = selected.eq(0).data('screen'),
            tmpName = selected.eq(0).data('name'),
            tmpId   = selected.eq(0).data('tmpid'),
            tmpCnt  = selected.eq(0).html(),
            //target  = $('#contentDiv .cnt_item_div:not(.templates)').eq((index-1)<0?0:(index-1)),
            htmlStr = '<div class="cnt_item_div templates';
            if(selected.find('.big').length>0){
                htmlStr += ' t_big';
            }else if(selected.find('.treble').length>0){
                htmlStr += ' t_treble';
            }else if(selected.find('.single').length>0){
                htmlStr += ' t_single';
            }
            htmlStr += '" data-tmpid="'+tmpId+'" data-screen="'+screen+'" data-index="'+index+'">';
            /**
            if(index==0){
                htmlStr += 'nodrag>';
            }else{
                htmlStr += '>';
            }
            **/
            htmlStr += '<p class="pull-right"><button name="btn_remove" type="button" class="btn btn-danger">删除</button></p>';
            if(contentDivIndex>9&&index!=0){
                htmlStr += '<div class="item_index small_font">'+index+'</div>';    
            }else{
                htmlStr += '<div class="item_index">'+index+'</div>';
            }
            
            //htmlStr += '<div class="tmp_name">'+'自定义<br>屏号'+screen+'<br>位置号'+index+'</div>';
            htmlStr += '<div class="tmp">'+tmpCnt+'</div><div class="screen_no">屏号:'+screen+'</div>';
            htmlStr += '</div>';
        var repeat = false;
        $('#contentDiv .templates').each(function(idx,el){
            var _screen= $(el).data('screen'),
                _index = $(el).data('index'),
                _tmpId = $(el).data('tmpid');
            if(_screen==screen&&_index==index&&_tmpId==tmpId){
                alert('模板重复了');
                repeat = true;
                return false;
            }
            /**
            else if(_screen==screen&&_index==index){
                $(this).remove();
            }
            **/
        });
        if(index==0&&$('#contentDiv').prev('.templates').length>0){
            //$('#confirmWin').modal(); 
            if(!confirm('模版重复，确认替换吗？')){
                return;
            }
        }
        if(!repeat){
            if(index==0){
                if($('#contentDiv').prev('.templates').length>0){
                    $('#contentDiv').prev('.templates').remove();
                    $(htmlStr).insertBefore($('#contentDiv'));
                }else{
                    $(htmlStr).insertBefore($('#contentDiv'));  
                }
                
            }else if(index>$('#contentDiv .cnt_item_div').length){
                $('#contentDiv').append(htmlStr);
            }else{
                $(htmlStr).insertBefore($('#contentDiv .cnt_item_div').eq(index-1));
            }
            
            resetIndex();            
            $('#customTemplates').modal('hide');
        }
         
    });
    
});


