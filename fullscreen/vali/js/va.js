/**
 * Created by zq on 2016/2/16.
 */
function Valid(){}
Valid.prototype={

};
function not_null(item){
    if(item==null||item!=="")return false;
}
function validate(){
    if(!not_null(console.log(this)))console.log("null");

}
($("#form1").each($(this).blur(validate)))();