/** @namespace  Events/form */
try {
  (function(mui, $, undefined) {
    "use strict";
    /**
     * /////////////////////////////// Disabled ////////////////////////////////
     * @memberOf Events/form
     * @event label click
     * @description 
     * - 해당 label 태그에 checked 클래스를 Toggle <br/>
     * - 체크박스 인 경우 for 가 향하는 체크박스에 checked 속성을 True <br/>
     * - 라디오 버튼 인 경우 for 가 향하는 라디오 버튼에 checked 속성을 True
     * 
     * @example 
     * // 체크박스
     * <label for='checkbox'>
     *   <i></i>
     * </label>
     * <input type="checkbox" id="checkbox" class="is-custom"/>
     * 
     * @example 
     * // 라디오 버튼
     * <label for='radio'>
     *   <i></i>
     * </label>
     * <input type="radio" id="radio" name="radio" class="is-custom"/>
     
    $('label').on('click', function(e) {
      if ($(this).attr("for") !== "") {
        var
          target = $('#' + $(this).attr("for"));

        e.preventDefault();

        if (target.attr('type') === "checkbox" && target.hasClass('is-custom')) {
          var
            isChecked = target.is(':checked'),
            isDisabled = target.attr('disabled');

          if (isChecked === false)
            target.prop('checked', true);
          else
            target.prop('checked', false);

          $(this).toggleClass('checked');

        } else if (target.attr('type') === "radio" && target.hasClass('is-custom')) {
          var
            radioName = target.attr('name'),
            radioValue = target.val();

          $('[name="' + radioName + '"] ~ label').removeClass('checked');
          $('input:radio[name="' + radioName + '"][value="' + radioValue + '"]').prop('checked', true);

          $(this).toggleClass('checked');
        }
      }
    });
    */

    var getLabel = function($this, e) {
      var $self = $this;

      return ($self.closest('label').length > 0) ? $self.closest('label') : $self.parent().find('label[for="' + $self.attr('id') + '"]');
    };

    /**
     * @memberOf Events/form
     * @event input[data-input="tel"] keypress
     * @description 
     * - 키보드로 숫자만 입력
     * 
     * @example 
     * <input type="text" data-input="tel"/>
     */
    var $targetTel = $('input[data-input="tel"]');
    $targetTel.keypress(function(e) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $targetTel.keyup(function(e) {
      var telMaxlength = 11;
      var $this = $(this);

      $(this).val($(this).val().replace(/[^0-9]/gi, ""));

      if (!!telMaxlength) {
        var text = $this.val();

        if (text.length > telMaxlength) {
          $this.val(text.substring(0, telMaxlength));
          e.preventDefault();
        }
      }
    });

    var $targetNumber = $('input[data-input="number"]');
    $targetNumber.keypress(function(e) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $targetNumber.keyup(function(e) {
      var $this = $(this);
      $(this).val($(this).val().replace(/[^0-9]/gi, ""));
    });
    

    /*
     ** @desc: Input 클릭 시 Placeholder 내용이 사라짐
     */
    $('input, textarea').focusin(function() {
      var input = $(this);

      input.data('place-holder-text', input.attr('placeholder'));
      input.attr('placeholder', '');
    });

    /*
     ** @desc: Input 영역 외 클릭 시 Placeholder 내용이 노출 (내용이 비어있는 경우)
     */
    $('input, textarea').focusout(function() {
      var input = $(this);
      input.attr('placeholder', input.data('place-holder-text'));
    });

    /*
     ** @desc: Input 영역에서 엔터키 입력 시 submit 이벤트 막기
     ** @date: 2016.06.13
     */
    $("input, textarea").keypress(function(event) {
      if (event.which == 13) {
        //$(this).closest("form").submit(); // Submit 실행
        event.preventDefault();
      }
    });


    /**
     * Custom Checkbox & Radio Buttons Refactoring
     * @date: 160614
     */
    // checkboxes & radio common focus event binding
    // 포커스, 혹은 해당 레이블 클릭 시 is-focused 를 추가하여 요소에 대한 시각적인 구분 제공
    $('input[type="checkbox"],input[type="radio"]').on('focus', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);

      $_selfLabel.addClass('is-focused');
    });

    // checkboxes & radio common blur event binding
    // 포커스 해지 시 is-focused 클래스를 제거
    $('input[type="checkbox"],input[type="radio"]').on('blur', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);

      if ($_selfLabel.hasClass('is-focused'))
        $_selfLabel.removeClass('is-focused');
    });

    $('input[type="checkbox"]').on('change', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);
      var isChecked = $_self.is(':checked');

      if (isChecked) {
        $_selfLabel.addClass('is-checked');
      } else {
        $_selfLabel.removeClass('is-checked');
      }
    });

    $('input[type="radio"]').on('change', function(e) {
      var $_self = $(this);
      if (!$_self.hasClass('is-custom')) // didn't use customize checkboxes
        return true;

      var $_selfLabel = getLabel($(this), e);
      var radioName = $(this).attr('name');

      $('input[name="' + radioName + '"]').each(function() {
        var $label = getLabel($(this));
        $label.removeClass('is-checked checked'); //  예전 버전 호환 (checked 클래스 사용)
      });

      $_selfLabel.addClass('is-checked');
    });

    /**
     * maxlength 지원 (IE8 ~)
     */
    $(document).on('input keyup', 'input[maxlength], textarea[maxlength]', function(e) {
      // maxlength attribute does not in IE prior to IE10
      // http://stackoverflow.com/q/4717168/740639
      var $this = $(this);
      var maxlength = $this.attr('maxlength');
      if (!!maxlength) {
        var text = $this.val();

        if (text.length > maxlength) {
          // truncate excess text (in the case of a paste)
          $this.val(text.substring(0, maxlength));
          e.preventDefault();
        }

        return text.length;
      }
    });



  })(mui, $, undefined);
} catch (e) {
  console.log(e);
} finally {

}
