/**
 * jQuery.event.mousestop.js
 *
 * オリジナルイベント
 * 「マウスが止まったとき」にイベントを実行する
 *
 * @author   manji6 <ryosuke.sawada@gmail.com>
 * @requires jQuery
 * @license  MIT Licence
 **/

/**
 * カスタムイベント
 * 対象要素にマウスクリックして、ドラッグ中にマウスが止まったか判断するイベントメソッド
 * $(element).mousedragstop(callback)
 *
 * @element 対象element(TODO これは後でmousedown()に使うかな・・・？)
 * @param   {Function} 止まっていたときに実行するfunciton
 * @return  {jQuery}   対象element
 *
**/
jQuery.fn.mousedragstop = function(fn,interval) {

	var interval =interval || 300;
	var container = this;

	return container.each(function(){
		var elem = this;
		var param = {
			flg_mousemove: false,
			x1:-1,y1:-1,x2:-1,y2:-1,
			e:null
		};

		/**
		 * マウスが動き始めたら定期チェックする関数
		 */
		var timer=function(){
			// マウスの動きがなかった場合
			if (param.x1 === param.x2 && param.y1 === param.y2) {
				// mousemoveフラグを下げる
				param.flg_mousemove=false;
				// mousestop()のcallback関数を実行
				fn.call(elem, param.e);
				// mousemove()をunbind(2度と発動しないように)
				$(elem).unbind("mousemove");
				return;
			}
			// 判定対象値を書き換えて指定秒数後に再度チェックする
			param.x2 = param.x1;
			param.y2 = param.y1;
			setTimeout(timer, interval);
		};

		// マウスが押下していないとイベント発動なし
		$(elem).mousedown(function(ev){

			// マウスが押下しているときにmousemoveを発動
			$(elem).mousemove(function(event){
				//mousemove発生時のイベント内容をparamに格納
				param.e = event;
				param.x1=param.e.pageX - elem.offsetLeft;
				param.y1=param.e.pageY - elem.offsetTop;
				// mousemoveフラグが上がってなかったらフラグをあげて
				// マウスの動作確認functionを実行する
				if(!param.flg_mousemove) {
					param.flg_mousemove = true;
					timer();
				}
			});
		});
	});
};
