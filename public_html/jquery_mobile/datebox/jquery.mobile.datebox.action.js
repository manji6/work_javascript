// jQuery mobile calbox default setting
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	'dateFormat': 'YYYY/mm/dd',
	'headerFormat': 'YYYY年 mm月 dd日'
});

jQuery.extend(jQuery.mobile.selectmenu.prototype.options, {
	'nativeMenu': false
});


/**
 * Event
 * Page: #Page_DatePicker
 */
$("#Page_DatePicker").live('pageinit',function(event){

	// [Event]
	// 出発日のカレンダーを選ぶと泊数のselectboxにfocusを当てる
	$('#mydate').bind('datebox', function (e, passed) {
		if ( passed.method === 'set' ) {
			e.stopImmediatePropagation();
			//DO SOMETHING//
			$("#stay").selectmenu('open');
		}
	});

	// Event:
	//
	$('#stay').bind('change',function(e,passed){
		console.log(passed);
	});
});
