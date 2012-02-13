/*
 * jQuery.floating.js
 *
 * @author manji6 <ryosuke.sawada@gmail.com>
 *
 */


/**
 * floatingWindow を表示
 *
 * target element: イベント発生対象要素
 * @param {Object} opt optionObject
 */
jQuery.fn.floatingWindow = function(opt){

	// パラメーターの引継ぎ
	var option = jQuery.extend(true,{},{
		'overlayId': 'floatongWindow-overlay',
		'overlayCss': {
			'opacity':    0.5,
		'position':  'fixed',
		'left':      '0px',
		'top':       '0px'
		},
		'containerId': 'floatingWindow-container',
		'containerCss': {
		'width':     '300px',
		'position':  'fixed',
		'top':       '150px',
		'border':    '1px solid #cfcfcf',
		'background':'#fafafa'
		},
		'contentsElement': '#floatingWindow-contents',
		'z-index': 1000,
		'show': function(){},
		'escClose': true,
		'overlayClose': true,
		'displayMode': 'absolute',
		'closeClass': 'floatingWindow-close'
	},opt);

	var dom_body = document.getElementsByTagName("body").item(0);
	var dom_element = this;

	//TODO floatingWindowを表示させる
	jQuery(this).click(function(ev){

		ev.preventDefault();

		// create overlay layer
		option.overlayCss.height = window.innerHeight + 'px';
		option.overlayCss.width  = window.innerWidth + 'px';
		option.overlayCss['z-index'] = option['z-index'] + 1;

		var dom_overlay = document.createElement('div');
		dom_overlay.id = option.overlayId;
		jQuery(dom_overlay).css(option.overlayCss);

		dom_body.appendChild(dom_overlay);

		// create floatingWindow
		var target_offset = jQuery(dom_element).offset();

		// ^^ switch "displayMode"
		if(option.displayMode === 'absolute'){
			option.containerCss.position = 'absolute';
			option.containerCss.left = (window.innerWidth - option.containerCss.width.substr(0,option.containerCss.width.length-2)) / 2;
		}else if(option.displayMode === 'fixed'){

			option.containerCss.position = 'fixed';
			option.containerCss.left = (window.innerWidth - option.containerCss.width.substr(0,option.containerCss.width.length-2)) / 2;

		}else if(option.displayMode === 'related left'){

			option.containerCss.position = 'absolute';
			option.containerCss.left = target_offset.left;
			option.containerCss.top = target_offset.top + jQuery(dom_element).height();

		}else if(option.displayMode === 'related right'){

			option.containerCss.position = 'absolute';
			option.containerCss.top = target_offset.top + jQuery(dom_element).height();

			// left = (target_offset.left + jQuery(dom_element).width()) - option.width
			option.containerCss.left = (target_offset.left + jQuery(dom_element).width()) - option.containerCss.width.substr(0,option.containerCss.width.length-2);

		}

		option.containerCss['z-index'] = option['z-index'] + 10;
		var dom_container = document.createElement('div');
		dom_container.id = option.containerId;
		jQuery(dom_container).css(option.containerCss).html(jQuery(option.contentsElement).clone().show());
		dom_body.appendChild(dom_container);


		// if conainer position is out of window, fixed.
		if(option.containerCss.left < 0){
			jQuery('#'+option.containerId).animate({'left':target_offset.left},'fast','swing');
		}


		// ----- Event Setting ----
		jQuery('.'+option.closeClass).bind('click',function(ev){
			ev.preventDefault();

			jQuery('#'+option.containerId).remove();
			jQuery('#'+option.overlayId).remove();

		});

		if(option.overlayClose === true){
			jQuery('#'+option.overlayId).bind('click',function(ev){
				ev.preventDefault();

				//TODO 消す処理はどっかに統一
				jQuery('#'+option.containerId).remove();
				jQuery('#'+option.overlayId).remove();



			});
		}

		if(option.escClose === true){
			jQuery(document).keydown(function(e) {
				// ESCAPE key pressed
				if (e.keyCode == 27) {
					jQuery('#'+option.containerId).remove();
					jQuery('#'+option.overlayId).remove();
				}
			});
		}

	});

};
