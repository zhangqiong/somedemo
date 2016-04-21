(function(){
	var infos,img_url_path='http://dev.static.cds.51y5.net';
	$.getJSON('infos.json',function(result){
		infos=result;
		// console.log(result);
		var pages,length,htmlTxt='',i;
		pages=result['page_list'];
		length=pages.length;
		
		// 填充pages
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
				htmlTxt+='屏号'+page['page_no'];
			}
			htmlTxt+='</a></li>';
		}
		$(htmlTxt).appendTo('#pages');

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
		$content_source_select=$(htmlTxt);
		// var $content_source_select=$(htmlTxt);

		// 构造其他组件
		var item_index='<div class="item_index ">1</div>';
		var delete_bt='<button class="btn" type="button" name="btn_remove">删除</button>';
		var add_source_bt='<button class="btn btn-primary" type="button" name="btn_addContent">增加内容源</button>';
		var percent_ipt='<input class="span2" type="number" name="contentPercent" placeholder="投放比例" maxlength="3" required="true" max="100" min="0">';
		var pull_right='<p class="pull-right">'+add_source_bt+delete_bt+'</p>';
		var dip='<input type="text" required="true" placeholder="展示间隔" name="contentInterval" class="span2" value="" style="visibility: hidden;">';
		var interval='<input class="span2" type="text" name="contentInterval" placeholder="展示间隔" required="true">';
		// var controls='<p class="controls controls-row">'+content_source_select+percent_ipt+dip+'</p>';
		// 填充item
		 
		 var item_cnt=0;
		 var item_list=infos['item_list'],content_source_id;
		 for(var item in item_list){
		 	item_cnt++;
		 	// var $cnt_item_div=$('<div class="cnt_item_div">');
		 	htmlTxt="";
		 	htmlTxt+='<div class="cnt_item_div';
            // 如果是自定义模板
            if(item_list[item][0].content_source_id==3){
            	console.log(item);
            	htmlTxt+=' templates">';
            	var custom_source_id=item_list[item][0].custom_source_id;
            	var custom=infos.custom_list[custom_source_id];
				switch(custom.render_type){
					case '100':console.log('100');htmlTxt+='\
								<p class="pull-right">\
                                <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                </p>\
                                <div class="item_index ">'+item_cnt+'</div>\
                                <div class="tmp">\
								<h3>'+custom.content_title+'</h3>\
								<p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
								</div>';break;
					case '101':console.log('101');htmlTxt+='\
								<p class="pull-right">\
                                <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                </p>\
                                <div class="item_index ">'+item_cnt+'</div>\
                                <div class="single tmp"><h3>'+custom.content_title+'</h3>\
								<p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
								</div>\
								<img src="'+img_url_path+custom.img_url1+'" alt="">\
								</div>';break;
					case '102':console.log('102');htmlTxt+='\
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
					case '103':console.log('103');htmlTxt+='\
								<p class="pull-right">\
                                <button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
                                </p>\
                                <div class="item_index ">'+item_cnt+'</div>\
								<div class="big tmp">\
								<h3>'+custom.content_title+'</h3>\
								<img src="'+custom.img_url3+'" alt="">\
								<p><span class="tag hot">'+custom.tag_text+'</span><span>'+custom.source_from+'</span></p>\
								</div>';break;
					case '104':htmlTxt+'single';break;/*视频*/
					case '105':console.log('105');/*htmlTxt+'big';*/break;/*视频*/
					case '106':htmlTxt+'big';break;/*无标题*/
				}
				htmlTxt+='</div>';
				$('#contentDiv').append($(htmlTxt));
		 	}else{
		 		var $cnt_item_div=null;
		 		// $cnt_item_div.append($pull-right.clone()).append($item_index.clone().html(i));
		 		htmlTxt+='">'+'<p class="pull-right">'+add_source_bt+'\
		 		<button class="btn btn-danger" type="button" name="btn_remove">删除</button>\
		 		'+'<div class="item_index ">'+item_cnt+'</div>'+'</div>';

		 		$('#contentDiv').append($cnt_item_div=$(htmlTxt));
		 		// 遍历item数组
		 		var j=0;
			 	for(var content_item of item_list[item]){
			 		j++;
			 		var $controls;
			 		if(j==1){
			 			$controls=$('<p class="controls controls-row">'+percent_ipt+interval+'</p>');
			 		}else{
			 			$controls=$('<p class="controls controls-row">'+percent_ipt+interval+'<button type="button" class="btn btn-primary">删除</button>'+'</p>');

			 		}
			 		
			 		var $select=$content_source_select.clone();
                    $select.children('[value='+content_item.content_source_id+']').attr('selected',true);
                    console.log($select.children('[value='+content_item.content_source_id+']'))
			 		$controls.prepend($select);
                    $cnt_item_div.append($controls);
			 	}
	            if(item_cnt>9){
	            	$cnt_item_div.children('.item_index').addClass('small_font');
	            }
		 	}
		 	
		}
		function createRow(init){
			if(init){
				
			}
		}
	});

})();