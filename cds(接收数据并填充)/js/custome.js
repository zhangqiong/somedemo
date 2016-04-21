(function(){
	var img_url_path='http://dev.static.cds.51y5.net';
	$.getJSON('infos.json',function(infos){
    
		// infos=result;
		// console.log(result);
		var pages,length,htmlTxt='',i;
		pages=infos['page_list'];
		length=pages.length;
		
		// 填充pages
        function loadPages(){
            for(var page of pages){
                htmlTxt+='<li role="presentation"';
                if(page['is_selected']==1){
                    htmlTxt+=' class="active"';
                }
                
                if(page['is_default_page']==1){
                    htmlTxt+='><a href="#">';
                    htmlTxt+='默认';
                }else{
                    htmlTxt+='><button type="button" class="remove">x</button><a href="#">';
                    htmlTxt+='屏号:'+page['page_no'];
                }
                htmlTxt+='</a></li>';
            }
            $(htmlTxt).appendTo('#pages');
        }   

        // 填充item
		function loadItem(){
            var item_cnt=0;
            var item_list=infos['item_list'],content_source_id;
            for(var item in item_list){
                item_cnt++;
                htmlTxt="";
                htmlTxt+='<div class="cnt_item_div';
                // 如果是自定义模板
                if(item_list[item][0].content_source_id==3){
                    // console.log(item);
                    
                    htmlTxt+=' templates"';
                    var custom_source_id=item_list[item][0].custom_source_id;
                    htmlTxt+='data-tmpid="'+custom_source_id+'">';
                    var custom=infos.custom_list[custom_source_id];
                    var is_top=custom.is_top;
                    if(is_top==1)item_cnt=0;
                    switch(custom.render_type){
                        /*无图*/
                        case '100':htmlTxt+='\
                                    <p class="pull-right">\
                                    <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                    </p>\
                                    <div class="item_index ">'+item_cnt+'</div>\
                                    <div class="tmp">\
                                    <h3>'+custom.content_title+'</h3>\
                                    <p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
                                    </div>';break;
                        /*小图文*/
                        case '101':htmlTxt+='\
                                    <p class="pull-right">\
                                    <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                    </p>\
                                    <div class="item_index ">'+item_cnt+'</div>\
                                    <div class="single tmp"><h3>'+custom.content_title+'</h3>\
                                    <p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
                                    </div>\
                                    <img src="'+img_url_path+custom.img_url1+'" alt="">\
                                    </div>';break;
                        /*三图*/            
                        case '102':htmlTxt+='\
                                    <p class="pull-right">\
                                    <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                    </p>\
                                    <div class="item_index ">'+item_cnt+'</div>\
                                    <div class="treble tmp">\
                                    <h3>'+custom.content_title+'</h3>\
                                    <img src="'+img_url_path+custom.img_url1+'" alt="">\
                                    <img src="'+img_url_path+custom.img_url2+'" alt="">\
                                    <img src="'+img_url_path+custom.img_url3+'" alt="">\
                                    <p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
                                    </div>';break;
                        /*大图*/
                        case '103':htmlTxt+='\
                                    <p class="pull-right">\
                                    <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                    </p>\
                                    <div class="item_index ">'+item_cnt+'</div>\
                                    <div class="big tmp">\
                                    <h3>'+custom.content_title+'</h3>\
                                    <img src="'+custom.img_url3+'" alt="">\
                                    <p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
                                    </div>';break;
                        /*小图文视频*/
                        case '104':htmlTxt+'single';break;/*视频*/
                        /*大图视频*/
                        case '105':/*htmlTxt+'big';*/break;/*视频*/
                        /*大图无标题*/
                        case '106':htmlTxt+='\
                                    <p class="pull-right">\
                                    <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                    </p>\
                                    <div class="item_index ">'+item_cnt+'</div>\
                                    <div class="big tmp">\
                                    <img src="'+custom.img_url3+'" alt="">\
                                    <p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
                                    </div>';break;
                    }
                    htmlTxt+='</div>';
                    console.log(is_top)
                    if(is_top==1){
                        $(htmlTxt).insertBefore($('#contentDiv'));
                    }else{
                        $('#contentDiv').append($(htmlTxt));
                    }
                   
                }else{
                    var $cnt_item_div=null;
                    htmlTxt+='">'+'<p class="pull-right">'+'<button class="btn btn-primary" type="button" name="btn_addContent">增加内容源</button>'+'\
                        <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                        '+'<div class="item_index ">'+item_cnt+'</div>'+'</div>';

                    $('#contentDiv').append($cnt_item_div=$(htmlTxt));
                    // 遍历item数组
                    var j=0;
                    for(var content_item of item_list[item]){
                        j++;
                        var $controls=$(createRow(j==1));
                        var $select=$controls.children('select');
                        $select.children('[value='+content_item.content_source_id+']').attr('selected',true);
                        $percent=$controls.children('[name="contentPercent"]');
                        $percent.val(content_item.show_scale);
                        $cnt_item_div.append($controls);
                        var cntval;
                        if($cnt_item_div.attr('data-cntval')){
                            cntval=$cnt_item_div.attr('data-cntval');
                        }else{
                            cntval="";
                        }
                        cntval+=content_item.content_source_id+',';
                        $cnt_item_div.attr('data-cntval',cntval);
                    }
                }
                if(item_cnt>9){
                    $cnt_item_div.children('.item_index').addClass('small_font');
                }
            }
        }
		 
		

        var contentItemIndex = 1,
        contentItemCount = Object.keys(infos.content_source).length,//小项总数，固定值
        contentDivMax    = 12,//大项最大数目
        contentDivMin    = 8,//大项最小数目
        contentDivIndex  = 1;//大项前面的数字标题
        function resetIndex(){
            $('#contentDiv .cnt_item_div').each(function(index,ele){
                $(this).find('.item_index').html(index+1);
                if((index+1)>9){
                    $(this).find('.item_index').addClass('small_font');
                }else{
                    $(this).find('.item_index').removeClass('small_font');
                }
            });
        }
        //异常信息提示
        function showMsg(msg){
            alert(msg);
            /**
            $('#msg span').html(msg);
            $('#msg').addClass('alert').show();
            setTimeout(function(){
                $('#msg').removeClass('alert').fadeOut();
            },3000);
*               */
        }
        function checkMax(){
            if($('#contentDiv .cnt_item_div:not(.templates)').length==contentDivMax){
                showMsg('大项个数最多'+contentDivMax+'个');
                return false;
            } 
            return true;
        }
        
            $('#btn_map_ok').click(function(){
                //mapWin = mapWin.contentWindow||mapWin.window;
                $('#lng').val(mapWin.marker.getPosition().lng);
                $('#lat').val(mapWin.marker.getPosition().lat);
                $('#mapWin').modal('hide');
            });
            $('#mapWin').on('shown.bs.modal',function(){
                mapWin.baiduMap.init();
            });
            function createRow(init){
                // 构造content_source下拉
                htmlTxt="";
                var $content_source_select;
                htmlTxt+='<select required="true" name="contentType" class="span2">\
                <option value="0">-请选择-</option>';
                var content_sources=infos.content_source;
                for(var key of Object.keys(content_sources)){
                    console
                    htmlTxt+='<option value="'+key+'" data-showinterval="'+content_sources[key].is_interval+'">\
                    '+content_sources[key].content_name+'</option>'
                }
                htmlTxt+='</select>';
                var selectStr=htmlTxt;
                var htmlStr = '<p class="controls controls-row">';
                
                htmlStr+=selectStr;
                
                htmlStr += '<input class="span2" type="number" name="contentPercent" placeholder="投放比例" maxlength="3" required="true" max="100" min="0">';
                
                htmlStr += '<input class="span2" type="text" name="contentInterval" placeholder="展示间隔" required="true">';
                if(!init){    
                    htmlStr += '<button type="button" class="btn btn-primary">删除</button>';
                }
                htmlStr += '</p>';
                return htmlStr;
            }
            function resetSelectedValues(parent,besides){
                //重设值
                var selectedValue = '';
                parent.find('option:selected').each(function(index,el){
                    if($(el).val()!='0'&&(!besides||besides&&$(el).val()!=besides)){
                        selectedValue += $(el).val()+',';
                    }
                });
                parent.attr('data-cntVal',selectedValue);
            }
            //添加大项
            function addNewCnt(){
                if(!checkMax()){
                    return;
                }
                
                var htmlStr = '<div class="cnt_item_div" data-cntVal=""><p class="pull-right"><button name="btn_addContent" type="button" class="btn btn-primary">增加内容源</button><button name="btn_remove" type="button" class="btn btn-danger">删除</button></p><div class="item_index">'+contentDivIndex+'</div>';
                if(contentDivIndex>9){
                    htmlStr = '<div class="cnt_item_div" data-cntVal=""><p class="pull-right"><button name="btn_addContent" type="button" class="btn btn-primary">增加内容源</button><button name="btn_remove" type="button" class="btn btn-danger">删除</button></p><div class="item_index small_font">'+contentDivIndex+'</div>';
                }
                htmlStr += createRow(true);
                    
                htmlStr += '</div>';

                $('#contentDiv').append(htmlStr);
                resetIndex();
            }

            $('form input,form textarea').bind('blur',function(){
                if($(this).val()==''){
                    $(this).parents('.control-group').addClass('error');
                    $(this).siblings('.help-inline').html('此项不能为空');
                }else{
                    $(this).parents('.control-group').removeClass('error');
                    $(this).siblings('.help-inline').html('');
                }
            });
            //获取频道顺序
            function getChannelIds(){
                var channel_id = '';
                $('#channelDiv .channel_item').each(function(){
                    var dataValue = $(this).attr('data-value');
                    if(dataValue){
                        channel_id == ''?channel_id+=dataValue : channel_id+=(','+dataValue);     
                    }
                });
                return channel_id;
            }
            $("#channelList").sortable({
                cancel: "button"
            });
            $("#channelList").disableSelection();

            $('#channelList').delegate('.channel_item .remove','click',function(){
                $(this).parent('li').remove();
            });
            /*
            * 百分比自动控制
            * 百分比总和超过100时自动从第一个里面扣减，到0停止
            */
            $('#contentDiv').delegate('input[name=contentPercent]','change',function(e){
                if($(this).val()<0){
                    $(this).val(0);
                }
                var parentDiv = $(this).parents('.cnt_item_div');
                var totalPer = 0;
                parentDiv.find('input[name=contentPercent]').each(function(index,ele){
                    totalPer += $(ele).val()*1;
                });
                var firstPercent = parentDiv.find('.controls-row').eq(0).find('input[name=contentPercent]');
                var firstVal = firstPercent.val()*1;
                if(totalPer>100){
                    var change = totalPer-100;
                    if((firstVal-change)>0){
                        firstPercent.val(firstVal-change);
                    }else{
                        firstPercent.val(0);
                    }
                }else{
                    var change = 100-totalPer;
                    firstPercent.val(firstVal+change);
                }
            });
            $('#contentDiv').delegate('select[name=contentType]','change',function(){
                var parentDiv = $(this).parents('.cnt_item_div')
                //获取所有下拉框选项选中值
                var contentTypeValues = parentDiv.attr('data-cntVal');
                //如果当前选中值不为空，且在上面已经存在，则重复
                var repeat = false;
                if($(this).val()!='0'&&contentTypeValues.indexOf($(this).val())>=0){
                    $(this).val('0');
                    repeat = true;
                    showMsg('内容源不能重复');
                }
                //重设值
                resetSelectedValues(parentDiv);
                if(repeat){
                    return;
                }  
                //是否显示‘间隔’
                var checked = $(this).find('option:selected');
                if($(checked).attr('data-showInterval')=='1'){
                    $(this).siblings('input[name=contentInterval]').css('visibility','visible');
                }else{
                    $(this).siblings('input[name=contentInterval]').css('visibility','hidden');
                }
            });
            //弹窗前初始化多选框
            $('#channel_items').on('show.bs.modal', function (index,ele) {
                $('#channel_items input').removeAttr('checked')
                $('#channelDiv .channel_item').each(function(){
                    var value = $(this).attr('data-value');
                    $('#channel_items input[type="checkbox"][value="'+value+'"]').attr('checked','true');
                });
            });
            //保存弹窗设置
            $('#btn_channel_items_ok').bind('click',function(){
                var itemHtml = '',
                    channelIds = getChannelIds();
                    channelArr = channelIds.split(','),
                    temp = {};
                for(var i=0;i<channelArr.length;i++){
                    var channelId = channelArr[i];
                        input     = $('#channel_items input[value='+channelId+']');
                    if(input.attr('checked')=='checked'){
                        temp[channelId]=true;
                        var label = $(input).parent().data('name'),
                            remark= $(input).parent().data('remark');
                        itemHtml += '<li class="channel_item" data-value="'+channelId+'"><button type="button" class="remove">×</button>'+label+'<span>'+remark+'</span></li>';
                    }
                }
                $('#channel_items input:checked').each(function(index){
                    var value = $(this).attr('value'),
                        label = $(this).parent().data('name'),
                        remark= $(this).parent().data('remark');
                    if(!temp[value]){
                        itemHtml += '<li class="channel_item" data-value="'+value+'"><button type="button" class="remove">×</button>'+label+'<span>'+remark+'</span></li>';        
                    }
                });
                $('#channelList').html(itemHtml);
                $('#channel_items').modal('hide');
            });
            $('#msg .close').click(function(){
                $(this).parent().fadeOut();
            });
            
            $(document).delegate('button[name=btn_remove]','click',function(){
                if(!$(this).parents('.cnt_item_div').hasClass('templates')){
                    contentDivIndex--;   
                }
                $(this).parents('.cnt_item_div').remove();
                resetIndex();
            });
            $('#contentDiv').delegate('button[name=btn_addContent]','click',function(){
               var _p = $(this).parents('.cnt_item_div');
                if(_p.find('.controls-row').length==contentItemCount){
                    showMsg('项目数量已达最大');
                    return;
                }
                contentItemIndex++;
                _p.append(createRow());
                if(contentItemCount>3){
                    var lineHeight = _p.css('height');
                    _p.find('.item_index').eq(0).css('line-height',lineHeight);
                }
            });
            //删除小项
            $('#contentDiv').delegate('.controls-row button','click',function(){
                var parentDiv = $(this).parents('.cnt_item_div');
                var contentType = $(this).siblings('select[name=contentType]').val();
                //重设内容源值
                resetSelectedValues(parentDiv,contentType);
                //删除
                $(this).parent().remove();
                //重设高度
                // var lineHeight = parentDiv.css('height');
                // parentDiv.find('.item_index').eq(0).css('line-height',lineHeight);
            });
            //增加大项事件
            $('.addNewCnt').click(addNewCnt);
            //表单提交
            $('#btn_submit').click(function(){
                //频道顺序
                var channel_id = getChannelIds();
                $('#channel_id').val(channel_id);
                //验证表单必填
                $('form input,form textarea').blur();
                if($('form .error').length>0){
                    showMsg('表单为填写完整');
                    return;
                }
                //验证大项数量
                var cntItemCount = $('#contentDiv .cnt_item_div').length;
                if(cntItemCount<2){
                    showMsg('大项个数不得小于8个');
                    //return;
                }
                //验证大项不为空
                var paramStr = '',
                    doSubmit = true;
                //大项cnt_item_div
                $('#contentDiv .cnt_item_div').each(function(index,el){
                    //里面的小项
                    var percentTotal = 0,
                        msg = '';
                    if($(this).hasClass('templates')){
                        paramStr+= '3,100,-1,'+$(this).data('tmpid')+';|';
                    }else{
                        $(el).find('.controls-row').each(function(index2,el2){
                            var contentType = $(el2).find('select').eq(0).val(),
                                contentPercent = $(el2).find('input[name=contentPercent]').eq(0).val(),
                                contentInterval = $(el2).find('input[name=contentInterval]').eq(0).css('visibility')=='hidden'?'-1':$(el2).find('input[name=contentInterval]').eq(0).val();

                            if(contentType=='0'||contentPercent==''||contentInterval==''){
                                msg = '大项'+(index+1)+'未填写完整';
                                doSubmit = false;
                                return false;
                            }else{
                                percentTotal += contentPercent*1;
                                if(contentPercent!='0'){
                                    paramStr+= contentType+','+contentPercent*1+','+contentInterval+',0;';
                                }
                            }
                        });
                        if(msg==''){
                            if(percentTotal!=100){
                                showMsg('大项'+(index+1)+'百分比总和错误');
                                doSubmit = false;
                                return false;    
                            }else{
                                paramStr+='|';
                            }
                        }else{
                            showMsg(msg);
                            doSubmit = false;
                            return false;
                        }
                    }
                    
                    
                });
                if($('#contentDiv').prev('.templates').length>0){
                    var tempId = $('#contentDiv').prev('.templates').eq(0).data('tmpid');
                    paramStr = '3,100,-1,'+tempId+';|'+paramStr;
                }
                if(doSubmit){
                    $('#paramStr').val(paramStr);
                    alert(paramStr);
                    //$('#tab').submit();
                }
            });
            function init(){
                loadPages();
                loadItem();
                // for(var i=0;i<10;i++){
                //     addNewCnt();
                // }
                $("#contentDiv").sortable({
                    stop:resetIndex,
                    handle:'.item_index',
                    axis : 'y',
                    cursor :'pointer',
                    items:'.cnt_item_div'
                });
            }
            init();
        
	});

})();