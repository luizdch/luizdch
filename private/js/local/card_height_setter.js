jQuery(function() {

   function setCardHeight() {
      $('.card').outerHeight($(window).outerHeight())
   }

   setCardHeight()

   $(window).on('resize', setCardHeight)

})
