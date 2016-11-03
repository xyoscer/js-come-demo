(function(){
  var targetbox = document.getElementsByClassName('targetbox')[0];
  var dragbox = document.getElementsByClassName('dragbox')[0];
  var draglist = document.getElementsByClassName('draglist');
  var dragLength = draglist.length;
  var dragremind = document.getElementsByClassName("dragremind")[0];  
  var eleDrag = null; 
   
  var startDrag = function(event) {    	
         var target = event.target||event.srcElement;        
         var drag = function(){
         	event.dataTransfer.effectAllowed = "move";
		   //event.dataTransfer.setData("text", event.target.innerHTML);
		    target.style.backgroundColor = "red";
		    target.style.width = 100+"px";
		//event.dataTransfer.setDragImage(event.target, 0, 0);
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
   event.preventDefault();
},false);

var change = function() {
	var item = document.getElementById('item5');	
	item.style.transform = "translateZ(200px)"+"rotateX(-60deg)";
	item.style.transformOrigin = "bottom"; 
	item.style.transition = "transform 1s";
};
targetbox.addEventListener("dragenter",change,false);

var changeBack = function() {
    var item = document.getElementById('item5');	
	var items = document.getElementsByClassName('item')[0];
	item.style.transform = "translateZ(200px)"+"rotateX(0deg)"; 
	item.style.transition = "transform 1s"; 	
  	item.style.transformOrigin = "bottom";
  	items.style.opacity = ".8";	
	if (eleDrag) {
		
		var p = document.createElement("p");
		p.innerHTML = '<h5>'+eleDrag.innerHTML+'移近百宝箱'+'<h5>';		
		item.appendChild(p);		
		eleDrag.parentNode.removeChild(eleDrag);
	}
	
};
targetbox.addEventListener("drop",changeBack,false);
})();