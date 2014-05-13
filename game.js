window.addEventListener('load',init,false);
var canvas=null,ctx=null;

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    paint(ctx);
}
function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}