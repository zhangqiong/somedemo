// 百度地图API功能
	function G(id) {
		return document.getElementById(id);
	}

	
	//map.centerAndZoom("上海",12);// 初始化地图,设置城市和地图级别。
	var map = null,point = null,marker = null,localSearch=null,myValue;
	var baiduMap = {
		init : function(){
			map = new BMap.Map("l-map");
			//搜索
			var options = {
				onSearchComplete: function(results){
					// 判断状态是否正确
					if (localSearch.getStatus() == BMAP_STATUS_SUCCESS){
						var s = [];
						for (var i = 0; i < results.getCurrentNumPois(); i ++){
							var lng = results.getPoi(i).point.lng;
							var lat = results.getPoi(i).point.lat;
							var htmlStr = '<li onclick="addressSelect(this);" data-lng="'+lng+'" data-lat="'+lat+'">';
							htmlStr += '<p class="t">'+results.getPoi(i).title+'</p>';
							htmlStr += '<p class="adr">'+results.getPoi(i).address+'</p>';
							htmlStr += '</li>';
							s.push(htmlStr);
						}
						document.getElementById("address").innerHTML = s.join("");
					}
				}
			};
			localSearch = new BMap.LocalSearch(map, options);
			


			//定位插件
			// 添加带有定位的导航控件
			var navigationControl = new BMap.NavigationControl({
			    // 靠左上角位置
			    anchor: BMAP_ANCHOR_TOP_LEFT,
			    // LARGE类型
			    type: BMAP_NAVIGATION_CONTROL_LARGE,
			    // 启用显示定位
			    enableGeolocation: true
			});
			map.addControl(navigationControl);
		  	// 添加定位控件
			var geolocationControl = new BMap.GeolocationControl();
			geolocationControl.addEventListener("locationSuccess", function(e){
				// 定位成功事件
				var address = '';
				address += e.addressComponent.province;
				address += e.addressComponent.city;
				address += e.addressComponent.district;
				address += e.addressComponent.street;
				address += e.addressComponent.streetNumber;
				//console.log("当前定位地址为：" + address);
			});
		  	geolocationControl.addEventListener("locationError",function(e){
			    // 定位失败事件
			    alert(e.message);
			});
		  	map.addControl(geolocationControl);
			
			//浏览器定位
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					point = r.point;
					marker = new BMap.Marker(r.point);
					map.addOverlay(marker);
					//创建定位标记
					map.centerAndZoom(r.point, 14);
					map.panTo(r.point);//居中显示
					marker.enableDragging();           // 可以拖拽
				}
				else {
					//alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
			
			
			//搜索插件
			var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
				{"input" : "suggestId"
				,"location" : map
			});

			ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
				var str = "";
				var _value = e.fromitem.value;
				var value = "";
				if (e.fromitem.index > -1) {
					value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
				}    
				str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
				
				value = "";
				if (e.toitem.index > -1) {
					_value = e.toitem.value;
					value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
				}    
				str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
				G("searchResultPanel").innerHTML = str;
			});

			
			ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
				var _value = e.item.value;
				myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
				G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
				
				baiduMap.setPlace();
			});
		},
		setPlace : function(){
			map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 18);
				marker = new BMap.Marker(pp);
				marker.enableDragging();   
				map.addOverlay(marker);    //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
				onSearchComplete: myFun
			});
			local.search(myValue);
		}
		
	}
	function searchPointer(){//查询
		var keywords = G('suggestId').value;
		localSearch.search(keywords);
	}
	//选中列表中的地址，创建定位标注
	function addressSelect(el){
		var lng = el.dataset.lng;
		var lat = el.dataset.lat;
		var list = el.parentNode.childNodes;
		for(var i=0;i<list.length;i++){
			var item = list[i];
			if(item!=el){
				item.className='';
			}
		}
		el.className='active';
		L(lng);
		map.clearOverlays();    //清除地图上所有覆盖物
		var pp = new BMap.Point(lng, lat);
		map.centerAndZoom(pp, 18);
		marker = new BMap.Marker(pp);
		marker.enableDragging();   
		map.addOverlay(marker);    //添加标注
	}
	function L(s){
		console.log(s);
	}
	
	
	
	
	