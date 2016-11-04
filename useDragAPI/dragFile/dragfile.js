(function(){
	var targetBox= document.getElementById('target');
	var dragFile = document.getElementById('content');
	 targetBox.addEventListener("dragover",function(){
	 	event.preventDefault();
	 	event.dataTransfer.dropEffect = "copy";
	 },false);
	 targetBox.addEventListener("drop",moveFile,false);
	 var moveFile = fucntion(event) {
	 	//获取本地文件列表信息，files获取拖拽文件的数组数据，每个文件占用一个数组索引
	 	var fileList = event.dataTransfer.files;    
    if (fileList.length) {
        var file = fileList[0];
        var reader = new FileReader();
        reader.onloadend = function(event) {
            if (event.target.readyState == FileReader.DONE) {
                var content = reader.result;
                targetBox.innerHTML = 'File: ' + file.name + '\n\n' + content;
            }
        }
        
        reader.readAsBinaryString(file);
    }
	 };
})();