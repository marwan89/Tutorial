window.addEventListener('load',init,false);
var canvas=null,ctx=null,canvas2=null;
var x=50,y=50;
var ibody=new Image();
ibody.src='images/body.png';

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
}

function run(){
    requestAnimationFrame(run); 
    paint(ctx);
    act();
}
function act(){
    y+=2;
    if(y>canvas.height)
        y=0;
}

function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(ibody,x,y);
}

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();