function check_speed(){
	if (val != slider.value){
		val = slider.value;
		clearInterval(handle);
		handle = setInterval(game, (10 - val)*50)
	}
}

window.onload=function() {
	slider = document.getElementById("myRange");
	val = slider.value;
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
	on.style.display = "none";
	easy.style.display = "none";
	cheat.style.display = "none";
    ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	on.addEventListener("click", music);
	off.addEventListener("click", music);
    handle = setInterval(game, (10 - val) * 50);
	checker = setInterval(check_speed, 10);
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
onOff = false;
border = false;
start = false;
left = false;
right = false;
up = false;
down = false;
text = "SNAKE THE GAME";
i = 0;
d = 0;

ANGLE = 20;

function typing(){
	if (i < text.length){
		document.getElementById("text").innerHTML += text.charAt(i++)
		setTimeout(typing, 100);
	}
}

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
	if (border){
		canv.style.border = "none" ;
	}
	else
		canv.style.border = "10px solid lightblue";
	border = (border == true) ? false : true;
	easy.style.display = (easy.style.display == "none") ? easy.style.display = "block" : easy.style.display = "none";
}

function rottenSnake(){
	var res = document.getElementById("restart");
	if (ANGLE > 0){
		d++;
		if (d < ANGLE)
			res.style.transform = "rotate(" + d + "deg)";
		else
			ANGLE = -ANGLE;
	}
	else{
		d--;
		if (d > ANGLE)
			res.style.transform = "rotate(" + d + "deg)";
		else
			ANGLE = -ANGLE;
	}
}

function loser(exit){
	easy.style.display = "none";
	cheat.style.display = "none";
	if (exit)
		end.style.display = "block";
	else
		fin.style.display = "block";
	clearInterval(handle);
	clearInterval(checker);
	setInterval(rottenSnake, 20);
}

function game() {
	typing();
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
			break;
		case 17:
			if (slider.value == slider.min)
				slider.value == slider.max;
			else
				slider.stepDown(1);
			break;
		case 91:
			if (slider.value == slider.min)
				slider.value == slider.max;
			else
				slider.stepDown(1);
			break;
		case 18:
			music();
			break;
		case 32:
			if (slider.value == slider.max)
				slider.value == slider.min;
			else
				slider.stepUp(1);
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
