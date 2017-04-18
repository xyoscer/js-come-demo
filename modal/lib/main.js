/**
 * Created by lenovo on 2017/4/18.
 */
require(['modal'],function(modal) {
    var modal = new modal.Modal({
        // 1.内容配置
        content: "<div class='form-group'>"
        + "<label for='user'>用户名</label>"
        + "<input type='text' id='user' name='user' class='form-control' placeholder='请输入用户名'>"
        + "</div>", //可传入节点和字符串
        // 2.标题配置
        title: "登录系统",
        // 3. 动画设置，可以很容易扩展动画
        animation: {
            enter: 'pulse',
            leave: 'rotateOut'
        }
        /* //  3. confirm回调
         onConfirm: function(){
         console.log('ok')
         },
         // 4. cancel回调
         onCancel: function(){
         console.log('cancel')
         }
         */
    });

    //订阅消息
    modal.on('confirm', function (args) {
        console.log('confirm:' + args);
    });
    modal.on('cancel', function () {
        console.log('cancel');
    });
    modal.on('down', function () {
        console.log('down');
    });


    document.querySelector('.u-trigger').addEventListener('click', function () {
        modal.show(modal.content, modal.title);
    });

})
