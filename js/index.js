$(function(){
		// nav move
		var $hover = $(".nav ul li");
		$hover.hover(function(){
			$(this).css({color:'#fa6478'})
		});
		$('.top').click(function(){
			//scrollTop兼容性
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			$(document.documentElement).stop().animate({
		        'scrollTop':0,
	    	},1000)
		})
//flip
	$('.foot_ban').click(function(){
		$('.flip').css('display','block')
	});
	$('.close').click(function(){
		$('.flip').css('display','none');
		$('.flip1').css('display','none');
		$('.docs-methods').css({display:'none'})
	});
	$('.choose1').click(function(){
		$('.quick2').css('display','block')
	});
	$('.choose2').click(function(){
		$('.quick2').css('display','block')
	});
	$('.quick_home').click(function(){
		$('.flip').css('display','block');
		$('.quick2').css('display','none');
		$('.quick3').css('display','none');
		$('.quick4').css('display','none');
		$('.quick5').css('display','none');
		$('.quick6').css('display','none');
	});
	$('#need').click(function(){
		$('.place').css('display','none')
	});
	$('.text_a').click(function(){
		if(!$('#need').val()){
			$('.warn').css('display','block')
		}
		else{
			$('.quick4').css('display','block');
		}
	});
	$('.budget li').click(function(){
		$('.quick5').css('display','block');
	});
	$('.warm').click(function(){
		if(!(/^1[3|4|5|7|8][0-9]{9}/.test($('.inp').val()))){ 
	        $('.no').css('display','block')
	        $(".quick5").find("input").prop("value","");
	    }else{
			$('.quick6').css('display','block');	
	    }  
	});
	$('.fh_index').click(function(){
		$('.quick1').css('display','block');
		$('.quick2').css('display','none');
		$('.quick3').css('display','none');
		$('.quick4').css('display','none');
		$('.quick5').css('display','none');
		$('.quick6').css('display','none');
	}); 
// //broken
	var TWO_PI = Math.PI * 2;
	var images = [], 
	    imageIndex = 0;
	var image,
	    imageWidth =window.innerWidth,
	    imageHeight = 420;
	var vertices = [],
	    indices = [],
	    prevfrag = [],
	    fragments = [];
	var margin = 50;
	var container = document.getElementById('container');
	var clickPosition = [imageWidth * 0.5, imageHeight * 0.5];
	window.onload = function() {
	   	TweenMax.set(container, {perspective:500});
	    var urls = [
	            'img/1.jpg',
	            'img/2.jpg',
	            'img/3.jpg',
	            'img/4.jpg',
	            'img/5.jpg',
	            'img/6.jpg'
	        ],
	        image,
	        loaded = 0;
	    images[0] = image = new Image();
	        image.onload = function() {
	            if (++loaded === 1) {
	                for (var i = 1; i < urls.length; i++) {
	                    images[i] = image = new Image();
	                    image.src = urls[i];
	                } 
	                placeImage();
	            }
	        };
	        image.src = urls[0]; 
	};
	function placeImage(transitionIn) {
	    image = images[imageIndex];
	    if (++imageIndex === images.length) imageIndex = 0;
	    var num = Math.random();
	    if(num < .25) {
	      image.direction = "left";
	    } else if(num < .5) {
	      image.direction = "top";
	    } else if(num < .75) {
	      image.direction = "bottom";
	    } else {
	      image.direction = "right";
	    }
	    container.appendChild(image);
	    image.style.opacity = 0;
	    if (transitionIn !== false) {
	        triangulateIn();
	    }
	}
	function triangulateIn(event) {
	    var box = image.getBoundingClientRect(),
	        top = box.top,
	        left = box.left;
	    if(image.direction == "left") {
	      clickPosition[0] = 0; 
	      clickPosition[1] = imageHeight / 2;
	    } else if(image.direction == "top") {
	      clickPosition[0] = imageWidth / 2;
	      clickPosition[1] = 0;
	    } else if(image.direction == "bottom") {
	      clickPosition[0] = imageWidth / 2;
	      clickPosition[1] = imageHeight;
	    } else if(image.direction == "right") {
	      clickPosition[0] = imageWidth;
	      clickPosition[1] = imageHeight / 2;
	    } 
	    triangulate();
	    build();
	}
	function triangulate() {
	    for(var i = 0; i < 40; i++) {      
	      x = -margin + Math.random() * (imageWidth + margin * 2);
	      y = -margin + Math.random() * (imageHeight + margin * 2);
	      vertices.push([x, y]);
	    }
	    vertices.push([0,0]);
	    vertices.push([imageWidth,0]);
	    vertices.push([imageWidth, imageHeight]);
	    vertices.push([0, imageHeight]);
	    vertices.forEach(function(v) {
	        v[0] = clamp(v[0], 0, imageWidth);
	        v[1] = clamp(v[1], 0, imageHeight);
	    });
	    indices = Delaunay.triangulate(vertices);
	}
	function build() {
	    var p0, p1, p2,
	        fragment;
	    var tl0 = new TimelineMax({onComplete:buildCompleteHandler});
	    for (var i = 0; i < indices.length; i += 3) {
	        p0 = vertices[indices[i + 0]];
	        p1 = vertices[indices[i + 1]];
	        p2 = vertices[indices[i + 2]];
	        fragment = new Fragment(p0, p1, p2);
	        var dx = fragment.centroid[0] - clickPosition[0],
	            dy = fragment.centroid[1] - clickPosition[1],
	            d = Math.sqrt(dx * dx + dy * dy),
	            rx = 30 * sign(dy),
	            ry = 90 * -sign(dx),
	            delay = d * 0.003 * randomRange(0.9, 1.1);
	        fragment.canvas.style.zIndex = Math.floor(d).toString();
	        var tl1 = new TimelineMax(); 
	        if(image.direction == "left") {
	          rx = Math.abs(rx); 
	          ry = 0;          
	        } else if(image.direction == "top") {
	          rx = 0;
	          ry = Math.abs(ry);
	        } else if(image.direction == "bottom") {
	          rx = 0;
	          ry = - Math.abs(ry);
	        } else if(image.direction == "right") {
	          rx = - Math.abs(rx);
	          ry = 0;
	        } 
	        tl1.from(fragment.canvas, 1, {
	              z:-50,
	              rotationX:rx,
	              rotationY:ry,
	              scaleX:0,
	              scaleY:0,
	              ease:Cubic.easeIn
	         });
	        tl1.from(fragment.canvas, 0.4,{alpha:0}, 0.6);
	        tl0.insert(tl1, delay);
	        fragments.push(fragment);
	        container.appendChild(fragment.canvas);
	    }
	}
	function buildCompleteHandler() {
	    image.style.opacity = 1;
	    image.addEventListener('transitionend', function catchTrans() {
	      fragments.forEach(function(f) {
	          container.removeChild(f.canvas);
	      });
	      fragments.length = 0;
	      vertices.length = 0;
	      indices.length = 0;
	      placeImage();
	      this.removeEventListener('transitionend',catchTrans,false);
	    }, false);
	}
	function randomRange(min, max) {
	    return min + (max - min) * Math.random();
	}
	function clamp(x, min, max) {
	    return x < min ? min : (x > max ? max : x);
	}
	function sign(x) {
	    return x < 0 ? -1 : 1;
	}
	Fragment = function(v0, v1, v2) {
	    this.v0 = v0;
	    this.v1 = v1;
	    this.v2 = v2;
	    this.computeBoundingBox();
	    this.computeCentroid();
	    this.createCanvas();
	    this.clip();
	};
	Fragment.prototype = {
	    computeBoundingBox:function() {
	        var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]),
	            xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
	            yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
	            yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);
	         this.box = {
	            x:Math.round(xMin),
	            y:Math.round(yMin),
	            w:Math.round(xMax - xMin),
	            h:Math.round(yMax - yMin)
	        };
	    },
	    computeCentroid:function() {
	        var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
	            y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
	        this.centroid = [x, y];
	    },
	    createCanvas:function() {
	        this.canvas = document.createElement('canvas');
	        this.canvas.width = this.box.w;
	        this.canvas.height = this.box.h;
	        this.canvas.style.width = this.box.w + 'px';
	        this.canvas.style.height = this.box.h + 'px';
	        this.canvas.style.left = this.box.x + 'px';
	        this.canvas.style.top = this.box.y + 'px';
	        this.ctx = this.canvas.getContext('2d');
	    },
	    clip:function() {
	        this.ctx.save();
	        this.ctx.translate(-this.box.x, -this.box.y);
	        this.ctx.beginPath();
	        this.ctx.moveTo(this.v0[0], this.v0[1]);
	        this.ctx.lineTo(this.v1[0], this.v1[1]);
	        this.ctx.lineTo(this.v2[0], this.v2[1]);
	        this.ctx.closePath();
	        this.ctx.clip();
	        this.ctx.drawImage(image, 0, 0);
	        this.ctx.restore();
	    }
	};
// //change
	$('.sz_main_right ul li').hover(function(){
		$(this).siblings().children('.xs').css('display','none');
		$(this).siblings().children('.wm').css('display','block');
		$(this).children('.wm').css('display','none');
		$(this).children('.xs').css('display','block');
	},function(){
		$(this).children('.wm').css('display','block');
		$(this).siblings().children('.xs').css('display','none');
		$(this).children('.wm').css('display','none');
		$(this).children('.xs').css('display','block');
	});
//choose City
	$('.manage-address').on('click',function(){
		$('.docs-methods').css({display:'block'})
	})
    var $citypicker3 = $('#city-picker3');
    $('#reset').click(function () {
        $citypicker3.citypicker('reset');
    });
    $('#destroy').click(function () {
        $citypicker3.citypicker('destroy');
        $citypicker3.css({background:'lightblue'});
    });
//drags
	var flip1=document.querySelector('.flip1');
	$('.flip1').on('mousedown',function(ev){
        var ev = ev || event;  
        var disX = ev.clientX - this.offsetLeft;  
        var disY = ev.clientY - this.offsetTop;  
        $('.flip1').on('mousemove',function (ev) {  
            var ev = ev || event;  
            this.style.left = ev.clientX - disX + 'px'; 
            this.style.top = ev.clientY - disY + 'px';  
        });  
        $('.flip1').on('mouseup',function(){  
            $(this).off('mousemove'); 
        });  
        return false;  
	})
//about
	$('.about .bord ul li').click(function () {
		var index = $(this).index();
		$('.content div').eq(index).stop().show().siblings().hide();
		$(this).siblings().find('a').css({'backgroundColor':'#fff','color':'#000'}); 
		$(this).find('a').css({'backgroundColor':'#ff6800','color':'#fff'})
	});
	$(function () {
		var slip = $('.bgcolor');
		var a = $('.about .bord ul li:first');
		slip.css({
			top: parseInt(a.position().top) + 'px'
		});
		$('.about .bord ul li').mouseenter(function () {
			if (slip.css('display') == 'none') {
				slip.show();
			};
			slip.stop().animate({
				top: parseInt($(this).position().top) + 'px'
			}, 300);
		});
	});
//login
	$('.way').click(function(){
		if($('.login2').css('display') == 'none'){
			$('.login1').addClass('current').siblings().removeClass('current');		
		}
		else{
			$('.login2').addClass('current').siblings().removeClass('current');	
		}
	})
//shop
	var $loutili=$('.st .st_l ul li')
    $loutili.on('click',function(){
        $(this).addClass('current').siblings('li').removeClass('current');
        var $loutitop=$('.louti').eq($(this).index()).offset().top;
        $('body').animate({
            scrollTop:$loutitop-50+"px"
        })
    });
    $(window).scroll(function(){
        var $top=$(this).scrollTop()
        if($top>=800){
            $('.st').css({position:'fixed',top:'0'});
            $('.st .st_r').css('display','block');
        }else{
        	$('.st').css({position:'relative'});
            $('.st .st_r').css('display','none');
        }
        if($top>=560){
            $('.dp_box').css({position:'fixed',top:'50px',left:'50%',marginLeft:'318px'});
        }
        else{
        	$('.dp_box').css({position:'absolute'});
        }
    });
	var $toggle=$('.s_ul li')
	$toggle.find('.st').click(function(){
		$(this).hide();
		$(this).siblings('.st2').show();
		$(this).siblings('.s_d').show();
	});
	$toggle.find('.st2').click(function(){
		$(this).hide();
    	$(this).siblings('.st').show();
    	$(this).siblings('.s_d').hide();
	});
	$('.con_ul li').on('click',function(){
		var $cIndex=$(this).index();
		$(this).addClass('current').siblings('li').removeClass('current');
		$('.cont').eq($cIndex).addClass('current02').siblings('.cont').removeClass('current02');
	});
//selection
    $(".one ul li").click(function(){
        var text =$(this).text();
        $(this).addClass("current").siblings().removeClass("current");
    });
//picture
	$(function(){
		$('.ph').click(function(){
			$('.picturebox').css({display:'block'})
		})
		$('.aui_close').click(function(){
			$('.picturebox').css({display:'none'})
		})
		//将第一张图片设置为默认
		$(".pic_big_image img").eq(0).addClass("cur");
		//点击大图右箭头，显示下一张大图
		$('.pic_big_next').click(function(){
			var img_cur = $(".pic_big_image img.cur");
			if(typeof(img_cur.next().attr("src")) != 'undefined'){
				img_cur.next().addClass('cur');
				img_cur.removeClass('cur');
				big_img_load();
				big_img_movebtn();
			}
		});
		//点击大图左箭头，显示上一张大图
		$('.pic_big_prev').click(function(){
			var img_cur = $(".pic_big_image img.cur");
			if(typeof(img_cur.prev().attr("src")) != 'undefined'){
				img_cur.prev().addClass('cur');
				img_cur.removeClass('cur');
				big_img_load();
				big_img_movebtn();
			}
		});
		//点击缩略图显示大图
		$('.pic_small_image_box img').click(function(){
			var small_img_index = $(".pic_small_image_box img").index($(this)[0]);
			if(!$(".pic_big_image img").eq(small_img_index).hasClass('cur')){
				$(".pic_big_image img.cur").removeClass('cur');
				$(".pic_big_image img").eq(small_img_index).addClass('cur');
				big_img_load();
				big_img_movebtn();
			}
		});
		
		var small_image_box_index = 1;
		var small_image_box_width = 3805;
		var small_image_box_length = Math.ceil(small_image_box_width/740);
		//点击缩略图右箭头
		$('.pic_small_next').click(function(){
			if(small_image_box_index < small_image_box_length){
				var box_margin_left = small_image_box_index*740;
				$(".pic_small_image_box").animate({'margin-left':"-"+box_margin_left+"px"}, 300);
				small_image_box_index++;
				small_img_movebtn(small_image_box_index, small_image_box_length);
			}
		});
		//点击缩略图左箭头
		$('.pic_small_prev').click(function(){
			if(small_image_box_index > 1){
				var box_margin_left = (small_image_box_index-2)*740;
				$(".pic_small_image_box").animate({'margin-left':"-"+box_margin_left+"px"}, 300);
				small_image_box_index--;
				small_img_movebtn(small_image_box_index, small_image_box_length);
			}
		});
		
		//初始化大图和缩略图左右移动按钮
		big_img_movebtn();
		small_img_movebtn(small_image_box_index, small_image_box_length);
	});

	//当用户点击相册时，系统异步加载其他图片
	var big_img_sign = 0;
	function big_img_load(){
		if(!big_img_sign){
			$(".pic_big_image img").each(function(){
				$(this).attr("src", $(this).attr("cachesrc"));
			});
			big_img_sign = 1;
		}
	}

	//大图左右移动按钮显示
	function big_img_movebtn(){
		var img_cur = $(".pic_big_image img.cur");
		if(typeof(img_cur.next().attr("src")) != 'undefined'){
			$(".pic_big_next span").show();
		}else{
			$(".pic_big_next span").hide();
		}
		if(typeof(img_cur.prev().attr("src")) != 'undefined'){
			$(".pic_big_prev span").show();
		}else{
			$(".pic_big_prev span").hide();
		}
	}
	//缩略图左右移动按钮显示
	function small_img_movebtn(small_image_index, small_image_length){
		if(small_image_index < small_image_length){
			$(".pic_small_next span").show();
		}else{
			$(".pic_small_next span").hide();
		}
		if(small_image_index > 1){
			$(".pic_small_prev span").show();
		}else{
			$(".pic_small_prev span").hide();
		}
	}
	//fangdajing
	$(function(){
			$.fn.magnifying = function(){
				var that = $(this),
				 $imgCon = that.find('.con-fangDaIMg'),//正常图片容器
				 	$Img = $imgCon.find('img'),//正常图片，还有放大图片集合
				   $Drag = that.find('.magnifyingBegin'),//拖动滑动容器
				   $show = that.find('.magnifyingShow'),//放大镜显示区域
				$showIMg = $show.find('img'),//放大镜图片
				$ImgList = that.find('.con-FangDa-ImgList > li >img'),
				multiple = $show.width()/$Drag.width();

				$imgCon.mousemove(function(e){
					$Drag.css('display','block');
					$show.css('display','block');
				    //获取坐标的两种方法
				   	// var iX = e.clientX - this.offsetLeft - $Drag.width()/2,
				   	// 	iY = e.clientY - this.offsetTop - $Drag.height()/2,	
				   	var iX = e.pageX - $(this).offset().left - $Drag.width()/2,
				   		iY = e.pageY - $(this).offset().top - $Drag.height()/2,	
				   		MaxX = $imgCon.width()-$Drag.width(),
				   		MaxY = $imgCon.height()-$Drag.height();
		  	   	    /*这一部分可代替下面部分，判断最大最小值
				   	var DX = iX < MaxX ? iX > 0 ? iX : 0 : MaxX,
				   		DY = iY < MaxY ? iY > 0 ? iY : 0 : MaxY;
				   	$Drag.css({left:DX+'px',top:DY+'px'});	   		
				   	$showIMg.css({marginLeft:-3*DX+'px',marginTop:-3*DY+'px'});*/
				   	iX = iX > 0 ? iX : 0;
				   	iX = iX < MaxX ? iX : MaxX;
				   	iY = iY > 0 ? iY : 0;
				   	iY = iY < MaxY ? iY : MaxY;	
				   	$Drag.css({left:iX+'px',top:iY+'px'});	   		
				   	$showIMg.css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
				   	// $showIMg.css({marginLeft:'0px',marginTop:'0px'});
				   	//return false;
				});
				$imgCon.mouseout(function(){
				   	$Drag.css('display','none');
					$show.css('display','none');
				});

				$ImgList.click(function(){
					var NowSrc = $(this).data('bigimg');
					$Img.attr('src',NowSrc);
					$(this).parent().addClass('active').siblings().removeClass('active');
				});	
			}

			$("#fangdajing").magnifying();


		});
//liuyanban
	$('.ms').click(function(){
		$('.liuyan_box').css({display:'block'})
	})
	$('.close').click(function(){
		$('.liuyan_box').css({display:'none'})
	})
	var ipt = document.getElementById("ipt");
	var txt = document.getElementById('txt');
	var textarea = document.getElementById("text");
	ipt.onclick = function(){
		var textValue = textarea.value.LTrim();		
		textarea.value="";
		if(textValue.length>0 ){
			var divs = document.createElement("div");
			var imgs = document.createElement("img");
			var ps = document.createElement("p");
			var inputs = document.createElement("input");
			divs.setAttribute("class","creatediv");
			imgs.setAttribute('class',"createimg");
			ps.setAttribute("class","createdivs");
			inputs.setAttribute("class","createinput");
			imgs.src="img/head.jpg";
			inputs.type="button";
			inputs.value="删除";
			ps.innerHTML=textValue;
			divs.appendChild(imgs);
			divs.appendChild(ps);
			divs.appendChild(inputs);
			if(txt.children.length==0){
				txt.appendChild(divs);
			}else{
				txt.insertBefore(divs,get_firstChild(txt))
			}
			inputs.onclick = function(){
				this.parentNode.parentNode.removeChild(this.parentNode)
			}
		}
	}
});