window.addEventListener('load',init,false);
var canvas=null,ctx=null,canvas2=null;
var x=50,y=50;
var ibody=new Image();
ibody.src='images/body.png';
var lastPress=null;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var KEY_ENTER=13;

document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
}

function run(){
    setTimeout(run,50);
    act();
    paint(ctx);
}

function act(){
   if(lastPress==KEY_UP)
         y-=10;
    if(lastPress==KEY_RIGHT)
        x+=10;
    if(lastPress==KEY_DOWN)
         y+=10;
    if(lastPress==KEY_LEFT)
        x-=10;
    if(x>canvas.width-10)
        x=0;
    if(y>canvas.height-10)
        y=0;
    if(x<0)
        x=canvas.width-10;
    if(y<0)
        y=canvas.height-10;

    if(lastPress==KEY_ENTER){
        pause=!pause;
        lastPress=null;
    }
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