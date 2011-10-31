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

	var interval =interval || 200;
	var container = this;

	return container.each(function(){
		var elem = this;
		var param = {
			flg_mousemove: false,
			x1:-1,y1:-1,x2:-1,y2:-1,
			e:null
		};

		var timer = function(){
			// マウスの動きがなかった場合
			if (param.x1 === param.x2 && param.y1 === param.y2 && param.flg_mousemove === true) {
				// mousemoveフラグを下げる
				param.flg_mousemove=false;
				// mousestop()のcallback関数を実行
				fn.call(elem, param.e);
			}
			// 判定対象値を書き換えて指定秒数後に再度チェックする
			param.x2 = param.x1;
			param.y2 = param.y1;
			if(param.flg_mousemove !== false){
				setTimeout(timer, interval);
			}
		};

		// マウスが押下していないとイベント発動なし
		$(elem).mousedown(function(ev){

			// マウスが押下しているときにmousemoveを発動
			$("html").mousemove(function(event){
				
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
			$("html").mouseup(function(ev){
				param.flg_mousemove=false;
				// 既にマウスの位置が止まっている場合はtimer()の関数が実行されているのでcallbackは実行しない
				if(param.x2 !== param.x1 && param.y2 !== param.y1){
				// mousestop()のcallback関数を実行
					fn.call(elem, ev);
				}

				// イベントのunbind
				$("html").unbind("mousemove");
				$("html").unbind("mouseup");
				return this;
			});
		});
	});
};
