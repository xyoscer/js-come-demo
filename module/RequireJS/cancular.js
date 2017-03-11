/**
 * Created by XiYin   2017/3/6.
 * 输出模块兼容CommonJS规范
 */
define(function( require, exports ){

    var math = require("./math"); //加载外部模块
    function Caculator ( container ){
        this.left = container.querySelector( ".j-left" );
        this.right = container.querySelector( ".j-right" );
        this.add = container.querySelector( ".j-add" );
        this.result = container.querySelector( ".j-result" );
        this.add.addEventListener("click", this.compute.bind( this) );
    }

    Caculator.prototype.compute  = function(){
        this.result.textContent = math.add( +this.left.value, +this.right.value );
    };
    exports.Caculator = Caculator; //暴露接口
});