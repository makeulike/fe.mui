/**
 * 시퀀스 이미지에 대한 하나의 인스턴스를 생성한다.
 * @class
 * @param {Int} width 한 컷의 이미지 넓이
 * @param {Int} height  한 컷의 이미지 높이
 * @param {Int} scene 컷 갯수
 * @param {Int} speed ms 단위의 컷 당 변화 시간
 * @param {DOM} selector  background-image 로 지정되어 있는 DOM
 * @param {Boolean} isReplay 반복재생 여부
 * @example
 * // Installation
 * <script src="js/sequence.js"></script>
 * @auchor: 정명학
 * @version 0.1
 * @copyright 2016 Jeong Myoung Hak
 * @license http://opensource.org/licenses/MIT MIT
 */
function Sequence(width, height, scene, speed, selector, isReplay) {
  this.width = width;
  this.height = height;

  this.scene = scene;
  this.speed = speed;

  this.selector = selector;

  this.count = 0;
  this.object = '';

  this.isReplay = isReplay;
};

/**
 * 이미지 정면 전환에 대한 처리 함수
 * @function
 * @memberOf Sequence
 * @private
 */
Sequence.prototype.procedure = function() {
  var position = -1 * (this.count * this.width);

  this.selector.style.backgroundPosition = position + 'px 0px';
  this.count++;

  if (this.count === this.scene) {
    position = -1 * (this.count * this.width);
    this.count = 0;
  }
};

/**
 * 생성된 인스턴스에 대해 순차적으로 이미지 장면 전환을 실행한다. 
 * @function 
 * @param  {String} type 한번 재생 시 "once" / 없을 시 빈값
 * @param  {Function}  callback 한번만 재생 시 재생 종료 후 실행 될 callback
 * @public
 */
Sequence.prototype.play = function(type, callback) {
  // @설명: setInterval 에도 this를 주기 위하여 현재의 this 를 저장
  var _this = this;

  this.object = setInterval(function() {
    // @설명: 한번만 재생
    if (type === "once" && _this.count === _this.scene - 1) {
      _this.stop('pause');

      // @설명: 콜백함수 실행
      if (typeof callback === "function") {
        callback();
        return true;
      }
    }
    _this.procedure();
  }, this.speed);
};

/**
 * 생성된 인스턴스에 실행되고 있는 장면 전환에 대하여 중지한다.
 * @function 
 * @param  {String} type 한번 재생 시 "once" / 없을 시 빈값
 * @param  {Function}  callback 한번만 재생 시 재생 종료 후 실행 될 callback
 * @public
 */
Sequence.prototype.stop = function(type, callback) {
  clearInterval(this.object);

  // @설명: 일시 중지인 경우 clearInterval 만 진행
  if (type === "pause")
    return true;

  this.count = 0;
  this.procedure();

  if (typeof callback === "function") {
    callback();
    return true;
  }
};
