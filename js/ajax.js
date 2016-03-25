try{
  /**
   * mui.ajax Components
   * @namespace mui.ajax
   * @inner
   * @example
   * // Installation
   * <script src="js/ajax.js"></script>
   */
  mui.ajax = (function(mui, $, undefined){
    "use strict";

    $.ajaxSetup({ cache: false });

    var config = {
      url : '',
      type : '',
      param : {}
    };

    /**
     * @function mui.ajax.call
     * @param  {String} type      HTTP Connection 종류(POST/GET/OPTIONS/PUT/DELETE)
     * @param  {String} url         서버프로그램 URL
     * @param  {Object} param  AJAX Options
     * @param  {Function} success Success Callback Function
     * @param  {Function} failed Fail Callback Function
     */
    var call = function (type ,url, param, callback, errCallback){

      this.type = type;
      this.param = param;
      this.url = url;

      $.ajax({
        type: this.type,
        url: this.url,
        data: this.param,
        error: errCallback,
        success: callback
      });
    };

    return {
      call:call
    };

  })(mui, jQuery); 
}catch(e){
  console.log(e);
}finally{
  
}