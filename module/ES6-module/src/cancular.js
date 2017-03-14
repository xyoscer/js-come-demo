/**
 * Created by XiYin on 2017/3/14.
 */
/* import命令编译时加载 ,可以使用import()函数动态加载模块 */
import { add } from './math';
class Caculator {
    constructor (container) {
        this.left = container.querySelector('.j-left');
        this.right = container.querySelector('.j-right');
        this.add = container.querySelector('.j-add');
        this.result = container.querySelector('.j-result');
        this.add.addEventListener("click",this.compute.bind(this));
    }
    compute() {
        this.result.textContent = add( +this.left.value, +this.right.value);
    }

}
export{ Caculator };