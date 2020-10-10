window.onload=function() {
	canv=document.getElementById("map");
	score = document.getElementById("apple");
	on = document.getElementById("on");
	off = document.getElementById("off");
	end = document.getElementById("end");
	fin = document.getElementById("fin");
	easy = document.getElementById("easy");
	cheat = document.getElementById("cheat");
	end.style.display = "none";
	fin.style.display = "none";
	off.style.display = "none";
	easy.style.display = "none";
	cheat.style.display = "none";
    ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	on.addEventListener("click", music);
	off.addEventListener("click", music);
    handle = setInterval(game,1000/15);
}

posX=10;  
posY=10;
gridSize=20;
tileCount=20;
appleX=15;
appleY=15;
velocityX=0;
velocityY=0;
trail=[];
tail = 5;
counter = 0;
sound = document.getElementById("sound");
onOff = true;
border = true;
start = false;
left = false;
right = false;
up = false;
down = false;

function music(){
	if (onOff){
		off.style.display = "block";
		on.style.display = "none";
	}
	else{
		on.style.display = "block";
		off.style.display = "none";
	}
	onOff = (onOff == true) ? false : true;
}

function setBorder(){
	if (border)
		canv.style.border = "none" ;
	else
		canv.style.border = "10px solid lightblue";
	border = (border == true) ? false : true;
}

function loser(exit){
	easy.style.display = "none";
	cheat.style.display = "none";
	if (exit)
		end.style.display = "block";
	else
		fin.style.display = "block";
	clearInterval(handle);
}

function game() {
    posX+=velocityX;
	posY+=velocityY;
	
	if(posX<0) {
		if (!border)
			posX= tileCount-1;
		else
			loser(1);
	}
	if(posX>tileCount-1) {
		if (!border)
			posX = 0;
		else
			loser(1);
	}
	if(posY<0) {
		if (!border)
			posY= tileCount-1;
		else
			loser(1);
	}
	if(posY>tileCount-1) {
		if (!border)
			posY= 0;
		else
			loser(1);
	}
    ctx.fillStyle="grey";
    ctx.fillRect(0,0,canv.width,canv.height);
 
	ctx.fillStyle="white";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);
        if(trail[i].x==posX && trail[i].y==posY && start) {
			//if (!border){
			//	tail = 5;
			//	counter = 0;
			//	score.textContent = `${counter} apples`
			//	cheat.style.display = "none";
			//}
			//else
				loser(0);
        }
    }
    trail.push({x:posX,y:posY});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(appleX==posX && appleY==posY) {
		tail++;
		counter++;
		score.textContent = `${counter} apples`
		if (onOff)
			sound.play();
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
    }
    ctx.fillStyle="pink";
    ctx.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
		case 16:
			setBorder();
			easy.style.display = (easy.style.display == "none") ? easy.style.display = "block" : easy.style.display = "none";
			break;
		case 32:
			music();
			break;
		//left
        case 37:
			if (!right){
				velocityX=-1;velocityY=0; start = true;
				left = true;
				up = false;
				down = false;
			}
			break;
		case 65:
            if (!right){
				velocityX=-1;velocityY=0; start = true;
				left = true;
				up = false;
				down = false;
			}
			break;
		//up
        case 38:
			if (!down){
				velocityX=0;velocityY=-1; start = true;
				left = false;
				right = false;
				up = true;
			}
			break;
		case 87:
            if (!down){
				velocityX=0;velocityY=-1; start = true;
				left = false;
				right = false;
				up = true;
			}
			break;
		//right
        case 39:
			if (!left){
				velocityX=1;velocityY=0; start = true;
				right = true;
				up = false;
				down = false;
			}
			break;
		case 68:
            if (!left){
				velocityX=1;velocityY=0; start = true;
				right = true;
				up = false;
				down = false;
			}
			break;
		//down
        case 40:
			if (!up){
				velocityX=0;velocityY=1; start = true;
				left = false;
				right = false;
				down = true;
			}
			break;
		case 83:
            if (!up){
				velocityX=0;velocityY=1; start = true;
				left = false;
				right = false;
				down = true;
			}
			break;
		case 189:
			tail--;
			break;
		case 187:
			cheat.style.display = "block";
			tail++;
			break;
    }
}