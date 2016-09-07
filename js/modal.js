try {
  /**
   * mui.modal Components <br/><br/>
   * `private` 키워드가 들어 가 있으면 실행 불가 <br/>
   * `static` 키워드가 들어 가 있으면 실행 가능
   * @namespace  mui.modal
   * @inner
   * @example
   * // Installation
   * <script src="js/modal.js"></script>
   */
  mui.modal = (function(mui, $, undefined) {
    "use strict";

    var
      $modal = $('[data-role="modal"]'),
      $modalBackdrop = $('<div class="modal-backdrop"></div>'),
      $el,
      $a11yFocused;

    var
      tmpPos = 0,
      openMotion = '';

    /**
     * @function mui.modal.getVerticalMiddleValue
     * @return {Float} 모달 영역이 브라우저 창 높이 기준으로 중앙에 위치하기 위한 값
     * @private
     */
    var getVerticalMiddleValue = function() {
      return (mui.common.getWindowHeight() > $('.modal-content', $el).innerHeight() + getCloseButtonHeight() * 2) ?
        -($('.modal-content', $el).innerHeight() / 2) :
        ((mui.common.getWindowHeight() / 2 - getCloseButtonHeight()) - ($(window).innerHeight() * 0.02)) * -1;
    };

    /**
     * @function mui.modal.getHorizontalMiddleValue
     * @return {Float} 모달 영역이 브라우저 창 넓이 기준으로 중앙에 위치하기 위한 값
     * @private
     */
    var getHorizontalMiddleValue = function() {
      return -($('.modal-content', $el).outerWidth() / 2);
    };

    /**
     * @function mui.modal.getCloseButtonHeight
     * @return {Float} getVerticalMiddleValue 에서 모달 닫기버튼이 모달영역 밖에 위치 할 경우, 그 높이 값
     * @private
     */
    var getCloseButtonHeight = function() {
      var $closeButton = $('.modal__close', $el);

      /**
       * .modal__close 가 아닌, SMACSS Style 형식인 경우.
       */
      if ($closeButton.length < 1)
        $closeButton = $('.modal-btn-close', $el);

      var height = parseInt($closeButton.css('top'));

      if (height < 0)
        return height * -1;
      return 0;
    };

    /**
     * 모달 영역이 브라우저 보다 높이값이 크면 모달 영역이 하단에 붙여서 엉성하게 나오는 것에 대한 처리를 하기 위함
     * @function mui.modal.isSmallWindow
     * @return {Boolean} 모달 영역의 높이값이 브라우저 창보다 큰지 안큰지
     * @private
     */
    var isSmallWindow = function() {
      return (mui.common.getWindowHeight() < $('.modal-content', $el).innerHeight() + getCloseButtonHeight());
    };

    var isOpenedModal = function(action){
      var $target = false;
      if( action === "open" ){
        $modal.each(function(){
          if( $(this).css('display') === "block" ){
            $target = $(this);
            return false;
          }        
        });
      } else if ( action === "close" ){
        $modal.each(function(){
          if( $(this).hasClass('is-opened') ){
            $target = $(this);
            return false;
          }        
        });
      }

      return $target;
    };

    /**
     * 모달창 오픈
     * @function mui.modal.open
     * @param  {String} id DOM ID
     */
    var openModal = function(id) {
      $el = $('#' + id);
      // 키보드 접근성
      $a11yFocused = $(document.activeElement);
      
      /**
       * 160526
       * 엔터키 입력 시 계속 실행되는 것을 방지하게 위하여 blur 처리
       */
      $('a, area, input, button').trigger("blur");

      if( isOpenedModal('open') ){
        var $_self = isOpenedModal('open');
              $_self.addClass('is-opened');
      } else if( !isOpenedModal('open') ) {
        tmpPos = $(window).scrollTop();
        $('#viewport').css('top', tmpPos * -1);
      }

      /*
       ** @desc: 팝업 오픈 시 현재 Y값을 저장, fixed position이 된 viewport에다가 fake로 페이지가 내려 온 것처럼 보이게 함 (페이스북 스타일)
       */
      $("input,select,radio,checkbox").blur();

      if (mui.modal.openMotion === '')
        mui.modal.openMotion = 'modal-scale';

      if ($modal.length && $el.length) {
        $el.css({
          'visible': 'hidden',
          'display': 'block'
        });

        if ($el.attr('data-view') == 'full') {
          //$('body').css('overflow','hidden');
          $('.modal-content', $el).css({
            'margin-top': 0,
            'margin-left': 0
          });
        } else {
          $('.modal-content', $el).delay(100).css({
            'margin-top': getVerticalMiddleValue(),
            'margin-left': getHorizontalMiddleValue()
          }).addClass(mui.modal.openMotion);

          /*
           ** @desc: 레이어팝업의 높이가 브라우저 창 보다 클 경우 어색해 보이지 않기 위하여 하단 여백을 상단과 동일하게 줌
           */
          if (isSmallWindow()) {
            setTimeout(function() {
              $('.modal-content', $el).css({
                'margin-bottom': $('.modal-content', $el).offset().top
              });
            }, 100);
          }
        }

        // .focus(); 제외 (아이프레임 및 IE에서 작동이 이상함)
        $el.attr('tabindex', 0);

        $modalBackdrop.height($(document).innerHeight()).show();
        $('body').append($modalBackdrop).addClass('modal-open');

        $el.removeAttr('style').fadeIn('fast');
        $el.find('.modal-content').addClass('is-opened');

        $(window).scrollTop(0);
      }
    };

    /**
     * 모달창 닫기
     * @function mui.modal.close
     * @param  {String} id DOM ID
     */
    var closeModal = function(id, destroy) {
      var $el = $('#' + id);
      $el.find('.modal-content').removeClass('is-opened');
      $el.fadeOut('fast');

      // 모달창이 열려 있으면 해당되는 레이어팝업만 닫게 하기 (160525)
      if( isOpenedModal('close') !== false ){
        var $_self = isOpenedModal('close');
              $_self.removeClass('is-opened');

        return true;
      }

      $('.modal-content').removeClass(mui.modal.openMotion);

      $('body .modal-backdrop').fadeOut(0, function() {
        $('body').removeClass('modal-open');

        $('#viewport').removeAttr('style');
        $(window).scrollTop(tmpPos);
      });

      // $a11yFocused 가 AREA 이면 포커스가 이상한 곳에 갈 수 있음으로 강제 리턴 시킴 (160712 추가)
      if( $a11yFocused[0].tagName === "AREA" )
        return ;
      else 
        $a11yFocused.focus();
    };

    /*
     ** @event: 모달 오픈
     ** @anchor: 정명학
     */
    $('[data-toggle="modal"]').on('click', function(e) {
      var target = $(this).attr('href').replace("#", '');
      e.preventDefault();

      openModal(target);
    });

    /**
     * 모달 레이어 팝업 닫기
     *
     * @event [a] 모달창 닫기
     * @memberOf mui.modal
     * @property {String} href Target ID
     * @example
     * <a href="#" data-rel="back">닫기</a>
     */
    $('[data-rel="back"]').on('click', function(e) {
      e.stopPropagation();

      var target = $(this).closest($modal).attr('id');
      var refTarget = $(this).attr('data-target');

      // 이벤트 버블현상 제거 [160524]
      e.preventDefault();

      if (typeof refTarget !== "undefined") {
        if (refTarget === "false") {
          closeModal(target);

          return true;
        }

        $(this).closest('[data-role="modal"]').hide();
        $(this).removeAttr('data-target');

        openModal(refTarget);

        return true;
      }

      closeModal(target);
    });

    /**
     * @event: 레이어팝업 영역 이 외 클릭 시 액션
     */
    $modal.on('click', function(e) {
      /**
       * 레이어 팝업에서 창 닫을 시 각각의 레이어 팝업 성향에 따라 액션이 다르기 때문에 trigger 로 대체
       */
      $(this).find('[data-rel="back"]').trigger('click');
    });

    /**
     * @event 레이어팝업 내부 클릭 시 이벤트 버블현상 제거
     */
    $('.modal-content').on('click', function(e) {
      e.stopPropagation();
    });

    /**
     * @event [window] 브라우저 크기 변경
     * @memberOf mui.modal
     * @description 1. 현재 오픈 된 모달 영역이 창 크기가 조절 될 시에도 중앙 위치에 맞춰지게 설정 <br>
     * 2. 브라우저 높이가 문서 높이보다 작은경우 모달 암막높이를 브라우저 높이만큼 조절
     */
    $(window).resize(function() {

      var _windowWidth = mui.common.getWindowWidth(),
            _windowHeight = mui.common.getWindowHeight();

      /**
       * 현재 모달이 지정되어 있으면서 해당 모달이 block 형태라면 리사이징 진행
       */
      if (typeof $el !== "undefined" && $el.css('display') === "block") {
        if ($el.attr('data-view') === "full")
          return true;

        $('.modal-content', $el).delay(100).css({
          'margin-top': getVerticalMiddleValue(),
          'margin-left': getHorizontalMiddleValue(),
          'margin-bottom': $('.modal-content', $el).offset().top
        });

        $(window).delay(200).scrollTop(0);
      }

      $modalBackdrop.height(_windowHeight);
/*      
      if (_windowHeight > $(document).innerHeight())
        $modalBackdrop.height(_windowHeight);
*/
    });

    /**
     * @event [window] Key Events
     * @date: 160718
     */
    $modal.on('keydown', function(e){

      // ESC 키 누를 시 레이어 팝업 닫기
      if( e.keyCode === 27 ){
        $modal.each(function(){
          if($(this).css('display') === 'block'){
            closeModal($(this).attr('id').replace('#', ''));
          }
        });
      }
    });

    return {
      open: openModal,
      close: closeModal,
      openMotion: openMotion
    };

  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {

}