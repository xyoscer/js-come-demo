'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Caculator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by XiYin on 2017/3/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/* import命令编译时加载 ,可以使用import()函数动态加载模块 */


var _math = require('./math');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Caculator = function () {
    function Caculator(container) {
        _classCallCheck(this, Caculator);

        this.left = container.querySelector('.j-left');
        this.right = container.querySelector('.j-right');
        this.add = container.querySelector('.j-add');
        this.result = container.querySelector('.j-result');
        this.add.addEventListener("click", this.compute.bind(this));
    }

    _createClass(Caculator, [{
        key: 'compute',
        value: function compute() {
            this.result.textContent = (0, _math.add)(+this.left.value, +this.right.value);
        }
    }]);

    return Caculator;
}();

exports.Caculator = Caculator;