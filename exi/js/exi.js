
$(document).ready(function(){
	// alert("loaded");
       $('#urls').load("images/titleAfter-original.json",function(){
              infos=JSON.parse($('#urls').text()) ;
              infos.reverse();

              $(window).resize(arrange);
              loadImg(30);
       });
       $(window).scroll(function(){
              if($(document).outerHeight()-$(document).scrollTop()<2*$(window).outerHeight()){
                     loadImg(30);
              }
       });
});
var infos;
var show_count=0;
function arrange(){
       // alert("arrange");
       var li_width=336,min,max;

       var col;
       if(li_width>$(window).outerWidth()){
              col=1;
              $('#auto-loop').css('width','100%');
       }else{
              col=Math.floor($(window).outerWidth()/li_width);
              $('#auto-loop').css('width',col*li_width);
       }
       if(col>4)col=4;
       
       var i=0,left,top,$last_li,col_index,height=new Array(col);

       $('#auto-loop li').each(function(){
             // left=i%col*li_width;
             // $(this).css('left',left+'px');
              // console.log(i,from);
             
              if(i<col){
                      left=i%col*li_width;
                      $(this).css('left',left+'px');
                      $(this).css('top','0');
                      height[i%col]=$(this).outerHeight(true);
                      // console.log(height,min,i);
              }else{
               col_index=height.indexOf(min);
               $(this).css('left',col_index*li_width+'px');
               $(this).css('top',min);
               height[col_index]+=$(this).outerHeight(true);
               
              }
              
             
             min=Math.min.apply(null,height);
              max=Math.max.apply(null,height);
              
              // console.log(i);
              $(this).css('opacity','1');
             i++;
       });
       $("#auto-loop").css('height',max);

}
function loadImg(sum_once){
       var length=infos.length,i,htmlTxt="";
       if(show_count>=length){
              // alert("没有了");
              $('.loading').html('没有啦');
              $(window).unbind('scroll');
       }
       for(i=show_count;i<show_count+sum_once && i<length;i++){
              // htmlTxt+='<li><a href="" data-to="'+(i+1)+'">'+(i+1)+'</a></li>';
              htmlTxt+='<li data-src="images/'+infos[i].url+'"> <a href="#"><img src="images/'+infos[i].url+'" /><span class="introduction">'+infos[i].title+infos[i].introduction+'</span></a> </li>';
       }
       
       $("#auto-loop").append($(htmlTxt));
       $('img').load(function(){
              arrange();
       });
       
       // $(window).load(function(){
       //        alert("arrange");
       // })
       $("#auto-loop").lightGallery({
                            loop:true,
                            auto:false,
                            pause:4000,
                            from:show_count
       });
       show_count+=sum_once;
}