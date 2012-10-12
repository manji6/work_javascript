$(function(){
	// IE6と7はposition: fixed使えないので消す
	if($.browser.msie && $.browser.version < 8){
		$("#Area_BottomFixed").hide();
	}

	$("#Area_BottomFixed .Act_ChangeBottomFixed").click(function(){
		if($("#Area_BottomFixed div.Area_BottomFixedContents").eq(0).css('display') === 'none'){
			// 全てのdiv要素を消す
			$("#Area_BottomFixed div.Area_BottomFixedContents").slideDown();
			// 矢印の画像を差し替える
			$("#Area_BottomFixed div.Act_ChengeBottomFixed img").attr('src','./images/arrow01.png');

		}else{
			// 全てのdiv要素を消す
			$("#Area_BottomFixed div.Area_BottomFixedContents").slideUp();
			// 矢印の画像を差し替える
			$("#Area_BottomFixed div.Act_ChangeBottomFixed img").attr('src','./images/arrow02.png');
		}
	});
});