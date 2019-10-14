var showing=false,dragging=false;
var canvas=document.getElementById('sidecanvas');
var ctx=canvas.getContext('2d');
var sidebar=document.getElementById('sidebar');
var offset=100;
var sidebarbody=document.getElementById('sidebarbody');
sidebar.addEventListener('mousedown', dragStart, false);
sidebar.addEventListener('mousemove', drag, false);
sidebar.addEventListener('mouseup', dragStop, false);
var initcoords,ww=window.innerWidth;
function dragStart(event){
	var coords=getCanvasCoordinates(event);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(0,0,offset,canvas.height);
	if(coords.x<=0){
    	dragging=true;
    	initcoords=coords;
    	reloadcanvas(coords.x,coords.y);
	}
}
function drag(event){
	if (dragging){
    	var coords=getCanvasCoordinates(event);
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    	coords.x-=initcoords.x;
    	if (coords.x<offset && coords.x>-offset)
	    	reloadcanvas(coords.x,coords.y);
	    else
		    showdrawer(event);
	}
}
function dragStop(event){
	showdrawer(event);
}
function reloadcanvas(h,p){
	ctx.beginPath();
	ctx.moveTo(-1,0);
	ctx.lineTo(offset,0);
	for (var i=1;i<canvas.height;i++)
	ctx.lineTo(offset+h*Math.pow(2,-Math.pow(i-p,2)/10000),i);
	ctx.lineTo(-1,canvas.height);
	ctx.fill();
	ctx.closePath();
}
function showdrawer(event){
	if(dragging){
		dragging=false;
    	var coords=getCanvasCoordinates(event);
    	var h=coords.x-initcoords.x,p=coords.y,v=2,a=.3;
    	reloadcanvas(h,p);
    	var opening=h>0;
    	if (h>10){
			$('#sidebar').css('margin-left','0px');
			showing=true;
		}else if (h<-10){
			$('#sidebar').css('margin-left','-'+($('#sidebarbody').width()+offset)+'px');//+((ww>575?250:400)+offset)+'px');
			showing=false;
		}
    	var intr=setInterval(function(){
	    	ctx.clearRect(0,0,canvas.width,canvas.height);
	    	ctx.beginPath();
			ctx.moveTo(-1,0);
			ctx.lineTo(offset,0);
			if (opening){
				v+=a;
				h-=v;
				if(h<0 && a>0){a=-5*a;}
				else if(h>0 && a<0){a=-7*a/5;}
				else if(a>=0.89){
					clearInterval(intr);
					setTimeout(function(){
						ctx.clearRect(0,0,canvas.width,canvas.height);
						ctx.fillRect(0,0,offset,canvas.height);
					},10);
				}
			}else{
				v+=a;
				h+=v;
				if(h>0 && a>0){a=-5*a;}
				else if(h<0 && a<0){a=-7*a/5;}
				else if(a>=0.89){
					clearInterval(intr);
					setTimeout(function(){
						ctx.clearRect(0,0,canvas.width,canvas.height);
						ctx.fillRect(0,0,offset,canvas.height);
					},10);
				}
			}
			for (var i=1;i<canvas.height;i++)
			ctx.lineTo(offset+h*Math.pow(2,-Math.pow(i-p,2)/10000),i);
			ctx.lineTo(-1,canvas.height);
			ctx.fill();
			ctx.closePath();
    	},10);
	}
}
function getCanvasCoordinates(event) {
var x = event.clientX - canvas.getBoundingClientRect().left,y = event.clientY - canvas.getBoundingClientRect().top;
    return {x: x-offset, y: y};
}
$(document).ready(function(){
	canvas.width=$('#sidebar').width()/2;
	canvas.height=$('#sidebar').height();
	ctx.fillStyle="#0000cc";
	ctx.fillRect(0,0,offset,canvas.height);
});
function drawertoggle(){
	showing=!showing;
	$('#sidebar').css('margin-left',showing?'0px':'-'+($('#sidebarbody').width()+offset)+'px');//+(offset+(ww>575?250:400))+'px');
}
$('#togglebtn').click(drawertoggle);