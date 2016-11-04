(function() {
	var divBox = document.getElementsByClassName('div1');
	var dragImg = document.getElementById('drag1');
	//被拖动元素触发dragstart()
	dragImg.addEventListener("dragstart",function(){
		 event.dataTransfer.effectAllowed = "move";
		 event.dataTransfer.setData("text", event.target.id);//向dataTransfer对象追加数据  
	},false);
	//拖放的目标位置dragover(),drop()
	divBox[0].addEventListener("dragover",function(){
		  event.preventDefault();
	},false);
	divBox[0].addEventListener("drop",function(){
		event.preventDefault();   
       var data = event.dataTransfer.getData("text");
       event.target.appendChild(document.getElementById(data));
	});
	
	divBox[1].addEventListener("dragover",function(){
		event.preventDefault();
	},false);
	divBox[1].addEventListener("drop",function(){
		event.preventDefault();   
       var data = event.dataTransfer.getData("text");
       event.target.appendChild(document.getElementById(data));
	},false);
})();