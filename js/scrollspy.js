/**
 * ScrollSpy 기능 및 호출하는 Element 에 대한 Class Toggling!
 * @class
 * @param {$DOM} Target Selector
 * @param {json} Options
 * @param {json:} onClassName Toggle Class Name
 * @param {json:} extraHeight 여분의 높이 (기본 0)
 * @param {json:} isSticky Target 이 고정되는 영역인지 (기본 True)
 * @param {json:} scrollEndCallback ScrollSpy Callback Function
 * @param {json:onClassName} Toggle Class Name
 * @example
 * // usage (with jQuery)
 * <nav class="nav nav-gnb">
      <a href="#section1" data-toggle="scrollspy">
        <i class="uri-common gnb-elem1">section1</i>
      </a>
      <a href="#section2" data-toggle="scrollspy">
        <i class="uri-common gnb-elem2">section2</i>
      </a>
      <a href="#section3" data-toggle="scrollspy">
        <i class="uri-common gnb-elem3">section3</i>
      </a>
    </nav>
 * <script>
 *   var scrollSpy = new ScrollSpy($('.nav-gnb'), {
        isSticky: true,
        extraHeight: $(window).innerHeight() * 0.05,
        onClassName: 'is-active',
        scrollEndCallback: function(){
        }
      });
	  OR
      var scrollSpy = new ScrollSpy($('.nav-gnb'),{});

      // 초기화
      scrollSpy.init();

      // 스크롤 이벤트에 대응
      $(window).scroll(function(){
        scrollSpy.onScroll();
      });
 * </script>
 * // Installation
 * <script src="js/mui.util.js"></script>
 * <script src="js/scrollspy.js"></script>
 * @auchor: 정명학
 * @version 0.1
 * @copyright 2016 Jeong Myoung Hak
 * @license http://opensource.org/licenses/MIT MIT
 */

function ScrollSpy($target, opt) {
  this.$target = $target;
  this.$elem = this.$target.find('[data-toggle="scrollspy"]');
  this.$pages = $.makeArray(this.$elem.map(function() {
    return $($(this).attr('href'));
  }));

  this.offsetY = 0;
  this.index = 0;

  this.isScrolling = false;

  this.opt = {
    onClassName: ((typeof opt.onClassName === 'undefined')? 'is-active': opt.onClassName),
    extraHeight: ((typeof opt.extraHeight === 'undefined') ? 0 : opt.extraHeight),
    isSticky: ((typeof opt.isSticky === 'undefined') ? 0 : opt.isSticky),
    scrollEndCallback: opt.scrollEndCallback
  };

};

ScrollSpy.prototype.init = function() {
  var _self = this;

  _self.onScroll();

  // AddEventListener
  _self.$target.on('click', '[data-toggle="scrollspy"]', function(e) {
    e.preventDefault();
    _self.goToScroll($(this).attr('href'));
  });
};

ScrollSpy.prototype.onScroll = function() {
  if (typeof this.opt.onClassName === "undefined")
    return;

  this.index = this.getCurrentPages();

  this.offsetY = $(window).scrollTop();
  if (this.opt.isSticky)
    this.offsetY += Math.round(this.opt.extraHeight);

  this.$elem.removeClass(this.opt.onClassName);
  if (this.index > -1)
    this.$elem.eq(this.index).addClass('is-active');
};

ScrollSpy.prototype.goToScroll = function(target) {
  var _self = this;

  if (_self.isScrolling)
    return true;

  _self.isScrolling = true;

  mui.util.disableScrolling();
  $('html, body')
    .animate({ scrollTop: Math.round($(target).offset().top - this.opt.extraHeight) + "px" }, 700)
    .promise()
    .then(function() {
      _self.isScrolling = false;
      _self.onScroll();

      mui.util.enableScrolling();

      // Execute Callback Functions
      if (typeof _self.opt.scrollEndCallback === "function") {
        _self.opt.scrollEndCallback();
      }
    });
};


ScrollSpy.prototype.getCurrentPages = function() {
  var idx = -1;

  for (var i = 0; i < this.$pages.length; i++) {
    var selfOffsetTop = this.$pages[i].offset().top;
    var selfHeight = this.$pages[i].innerHeight();

    if (mui.util.getBetween(this.offsetY, selfOffsetTop, selfOffsetTop + selfHeight))
      idx = i;
  }
  return idx;
};