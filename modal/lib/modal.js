/*
 使用模块化很好的定义了一个作用域避免全局名称空间污染，显示的列出其依赖关系
 并以函数参数的形式将依赖进行注入，而无需引入全局变量
  */

define(['animate','emitter'],function(animate, em) {
    // 将HTML转换为节点
    function htmlTonode(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    }

    // 赋值属性
    // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
    function extend(o1, o2) {
        for (var i in o2) {
            if (typeof o1[i] === 'undefined') {
                o1[i] = o2[i];
            }
        }
        return o1;
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

    function Modal(options) {
        options = options || {};
        // 即 div.m-modal 节点,确保每个实例都有唯一的container
        this.container = this._layout.cloneNode(true);
        // body 用于插入自定义内容
        this.body = this.container.querySelector('.modal_body');
        // head 用于插入自定义标题
        this.head = this.container.querySelector('.modal_head');
        // 窗体节点，在应用动画时有用
        this.wrap = this.container.querySelector('.modal_wrap');
        //鼠标移动时记录的状态量
        this.diffX = 0;
        this.diffY = 0;
        this.moving = 0;
        // 将options 复制到 组件实例上
        extend(this, options);
        this._initEvent();

    }

    extend(Modal.prototype, {
        _layout: htmlTonode(template),
        setContent: function (content) {
            if (!content) {
                return;
            }
            //支持两种字符串结构和DOM节点
            if (content.nodeType === 1) {
                this.body.innerHTML = "";
                this.body.appendChild(content);
            } else {
                this.body.innerHTML = content;
            }
        },
        setHead: function (head) {
            if (!head) return;
            if (head.nodeType === 1) {
                this.head.innerHTML = "";
                this.head.appendChild(head);
            } else {
                this.head.innerHTML = head;
            }
        },
        // 显示弹窗
        //如果设置显示内容，则进行setContent，然后在把模板追加到页面，如果没有显示内容，则直接显示模板
        show: function (content, title) {
            if (content) {
                this.setContent(content);
            }
            if (title) {
                this.setHead(title);
            }
            document.body.appendChild(this.container);
        },

        hide: function () {
            var container = this.container;
            animate.animateClass(this.wrap, this.animation.leave, function () {
                document.body.removeChild(container);
            });
        },


        // 初始化事件
        _initEvent: function () {

            this.container.querySelector('.confirm').addEventListener(
                'click', this._onConfirm.bind(this, "确定退出"), false
            );
            this.container.querySelector('.cancel').addEventListener(
                'click', this._onCancel.bind(this), false
            );
            this.wrap.addEventListener(
                'mousedown', this._onDown.bind(this), false
            );
            document.addEventListener(
                'mousemove', this._onMove.bind(this), false
            );
            document.addEventListener(
                'mouseup', this._onUp.bind(this), false
            );

        },
        _onConfirm: function (info) {
            //this.onConfirm();
            this.emit('confirm', info); //发布执行confirm函数消息
            this.hide();
        },

        _onCancel: function () {
            this.emit('cancel');
            this.hide();
        },
        _onDown: function (event) {
            this.emit('down');  // 发布执行down函数
            var e = event || window.event;

            //拖拽的第一步,获取鼠标按下时距离当前窗口的水平、垂直坐标。(e.clienX,e.clienY)
            // 并获取弹窗左边缘和上边缘距离父容器左边与上边的距离 offsetLeft,offsetTop
            // 记录鼠标按下点距弹窗左边缘和上边缘的距离diffX,diffY
            this.diffX = e.clientX - this.wrap.offsetLeft;
            this.diffY = e.clientY - this.wrap.offsetTop;
            //表明鼠标是按下的状态
            this.moving = 1;
        },
        //拖拽第二步，移动鼠标过程中，不断改变对象的坐标值，实现弹窗跟随鼠标移动效果
        _onMove: function (event) {
            var e = event || window.event;
            if (this.moving === 0) return; //为0表示鼠标是没有按下，此时拖动弹窗，弹窗不动
            //记录移动过程中鼠标点击的位置坐标
            var newClientX = e.clientX;
            var newClientY = e.clientY;

            var left = newClientX - this.diffX;
            var top = newClientY - this.diffY;
            if (left < 0) {
                left = 0;
            } else if (left > document.documentElement.clientWidth - this.wrap.offsetWidth) {
                left = document.documentElement.clientWidth - this.wrap.offsetWidth;
            }

            if (top < 0) {
                top = 0;
            } else if (top > document.documentElement.clientHeight - this.wrap.offsetHeight) {
                top = document.documentElement.clientHeight - this.wrap.offsetHeight;
            }
            this.wrap.style.transform = 'translateZ(0)';
            this.wrap.style.left = left + 'px';
            this.wrap.style.top = top + 'px';
        },
        _onUp: function () {
            this.moving = 0;
            document.removeEventListener('mousemove', this._onMove.bind(this), false);
        }
    });

    // 使Modal实例上具有事件发射器功能
    extend(Modal.prototype, em.emitter);
   // 返回对象
    return {Modal:Modal};
})


