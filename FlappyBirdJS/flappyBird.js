var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bat = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bat.src = "images/bat4.png";
bg.src = "images/cave2.png";
fg.src = "images/fg2.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 100;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

// document.addEventListener("keydown",moveUp);
// document.addEventListener("keydown",moveDown);

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            break;
        case 38:
            // alert('up');
            moveUp();
            break;
        case 39:
            // alert('right');
            break;
        case 40:
            // alert('down');
            moveDown()
            break;
    }
};

function moveUp(){
    bY -= 25;
    fly.play();
}

function moveDown(){
  bY += 25;
  fly.play()

}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){

    ctx.drawImage(bg,0,0);


    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant); //constant is North pipe height plus gap

        pipe[i].x--;

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // detect collision

        if( bX + bat.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bat.height >= pipe[i].y+constant) || bY + bat.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bat,bX,bY);

    bY += gravity; //make it zero for no gravity ?

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

draw();
