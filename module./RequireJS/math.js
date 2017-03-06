/**
 * Created by XiYin on 2017/3/6.
 */
define( [], function(){

    function add ( a, b ){
        return a + b;
    }
    function sub ( a, b ){
        return a - b;
    }

    return {
        add: add,
        sub: sub
    };
});