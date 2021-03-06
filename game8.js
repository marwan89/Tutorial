window.addEventListener('load',init,false);
var canvas=null,ctx=null,canvas2=null;
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
//var player=new Rectangle(40,40,10,10);
var body=new Array();
var food=new Rectangle(80,80,10,10);
var wall=new Array();
var pause=true;
var score=0;
var gameover=true;
var dir=0;

function hover1(){
    console.log('Hover 1');
    document.body.style.overflow = 'hidden';
}
function hover2(){
    console.log('Hover 2');
    document.body.style.overflow = 'visible';
}

// var bodi=document.body;
// canvas.hover(function() {
//             bodi.css('overflow','hidden');
//         },function(){
//             bodi.css('overflow','visible');
//         });

// body.length=0;
// body.push(new Rectangle(40,40,10,10));
// body.push(new Rectangle(-10,-10,10,10));
// body.push(new Rectangle(0,0,10,10));

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

function reset(){
    score=0;
    lastPress=KEY_RIGHT;
    body.length=0;
    body.push(new Rectangle(40,40,10,10));
    body.push(new Rectangle(0,0,10,10));
    body.push(new Rectangle(0,0,10,10));
    food.x=random(canvas.width/10-1)*10;
    food.y=random(canvas.height/10-1)*10;
    gameover=false;
}

function run(){
    setTimeout(run,50);
    act();
    paint(ctx);
}

function act(){
    if(!pause){
        if(gameover){
            reset();
        }
        for(var i=body.length-1;i>0;i--){
            body[i].x=body[i-1].x;
            body[i].y=body[i-1].y;  
        }

        if(lastPress==KEY_UP&&dir!=2)
            dir=0;
        if(lastPress==KEY_RIGHT&&dir!=3)
            dir=1;
        if(lastPress==KEY_DOWN&&dir!=0)
            dir=2;
        if(lastPress==KEY_LEFT&&dir!=1)
            dir=3;

        if(dir==0)
            body[0].y-=10;
        if(dir==1)
            body[0].x+=10;
        if(dir==2)
            body[0].y+=10;
        if(dir==3)
            body[0].x-=10;

        if(body[0].x>canvas.width-10)
            body[0].x=0;
        if(body[0].y>canvas.height-10)
            body[0].y=0;
        if(body[0].x<0)
            body[0].x=canvas.width-10;
        if(body[0].y<0)
            body[0].y=canvas.height-10;

        for(var i=3,l=body.length;i<l;i++){
            if(body[0].intersects(body[i])){
                gameover=true;
                pause=true;
            }
        }
        if(body[0].intersects(food)){
                body.push(new Rectangle(food.x,food.y,10,10));
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
                score++;
            }
        for(var i=0,l=wall.length;i<l;i++){
            if(body[0].intersects(wall[i])){
                gameover=true;
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
        if(gameover)
            ctx.fillText('GAME OVER',150,75);
        else
            ctx.fillText('PAUSE',150,75);
        ctx.textAlign='left';
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