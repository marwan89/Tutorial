window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var x=50,y=50;


function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
}

function run(){
    requestAnimationFrame(run); 
    paint(ctx);
}

function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#DF0101';
    ctx.fillRect(x,y,10,10);
}

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();