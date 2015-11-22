// function resize() {
//       window.location.reload();
//     }
//     window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", resize, false);

    var flag = 0;
    var timer;
    var myscroll;



  function initScroll() {
    var windowH = $(window).height(),
      newW = windowH / 1400 * 29232 + 1000 / windowH * 3;
    scrollWidth = newW - $(window).width();
    $('.helper').width(newW);
    $('#wrapper,.helper').height(windowH);
    myscroll = new iScroll("wrapper", {
      hScrollbar: true,
      useTransition: true,
      hScroll: true,
      vScroll: false,
      checkDOMChanges: true,
      bounce: false,
      scrollbarClass: "myScrollbar",
  
    });
    
    // 
     myscroll.options.onScrollStart = function(){
      if($(".detail").css("display") == "block"){
        $(".detail").css("display","none");
        $("#daoyu").attr("id","");
      }
      if($(".detail-w").css("display") == "block"){
        $(".detail-w").css("display","none");
        $("#daoyu").attr("id",""); 
      }
    }
    
    
    myscroll.options.onScrollEnd = function(){
     
      $(".myScrollbarH").hide();
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(function(){
        clearTimeout(timer);
        timer = null;
        myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
        // myscroll.scrollBy()
      },20000);
      
    }
    myscroll.scrollTo(scrollWidth, 0, 500000, 'relative');
    $('.myScrollbarH').hide();
  }


  function fadeMusic(){
    var music = document.getElementById('musicBg');
    if(music.volume==1){
      // while(music.volume>0){
        setTimeout(function(){
          music.volume -= 0.05;
          if(music.volume>0.05){
            setTimeout(arguments.callee,100);
          }
        },100);
      // } 
    }else{
      setTimeout(function(){
          music.volume += 0.05;
          if(music.volume<=0.95){
            setTimeout(arguments.callee,100);
          }
        },100);
    }
    
  }

  function initBind() {
    var music = document.getElementById('musicBg');
    
    for (var i = 0; i < data.length; i++) {
      var dom = '<p class="point-mi" data-inde='+i+' style="top:' + data[i].top + ';left:' + data[i].left + '"></p>'
      $('.points').append(dom);
    };





    $('.points .point-mi').on('click', function() {
      var index = $(this).attr("data-inde");
      $(".myScrollbarH").hide();
      // $(".detail-w").hide();
      $('.p1').text(data[index].title);
      $(".detail>img").remove();
      if(data[index].img){
        $(".p1").after('<img src='+data[index].img+' alt='+data[index].title+'/>');    
      }
      
      $('.p2').html(data[index].content);
      // $('.detail').show();
      $('.detail').addClass("transition-in");

      // 让画面禁止滚动
      setTimeout(function(){
        if(timer){
          clearTimeout(timer);
          timer = null;
        }
      },0);
    });
    $('.detail-close').on('click', function() {
      $("#daoyu").attr("id","");
      $('.myScrollbarH').hide();
      
      #('.detail').removeClass("transition-in");
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
     myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
    });
    $('.about-close').on('click', function() {
      
      $('.myScrollbarH').hide();
      $('.about-div').hide();
      // if(timer){
      //   clearTimeout(timer);
      //   timer = null;
      // }
     //  console.log(scrollWidth);
     //  console.log(myscroll.x);
     // myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
    });

    $('.share-close').on('click', function() {
      
      $('.myScrollbarH').hide();
      $('.share-div').hide();
     //  if(timer){
     //    clearTimeout(timer);
     //    timer = null;
     //  }
     // myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
    });

    $('.about').on('click', function() {
      if($('.about-div').is(':hidden')){
          $('.about-div').css("display","table");

      }else{
        $('.about-div').hide();
      }
    });

     $(".share").on("click",function(){
      $(".share-div").show();
    });

    $('.music').on('click', function() {
      var isOff = $(this).hasClass('music-offs');
      if (isOff) {
          music.play(); 
        $(this).removeClass('music-offs');
      } else {
        
        // fadeMusic();
        // setTimeout(function(){
          music.pause();
        // },2000);
        $(this).addClass('music-offs');
      }
    });


    $('.mi').on('click', function() {
      var isOff = $(this).hasClass('mi-offs');
      if (isOff) {
        $(this).removeClass('mi-offs');
        $('.point-mi').show();
      } else {
        $(this).addClass('mi-offs');
        $('.point-mi').hide();
        $(".detail-w").hide();
      }
    });
    
  }

  //start load
  $(".load").click(function(){
		$(this).hide();
		$(".loading-box").css("display","table");
		startLoadPic();
		loader.start();	
	});

  function startLoadPic(){
  	var images = $("img[data-src]");
  	images.each(function(i,v){
  		$(v).attr("src",$(v).attr("data-src"));
  	});
  }
  function initView() {
    var windowRatio = $(window).width() / 320;
    var windowRatio = windowRatio > 2 ? 2 : windowRatio;
    $('body').css('font-size', (windowRatio * 30.5 + '%'));
    $('.all').height(windowRatio * 510);
  }
  initView();
	

    var loader = new resLoader({
   	   resources: [
	      'http://mfiles.sohu.com/news/shanghetuzzx/7.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/14.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/4.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/19.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/9.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/11.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/1.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/16.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/6.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/13.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/3.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/18.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/8.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/10.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/15.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/20.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/5.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/12.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/2.jpg',
	      'http://mfiles.sohu.com/news/shanghetuzzx/17.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/img/5.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/2.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/2.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/img/4.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/1.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/6.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/1.jpg',
	      'http://news.sohu.com/upload/shanghetuzzx/img/3.png',
	      'http://news.sohu.com/upload/shanghetuzzx/img/8.png',
	      
	    ],
	    onStart: function(total) {
	    	
	    },
	    onProgress: function(current, total) { 
	      var percent = parseInt(current / total * 100) + '%';
	      var progress = parseInt(current / total * 100) - 100 + '%';
	      $('.progress-num').text(percent);
	      $('.progress-img').css('left', progress);
	      var music =  $("#musicBg")[0]
	      if(music){
	        
	          music.play();
	        
	      }
	    },
	    onComplete: function(total) {
	    	

	    	$(".loading-box").hide();
	    	$(".loaded").show();
	    	$(".load-advice").html('PC端浏览效果更佳<br/>搜狐新闻移动工坊出品');
	      $(".loaded").on("click",function(){
	        $('.loading').fadeOut(100);
	        initScroll();
	        initBind();
		      // setTimeout(initDaoyu,1000);
	      }); 

	    }
	  });






  