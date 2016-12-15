$(function(){
  var sources = [];
  var interval;
  
  $('.img-container').each(function(){
    sources.push($(this).find('img').attr('src').replace('/tumbnails', ''));
  });


  $(".img-container").on('click', function(e){
    timeNext();
    if($(".modal-content .gallery").find('img').length != sources.length){
      for(var i in sources){
        $(".modal .modal-content .gallery").append('<img src="'+sources[i]+'" />');
      }
    }
    var src = $(this).find('img').attr('src').replace('/tumbnails', '');
    $(".modal-content .gallery img").each(function(){
      var imgSrc = $(this).attr('src');
      if(imgSrc == src){
        $(".modal-content .gallery img").hide().removeClass('active');
        $(this).show().addClass('active');
        return false;
      }
    });
    $(".overlay, .modal").fadeIn('slow');

  });

  $(".modal-close").on('click', function(e){
    e.preventDefault();
    $(this).parents('.modal').fadeOut('slow');
    $(".overlay").fadeOut('slow');
    clearInterval(interval);
  });

  $('.modal .next').on('click', function(e){
    e.preventDefault();
    nextImg();
  });

  $('.modal .prev').on('click', function(e){
    e.preventDefault();
    prevImg();
  });

  function timeNext(){
    interval = setInterval(function(){
      nextImg();
      console.log('Ok');
    }, 2000);
  }


  function nextImg(){
    var active = $(".gallery img.active");
    active.fadeOut('slow').removeClass('active');
    if(active.next().length > 0){
      active.next().fadeIn('slow').addClass('active');
    }else{
      active.parents('.gallery').find('img:first-child').fadeIn('slow').addClass('active');
    }
  }

  function prevImg(){
    var active = $(".gallery img.active");
    active.fadeOut('slow').removeClass('active');
    if(active.prev().length > 0){
      active.prev().fadeIn('slow').addClass('active');
    }else{
      active.parents('.gallery').find('img:last-child').fadeIn('slow').addClass('active');
    }
  }
});
