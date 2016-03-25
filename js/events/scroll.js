/** @namespace  Events/scroll */
try {
  (function(mui, $, undefined) {
    /**
     * 스크롤 이벤트 종료 핸들러
     * @memberOf Events/scroll
     * @param  {Function} callback 스크롤 종료 이벤트 콜백
     * @param  {Int}   timeout  콜백 실행 Delay (ms)
     * @example
     * $(window).scrollEnd(function() {
     *  // do stuff
     * }, 1500);      
     */
    $.fn.scrollEnd = function(callback, timeout) {
      $(this).scroll(function() {
        var $this = $(this);

        if ($this.data('scrollTimeout'))
          clearTimeout($this.data('scrollTimeout'));

        $this.data('scrollTimeout', setTimeout(callback, timeout));
      });
    };

    /**
     * Scroll To Top 이벤트 핸들러 <br/>
     * 문서의 최 상단으로 올라가게 하는 기능 (700ms)
     * @event .ui__scroll-top click
     * @memberOf Events/scroll
     * @example
     * <a role="button" className="ui__scroll-top"></a>
     */
    var uiScrollTop = $('.ui__scroll-top');

    if (uiScrollTop.length > 0) {
      $('a', uiScrollTop).click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 + "px" }, 700);
      });

      $(window).on("scroll", function() {
        if ($(window).scrollTop() > window.outerHeight / 2)
          uiScrollTop.fadeIn();
        else
          uiScrollTop.fadeOut();
      });
      $(window).scrollEnd(function() {
        uiScrollTop.fadeOut();
      }, 1500);
    }

    /**
     * ScrollSpy 기능
     * @param {ID} href 해당 ID를 가진 엘리먼트의 최 상단으로 이동
     * @param {data-avoid-target} Selector target 된 스크롤 시 엘리먼트의 높이값을 더함
     * @event [data-toggle="scrollspy"] click
     * @memberOf Events/scroll
     * @example
     * // Basic
     * <a href="#target" data-toggle="scrollspy"> 
     *   target으로 이동 
     * </a>
     * @example
     * // data-avoid-target 적용
     * <a href="#target" data-toggle="scrollspy" data-avoid-target=".gnb"> 
     *   target의 위치와 $('.gnb') 높이를 더한 값으로 이동
     * </a>
     */
    $(document).on('click', '[data-toggle="scrollspy"]', function(e) {
      e.preventDefault();

      var
        target = $(this).attr('href'),
        avoidTarget = $(this).attr('data-avoid-target'),
        value = $(target).offset().top;

      /*
       ** @desc: target 이 1개 이상일 경우 , 로 문자열 자른 후 innerHeight 을 더함
       */
      if (typeof avoidTarget !== "undefined") {
        if (avoidTarget.indexOf(',') > 0) {
          var arr = avoidTarget.split(',');
          for (var i = 0; i < arr.length; i++) {
            value -= $(arr[i]).outerHeight();
          }
        } else {
          value -= $(avoidTarget).outerHeight();
        }
      }

      mui.util.goToPosition(value);
    });
    /*
    ** @event: Scrolling
    ** @desc: 모바일 버전에서 사용되는 Scroll To Top
    */
    var uiScrollTop = $('.ui__scroll-top');  

    if(uiScrollTop.length > 0){
      $('a', uiScrollTop).click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0 + "px"}, 700);
      });

      $(window).on("scroll", function () { 
        if($(window).scrollTop() > window.outerHeight / 2)
          uiScrollTop.fadeIn();
        else 
          uiScrollTop.fadeOut();
      });
      $(window).scrollEnd(function(){
        uiScrollTop.fadeOut();
      }, 1500);
    }
  })(mui, $, undefined);

} catch (e) {
  console.log(e);
} finally {}
