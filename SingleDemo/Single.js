/** 
  * created by xyoscer
  */

  /* 管理单例 */
var getSingle = function(fn) {
   var result;
   return function() {
      return result || (result = fn.apply(this,arguments));
   }
};
/* 创建登录浮窗 */
var createLoginLayer = function() {
	var div  = document.createElement('div');
	div.id = "login";
	var content = '<form action="">'+
	'<div class="form-group">'+
	'<label for="user">用户名</label>'+
	'<input type="text" id="user" name="user" class="form-control" placeholder=" 请输入用户名">'+
	'</div>'+
	'<div class="form-group">'+
	'<label for="pwd">密码</label>'+
	'<input type="password" id="pwd" name="pwd" placeholder=" 请输入密码" class="form-control">'+
	'</div>'+	
	'<button class="btn" id="layerBtn">登 录</button>'+	
	'</form>';
	div.innerHTML = content;
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;

};

/* 展示登录符窗 */
var show = function() {
	var loginLayer = createSingleLoginLayer();
	var dropBack = document.getElementById('dropBack');
	//获取浏览器的宽和高,设置初始弹窗在屏幕中的位置    
    var top = (document.documentElement.clientHeight - 250) / 2 ;
    var left = (document.documentElement.clientWidth - 300) / 2;
	loginLayer.style.display = 'block';
	loginLayer.style.left = left + 'px'; //登录弹窗在屏幕中的位置
    loginLayer.style.top = top + 'px';
    //绑定拖拽函数
    EventUtil.addHandler(loginLayer,"mousedown",dragWindow);    
	dropBack.style.display = 'block';
};

/* 实现拖拽窗口 */
var dragWindow = function(event) {
  var e = EventUtil.getEvent(event);  
  var target = EventUtil.getElement(e);
    //拖拽的第一步,记录鼠标相对于拖动对象（left和top值）坐标
   
    var diffX = e.clientX - target.offsetLeft;    
    var diffY = e.clientY - target.offsetTop;  
    
   //拖拽第二步，移动鼠标过程中，不断改变对象的坐标值，实现弹窗跟随鼠标移动效果
    var move = function(e) {    	
    	var left = e.clientX-diffX;
        var top = e.clientY-diffY;
            if(left<0){
            	left = 0;
            }else if(left>document.documentElement.clientWidth - target.offsetWidth){
                //没有使用document.body.clientWidth因为此时页面的高度只有100多，而现在要求弹窗在整个可视区中移动
            	left = document.documentElement.clientWidth - target.offsetWidth;
            }

           if(top<0){
            	top = 0;
            }else if(top>document.documentElement.clientHeight - target.offsetHeight ){
            	top = document.documentElement.clientHeight - target.offsetHeight;
            }
            target.style.left = left + 'px';
            target.style.top = top + 'px';          

       };
      //拖拽第三步，鼠标松开，解除鼠标移动事件
      var up = function(event) {
      	EventUtil.removeHandler(document,"mousemove",move);
      	    
      };   
//绑定鼠标事件
  EventUtil.addHandler(document,"mousemove",move); 
 EventUtil.addHandler(document,"mouseup",up);	
};

var createSingleLoginLayer = getSingle(createLoginLayer);
var btnlogin = document.getElementById('loginBtn');
EventUtil.addHandler(btnlogin,"click",show);
 




