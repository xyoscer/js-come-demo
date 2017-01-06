var count = 0;
var DHide = document.getElementsByClassName('display-hide');
var Div = document.getElementsByTagName('div');

    Div[0].addEventListener("mouseover", function(){
    count++;
    DHide[0].innerHTML = '<p>' +'你的鼠标移近第一个div：'+ count + '次'+'</p>';
});

    Div[0].addEventListener("click", function(){
  DHide[0].style.display = "block";
});