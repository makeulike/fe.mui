/*
** @Domain: embed
** @Require: jQuery
*/
try{
	mui.embed = {};
	mui.embed.flash = (function(mui, $, undefined){
		function insert($dom, swf, width, height, bgcolor, id, flashvars){
			var strFlashTag = new String();

			bgcolor = bgcolor || '#000';
			id = id || '';
			flashvars = flashvars || 'defaults';
			
			if (navigator.appName.indexOf("Microsoft") != -1) {
				strFlashTag += '<object width="'+width+'" height="'+height+'" id="'+id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0">';
				strFlashTag += '<param name="movie" value="' + swf + '"/>';
				strFlashTag += '<param name="quality" value="high"/>';
				strFlashTag += '<param name="wmode" value="transparent"/>';
				strFlashTag += '<param name="allowScriptAccess" value="always"/>';
				strFlashTag += '<param name="movie" value="' + swf + '"/>';
				strFlashTag += '</object>';
			} else {
				strFlashTag += '<embed src="' + swf + '" ';
				strFlashTag += 'quality="high" ';
				strFlashTag += 'id="' + id + '" ';
				strFlashTag += 'name="' + id + '" ';
				strFlashTag += 'width="' + width + '" ';
				strFlashTag += 'height="' + height + '" ';
				strFlashTag += 'wmode="transparent" ';
				strFlashTag += 'type="application/x-shockwave-flash" ';
				strFlashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
				strFlashTag += '</embed>';
			}
			$dom.html(strFlashTag);
		}	

		function select(objName) { 
			if (navigator.appName.indexOf('Microsoft') != -1) {
				return window[objName];
			} else {
				return document[objName];
			}
		}

		return {
			insert : insert,
			select : select
		}
	})(mui, jQuery);
}catch(e){
  console.log(e);
}finally{
  
}