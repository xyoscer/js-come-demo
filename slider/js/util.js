/**
 * Created by XiYin 2017/3/1.
 */

var util = (function(){
  return {
      //复值对象的属性
    extend: function(o1, o2){
      for(var i in o2){
          if (o1[i] == undefined ) {
              o1[i] = o2[i];
          }
      }
    },
      // 将HTML转换为节点
     html2node: function(str) {
          var container = document.createElement('div');
          container.innerHTML = str;
          return container.children[0];
      },

      //给节点增加相应的类属性
    addClass: function (node, className){
        node.classList.add(className);
    },
    delClass: function (node, className){
        node.classList.remove(className);
    },
      //订阅者与发布者的事件调度中心
    emitter: {
      // 注册事件
      on: function(event, fn) {
        var handles = this._handles || (this._handles = {});
          if(!handles[event]) {
              handles[event] = [];
          }
          // 将回调函数push到对应的事件数组里面
           handles[event].push(fn);

        return this;
      },
      // 解绑事件
      off: function(event, fn) {
        if(!event || !this._handles) {
            this._handles = {};
          }
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
        var args = [].slice.call(arguments, 1),
          handles = this._handles, calls;

        if (!handles || !(calls = handles[event])) return this;
        // 触发所有对应名字的listeners
        for (var i = 0, len = calls.length; i < len; i++) {
          calls[i].apply(this, args);
        }
        return this;
      }
    },
      //事件兼容处理
      addEvent: function(ele,event,handle) {
          if(ele.addEventListener) {
              return ele.addEventListener(event,handle,false);
          }else if(ele.attachEvent) {
              return ele.attachEvent("on"+event,handle);
          }else {
              return ele["on"+event] = handle;
          }
      }

  }
})();