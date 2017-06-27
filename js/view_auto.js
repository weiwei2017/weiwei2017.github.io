window.onload=function(){
	window.onresize=function(){
		var w=window.screen.width;
		var targetw=750;
		var scale=w/targetw;
		var meta=document.createElement('meta');
			meta.name='viewport';
			meta.content='width=device-width,user-scalable=no,initial-scale='+scale+'';
			document.head.appendChild(meta);
	}
}