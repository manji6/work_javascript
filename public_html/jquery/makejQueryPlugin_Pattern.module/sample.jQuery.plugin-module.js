/**
 * module pattern
 *
 * javascript Plugin作るときの参考資料。
 *
 * Plugin 名前空間内に公開関数用のmethod1, method2, initを用意する。
 * 複数objectをnewされた場合、Plugin内のパラメーターは常に上書きされてしまうが、
 * init()で定義した直後は変わっているので、そこからprivate関数を呼び出すと、thisに入っている値はすべて呼び出し時に定義したものになる。
 * private関数間で呼び出し合えば値の引継ぎも出来る。
 *
 * @see http://www.jquery4u.com/articles/jquery-plugin-module-pattern/
 */
!function(exports, $, undefined){

	var Plugin = function(){
		var priv = {},	// private API
		plugin = {},	//public API

		//plugin defaults
		defaults = {
			id: '',
			name: '',
			url: ''
		};

		//private options
		priv.options = {};

		/**
		 * Private method1
		 */
		priv.method1 = function(){

			console.log('Private method 1 is called...');
			console.log(this.options);
			$('#videos').append('<div id="'+this.options.id+'" class="video-wrap"><h1>'+this.options.name+'</h1></div>');

			priv.method2(this.options);
		}

		/**
		 * private method2
		 */

		priv.method2 = function()
		{
			console.log('Private method 2 called...');
			$('#'+priv.options.id).append('<p>'+this.options.url+'</p>'); // append title
			$('#'+priv.options.id).append('<iframe width="420" height="315" src="'+this.options.url+'" frameborder="0" allowfullscreen></iframe>'); //append video
		};


		/**
		 * public method1
		 */
		Plugin.method1 = function(){
			console.log('public method 1 called....');

			//show private options.
			console.dir(priv.options);
		}

		/**
		 * Public method2
		 */
		Plugin.method2 = function(){

			console.log('Public method 2 called...');

		};


		/**
		 * public initialization
		 */
		Plugin.init = function(options){

			console.log('new Plugin initialization...');

			// overwritten defaults setting
			$.extend(priv.options, defaults, options);

			console.log("=----");
			console.log(priv.options);

			priv.method1();

			return Plugin;

		}

		// Return the Public API(Plugin)
		console.log('new plugin object created...');

		return Plugin;

	}

	exports.Plugin = Plugin;

}(this, jQuery);
