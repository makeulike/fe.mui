/*
** @Domain: wheelPages
** @Require: jQuery, mouseWheel Library
*/
try{
	!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
	mui.wheelPages = (function(mui, $, undefined){
		"use strict";
		var 	$window = $(window),
			$document = $(document),
			$viewport = $('#viewport'),
			$pages = $('.js--wheel-pages');
		var 	$_curPage = $pages.first();

		var 	
		_doAnimate = true,
		_pageIdx = 0,
		_keycodes = {
			UP : 38,
			DOWN : 40
		};


		var _roundXL = function(n, digits) {
		    if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림

		    digits = Math.pow(10, digits); // 정수부 반올림
		    var t = Math.round(n * digits) / digits;

		    return parseFloat(t.toFixed(0));
		}
		var _getZoom = function($dom){
			var _zoom = parseFloat($dom.css('zoom')) || 1;
			if(_zoom > 1)
				_zoom = _zoom / 100;

			return _roundXL(_zoom, 2);
		}
		var _onResize = function(){
			$('html, body').scrollTop($pages.innerHeight() * _getZoom($viewport) * _pageIdx);
		}
		var _goToNextPage = function(){
			if(!_doAnimate && $_curPage.next().length){
				if(_pageIdx === parseInt($pages.length - 1) ) {
					_pageIdx = parseInt($pages.length - 1);
				} else { 
					_pageIdx++;
					goToPage($_curPage.next());
				}
			}
		}
		var _goToPrevPage = function(){
			if(!_doAnimate && $_curPage.prev().length){
				if (_pageIdx === 0) {
					_pageIdx = 0;
				} else {
					_pageIdx--;
					goToPage($_curPage.prev());			
				}
			}
		}
		var _onMouseWheel = function(event, delta){
			event.preventDefault();
			
			if(delta < 0){
				_goToNextPage();
			} else if (delta > 0){
				_goToPrevPage();
			}
		}

		var goToPage = function($page){
			if(!_doAnimate && $pages.length){

				_doAnimate	= true;
				$_curPage = $page;

				$('html, body').animate({
					scrollTop: ($pages.innerHeight() * _getZoom($viewport) * _pageIdx) + "px"
				}, 700, function(){
					//onPageAnimatedEnd();
					setTimeout(function(){_doAnimate = false;}, 300)
				});

				$('[data-page-idx]').removeClass('on');
				$('[data-page-idx = '+_pageIdx+']').addClass('on');
			}

		}
		var unsetAnimate = function(){
			_doAnimate = true;
		}
		var setAnimate = function(){
			_doAnimate = false;
		}
		var setPageIdx = function(idx){
			_pageIdx = idx;
		}
		var getPageIdx = function(){
			return _pageIdx;
		}
		var getState = function(){
			return _doAnimate;
		}
		var setLimitHeight = function(height, tureCallback, falseCallback){
			var _thisheight = height || null;

			if(_thisheight === "null")
				return false; 
			if($(window).innerHeight() < _thisheight){
				if(typeof tureCallback === "function")
					tureCallback();
				else 
					return ;
			} else {
				if(typeof falseCallback === "function")
					falseCallback();
				else 
					return ;
			}
		}

		$window.on("resize", _onResize).resize();
		$document.on("DOMMouseScroll mousewheel", _onMouseWheel);

		return {
			setIndex : setPageIdx,
			getIndex : getPageIdx,
			getState : getState,
			setAnimate : setAnimate,
			unsetAnimate : unsetAnimate,
			goToPage : goToPage,
			setLimitHeight : setLimitHeight
		}
	})(mui, jQuery); 

	$(document).ready(function(){
		$(window).scrollTop(0);
		mui.wheelPages.setAnimate();
	})
}catch(e){
  console.log(e);
}finally{

}