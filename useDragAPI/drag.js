(function(){
  var targetbox = document.getElementsByClassName('targetbox')[0];
  var dragbox = document.getElementsByClassName('dragbox')[0];
  var draglist = document.getElementsByClassName('draglist');
  var dragLength = draglist.length;
  var dragremind = document.getElementsByClassName("dragremind")[0];  
  var eleDrag = null; 

  var startDrag = function(event) {    	
         var target = event.target||event.srcElement;
         event.dataTransfer.effectAllowed = "move";
		 event.dataTransfer.setData("text", "我要搬家");//向dataTransfer对象追加数据  
		
         var drag = function(){
         	
		    target.style.backgroundColor = "red";		    		    		   
		    eleDrag = target;

         }
         switch(target.id) {
         	case "list1":         	       
                   drag();
         	   break;
            case "list2":
                  drag();
         	   break;
         	case "list3":
         	      drag();
         	   break;
         	case "list4":
         	      drag();
         	   break;
         	case "list5":
         	     drag();
         	   break;
         	case "list6":
         	     drag();
         	   break;
         }
    };

 dragbox.addEventListener("dragstart",startDrag,false);
 targetbox.addEventListener("dragover",function(){ 
   event.dataTransfer.dropEffect = "move";
   event.preventDefault();
},false);
targetbox.addEventListener("dragleave",function(){	
   event.preventDefault();
},false);
var change = function() {
	var item = document.getElementById('item5');	
	item.style.transform = "translateZ(200px)"+"rotateX(-60deg)";
	item.style.transformOrigin = "bottom"; 
	item.style.transition = "transform 1s";
};
targetbox.addEventListener("dragenter",change,false);

var changeBack = function(event) {
    var item = document.getElementById('item5');	
	var items = document.getElementsByClassName('item')[0];
	item.style.transform = "translateZ(200px)"+"rotateX(0deg)"; 
	item.style.transition = "transform 1s"; 	
  	item.style.transformOrigin = "bottom";
  	items.style.opacity = ".8";	
	if (eleDrag) {
		
		var p = document.createElement("p");
		var dt = event.dataTransfer;
		var text = dt.getData("text");//从dataTransfer那取得数据
		p.innerHTML = '<h5>'+text+'移近百宝箱'+'<h5>';		
		item.appendChild(p);		
		eleDrag.parentNode.removeChild(eleDrag);
	}
	
};
targetbox.addEventListener("drop",changeBack,false);
document.addEventListener("dragover",function(){
	event.preventDefault();
},false);
document.addEventListener("drop",function(){
	event.preventDefault();
},false);
})();