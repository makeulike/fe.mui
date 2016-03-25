try {
  /**
   * mui.util Components <br/>
   * 일부 재 사용성 있는 기능들에 대한 집합
   * @namespace mui.util
   * @inner
   * @example
   * // Installation
   * <script src="js/util.js"></script>
   */
  mui.util = (function(mui, $, undefined) {
    "use strict";
    var _doScroll = false;
    
    /**
     * 익스플로러 8 이하에서 그림자가 있는 PNG 파일 로딩 시 깨짐 현상 방지
     * @function mui.util.ie8PNGFix
     * @param  {$DOM} $DOM 이미지 태그
     */
    var ie8PNGFix = function($el) {
      var c = [];
      $(' img', $el).each(function(j) {
        c[j] = new Image();
        c[j].src = this.src;
        if ($.browser.msie) {
          this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        }
      });
    };

    /**
     * 이미지 경로에 대해 연결 시켜주는 기능\
     * @function mui.util.imageLoader
     * @param  {Array} arr 이미지 URL
     * @return {Arra} Image Array
     */
    var imageLoader = function(arr) {
      var length = arr.length;
      var imgArr = [];

      for (var i = 0; i < length; i++) {
        imgArr[i] = new Image();
        imgArr[i].src = arr[i];
      }

      return imgArr;
    };

    /**
     * 브라우저 스크롤 이벤트 차단
     * @function mui.util.disableScrolling
     */
    var disableScrolling = function() {
      $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
        e.preventDefault();
        return;
      });
      $(window).on("keydown.disableScroll", function(e) {
        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = 0; i < eventKeyArray.length; i++) {
          if (e.keyCode === eventKeyArray[i]) {
            e.preventDefault();
            return;
          }
        }
      });
    };

    /**
     * 브라우저 스크롤 이벤트 활성화 (PC/모바일)
     * @function mui.util.enableScrolling
     */
    var enableScrolling = function() {
      $(window).off(".disableScroll");
      // 스크롤 중이지 않기 때문에 스크롤 플래그를 False로 둔다.
      _doScroll = false;
    };

    /**
     * Y값으로 위치 이동
     * @function mui.util.goToPosition
     * @param  {Int}   value    해당 위치로 이동
     * @param  {Function} callback 위치 이동 후 Callback
     */
    var goToPosition = function(value, callback) {

      if (_doScroll) return true;

      disableScrolling();
      _doScroll = true;

      $('html, body').animate({
        scrollTop: value + "px"
      }, 700, function() {
        enableScrolling();

        _doScroll = false;
        if (typeof callback === "function") callback();
      });
    };

    /**
     * 최대 / 최소 값 사이에 X가 포함되는지 확인
     * @function mui.util.getBetween
     * @param  {Int} x   비교 될 값
     * @param  {Int} min 비교 될 최소 값
     * @param  {Int} max 비교 될 최대 값
     * @return {Boolean}
     */
    var getBetween = function(x, min, max) {
      return x >= min && x <= max;
    };

    /**
     * 엘리먼트가 문서에서 위치 한 최초 지점의 Y값
     * @param  {$DOM} $el 값을 반환 할 엘리먼트
     * @return {Int} 위치 값
     */
    var getOffset = function($el) {
      return $el.offset().top;
    };

    /**
     * 엘리먼트의 높이
     * @param  {$DOM} $el 값을 반환 할 엘리먼트
     * @return {Int}     높이값
     */
    var getHeight = function($el) {
      return $el.innerHeight();
    };

    /**
     * 엘리먼트 크기에 비례 한 배경 오브젝트 비율 설정
     * @param {$DOM} $el      비율을 설정 할 엘리먼트
     * @param {Int} wOrigin  엘리먼트의 넓이
     * @param {Int} hOrigin  엘리먼트의 높이
     * @param {Int} minWidth 엘리먼트의 최소 넓이
     */
    var setBackground = function($el, wOrigin, hOrigin, minWidth) {
      /**
       * Scale 의 Horizontal & Vertical 에 대한 비율을 Window 크기가 아닌 상위 Element 의 크기로
       * @date: 160322
       */
      var
        scaleH = $el.closest('div').innerWidth() / wOrigin,
        scaleV = $el.closest('div').innerHeight() / hOrigin;
      var
        tmpW = 0,
        tmpPos = 0;

      var ratio = scaleH > scaleV ? scaleH : scaleV;

      if (ratio * wOrigin < minWidth)
        ratio = minWidth / wOrigin;

      /**
       * 가로 중앙 정렬을 위한 작업
       * @date: 160322
       */
      $el.css({
        position: 'absolute',
        width: ratio * wOrigin,
        height: ratio * hOrigin,
        left: '50%',
        marginLeft: ( ratio * wOrigin ) / 2 * -1
      });
    };

    return {
      ie8PNGFix: ie8PNGFix,
      imageLoader: imageLoader,

      disableScrolling: disableScrolling,
      enableScrolling: enableScrolling,
      goToPosition: goToPosition,

      getBetween: getBetween,
      getOffset: getOffset,
      getHeight: getHeight,

      setBackground: setBackground,

      doScroll: _doScroll
    };
  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {
}