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

var gap = 150;
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

var buttonpress = 3;
// on key down

var up1 = document.getElementById('up1');
up1.style.height = '50px';

var up2 = document.getElementById('up2');
up2.style.height = '100px';

var up3 = document.getElementById('up3');
up3.style.height = '150px';

var up4 = document.getElementById('up4');
up4.style.height = '200px';

var down1 = document.getElementById('down1');
down1.style.height = '50px';

var down2 = document.getElementById('down2');
down2.style.height = '100px';

var down3 = document.getElementById('down3');
down3.style.height = '150px';

var down4 = document.getElementById('down4');
down4.style.height = '200px';
down4.style.width= '50px';

//var level1s = false;
//var level2s = false;
//var level3s = false;


// document.addEventListener("keydown",moveUp);
// document.addEventListener("keydown",moveDown);


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            break;
        case 38:
            // alert('up');
            moveUp(1);
            break;
        case 39:
            // alert('right');
            break;
        case 40:
            // alert('down');
            moveDown(1);
            break;
    }
};

function moveUp(times){
    bY -= (25*times);
    buttonpress--;
    fly.play();
}

function moveDown(times){
  bY += (25*times);
  buttonpress--;
  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

function won() {
  score = 0;
  var txt;
  if (confirm("You won! Press OK to move to next level. Press Cancel to restart this level.")) {
    location.replace("level2.html");
  } else {
    location.reload();
  }
}

// draw images

function draw(){

    ctx.drawImage(bg,0,0);



    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant); //constant is North pipe height plus gap

        if (buttonpress<0){
          alert("Too many button presses. Try again next time");
          location.reload();
          buttonpress = 3;
        }



        if (pipe[0].x > 150) {
          pipe[i].x-=5;
        }
        else{
          if( (bY <= pipe[0].y + pipeNorth.height || bY+bat.height >= pipe[0].y+constant) || bY + bat.height >=  cvs.height - fg.height){
            }
          else {
            pipe[i].x-=5;
          }
        }

        if (pipe[i].x <= -60) {
          pipe.shift();
        }


        if( pipe[i].x == 300 ){ //change this number to change speed of the pipes
                                //a new one will be drawn after the current one hits this pixel amt. in the x direction
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
            buttonpress = 3;
        }

        if(score >= 10){
          won();
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bat,bX,bY);

    bY += gravity; //make it zero for no gravity ?

    ctx.fillStyle = "#32cd32";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

alert("How to Play:\n\nPress the arrow buttons to move up and down at different distances. Avoid the stalagtites and stalagmites.\n\nThe obstacles will stop in before they reach the bat so take your time and choose your arrows carefully. You can only press up to three arrows between each obstacle to find an opening.");
draw();
