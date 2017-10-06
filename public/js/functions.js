'use strict';
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/**
 * jquery.detectSwipe v2.1.3
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad and Android
 * http://github.com/marcandre/detect_swipe
 * Based on touchwipe by Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

  $.detectSwipe = {
    version: '2.1.2',
    enabled: 'ontouchstart' in document.documentElement,
    preventDefault: true,
    threshold: 20
  };

  var startX,
    startY,
    isMoving = false;

  function onTouchEnd() {
    this.removeEventListener('touchmove', onTouchMove);
    this.removeEventListener('touchend', onTouchEnd);
    isMoving = false;
  }

  function onTouchMove(e) {
    if ($.detectSwipe.preventDefault) { e.preventDefault(); }
    if(isMoving) {
      var x = e.touches[0].pageX;
      var y = e.touches[0].pageY;
      var dx = startX - x;
      var dy = startY - y;
      var dir;
      var ratio = window.devicePixelRatio || 1;
      if(Math.abs(dx) * ratio >= $.detectSwipe.threshold) {
        dir = dx > 0 ? 'left' : 'right'
      }
      else if(Math.abs(dy) * ratio >= $.detectSwipe.threshold) {
        dir = dy > 0 ? 'up' : 'down'
      }
      if(dir) {
        onTouchEnd.call(this);
        $(this).trigger('swipe', dir).trigger('swipe' + dir);
      }
    }
  }

  function onTouchStart(e) {
    if (e.touches.length == 1) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      isMoving = true;
      this.addEventListener('touchmove', onTouchMove, false);
      this.addEventListener('touchend', onTouchEnd, false);
    }
  }

  function setup() {
    this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
  }

  function teardown() {
    this.removeEventListener('touchstart', onTouchStart);
  }

  $.event.special.swipe = { setup: setup };

  $.each(['left', 'up', 'down', 'right'], function () {
    $.event.special['swipe' + this] = { setup: function(){
      $(this).on('swipe', $.noop);
    } };
  });
}));


jQuery(function() {



   function setCardHeight() {

      $('.card').outerHeight($(window).outerHeight())

   }



   setCardHeight()



   $(window).on('resize', setCardHeight)



})


jQuery(function() {

   // custom events
   var setDelay = true;
   (function intervalMouseWheelEventRecursion() {
      $(document).on('mousewheel', function(event) {
         if(event.deltaY < 0) $(document).trigger('c-intervalMouseWheelUp')
         else $(document).trigger('c-intervalMouseWheelDown')
         $(document).off('mousewheel')
         setTimeout(function() {
            intervalMouseWheelEventRecursion()
         }, setDelay ? 800 : 0)
      })
   })()

   var currentSelectedCardIndex = 0

   $(document).on('c-intervalMouseWheelUp swipedown', function() {
      setDelay = currentSelectedCardIndex === 0 ? false : true
      $('.card').eq(currentSelectedCardIndex).removeClass('js-selected')
      if(currentSelectedCardIndex > 0) currentSelectedCardIndex--
   })
   $(document).on('c-intervalMouseWheelDown swipeup', function() {
      setDelay = currentSelectedCardIndex === 3 ? false : true
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

