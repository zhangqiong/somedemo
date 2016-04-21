var validate = {
	isIntiger : function(str){
		var regu = /^[0-9]{1,}$/;
		return regu.test(str);
	},
	isFloat : function(str){
		var regu = /^[0-9]{1,}[\.]{0,1}[0-9]{1,}$/;
		return regu.test(str);
	},
	isDate : function(str){
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		
		if(r==null)return false;
		var d= new Date(r[1], r[3]-1, r[4]);
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);  
	},
	isTime : function(str){
		var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
		if (a == null) {
			return false;
		}
		if (a[1]>23 || a[3]>59 || a[4]>59)
		{
			return false;
		}
		return true;
	},
	isChannel : function(str){
		str = str.replace(/\s/g, "");
		var reg    = /^[A-Za-z0-9\.\-\,]+$/;
		return reg.test(str);
	},
	isVersion : function(str){
		str = str.replace(/\s/g, "");
		var arr = str.split(','),
			reg1 = /^\d{1,}$/,
			reg2 = /^[\[]{1}\d{1,}[\]]{1}$/;
		return !(arr.some(function(item,index,a){
			return !reg1.test(item)&&!reg2.test(item);
		}));
	}

}