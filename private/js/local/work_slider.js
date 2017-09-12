jQuery(function() {

   var currentActiveSlideCardIndex = 0

   function slideLeft() {
      if(currentActiveSlideCardIndex > 0) currentActiveSlideCardIndex--
      if(currentActiveSlideCardIndex === 0) $('.slideLeft-button').addClass('js-hide')
      $('.slideRight-button').removeClass('js-hide')
      $('.workSlider-container').removeAttr('class').attr('class', 'workSlider-container js-work' + currentActiveSlideCardIndex + '-selected')
   }
   function slideRight() {
      if(currentActiveSlideCardIndex < 2) currentActiveSlideCardIndex++
      if(currentActiveSlideCardIndex === 2) $('.slideRight-button').addClass('js-hide')
      $('.slideLeft-button').removeClass('js-hide')
      $('.workSlider-container').removeAttr('class').attr('class', 'workSlider-container js-work' + currentActiveSlideCardIndex + '-selected')
   }

   $('.slideLeft-button').on('click', slideLeft)
   $('.slideRight-button').on('click', slideRight)
   $('.work-slider').on({
      swipeleft: slideRight,
      swiperight: slideLeft
   })

})
