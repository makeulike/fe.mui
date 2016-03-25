  /**
   * MouseWheel
   * @namespace Events/mousewheel
   * @class 
   * @param {String} selector          document.getElement*
   * @param {Function} directionUpFunc   휠을 위로 했을 때 콜백함수
   * @param {Function} directionDownFunc 휠을 아래로 했을 때 콜백함수
   * @example
   * // Installation
   * <script src="js/events/mousewheel.js"></script>
   * 
   * // Usage
   * <script>
   *   var target = document.getElementById('target');
   *   var foo = new MouseWheel(target, function(){
   *     // do stuff
   *   }, function(){
   *     // do stuff 
   *   })
   * </script>
   */
  function MouseWheel(selector, directionUpFunc, directionDownFunc) {
    var self = this;


    // Mozilla 계열 브라우저에서 DOMMouseScroll 에 대한 이벤트 추가
    if (window.addEventListener){
      selector.addEventListener('DOMMouseScroll', function(ev) {
        self.eventCallback(ev, self);
      }, false);
    }

    selector.onmousewheel = function(ev) {
      self.eventCallback(ev, self);
    }
    this.isUpFunction = directionUpFunc;
    this.isDownFunction = directionDownFunc;
  };

  /**
   * 스크롤 이벤트 생성 후 콜백함수
   * @function Events/mousewheel.eventCallback
   * @private
   * @param  {Event} ev   Events
   * @param  {String} self 생성 당시의 This 값
   */
  MouseWheel.prototype.eventCallback = function(ev, self) {
    ev.preventDefault();
    ev.stopPropagation();

    var delta = 0;

    if( !ev ) { ev = window.event; }
    if( ev.wheelDelta ){  //  Internet Explorer & Opera
      delta = ev.wheelDelta / 60;
    } else if( ev.detail ){ // W3C Standards
      delta = -ev.detail / 2;
    }

    if(self.getDirection(delta) > 0){
      this.isUpFunction();
    }else{
      this.isDownFunction();
    }
  };

  /**
   * 스크롤 방향 반환
   * @function Events/mousewheel.getDirection
   * @private
   * @param  {Int} delta 스크롤 Delta 값
   * @return {Int}       1(위) or -1(아래)
   */
  MouseWheel.prototype.getDirection = function(delta){
    if(delta > 0){
      return 1;
    } else {
      return -1;
    }
  }
  
