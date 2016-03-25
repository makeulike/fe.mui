try {
  /**
   * mui.validate Components
   * @namespace mui.validate
   * @inner
   * @example
   * // Installation
   * <script src="js/validate.js"></script>
   */
  mui.validate = (function(mui, $, undefined) {
    "use strict";

    /**
     * 전화번호 검증
     * @function
     * @private
     * @return {Boolean}       검증 여부
     */
    var isTel = function(value) {
      var regExpPhone = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      if (regExpPhone.test(value)) {
        if (value.length > 9 && value.length < 12)
          return true;
      }
      return false;
    };

    /**
     * 폼 초기화
     * @function mui.validate.init
     * @param  {$DOM} $el 초기화 할 폼
     * @param  {Event} e   해당 폼의 이벤트 (선택사항)
     */
    var initForm = function($el, e) {
      $("form").each(function() {
        if (this.className === $el.attr('class'))
          this.reset();
        else if (this.id === $el.attr('id'))
          this.reset();
      });
      $el.find('input[type="radio"]').prop('checked', false);
      $el.find('input[type="checkbox"]').prop('checked', false);
      $el.find('label').removeClass('checked');
    };

    /**
     * 입력 폼 검증
     * @function mui.validate.input
     * @param  {$DOM} $el  검증 할 입력 폼
     * @param  {String} cond 몇몇 설정 된 조건 (tel : 전화번호)
     * @param  {Event} e    입력 폼의 이벤트
     * @return {Boolean}      검증 여부
     */
    var getInputState = function($el, cond, e) {
      if ($el.val().length === 0)
        return false;
      else if (cond === 'tel' && isTel($el.val()) !== true)
        return false;
      else
        return true;
    };

    /**
     * 체크박스 검증
     * @function mui.validate.checkbox
     * @param  {$DOM} $el 검증 할 체크박스
     * @param  {Event} e   체크박스 이벤트
     * @return {Boolean}     검증여부
     */
    var getCheckBoxState = function($el, e) {
      var isChecked = $el.is(":checked"); //.attr('checked');

      if (isChecked)
        return true;
      else
        return false;
    };

    /**
     * 라디오 검증
     * @function mui.validate.radio
     * @param  {String} name 라디오 [name] 값
     * @param  {Event} e    라디오 이벤트
     * @return {String}      선택 된 라디오의 값 (없으면 false)
     */
    var getRadioValue = function(name, e) {
      var value = $('input:radio[name="' + name + '"]:checked').val();

      if (typeof value == "undefined")
        return false;

      return value;
    };

    return {
      init: initForm,
      input: getInputState,
      checkbox: getCheckBoxState,
      radio: getRadioValue
    };

  })(mui, jQuery);
} catch (e) {
  console.log(e);
} finally {

}
