// jQuery mobile calbox default setting
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	'dateFormat': 'YYYY年 mm月 dd日',
	'headerFormat': 'YYYY年 mm月 dd日'
});

$(function(){

	$('#mydate').bind('datebox', function (e, passed) {
		if ( passed.method === 'set' ) {
			e.stopImmediatePropagation();
			//DO SOMETHING//
			console.log("setしますた");
		}
	});
});
