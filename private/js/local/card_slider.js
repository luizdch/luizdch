jQuery(function() {

   // custom events
   (function intervalMouseWheelEventRecursion() {
      $(document).on('mousewheel', function(event) {
         if(event.deltaY < 0) $(document).trigger('c-intervalMouseWheelUp')
         else $(document).trigger('c-intervalMouseWheelDown')
         $(document).off('mousewheel')
         setTimeout(function() {
            intervalMouseWheelEventRecursion()
         }, 800)
      })
   })()

   var currentSelectedCardIndex = 0

   $(document).on('c-intervalMouseWheelUp swipedown', function() {
      $('.card').eq(currentSelectedCardIndex).removeClass('js-selected')
      if(currentSelectedCardIndex > 0) currentSelectedCardIndex--
   })
   $(document).on('c-intervalMouseWheelDown swipeup', function() {
      if(currentSelectedCardIndex < 3) currentSelectedCardIndex++
      $('.card').eq(currentSelectedCardIndex).addClass('js-selected')
   })
   $('.cardIndex-indicator button').on('click', function() {
      currentSelectedCardIndex = $(this).index()
      $('.card').removeClass('js-selected')
      $('.card').eq($(this).index()).addClass('js-selected').prevAll().addClass('js-selected')
   })
   $('.luizdch .arrow-button').on('click', function() {
      currentSelectedCardIndex++
      $('.card').eq(currentSelectedCardIndex).addClass('js-selected')
   })

})
