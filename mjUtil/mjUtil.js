/**
 * mjUtil
 * javascript Utility Library
 *
 * @author manji6<ryosuke.sawada@gmail.com>
 * 
 */
var mjUtil;
(function(mjUtil){

	var Popup = (function(){

		function Popup(val){
			this.value = val;
			this.num_defaultTop = 100;
			this.num_defaultLeft = 100;
		}

		/**
		 * Window Open(with multi)
		 * @param  {Array} url 
		 * @param  {String} option 
		 * @return {[type]}     [description]
		 */
		Popup.prototype.OpenWindow = function(url,option){

			// validation
			if(url.length > 2){
				console.warn("To set the URL array of two or more elements \"pop-up blocker\" might be.");
			}

			for(var i=0,len=url.length;i<len;i++){
				
				var date = new Date();
				var num_top = this.num_defaultTop + i * 30;
				var num_left = this.num_defaultLeft + i * 30;
				window.open(url[i],'Window'+i+'_'+date.getTime(),option+',top='+num_top+',left='+num_left);
			}
			return false;
		}
		return Popup;
	})();

	mjUtil.Popup = Popup;
})(mjUtil || (mjUtil = {}));

/**
 * Event Setting
 *
 * This Code is sample code.
 */
document.addEventListener("DOMContentLoaded", function(){

	var funcPopup = new mjUtil.Popup();

	document.querySelector("div.areaContents a").addEventListener("click",function(event){

		event.preventDefault();
		
		funcPopup.OpenWindow(['http://www.tour.ne.jp','http://www.tour.ne.jp/w_tour/4576610/?dp_y=2012&dp_m=11&dst_id=5&cty_id=65&cit_id=3&dsp_sort=osc_asc'],'width=800,height=600,resizable=yes, menubar=no, toolbar=no');

		return false;
	},false);
},false);