/**
 * Created by zq on 2016/2/29.
 */
(function(){
    'use strict';
alert("aaaa");
    window.Headroom= function (){
        this.scrollY;
        this.lastScrollY;
        this.scrolled;
    };
    Headroom.prototype={
        // 获取当前y


        setClass:function(){
            if(this.scrolled>0){
                document.querySelector("header").className="headroom headroom--unpinned";
            }
            else{
                document.querySelector("header").className="headroom headroom--pinned";
            }
        },
        update:function(){
            this.scrollY=window.pageYOffset;
            // this.getScrollY();
            this.scrolled=this.scrollY-this.lastScrollY;
            this.lastScrollY=this.scrollY;
            console.log(this.scrolled);
            console.log("update",this);
            this.setClass();
        },
        init:function(){
            // this.update();
            window.addEventListener("scroll",this.update.bind(this));
        },
        getScrollY:function(){
            if(window.pageYOffset!==undefined)return window.pageYOffset;
            else
            // if(document.body.scroolTop)
                return document.body.scroolTop;
        }

    };

    // console.log(headroom.getScrollY());
})();