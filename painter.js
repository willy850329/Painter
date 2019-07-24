/* This is an usless painter written in Javascript */
/* Author = 103011110 WU HSIN JU                   */
/* @Copyright is reserved                          */
/***************************************************/


/* Declare variables*/
var canvas;
var context;
var button_up = document.createElement("button");
var button_down = document.createElement("button");
var button_brush = document.createElement("button");
var button_triangle = document.createElement("button");
var button_rectangle = document.createElement("button");
var button_circle = document.createElement("button");
var button_reset = document.createElement("button");
var button_eraser = document.createElement("button");
var button_undo = document.createElement("button");
var button_download = document.createElement("button");
var button_red = document.createElement("button");
var button_orange = document.createElement("button");
var button_yellow = document.createElement("button");
var button_green = document.createElement("button");
var button_blue = document.createElement("button");
var button_purple = document.createElement("button");
var button_black = document.createElement("button");
var button_white = document.createElement("button");
var button_fillText = document.createElement("button");
var text = document.createElement("text");
var md = false; // mouse down
var color = "black";
var size = 50;
var state;
var img; // URL for saving imgage
var mode = "brush";
var filltext;
var font;

/* main function */
function InitPainter(div){
	
	init_canvas();	
	init_button();
	canvas.addEventListener('mousedown', down);
	canvas.addEventListener('mouseup', toggledraw);
	canvas.addEventListener('mousemove',
	function(evt){

	var mousePos = getMousePos(canvas,evt);
	var posx = mousePos.x;
	var posy = mousePos.y;
	draw(canvas, posx, posy);
	}).bind(this);	

}

/* init button */

function init_button(){
	//prompt('init buttons!')

	//text
	document.getElementById("mypainter").appendChild(text);
	text.textContent = "Size = " + size + "\n";

	// magnify button
	button_up.innerHTML = "&#x2191;";
	document.getElementById("mypainter").appendChild(button_up);
	button_up.onclick = magnify;

	// condense button
	button_down.innerHTML = "&#x2193;";
	document.getElementById("mypainter").appendChild(button_down);
	button_down.onclick = condense;

	// Erase button
	button_eraser.innerHTML = "Eraser";
	document.getElementById("mypainter").appendChild(button_eraser);
	button_eraser.onclick = erase;

	// Reset button
	button_reset.innerHTML = "Reset";
	document.getElementById("mypainter").appendChild(button_reset);
	button_reset.onclick = reset;

	// brush button
	button_brush.innerHTML = "Brush";
	button_brush.style.color = "blue";
	document.getElementById("mypainter").appendChild(button_brush);
	button_brush.onclick = brush;

	// triangle button
	button_triangle.innerHTML = "Triangle";
	button_triangle.style.color = "blue";
	document.getElementById("mypainter").appendChild(button_triangle);
	button_triangle.onclick = draw_triangle;

	// rectangle button
	button_rectangle.innerHTML = "Rectangle";
	button_rectangle.style.color = "blue";
	document.getElementById("mypainter").appendChild(button_rectangle);
	button_rectangle.onclick = draw_rectangle;

	// circle button
	button_circle.innerHTML = "Circle";
	button_circle.style.color = "blue";
	document.getElementById("mypainter").appendChild(button_circle);
	button_circle.onclick = draw_circle;




	// color select
	button_red.innerHTML = "Red";
	document.getElementById("mypainter").appendChild(button_red);
	button_red.style.backgroundColor = "red";
	button_red.onclick = set_color_red;

	button_orange.innerHTML = "Orange";
	document.getElementById("mypainter").appendChild(button_orange);
	button_orange.style.backgroundColor = "orange";
	button_orange.onclick = set_color_orange;	

	button_yellow.innerHTML = "Yellow";
	document.getElementById("mypainter").appendChild(button_yellow);
	button_yellow.style.backgroundColor = "yellow";
	button_yellow.onclick = set_color_yellow;

	button_green.innerHTML = "Green";
	document.getElementById("mypainter").appendChild(button_green);
	button_green.style.backgroundColor = "green";
	button_green.onclick = set_color_green;

	button_blue.innerHTML = "Blue";
	document.getElementById("mypainter").appendChild(button_blue);
	button_blue.style.backgroundColor = "blue";
	button_blue.onclick = set_color_blue;	

	button_purple.innerHTML = "Purple";
	document.getElementById("mypainter").appendChild(button_purple);
	button_purple.style.backgroundColor = "purple";
	button_purple.onclick = set_color_purple;

	button_black.innerHTML = "Black";
	document.getElementById("mypainter").appendChild(button_black);
	button_black.style.backgroundColor = "black";
	button_black.style.color = "white";
	button_black.onclick = set_color_black;


	// Put text button
	button_fillText.innerHTML = "Put Text";
	document.getElementById("mypainter").appendChild(button_fillText);
	button_fillText.onclick = putText;

	// download button
	button_download.innerHTML = "Save image";
	document.getElementById("mypainter").appendChild(button_download);
	button_download.onclick = download;



}


/* init canvas */
function init_canvas(){
	//prompt('init canvas!');
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = 500;
	canvas.style.cursor = "pointer";
	context = canvas.getContext("2d");
	canvas.style.border = '10px solid #d3d3d3';
	document.getElementById("mypainter").appendChild(canvas);

}

/* mouse down */
function down(){
	canvas.style.cursor = "default";
	md = true;
}

/* mouse up */
function toggledraw(){
	//canvas.style.cursor = "pointer";
	md = false;
	
}

/* get mouse position*/
function getMousePos(canvas,evt){
	var rect = canvas.getBoundingClientRect();
	return{
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

/* draw*/
function draw(canvas, posx, posy){
	var context = canvas.getContext('2d');
	context.fillStyle = color; 
	if(md){
		
		if(mode== "brush"){
			canvas.style.cursor = "url(brush.cur),pointer";
			    context.lineTo(posx,posy);
    			context.stroke();
    			context.beginPath();
    			context.arc(posx, posy, 5, 0, Math.PI*2);
    			context.fill();
    			context.fillRect(posx,posy,5);
   				context.beginPath();
    			context.moveTo(posx ,posy);
		}
		else if(mode == "triangle"){
			canvas.style.cursor = "url(triangle.cur),pointer";
			context.beginPath();
			context.moveTo(posx, posy);
			context.lineTo(posx, posy+size);
			context.lineTo(posx+size, posy+size);
			context.closePath();
			context.fill();
		}
		else if (mode == "rectangle"){
			canvas.style.cursor = "url(rectangle.cur),pointer";
			context.beginPath();
			context.moveTo(posx, posy);
			context.lineTo(posx+size, posy);
			context.lineTo(posx+size, posy+size);
			context.lineTo(posx, posy+size);
			context.closePath();
			context.fill();
		}
		else if (mode == "circle"){
			canvas.style.cursor = "url(ball.cur),pointer";
			context.beginPath();
      		context.arc(posx, posy, size, 0, 2 * Math.PI, false);
      		context.fill();
		}
		else if (mode == "erase"){
			canvas.style.cursor = "url(eraser.cur),pointer";
			context.fillRect(posx,posy,size/4,size/4);
		}

		else if (mode == "write"){
			context.font = "50px Arial";
			context.fillText(filltext,posx,posy);
		}
		
	}	
}


/* reset */
function reset(){
	window.location.reload();
	color = "black";
	return 0;

}

/* eraser */
function erase(){
	color = "white";
	mode = "erase";
}


/* set color */
function set_color_red(){
	color = "red";
	return 0;
}

function set_color_orange(){
	color = "orange";
}

function set_color_yellow(){
	color = "yellow";
}

function set_color_green(){
	color = "green";
}

function set_color_blue(){
	color = "blue";
}

function set_color_purple(){
	color = "purple";
}
function set_color_black(){
	color = "black";
}
function set_color_white(){
	color = "white";
}

function undo(){
	window.history.pushState(state,null);
}

// download
function download(){
	var a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = name;
    a.click();
}

// normal brush
function brush() {
	color = "black";
	mode = "brush";
	//prompt('brush!');
}

// draw triangle
function draw_triangle(){
	color = "black";
	mode = "triangle";
}
// draw rectangle
function draw_rectangle(){
	color = "black";
	mode = "rectangle";
}

// draw circle
function draw_circle(){
	color = "black";
	mode = "circle";
}

/* hugify */
function magnify(){
	size = size+5;
	text.innerHTML = "Size = "+size;
	//prompt("bigger!");
}

function condense(){
	size = size-5;
	text.innerHTML = "Size = "+size;
}


function putText(){
	mode = "write";
	filltext = "";
	filltext = prompt('Type the text you want to put');
	font = 100;

}















