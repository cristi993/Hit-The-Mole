var img = new Image();
var ctx;
var images = new Array();
var hamX = 100;
var hamY = 51;
var pozX1;
var pozY1;
var pozX2;
var pozY2;
var mole1;
var mole2;
var alive1 = true;
var alive2 = true;
var score;

function loadImages(){
    img.src = 'images/grass.png';

    var temp = new Image();
    temp.src = 'images/mole1.png';
    images[0] = temp;
    temp = new Image();
    temp.src = 'images/mole2.png';
    images[1] = temp;
    temp = new Image();
    temp.src = 'images/mole3.png';
    images[2] = temp;
    temp = new Image();
    temp.src = 'images/mole4.png';
    images[3] = temp;
    temp = new Image();
    temp.src = 'images/hammer.png';
    images[4] = temp;
    temp = new Image();
    temp.src = 'images/dead.png';
    images[5] = temp;
}

window.onload = function(){
    loadImages(); 

    score = document.getElementById('score');
    var myCanvas = document.getElementById('canvas');
    ctx = myCanvas.getContext('2d');

    document.addEventListener('keydown', listenKeys);

    setTimeout(update,100);
}

function update(){
    paintBackground();

    detPosition();
    var num1 = Math.random();
    var num2 = Math.random();

    if(num1 < 0.2){
        mole1 = 0;
    }
    if(num1 >= 0.2 && num1 < 0.4){
        mole1 = 1;
    }
    if(num1 >= 0.4 && num1 <= 0.6){
        mole1 = 2;
    }
    if(num1 > 0.6){
        mole1 = 3;
    }

    if(num2 < 0.2){
        mole2 = 0;
    }
    if(num2 >= 0.2 && num2 < 0.4){
        mole2 = 1;
    }
    if(num2 >= 0.4 && num2 < 0.6){
        mole2 = 2;
    }
    if(num2 > 0.6){
        mole2 = 3;
    }

    alive1 = true;
    alive2 = true;

    drawMoles();

    paintHammer(hamX,hamY);    
    setTimeout(update, 1000);
}

function detPosition(){
    var numX = Math.random();
    var numY = Math.random();

    if(numX < 0.3){
        pozX1 = 0;
    }
    if(numX >= 0.3 && numX <= 0.6){
        pozX1 = 100;
    }
    if(numX > 0.6){
        pozX1 = 200;
    }

    if(numY < 0.3){
        pozY1 = 0;
    }
    if(numY >= 0.3 && numY <= 0.6){
        pozY1 = 51;
    }
    if(numY > 0.6){
        pozY1 = 101;
    }

    do{
        numX = Math.random();
        numY = Math.random();

        if(numX < 0.3){
            pozX2 = 0;
        }
        if(numX >= 0.3 && numX <= 0.6){
            pozX2 = 100;
        }
        if(numX > 0.6){
            pozX2 = 200;
        }

        if(numY < 0.3){
            pozY2 = 0;
        }
        if(numY >= 0.3 && numY <= 0.6){
            pozY2 = 51;
        }
        if(numY > 0.6){
            pozY2 = 101;
        }
    } while (pozX1 == pozX2 && pozY1 == pozY2);
}

function drawMoles(){
    if(alive1){
        ctx.drawImage(images[mole1], pozX1, pozY1, 100, 50);
    }
    else{
        ctx.drawImage(images[5], pozX1, pozY1, 100, 50);
    }

    if(alive2){
        ctx.drawImage(images[mole2], pozX2, pozY2, 100, 50);
    }
    else{
        ctx.drawImage(images[5], pozX2, pozY2, 100, 50);
    }
}

function paintBackground(){
    ctx.drawImage(img, 0, 0, 480, 250);

    ctx.beginPath();
    ctx.moveTo(100,10);
    ctx.lineTo(100,140);
    ctx.lineTo(102,140);
    ctx.lineTo(102,10);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(200,10);
    ctx.lineTo(200,140);
    ctx.lineTo(202,140);
    ctx.lineTo(202,10);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(10,50);
    ctx.lineTo(285,50);
    ctx.lineTo(285,51);
    ctx.lineTo(10,51);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(10,100);
    ctx.lineTo(285,100);
    ctx.lineTo(285,101);
    ctx.lineTo(10,101);
    ctx.fill();
    ctx.closePath();

}

function paintHammer(X, Y){
    var goOn = true;
    if(X == 1){
        if(hamX == 0){
            hamX = 100;
            goOn = false;
        }
        if(hamX == 100 && goOn){
            hamX = 200;
        }
    }
    if(X == -1){
        if(hamX == 100){
            hamX = 0;
        }
        if(hamX == 200){
            hamX = 100;
        }
    }

    goOn = true;
    if(Y == 1){
        if(hamY == 0){
            hamY = 51;
            goOn = false;
        }
        if(hamY == 51 && goOn){
            hamY = 101;
        }
    }
    if(Y == -1){
        if(hamY == 51){
            hamY = 0;
        }
        if(hamY == 101){
            hamY = 51;
        }
    }

    ctx.drawImage(images[4], hamX, hamY, 100, 50);
}

function listenKeys(event){
    if(event.keyCode == 37) { // left
        paintBackground();
        drawMoles();
        paintHammer(-1, 0);
    }

    if(event.keyCode == 38) { // up
        paintBackground();
        drawMoles();
        paintHammer(0, -1);
    }

    if(event.keyCode == 39) { // right
        paintBackground();
        drawMoles();
        paintHammer(1, 0);
    }

    if(event.keyCode == 40) { // down
        paintBackground();
        drawMoles();
        paintHammer(0, 1);
    }

    if(event.keyCode == 32) { // space
        paintBackground();

        if(hamX == pozX1 && hamY == pozY1 && alive1){
            if(mole1 == 2){
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
            else if(mole1 == 0){
                score.innerHTML = parseInt(score.innerHTML) - 3;
            }
            else if(mole1 == 1){
                score.innerHTML = parseInt(score.innerHTML) + 3;
            }
            else if(mole1 == 3){
                alert("Ai pierdut!");
                score.innerHTML = 0;
            }
            alive1 = false;
        }
        if(hamX == pozX2 && hamY == pozY2 && alive2){
            if(mole2 == 2){
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
            else if(mole2 == 0){
                score.innerHTML = parseInt(score.innerHTML) - 3;
            }
            else if(mole2 == 1){
                score.innerHTML = parseInt(score.innerHTML) + 3;
            }
            else if(mole2 == 3){
                alert("Ai pierdut!");
                score.innerHTML = 0;
            }
            alive2 = false;
        }

        drawMoles();
        paintHammer(hamX, hamY);
    }
}
