$(document).ready(function () {
  function checkScroll(){
      var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

      if($(window).scrollTop() > startY){
          $('.navbar').addClass("scrolled");
      }else{
          $('.navbar').removeClass("scrolled");
      }
  }

  if($('.navbar').length > 0){
      $(window).on("scroll load resize", function(){
          checkScroll();
      });
  }



     $('a[href^="#"]').on('click', function (e) {
         e.preventDefault();

         var target = this.hash,
             $target = $(target);

         $('html, body').stop().animate({
             'scrollTop': $target.offset().top - 80
         }, 900, 'swing', function () {
             window.location.hash = target;
         });
     });

     $('[data-popup-open]').on('click', function(e)  {
         var targeted_popup_class = jQuery(this).attr('data-popup-open');
         $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

         e.preventDefault();
     });

     //----- CLOSE
     $('[data-popup-close]').on('click', function(e)  {
         var targeted_popup_class = jQuery(this).attr('data-popup-close');
         $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

         e.preventDefault();
     });
 });
