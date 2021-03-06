window.addEventListener('load',init,false);
var canvas=null,ctx=null,canvas2=null;
var x=50,y=50;
var ibody=new Image(),iFood=new Image(),pared=new Image();
ibody.src='images/body.png';
iFood.src='images/manzana.png';
pared.src='images/pared.png';
var lastPress=null;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var KEY_ENTER=13;
var player=new Rectangle(40,40,10,10);
var food=new Rectangle(80,80,10,10);
var wall=new Array();
var pause=false;

wall.push(new Rectangle(100,50,10,10));
wall.push(new Rectangle(100,100,10,10));
wall.push(new Rectangle(200,50,10,10));


document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
}

function random(max){
    return Math.floor(Math.random()*max);
}

function run(){
    setTimeout(run,50);
    act();
    paint(ctx);
}

function act(){
    if(!pause){
        if(lastPress==KEY_UP)
             player.y-=10;
        if(lastPress==KEY_RIGHT)
            player.x+=10;
        if(lastPress==KEY_DOWN)
             player.y+=10;
        if(lastPress==KEY_LEFT)
            player.x-=10;

        if(player.x>canvas.width-10)
            player.x=0;
        if(player.y>canvas.height-10)
            player.y=0;
        if(player.x<0)
            player.x=canvas.width-10;
        if(player.y<0)
            player.y=canvas.height-10;

        if(player.intersects(food)){
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
            }
        for(var i=0,l=wall.length;i<l;i++){
            if(player.intersects(wall[i])){
                pause=true;
            }
            if(food.intersects(wall[i])){
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
            }
        }
    }
    if(lastPress==KEY_ENTER){
        pause=!pause;
        lastPress=null;
    }
}

function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(iFood,food.x,food.y);
    ctx.drawImage(ibody,player.x,player.y);
    for(var i=0,l=wall.length;i<l;i++){
        ctx.drawImage(pared,wall[i].x,wall[i].y);
    }

    if (pause) {
        ctx.fillStyle='#fff';
        ctx.textAlign='center';
        ctx.fillText('PAUSE',150,75);
    };
    
}

function Rectangle(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
 
    this.intersects=function(rect){
        if(rect!=null){
            if(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y)
                return true;
        }
    }
}

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();