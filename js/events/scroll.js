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
     * @event .btn-scroll-top click
     * @memberOf Events/scroll
     * @example
     * <a role="button" className="btn-scroll-top"></a>
     */
    var uiScrollTop = $('.btn-scroll-top');

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
  })(mui, $, undefined);

} catch (e) {
  console.log(e);
} finally {}
