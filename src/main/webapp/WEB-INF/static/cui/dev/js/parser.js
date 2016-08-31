$.parser = {
	auto: true,
	doneArr: [],
	component: [],
	onComplete: function(context){},
	onInit: function(context){},
	plugins:["tabs","layout","grid","panel","button", "menubutton" , "treebutton","splitbutton", 
	         "accordion","textbox", "autocomplete","uploader", "radio","radiolist","checkbox",
	         "checkboxlist","spinner","slider","combo","combobox","combotree","combogrid",
	         "datepicker","form","picgrid","tree","toolbar","progressbar","menu","menubar",
	         "contextmenu","slidemenu","tieredmenu","navigatemenu","dialog","subfield",
	         "splitcontainer","view"],
	parse: function(context){
		$.parser.onInit.call($.parser, context);
		var aa = [];
		var htmlParse = function(){
			$.each($.parser.component,function(i){
				var c = $.parser.component.shift();
				if(c) {//如果下面的初始化有递归调用parse方法，此时这个组件可能已经被初始化掉了
					var ele = $( "#" + c.id );
					if (ele.length){
						if ( c.id && typeof (c.id) == "string" ) {
							var $Script = $( "#"+c.id + "_s" );
							if( $Script.length>0 ) {
								$Script.remove();
							}
						}
						if (ele[c.componentName]){
							ele[c.componentName]();
						} else {
							aa.push({name:c.componentName,jq:ele});
						}
					}
				}
			});
		}
		// 第一步：先解析Coral.cc放进去的元素
		htmlParse();
		// 找到当前页面的未解析的script，然后删掉，防止重复放入
		$.each($("script.coralscript", context),function(i){
			eval("( function() { " + this.innerHTML + " } )();");
			$(this).remove();
		});
		// 第二步：解析coralscript放进去的元素
		htmlParse();
		for(var i=0; i<$.parser.plugins.length; i++){
			var name = $.parser.plugins[i];
			var r = $('.coralui-' + name, context);
			r.removeClass('coralui-' + name);
			if (r.length){
				if (r[name]){
					r[name]();
				} else {
					aa.push({name:name,jq:r});
				}
			}
		}
		if (aa.length){
			var names = [];
			for(var i=0; i<aa.length; i++){
				names.push(aa[i].name);
			}
			easyloader.load(names, function(){
				for(var i=0; i<aa.length; i++){
					var name = aa[i].name;
					var jq = aa[i].jq;
					jq[name]();
				}
				$.parser.onComplete.call($.parser, context);
				$.each($.parser.doneArr,function(i){
					var fun = $.parser.doneArr.shift();
					if ( $.isFunction(fun) ) {
						fun.call($.parser, context);
					}
				});
				//每次refresh只考虑当前元素的内容元素
				$.coral.refreshAllComponent(context);
				$.parser.onComplete.call($.parser, context);
				bb = {};
			});
		} else {
			$.parser.onComplete.call($.parser, context);
			$.each($.parser.doneArr,function(i){
				var fun = $.parser.doneArr.shift();
				if ( $.isFunction(fun) ) {
					fun.call($.parser);
				} else if (fun) {
					var o = fun;
					if ( $.isFunction(o.fun) ) {
						o.fun.call(o.context, o.args);
					}
				}
			});
			//每次refresh只考虑当前元素的内容元素
			$.coral.refreshAllComponent(context);
			$.parser.onComplete.call($.parser, context);
			bb = {};
		}
	},
	/**
	 * parse options, including standard 'data-options' attribute.
	 * 
	 * calling examples:
	 * $.parser.parseOptions(target);
	 * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
	 *  castProperties --options中要转换了属性 格式：["data", "setting.xx.xx", ...]
	 */
	parseOptions: function(target, properties, castProperties){
		var t = $(target),
		    s = $.trim(t.attr('data-options')),
		    first = null,
		    last  = null,
		    opts  = null,
		    i     = 0,
		    name  = null,
		    value = null,
		    type  = null,
		    options = {};
		
		if (s){
			first = s.substring(0,1);
			last  = s.substring(s.length-1,1);
			if (first != '{') s = '{' + s;
			if (last != '}') s = s + '}';
			options = (new Function('return ' + s))();
		}
			
		if (properties){
			opts = {};
			for(var i=0; i<properties.length; i++){
				value = properties[i];
				if (typeof value == 'string'){
					if (value == 'width' || value == 'height' || value == 'left' || value == 'top'){
						opts[value] = parseInt(target.style[value]) || undefined;
					} else {
						opts[value] = t.attr(value);
					}
				} else {
					for(name in value){
						type = value[name];
						if (type == 'boolean'){
							opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
						} else if (type == 'number'){
							opts[name] = t.attr(name)=='0' ? 0 : parseFloat(t.attr(name)) || undefined;
						}
					}
				}
			}
			$.extend(options, opts); opts = null;
		}
		if ( castProperties instanceof Array) {
			for (i = 0; i < castProperties.length; i++) {
				name = castProperties[i];
				if (options.controllerName && typeof options[name] == "string") {
					options[name] = options.controllerName + "." + options[name];
				}
				change2object(options, name.split("."), options.controllerName);
			}
		}
		return options;
	}
};
$(function(){
	if (!window.easyloader && $.parser.auto){
		$.parser.parse();
	}
});

/**
 * 把指定属性名的值(字符串)转换为对象
 */
function change2object (obj, keys)  {
	var key = keys.shift();
	if (keys.length == 0) {
		if (obj && obj[key] && typeof obj[key] === "string") {
			try {
				obj[key] = (new Function('return ' + obj[key]))();
			} catch (e) {}
		}
	} else {
		change2object (obj[key], keys);
	}
}
$.parseDone = function(done){
	$.parser.doneArr.push(done);
};