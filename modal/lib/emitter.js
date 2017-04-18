/**
 * Created by XiYin on 2017/4/18.
 */
//使用发布-订阅者模式实现对象之间松耦合
define([],function() {
        var emitter = {
            // 注册事件,订阅事件
            on: function (event, fn) {
                //hamdles表示存放订阅者,以及对应的回调函数
                var handles = this._handles || (this._handles = {});
                if (!handles[event]) {
                    handles[event] = [];
                }
                handles[event].push(fn);
                return this;
            },
            // 解绑事件，解除订阅
            off: function (event, fn) {
                if (!event || !this._handles) this._handles = {};
                if (!this._handles) return;

                var handles = this._handles, calls;

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
            // 发布事件，依次触发里面存放的订阅者回调函数
            emit: function (event) {
                var args = [].slice.call(arguments, 1);
                var handles = this._handles;
                var calls; //该事件对应的所有回调函数

                if (!handles || !(calls = handles[event])) return this;
                // 触发所有对应名字的listeners
                for (var i = 0, len = calls.length; i < len; i++) {
                    calls[i].apply(this, args);
                }
                return this;
            }
        };
        return {emitter:emitter};
    })
