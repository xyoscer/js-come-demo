/**
 * Created by XiYin 2017/3/1.
 */
(function(){
    var $ = function( selector ){
        return [].slice.call(document.querySelectorAll(selector))
    };
    var cursors = $('.m-cursor .cursor');
    var prev = $('.m-cursor .prev')[0];
    var next = $('.m-cursor .next')[0];
    var container = $('.container')[0];

    cursors.forEach(function(cursor, index){
        util.addEvent(cursor,'click',function(){  slider.nav(index);});
    });

    util.addEvent(prev,'click',function(){slider.prev();});
    util.addEvent(next,'click',function(){slider.next();});

    var slider = new Slider({
        //视口容器,获得页面中的视口容器
        containers: container,
        // 图片列表
        images: [
            "./imgs/pic1.jpg",
            "./imgs/pic2.jpg",
            "./imgs/pic3.jpg",
            "./imgs/pic4.jpg",
            "./imgs/pic5.jpg",
            "./imgs/pic6.jpg"
        ]
    });

// 通过监听`nav`事件来完成额外逻辑

    slider.on('go', function( ev ){
        var pageIndex = ev.pageIndex;
        cursors.forEach(function(cursor, index){
            if(index === pageIndex ){
                cursor.classList.add('z-active');
            }else{
                cursor.classList.remove('z-active');
            }
        });

    });

   // 1s 自动轮播
    var timer = setInterval(function(){
        slider.next();// 下一页
    },1000);
  // 鼠标移动到容器里，轮播图停止播放
    util.addEvent(container,'mouseenter',function(){ clearInterval(timer);});
    util.addEvent(container,'mouseleave',function(){
        clearInterval(timer);
        timer = setInterval(function(){
            slider.next();
        },1000);
    });

//  默认为第一页
    slider.go(0);
})();