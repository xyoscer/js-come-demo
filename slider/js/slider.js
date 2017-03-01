/**
 * Created by XiYin 2017/3/1.
 */
(function(util){
 //轮播图图片容器HTML模板
  var template = 
  '<div class="m-slider" >\
    <div class="slide"></div>\
    <div class="slide"></div>\
    <div class="slide"></div>\
  </div>';

  // 轮播器的构造函数
  function Slider( opt ){
    util.extend(this, opt);
    // 容器节点 以及 样式设置
    this.container = this.containers || document.body;
    this.container.style.overflow = 'hidden';
    // 组件节点
    this.slider = this._layout.cloneNode(true); // 轮播图视口
    this.slides = [].slice.call(this.slider.querySelectorAll('.slide')); // 轮播图片容器

    // 页面数量
    // this.pageNum 必须传入
    this.pageNum = this.images.length;
    // 内部数据结构
    this.slideIndex = 1; //当前轮播图片的索引
    this.pageIndex = this.pageIndex || 0; //页面上的数字索引
    this.offsetAll = this.pageIndex; //偏移量的基础
    // 初始化动作
    this.container.appendChild(this.slider);
  }
   //使slider原型上具有事件发射器功能（订阅者-发布者的调度中心）
   util.extend( Slider.prototype, util.emitter );
    // 扩展原型
   util.extend( Slider.prototype, {
    _layout: util.html2node(template),
    // 直接跳转到指定页
    go: function( pageIndex ){
      this.pageIndex = pageIndex;
      this.slideIndex = typeof this.slideIndex === 'number'? this.slideIndex: (pageIndex+1) % 3;
      this.offsetAll = pageIndex;
      this.slider.style.transitionDuration = '0s';
      this._calcSlide();
    },
    // 下一页
    next: function(){
      this._step(1);
    },
    // 上一页
    prev: function(){
      this._step(-1);
    },
    // 单步移动
    _step: function(offset){
      this.offsetAll += offset;
      this.pageIndex += offset;
      this.slideIndex +=offset;
      this.slider.style.transitionDuration = '.5s';
      this._calcSlide();
    },
    // 计算Slide
    // 每个slide的left = (offsetAll + offset(1, -1)) * 100%;
    // 外层容器 (.m-slider) 的偏移 = offsetAll * 宽度
    _calcSlide: function(){
      var slideIndex = this.slideIndex = this._normIndex(this.slideIndex, 3);
      var pageIndex = this.pageIndex = this._normIndex(this.pageIndex, this.pageNum);
      var offsetAll = this.offsetAll;

      var prevSlideIndex = this._normIndex( slideIndex - 1, 3 );
      var nextSlideIndex = this._normIndex( slideIndex + 1, 3);
      var slides = this.slides;

      // 三个slide的偏移
      slides[slideIndex].style.left = (offsetAll) * 100 + '%';
      slides[prevSlideIndex].style.left = (offsetAll-1) * 100 + '%';
      slides[nextSlideIndex].style.left = (offsetAll+1) * 100 + '%';

      // 容器偏移,translateZ(0)用来提高硬件加速
      this.slider.style.transform = 'translateX('+ (-offsetAll * 100)+'%) translateZ(0)';

      // 当前slide 添加 'z-active'的className
      slides.forEach(function(node){
          util.delClass(node, 'z-active');}
          );
      util.addClass(slides[slideIndex], 'z-active');
      this._onGo(this.pageIndex, this.slideIndex);
    },
    // 标准化下标
    _normIndex: function(index, len){
      return (len + index) % len;
    },
    // 跳转时,设置图片的url
    _onGo: function(pageIndex, slideIndex){
      var slides = this.slides;
      for(var i =-1; i<= 1; i++){
        var index = (slideIndex + i+3)%3; 
        var img = slides[index].querySelector('img');
        if(!img){
          img = document.createElement('img');
          slides[index].appendChild(img);
        }
        img.src = './imgs/pic' + ( this._normIndex(pageIndex + i, this.pageNum)+1 ) + '.jpg';
      }
     //发布nav事件
      this.emit('go', {
        pageIndex: pageIndex,
        slideIndex: slideIndex
      });
    }

   });

 //暴露接口道全局
  window.Slider = Slider;
})(util);








