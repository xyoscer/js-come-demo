function startMove(obj, json, interval, fn) {
    clearInterval(obj.timer);// 该对象每次开始动画，都先停止掉正在进行的计数器,以免发生计数器
    // 运动速度会不断增快的效果。
    var flag;  // 用来表示所有运动是否到达目标值
    // 开启定时器，每隔Interval时间段执行相应动作
    // 用来获得当下的属性值
    obj.timer = setInterval(function () {
        flag = true;// 进入定时器时,现将flag设置为所有的属性都已达到目标值
        // 获取传过来的Json值（需要变化的属性，因为要同时执行多属性，所以这里使用了json传值）。
        for (var attr in json) {
            var curr = 0;
            // 判断所传递的属性是否为透明度
            if (attr == 'opacity') {// 如果是透明度，则获取该对象此刻的透明度值
                curr = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {// 否则，获取该属性的其他属性值
                curr = parseInt(getStyle(obj, attr));
            }
            // 进行运动的速度处理
            var speed = 0;
            speed = (json[attr] - curr) / 10;// 每次速度变化的增量，每次实时的获得，可以达到变速运动
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);// 速度增量大于0，向上取整，速度增量小于0,向下取整
            if (curr != json[attr]) {// 当随着属性值还不等于要达到的目标值，就将flag设置为false;
                flag = false;
            }
            // 进行运动变化
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (curr + speed) + ")";
                obj.style.opacity = (curr + speed) / 100;
            } else {
                obj.style[attr] = curr + speed + 'px';
            }
        }
        if (flag) {// 如果flag值为true,说明传来的属性值，都已经变化到目标值，就可以清除计数器，
            // 同时在检查是否有回调函数传入,若有就继续执行回调函数。
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, interval);
}

function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {// 非ＩＥ下获得属性的方法
        value = window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undefined') {// IE下获得属性的方法
        value = element.currentStyle[attr];
    }
    return value;

}