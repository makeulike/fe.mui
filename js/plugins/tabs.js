/*
 * Tab jQuery Library
 * $("DOM").tabs();
 */
(function($){
	"use strict";
	var $thisTabs;
	$.fn.tabs = function(){
		$thisTabs = $(this);

		$('.tab-content', $thisTabs).hide();

		$('.tab-nav li:first', $thisTabs).addClass('active').show();
		$('.tab-content:first', $thisTabs).addClass('active').show();

		$('.tab-nav li', $thisTabs).click(function(e){
			var $anchorWrap = $(this).parent().parent();
			var activeTab = $(this).find('a').attr('href');

			e.preventDefault();

			$('.tab-nav li', $anchorWrap).removeClass('active');
			$('.tab-content', $anchorWrap).hide().removeClass('active');

			$(this).addClass('active');
			$(activeTab).show().addClass('active');
			
			return false;
		});
	}
})(jQuery);