/**
 * Request Querystring Parser
 * @class
 * @auchor: 정명학
 * @version 0.1
 * @copyright 2016 Jeong Myoung Hak
 * @license http://opensource.org/licenses/MIT MIT
 * @example
 * // Installation
 * <script src="js/request.js"></script>
 */
var Request=function(){
  /**
   * Querystring 파싱 
   * @function
   * @param  {String} name Field 이름
   * @return {String}  Field 에 대한 값
   */
  this.getParameter=function(name){
    var rtnval = '';
    var nowAddress=unescape(location.href);
    var parameters=(nowAddress.slice(nowAddress.indexOf('?')+1, nowAddress.length)).split('&');

    for(var i = 0; i<parameters.length; i++){
      var varName=parameters[i].split('=')[0];
      if(varName.toUpperCase() == name.toUpperCase()){
        rtnval=parameters[i].split('=')[1];
        break;
      }
    }
    return rtnval;
  }
};