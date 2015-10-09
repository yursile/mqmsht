function resize() {
      window.location.reload();
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", resize, false);

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
    document.getElementById('helper').addEventListener('mousedown', function() {
      $('.helper').addClass('helper-hover');
      $('.myScrollbarH').show();
    });
    document.getElementById('helper').addEventListener('mouseup', function() {
      $('.helper').removeClass('helper-hover');
    });
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
      $(".detail-w").hide();
      $('.p1').text(data[index].title);
      $(".detail img").remove();
      if(data[index].img){
        $(".p1").after('<img src='+data[index].img+' alt='+data[index].title+'/>');    
      }
      
      $('.p2').html(data[index].content);
      $('.detail').show();

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
      $('.detail').hide();
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
     myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
    });
    // $(".main").click(function(){
    //   $('.guanyu-div,.ewm-div').hide();
    // });
    // $('.guanyu').on('click', function() {
    //   $(".ewm-div").hide();
    //   $('.guanyu-div').is(':hidden') ? $('.guanyu-div').show() : $('.guanyu-div').hide();
    // });
    // $('.ewm').on('click', function() {
    //   $(".guanyu-div").hide();
    //   $('.ewm-div').is(':hidden') ? $('.ewm-div').show() : $('.ewm-div').hide();
    // });
    // music.play();
    $('.music').on('click', function() {
      var isOff = $(this).hasClass('music-off');
      if (isOff) {
        fadeMusic();
        setTimeout(function(){
          music.play();
        },2000);
        
        $(this).removeClass('music-off');
      } else {
        
        fadeMusic();
        setTimeout(function(){
          music.pause();
        },2000);
        $(this).addClass('music-off');
      }
    });


    $('.mi').on('click', function() {
      var isOff = $(this).hasClass('mi-off');
      if (isOff) {
        $(this).removeClass('mi-off');
        $('.point-mi').show();
      } else {
        $(this).addClass('mi-off');
        $('.point-mi').hide();
        $(".detail-w").hide();
      }
    });
    
  //   (function(){
  //      for (var i = 0; i < data_warn.length; i++) {
  //         var dom = '<p class="point-warn" data-inde='+i+' style="top:' + data_warn[i].top + ';left:' + data_warn[i].left + '"></p>'
  //         $('.points').append(dom);
  //       };
  //   })();
    
  //   $('.points .point-warn').on('click', function() {
  //     var index = $(this).attr("data-inde");
  //     $(".myScrollbarH").hide();
  //     $(".detail-w").hide();
  //     $('.p1-w').text(data_warn[index].title);
  //     $(".detail-w img").remove();
  //     if(data_warn[index].img){
  //       $(".p1-w").after('<img src='+data_warn[index].img+' alt='+data_warn[index].title+'/>');    
  //     }
      
  //    $('.p2-w').html(data_warn[index].content);
  //    $('.detail-w').show();

  //     // 让画面禁止滚动
  //     setTimeout(function(){
  //       if(timer){
  //         clearTimeout(timer);
  //         timer = null;
  //       }
  //     },0);

  //   });
  //   $('.detail-close-w').on('click', function() {
  //    	$("#daoyu").attr("id","");
  //     $('.myScrollbarH').hide();
  //     $('.detail-w').hide();
  //     if(timer){
  //       clearTimeout(timer);
  //       timer = null;
  //     }
  //    myscroll.scrollTo(myscroll.x+scrollWidth, 0, Math.abs((scrollWidth+myscroll.x)*500000/scrollWidth), 'relative');
  //   });
    
  //   $(".warn").on("click",function(){

  //     var isOn = $(this).hasClass('warn-on');
  //     var music = $("#musicBg")[0];
  //     if (isOn) {
  //       $(this).removeClass('warn-on');
  //       $('.point-warn').hide();
  //       $(".detail-w").hide();
 	// 	    $("#musicBg").attr("src","http://mfiles.sohu.com/news/shanghetuzzx/music/qmsht.mp3");
        
  //       music.play();

  //     } else {
  //       $(".mi").addClass('mi-off');
  //       $('.point-mi').hide();
  //       $(".detail").hide(); 

  //       $(this).addClass('warn-on');
  //       $('.point-warn').show();
  //       $("#musicBg").attr("src","http://mfiles.sohu.com/news/shanghetuzzx/music/warning.mp3");
  //       music.play();
        

        
  //        myscroll.scrollTo(myscroll.x+scrollWidth*0.128, 0, 1000, 'relative');
  //        setTimeout(function(){
  //           $($(".point-warn")[8]).trigger("click");
  //           $('.p1-w').text("");
  //           $(".detail-w img").remove();
  //           $('.p1-w').after('<img src="http://i0.itc.cn/20150928/32cf_01f97128_942e_a923_3514_1dd940255f56_1.jpg" alt="奸商/">');
  //            $('.p2-w').html("&nbsp &nbsp《清明上河图》中汴京城一派太平盛世，然而此时北宋徽宗朝政治、军事、外交均已走入绝地，开明的文治与黑暗的苛政并存。<br/>&nbsp &nbsp画家张择端表面描写盛景，实则曲谏忧国，草蛇灰线的在全图中埋下很多不为人知的玄机…<br/>&nbsp &nbsp本章节观点来自《隐忧与曲谏》(余辉/著)<a href='http://fsdafsda' target>...</a>");
  //            $(".p2-w").attr("id","daoyu");  
  //        },1000);
  //     }
  //    });  
  // }

  //start load
  $(".load").click(function(){
		$(this).hide();
		$(".loading-box").css("display","table");
		// $(".loading-pic").show();
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
    $('body').css('font-size', (windowRatio * 62.5 + '%'));
    $('.all').height(windowRatio * 510);
  }
	

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
	    	initView();

	    	$(".loading-box").hide();
	    	$(".loaded").show();
	    	$(".load-advice").html('PC端浏览效果更佳<br/>搜狐新闻移动工坊出品');
	      // $(".load-button").show();
	      // $(".load-progress,.progress-num").hide();
	      $(".loaded").on("click",function(){
	        $('.loading').fadeOut(100);
	        initScroll();
	        initBind();
		     setTimeout(function(){
		        $($(".point-mi")[0]).trigger("click");
		        $('.p1').text("");
		        $(".detail img").remove();
		         $('.p2').html("&nbsp &nbsp你看过完整的《清明上河图》吗？<br/>&nbsp &nbsp它可能是中国最有名的一幅画，流传900多年，现藏于故宫博物院。绝大多数时间，它都静静的躺在恒温15度的地库里。2015年9月8日，《清明上河图》十年来首次全卷展出，一天8000多人排队，需要等上六、七个小时。<br/>&nbsp &nbsp我们想让更多人可以看到完整版的《清明上河图》，所以用了十几天时间，花了一些笨功夫，绘成这幅“网络版《清明上河图》”。如果你曾经对它的了解仅限于张择端画的、画的是汴梁、画很长……那你有必要在PC端细致看一下清明君的完整版“高清玉照”，以及我们精心查证、逐一核对的100个知识点，那几乎也是100个你不知道的北宋
		         	<a class='alink' target='_blank' href='http://media.sohu.com/20150925/n422139956.shtml'>...</a>");
		         $(".p2").attr("id","daoyu");
		     },1000);
	    
	      }); 

	    }
	  });





  