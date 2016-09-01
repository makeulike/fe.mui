/** 
 *{@link mui.common}
 * @namespace
 * @requires jQuery
 */
var mui = window.mui || {};
var console = window.console || {
  log: function() {}
};

try {
  /**
   * 공통적으로 사용 할 함수 모음 (추후 카테고라이징 예정)
   * @namespace
   * @param  {Object} mui        mui Objects
   * @param  {Object} $          jQuery
   * @param  {Object} undefined Undefined
   * @example
   * // Installation
   * <script src="js/common.js"></script>
   */
  mui.common = (function(mui, $, undefined) {
    "use strict";

    /**
     * 브라우저 넓이 값 리턴 (IE, FF, Chrome)
     * @function mui.common.getWindowWidth
     * @return {Int} 브라우저 넓이
     */
    var getWindowWidth = function() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    /**
     * 브라우저 높이 값 리턴 (IE, FF, Chrome)
     * @function mui.common.getWindowHeight
     * @return {Int} 브라우저 높이
     */
    var getWindowHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };

    /**
     * 마우스 오른쪽 버튼 및 드래그 제한
     * @function mui.common.disabledDefaultMouseEvents
     * @example
     * window.attachEvent( "onload" , disabledDefaultMouseEvents );
     */
    var disabledDefaultMouseEvents = function() {
      document.body.oncontextmenu = function() {
        return false
      };
      document.body.ondragstart = function() {
        return false
      };
      document.body.onselectstart = function() {
        return false
      };
    };

    /*
     ** @method: isDomain
     ** @desc: URL 검증
     ** @param: Strong;
     ** @usage : isDomain(url)
     */
    /**
     * URL 검증
     * @function mui.common.isDomain
     * @param  {String}  url 검증 할 URL
     * @return {Boolean}     검증 결과
     */
    var isDomain = function(url) {
      var currentURL = location.href.split('//');
      currentURL = currentURL[1].substr(0, currentURL[1].indexOf('/'));
      return (currentURL.indexOf(url) > -1);
    }

    var setLandscapeMessage = function(url, bgColor){
      var elem = document.createElement('div');
            elem.id = 'is-landscape';

      elem.style.display = "none";
      elem.style.position = "fixed";

      elem.style.top = 0;
      elem.style.right = 0;
      elem.style.bottom = 0;
      elem.style.left = 0;
      elem.style.zIndex = 9999;

      (typeof bgColor === "undefined") ? elem.style.backgroundColor = "#000" : elem.style.backgroundColor = bgColor ; 
      elem.style.backgroundImage = 'url('+url+')';
      elem.style.backgroundPosition = 'center';
      elem.style.backgroundRepeat = "no-repeat";
      elem.style.backgroundSize = '400px auto';
      
      document.body.appendChild(elem);

      // Event Listening
      window.addEventListener('orientationchange', function(ev){
        if(window.orientation === 0){
          elem.style.display = "none";
        } else {
          elem.style.display = "block";
        }
      });
      
    };

    var loading = function(state, indicator){
      var elem = document.createElement('div');
            elem.id = 'indicator';

      elem.style.position = "fixed";

      elem.style.top = 0;
      elem.style.right = 0;
      elem.style.bottom = 0;
      elem.style.left = 0;
      elem.style.zIndex = 9999;

      (typeof indicator === "undefined")  
      ? elem.style.backgroundImage = "url(./images/indicator-black.gif)" 
      : elem.style.backgroundImage = 'url('+indicator+')';

      elem.style.backgroundPosition = 'center';
      elem.style.backgroundRepeat = "no-repeat";

      if( state === 'show')
        document.body.appendChild(elem);
      else if ( state === 'hide' )
        document.body.removeChild(document.getElementById(elem.id));

    };

    return {
      getWindowWidth: getWindowWidth,
      getWindowHeight: getWindowHeight,
      disabledDefaultMouseEvents: disabledDefaultMouseEvents,
      isDomain: isDomain,
      setLandscapeMessage:setLandscapeMessage,
      loading: loading
    };
  })(mui, $);
} catch (e) {
  console.log(e);
} finally {

}

if (!window.requestAnimationFrame) {
  /**
   * Vendor Prefix 없이 reuqestAnimationFrame 사용
   * @global
   */
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 17 /*~ 1000/60*/ );
    });
}

if (!window.cancelAnimationFrame) {
  /**
   * Vendor Prefix 없이 cancelAnimationFrame 사용
   * @global
   */
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}
