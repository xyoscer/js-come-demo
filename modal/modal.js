
//使用发布-订阅者模式实现对象之间松耦合
var emitter = {
  // 注册事件
  on: function(event, fn) {
    var handles = this._handles || (this._handles = {}),
      calls = handles[event] || (handles[event] = []);
    // 找到对应名字的栈
    calls.push(fn);
    return this;
  },
  // 解绑事件
  off: function(event, fn) {
    if(!event || !this._handles) this._handles = {};
    if(!this._handles) return;

    var handles = this._handles , calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return this;
      }
      // 找到栈内对应listener 并移除
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return this;
        }
      }
    }
    return this;
  },
  // 触发事件
  emit: function(event){
    var args = [].slice.call(arguments, 1);
    var handles = this._handles;
    var calls;

    if (!handles || !(calls = handles[event])) return this;
    // 触发所有对应名字的listeners
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(this, args)
    }
    return this;
  }
};
(function(){
  // 将HTML转换为节点
  function htmlTonode(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }

  // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
  function extend(o1, o2){
    for(var i in o2) {
      if(typeof o1[i] === 'undefined'){
        o1[i] = o2[i]
       }
    } 
    return o1
  }
  // Modal
  // m-modal表示遮罩层，modal_wrap是窗体，modal_head/modal_body表示窗体里面的标题,主体
  //modal_footer表示窗体的脚部，放置按钮的
  var template = 
  '<div class="m-modal">\
    <div class="modal_wrap animated">\
      <div class="modal_head">标题</div>\
      <div class="modal_body">内容</div>\
      <div class="modal_foot">\
        <a class="confirm" href="#">确认</a>\
        <a class="cancel" href="#">取消</a>\
      </div>\
    </div>\
  </div>';

  function Modal(options){
    options = options || {};
    // 即 div.m-modal 节点,确保每个实例都有唯一的container
    this.container = this._layout.cloneNode(true);
    // body 用于插入自定义内容
    this.body = this.container.querySelector('.modal_body');
    // head 用于插入自定义标题
    this.head = this.container.querySelector('.modal_head');
    // 窗体节点，在应用动画时有用
    this.wrap = this.container.querySelector('.modal_wrap');
    // 将options 复制到 组件实例上
    extend(this, options);
    this._initEvent();

  }

  extend(Modal.prototype, {
    _layout: htmlTonode(template),
    setContent: function(content){
      if(!content) {
         return
      }
      //支持两种字符串结构和DOM节点
      if(content.nodeType === 1){
        this.body.innerHTML = "";
        this.body.appendChild(content);
      }else{
        this.body.innerHTML = content;
      }
    },
    setHead: function(head) {
          if(!head) return;
          if(head.nodeType === 1){
              alert("11");
              this.head.innerHTML = "";
              this.head.appendChild(head);
          }else{
              this.head.innerHTML = head;
          }
      },
    // 显示弹窗
    //如果设置显示内容，则进行setContent，然后在把模板追加到页面，如果没有显示内容，则直接显示模板
    show: function(content, title){
      if(content) {
        this.setContent(content);
      }
      if(title) {
          this.setHead(title);
      }
      document.body.appendChild(this.container);
      animateClass(this.wrap, this.animation.enter)
    },

    hide: function(){
      var container = this.container;
      animateClass(this.wrap, this.animation.leave, function(){
        document.body.removeChild(container);
      })

    },


    // 初始化事件
    _initEvent: function(){

      this.container.querySelector('.confirm').addEventListener(
        'click', this._onConfirm.bind(this)
      );
      this.container.querySelector('.cancel').addEventListener(
        'click', this._onCancel.bind(this)
      );
     this.container.querySelector('.modal_wrap').addEventListener(
            'mousedown',this._onDown.bind(this),false
        );
     this.container.querySelector('.modal_wrap').addEventListener(
            'mousemove',this._onMove.bind(this),false
        );
    this.container.querySelector('.modal_wrap').addEventListener(
            'mouseup',this._onUp.bind(this)
        );
    },

    _onConfirm: function(){
      this.emit('confirm');
      this.hide();
    },

    _onCancel: function(){
      this.emit('cancel');
      this.hide();
    },
   _onDown: function() {
       this.emit('down');
   },
   _onMove:function() {
       this.emit('move');
   },
   _onUp:function() {
          this.emit('up');
      }

  });

  // 使Modal实例上具有事件发射器功能
  extend(Modal.prototype, emitter);

  // Exports 直接暴露到全局
  window.Modal = Modal;

})()
