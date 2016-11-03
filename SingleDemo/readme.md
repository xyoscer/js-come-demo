####案例总结

单例模式的用途：当在页面点击登录按钮时，页面弹出登录框，这个登录框是唯一的，无论单击多少次按钮，这个弹窗就只会被创建一次，这种情况就很适
合使用单例模式来创建对象

  - 使用`单例模式`创建登录框，让管理单例的逻辑与创建单例对象具体逻辑分别在两个方法中实现，使在后期的在使用单例模式来完成某项功能变的很方便
  - 使用mousedown,mousemove,mouseup来实现登录弹窗在屏幕可视区内来回拖放，进而学习了解了HTML5中的拖放API
  - 该案例兼容IE浏览器。
  
  
         管理单例模式的逻辑：用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象。
                     /* 管建单例 */
                     var getSingle = function(fn) {
                              var result;
                           return function() {
                               return result || (result = fn.apply(this,arguments));
                               }
                         };
         
         
         拖拽的三步：
              （1）当鼠标按下时，激发mousedown事件，此时记录鼠标相对于拖动对象弹窗的（left和top值）坐标
                  var diffX = e.clientX - target.offsetLeft;    
                  var diffY = e.clientY - target.offsetTop; 
               （2）移动鼠标过程中，不断改变对象的坐标值，实现弹窗跟随鼠标移动效果
                    根据鼠标点击的位置，来计算弹窗要移动到屏幕的什么位置
                        var left = e.clientX-diffX;
                        var top = e.clientY-diffY;
                        target.style.left = left + 'px';
                        target.style.top = top + 'px'; 
                        
                    通过left,top的值的取值范围，来确保弹窗不会移动到可视区外面，
                    当left<0,设置left = 0;当left+target.offsetWidth>document.document.clientWidth,
                     设置left = eft = document.documentElement.clientWidth - target.offsetWidth;
                    同理，top控制也是这样
                （3）当鼠标松开激发mouseup事件，停止拖拽，解除鼠标移动事件
                
                
        
