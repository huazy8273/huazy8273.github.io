var brickWidth = 80;
var brickHeight= 25;
var num_row = 6;
var num_column = 5;
var brick_space_hori  = 105 ;
var brick_space_verti = 50 ;

var bricks = [];
var hit =[];
var point = [];
var type;
var brick_left;

for(let i=0;i<num_row*num_column;i++)
{
type = Math.floor((Math.random() * 5) + 1);
document.write('<div id="box' + i + '">');
document.write('</div>');	
bricks[i]= document.getElementById("box"+i);
bricks[i].style.position= "absolute";
bricks[i].style.top = 60  + Math.floor(i/num_row)*brick_space_verti + "px";
bricks[i].style.left = 100 + (i%num_row)*brick_space_hori + "px";
bricks[i].style.width = brickWidth + "px";
bricks[i].style.height = brickHeight + "px"; 
if(type==1) bricks[i].style.background = "red";
else if (type==2) bricks[i].style.background = "blue";
else if (type==3) bricks[i].style.background = "yellow";
else if (type==4) bricks[i].style.background = "green";
else if (type==5) bricks[i].style.background = "white";
hit[i] = false;
point[i] = 10*type;
}




function start() 
{
	var ball = document.getElementById("ball"); 
	ball.style.display = "block";
	var bar = document.getElementById("bar"); 
	var container = document.getElementById("container"); 
	var xpos = 99 +Math.floor((Math.random() * 601) + 1);
	var ypos = 450;
	var total_point=0;
	var hori = 1; //-1:left, 1:right
	var verti= -1;//-1:up,   1:down
	var points = document.getElementById("point");
	points.innerHTML = "point: 0";
	points.style.fontSize= 30 + "px";
	brick_left=num_row*num_column;
	for(let i=0; i<num_row*num_column; i++)
	{
		bricks[i].style.display="block";
		hit[i] = false;
	}
	var id = setInterval(frame, 5);
	
	function frame() 
	{
		if(xpos==0||xpos==container.offsetWidth-ball.offsetWidth)	hori*=-1;
		if(ypos==0)	verti*=-1;
		if(ypos==container.offsetHeight-ball.offsetHeight) 
		{
			clearInterval(id);
			for(let i=0; i<num_row*num_column;i++)
			{
				bricks[i].style.display = "none";
				hit[i] = true;
			}
			points.innerHTML = "YOU LOSE! <br>click 'Start!' to play again";
			points.style.fontSize= 70 + "px";
		}
		rec_x = bar.offsetLeft+bar.offsetWidth/2;
		rec_y = bar.offsetTop+bar.offsetHeight/2;
		ball_x= ball.offsetLeft+ball.offsetWidth/2;
		ball_y= ball.offsetTop+ball.offsetHeight/2;
		
		x=Math.min(Math.abs(rec_x+bar.offsetWidth/2-ball_x), Math.abs(rec_x-bar.offsetWidth/2-ball_x));	
		y=Math.min(Math.abs(rec_y+bar.offsetHeight/2-ball_y), Math.abs(rec_y-bar.offsetHeight/2-ball_y));
		
		if (verti==1&&ball.offsetTop+ball.offsetHeight==bar.offsetTop
			&&ball_x>bar.offsetLeft&&ball_x<bar.offsetLeft+bar.offsetWidth)
			verti=-1;
		else if (verti==-1&&ball.offsetTop==bar.offsetTop+bar.offsetHeight
			&&ball_x>bar.offsetLeft&&ball_x<bar.offsetLeft+bar.offsetWidth)
			verti=1;
		else if (hori==1&&ball.offsetLeft+ball.offsetWidth==bar.offsetLeft
			&&ball_y<bar.offsetTop+bar.offsetHeight&&ball_y>bar.offsetTop)
			hori=-1;
		else if (hori==-1&&ball.offsetLeft==bar.offsetLeft+bar.offsetWidth
			&&ball_y<bar.offsetTop+bar.offsetHeight&&ball_y>bar.offsetTop)
			hori=1;	
		else if(x*x+y*y<ball.offsetHeight*ball.offsetHeight/4)
		{
			verti*=-1;
			hori*=-1;
		}
		
		for(let i=0; i<num_row*num_column; i++)
		{
			if(hit[i]) continue;
			brick_x = bricks[i].offsetLeft + bricks[i].offsetWidth/2;
			brick_y = bricks[i].offsetTop + bricks[i].offsetHeight/2;
			
			x=Math.min(Math.abs(brick_x+bricks[i].offsetWidth/2-ball_x),  Math.abs(brick_x-bricks[i].offsetWidth/2-ball_x));	
			y=Math.min(Math.abs(brick_y+bricks[i].offsetHeight/2-ball_y), Math.abs(brick_y-bricks[i].offsetHeight/2-ball_y));
		
			if (verti==1&&ball.offsetTop+ball.offsetHeight==bricks[i].offsetTop
			&&ball_x>bricks[i].offsetLeft&&ball_x<bricks[i].offsetLeft+bricks[i].offsetWidth)
			{
				verti=-1;
				bricks[i].style.display = "none";
				hit[i] = true;
				total_point+=point[i];
				brick_left--;
			}
			else if (verti==-1&&ball.offsetTop==bricks[i].offsetTop+bricks[i].offsetHeight
				&&ball_x>bricks[i].offsetLeft&&ball_x<bricks[i].offsetLeft+bricks[i].offsetWidth)
			{
				verti=1;
				bricks[i].style.display = "none";
				hit[i] = true;
				total_point+=point[i];
				brick_left--;
			}
			else if (hori==1&&ball.offsetLeft+ball.offsetWidth==bricks[i].offsetLeft
				&&ball_y<bricks[i].offsetTop+bricks[i].offsetHeight&&ball_y>bricks[i].offsetTop)
			{
				hori=-1;
				bricks[i].style.display = "none";
				hit[i] = true;
				total_point+=point[i];
				brick_left--;
			}
			else if (hori==-1&&ball.offsetLeft==bricks[i].offsetLeft+bricks[i].offsetWidth
				&&ball_y<bricks[i].offsetTop+bricks[i].offsetHeight&&ball_y>bricks[i].offsetTop)
			{
				hori=1;
				bricks[i].style.display = "none";
				hit[i] = true;
				total_point+=point[i];
				brick_left--;
			}				
			else if(x*x+y*y<ball.offsetHeight*ball.offsetHeight/4)
			{
				verti*=-1;
				hori*=-1;
				bricks[i].style.display = "none";
				hit[i] = true;
				total_point+=point[i];
				brick_left--;
			}
			points.innerHTML = "point: "+ total_point;
			if(brick_left==0)
			{
				clearInterval(id);
				points.innerHTML = "YOU WIN! <br> Congratulations! <br>click 'Start!' to play again";
				points.style.fontSize= 70 + "px";
			}
		}
		
			
		xpos+=hori;
		ypos+=verti;
		ball.style.top = ypos + "px"; 
		ball.style.left= xpos + "px"; 
	}
}

//main





function newCursor(e) {
	e = e || window.event;
	var bar = document.getElementById("bar");
	var container = document.getElementById("container");
	bar.style.left=(e.clientX-bar.offsetWidth/2-container.offsetLeft) + "px";
	
	if(bar.offsetLeft<0)	bar.style.left= 0 + "px";
	else if(bar.offsetLeft+bar.offsetWidth>container.offsetWidth)
		bar.style.left= (container.offsetWidth-bar.offsetWidth) + "px";
	
}

if (window.addEventListener)
	// DOM method for binding an event
	window.addEventListener("mousemove", newCursor, false);
else if (window.attachEvent) 
	// IE-exclusive method for binding an event
	document.attachEvent("onmousemove", newCursor);
else
	window.onmousemove = newCursor;
