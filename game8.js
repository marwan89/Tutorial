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
//var player=new Rectangle(40,40,10,10);
var body=new Array();
var food=new Rectangle(80,80,10,10);
var wall=new Array();
var pause=false;
var score=0;

body.length=0;
body.push(new Rectangle(40,40,10,10));
body.push(new Rectangle(0,0,10,10));
body.push(new Rectangle(0,0,10,10));

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
             body[0].y-=10;
        if(lastPress==KEY_RIGHT)
            body[0].x+=10;
        if(lastPress==KEY_DOWN)
             body[0].y+=10;
        if(lastPress==KEY_LEFT)
            body[0].x-=10;

        if(body[0].x>canvas.width-10)
            body[0].x=0;
        if(body[0].y>canvas.height-10)
            body[0].y=0;
        if(body[0].x<0)
            body[0].x=canvas.width-10;
        if(body[0].y<0)
            body[0].y=canvas.height-10;

        if(body[0].intersects(food)){
                body.push(new Rectangle(food.x,food.y,10,10));
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
                score++;
            }
        for(var i=0,l=wall.length;i<l;i++){
            if(body[0].intersects(wall[i])){
                pause=true;
            }
            if(food.intersects(wall[i])){
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
            }
        }
         for(var i=body.length-1;i>0;i--){
            body[i].x=body[i-1].x;
            body[i].y=body[i-1].y;  
        }
        for(var i=4,l=body.length;i<l;i++){
            if(body[0].intersects(body[i])){
                pause=true;
            }
        }
    }
}

function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(iFood,food.x,food.y);
   
    for(var i=0,l=body.length;i<l;i++){
         ctx.drawImage(ibody,body[i].x,body[i].y);
    }
    for(var i=0,l=wall.length;i<l;i++){
        ctx.drawImage(pared,wall[i].x,wall[i].y);
    }
    ctx.fillStyle='#fff';
    ctx.fillText('Score:'+score,0,15);
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