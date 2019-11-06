# flowdrawerjs
![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/200px-Rotating_earth_%28large%29.gif)
Example
```html
<div id="flowdiv"></div>
<script>
	init({
		element:"flowdiv",
		bgcolor:"blue",
		offset:100,
		curve:500,
		onChange:function(flow){
			if (flow.height>80 || flow.height<-80){
				flow.release();
			}
		},
		onRelease:function(flow){
			if(flow.height<0)
			document.getElementById('flowdiv').style.transform='translateX(-300px)';
			else
			document.getElementById('flowdiv').style.transform='translateX(0px)';
		}
	});
</script>
```