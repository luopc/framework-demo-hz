/*!
 * jQuery coral Core 4.0.1
 */
if (document.documentMode !== undefined ) { // IE only
	if (document.documentMode <= 5) {
		alert("CoralUI can not be used in this ('quirks') mode!");
	}
}
var CoralUIVersion = "4.1.5";
var Coral = {
	cc: function( componentName, id ){
		$.parser.component.push({componentName: componentName, id: id});
	}
}
var validAction = false, timer = false, resizable = true;
(function( $, undefined ) {
$.coral = $.coral || {};
$.coral.openTag = true;
$.coral.strictLayout = false;
$(document).unbind(".clearTips").bind("click.clearTips", function(e){
	if ( validAction ) {
		validAction = false;
		e.stopPropagation();
		return;
	}
	$(".coral-validate-state-error").slideUp(100, function( e ){
		$(this).remove();
	});
	validAction = false;
});

// 鼠标滚动时，重新计算校验提示信息的位置
$(document).unbind("mousewheel").bind("mousewheel", function(e) {
	var validateSuffix = $.validate.validateSuffix();
	
	setTimeout( function() {
		$.each( $(".coral-validate-state-error"), function(idx, item) {
			var className = $(item).attr("class");
			var componentId = className.substring(0, className.indexOf(validateSuffix));
			var $field = $("#"+componentId).find(".ctrl-init");
			var $validator = $field.parents(".coral-validate");
			$(item).remove();
			$validator.validate("validItem", $field, null, true);
		});
	}, 0);
});
//
$.coral.getStyles = function (el) {
	if(window.getComputedStyle){
		var styles= window.getComputedStyle( el, null );
		return styles;
	}else if(document.documentElement.currentStyle){
		var styles= el.currentStyle;
		return styles;
	}
};
$.coral.fitParent = function ($ele, fit) {
	fit = (fit == undefined ? true : fit);
	var parent = $ele.parent().closest(".ctrl-fit-element")[0];
	parent = $(parent);
	if (fit) {
		if (!parent.hasClass("coral-noscroll")) {
			parent.addClass("coral-noscroll");
			if (parent.attr("tagName") == "BODY") {
				$("html").addClass("coral-panel-fit");
			}
		}
	} else {
		if (parent.hasClass("coral-noscroll")) {
			parent.removeClass("coral-noscroll");
			if (parent.attr("tagName") == "BODY") {
				$("html").removeClass("coral-panel-fit");
			}
		}
	}
	return {
		width: parent.width(),
		height: parent.height()
	};
};
$.coral.getLeft = function ( my, of ) {
	var left = of.offset().left;
	if (left + my.outerWidth() > $(window).outerWidth()
			+ $(document).scrollLeft()) {
		left = $(window).outerWidth() + $(document).scrollLeft()
				- my.outerWidth();
	}
	if (left < 0) {
		left = 0;
	}
	return left;
};
$.coral.getTop = function ( my, of, direction ) {
	var top = of.offset().top + of.outerHeight();
	
	if (direction == "up") {
		top = of.offset().top - my.outerHeight();	
	} else {
		if (top + my.outerHeight() > $(window).outerHeight()
				+ $(document).scrollTop()) {
			top = of.offset().top - my.outerHeight();
		}
		if (top < $(document).scrollTop()) {
			top = of.offset().top + of.outerHeight();
		}		
	}
	
	return top;
};
$.coral.findComponent = function( selector, context ){
	var component = [];
	if ( !selector ){ selector = '.ctrl-init'; }
	var init = $( selector, context );
	var rclass = /[\t\r\n]/g;
	if (init.length){
		$.each(init, function(){
			var name = "",
				className = this.className.replace(rclass, " ").split(" "),
				i = 0,
				l = className.length;
			for ( ; i < l; i++ ) {
				name = $( this ).attr( "component-role" );
				if ( name == "datepicker" ){
					component.push([{"element":$(this),"name":name}]);
				} else {
					component.push($(this)[name]("instance"));//$().textbox()
				}
				break;
			}
		});
	}
	return component;
};
$.coral.setIslabel = function(isSet, context) {
	var fields = $.coral.findComponent(".ctrl-form-element", context),
		i = 0, 
		l = fields.length;
	for (i; i < l; i++) {
        var c = fields[i];
        if ( c instanceof Array) {
        	$(c[0].element)[c[0].name]("option", "isLabel", isSet);
        }else {
        	c._setOption("isLabel", isSet);
        	if(c.element.hasClass("hasTooltip")) {
        		if(isSet == false) {
        			c.element.tooltip("enable");
        		} else {
        			c.element.tooltip("disable");
        		}
        	}
        }
	}
};
$.coral.setReadOnly = function(isSet, context){
	var fields = $.coral.findComponent( ".ctrl-form-element", context),
		i = 0, 
		l = fields.length;
	for (i; i < l; i++) {
	    var c = fields[i];
	    if ( c instanceof Array ){
	    	$(c[0].element)[c[0].name]("option", "readonly", isSet);
	    }else {
	    	c._setOption("readonly", isSet);
	    	if(c.element.hasClass("hasTooltip")) {
	    		if(isSet == false) {
	    			c.element.tooltip("enable");
	    		} else {
	    			c.element.tooltip("disable");
	    		}
	    	}
	    }
	}
};
$.coral.renderComponent = function( context ){
	var component = [];
	var selector = '.coral-no-rendered';
	if ( !context ){ context = 'body'; }
	var init = $( selector, context );
	var rclass = /[\t\r\n]/g;
	if (init.length){
		$.each(init, function(){
			var name = "",
				className = this.className.replace(rclass, " ").split(" "),
				i = 0,
				l = className.length;
			for ( ; i < l; i++ ) {
				name = $( this ).attr( "component-role" );
				rendered = $( this ).prop( "rendered" );
				if ( !rendered ) {
					$( this ).removeClass( "coral-no-rendered" );
					var ins = $(this)[name]("instance");
					$( this ).addClass( "ctrl-init ctrl-init-"+this.componentName );
					ins._create();
					ins._renderComponent();
				}
				break;
			}
		});
	}
	return component;
};

$.coral.valid = {};
$.coral.valid = function( element/*, hasErrorTips*/ ) {
	validAction = true;
	var count = 0,
		excluded = $.data(element, "excluded"),
		validElements = element.find($("[class*='coral-validation-']")),
		errTipsType = null,
		hasErrorTips = true;
	
	 if ( excluded && "string" === typeof excluded ) {
         // Convert to array first
         excluded = $.map( excluded.split( ',' ), function( item ) {
             // Trim the spaces
             return $.trim( item );
         });
     }
	 if ( "form" === element[0].tagName.toLowerCase() ) {
		 errTipsType = element.form("option", "errTipsType");		 
	 }
	 
	 validElements.each( function () {
		 var className = this.className, 
			 coralType = "",
			 clsArray = className.split(" ");
			 
		 for ( var item in clsArray ) {
			 if ( clsArray[item].indexOf( "coral-validation-" ) >=  0 ) {
				 coralType = clsArray[item].substr( clsArray[item].indexOf( "coral-validation-" ) + 17 );
				 break;
			 }
		 }
		 // 如果在排除范围内，则返回，不校验
		 if ( _isExclud( $( this )[coralType]("component"), excluded) ) {
    		 return ;
    	 }
		 if ( "none" === errTipsType ) {
			 hasErrorTips = false;
		 }
		 if ( !_valid( $( this ), coralType, hasErrorTips ) ) {
			 if ( "first" === errTipsType ) {
				 hasErrorTips = false;
			 }
			 ++ count;
		 }
	 });
	 
	 if ( count > 0 ) {
		 return false;
	 } else {
		 return true;
	 }
	
     function _isExclud( $component, excluded ) {
    	 if ( !excluded ) {
    		 return false;
    	 }
    	 
    	 var length = excluded.length;
         
    	 for ( var i = 0; i < length; i++ ) {
             if ( "string" === typeof excluded[i] && $component.is(excluded[i]) ){
                 return true;
             }
         }
    	 
    	 return false;
     }
     
     function _valid( $element, coralType, hasErrorTips ) {    	 
    	 if ( "datepicker" == coralType ) {
    		 return $element[coralType]( "valid", $element, hasErrorTips );
    	 }
    	 // 如果不在上面的列中，则默认通过校验
    	 if ( $.inArray( coralType, ["textbox", "combobox", "combotree", "radio", "radiolist", "checkbox", "checkboxlist"] ) > -1 ) {
    		 return $element[coralType]( "valid", hasErrorTips );
    	 }
     }      
}

jQuery.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
})();

var uuid = 0,
	runiqueId = /^coral-id-\d+$/;

// $.coral might exist from components with no dependencies, e.g., $.coral.position


$.extend( $.coral, {
	version: "4.0.3",
	
	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	},
	zindex : 1000
});
var timer = false;
// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},
	
	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "coral-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	},
	closestComponent: function(selector){
		return this.each(function() {
			$( this ).closest( ".ctrl-init-" + selector );
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}





// deprecated
$.coral.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),
	
	disableSelection: (function() {
		var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".coral-disableSelection", function( event ) {
				event.preventDefault();
			});
		};
	})(),

	enableSelection: function() {
		return this.unbind( ".coral-disableSelection" );
	},
	
	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

$.extend( $.coral, {
	// $.coral.plugin is deprecated. Use $.component() extensions instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.coral[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args, allowDisconnected ) {
			var i,
				set = instance.plugins[ name ];
			
			if ( !set ) {
				return;
			}
			if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
				return;
			}
			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},
	/**
	 * qiucs @2014.7.18
	 * 在window对象中获取指定函数(字符串)
	 */
	toFunction : function (fn) {
		var ns = null, i = 0, _fn = null;//不再设置为function，否则无法判断此function是否是undefined
		if ($.isFunction(fn)) {
			return fn;
		}
		if (typeof fn === "string") {
			// 1. 没有多层命名空间
			if ($.isFunction(window[fn])) {
				return window[fn];
			}
			// 2. 多层命名空间的有运算的
			try {
				_fn = eval("(" + fn + ")");
				if ($.isFunction(_fn)) {
					return _fn;
				}
			} catch (e) {}
			// 3. 多层命名空间无运算的	
			if (fn.indexOf(".") > 0) {
				ns = fn.split(".");
				_fn = window[ns[0]];
				if (!_fn) return null;
				for (i = 1; i < ns.length; i ++) {
					_fn = _fn[ns[i]];
					if (!_fn) return null;
				}
			}
			return _fn;
		}
		
		return fn;
	}
});

$.extend({
	/**
	 * qiucs @2014.7.23
	 * 通过url获取JSON对象
	 */
	loadJson : function (url, params) {
		var data = null;
		$.ajax({
			url : url,
			type: "get",
			dataType : "json",
			async : false,
			data : params,
			success : function(rlt) {
				data = rlt;
			},
			error : function (req, error, errThrow) {
				$.error("function load json error: " + error);
			}
		});
		return data;
	},
	/**
	 * qiucs @2014.9.18
-	 * 判断当元素是否为coral组件
-	 * @param elem 元素
-	 * @param type 组件类型，如 button/comobobox/ panel/ ...
	 */
	isCoral : function (elem, type) {
		if (arguments.length < 2 || !elem) return false;
		if (elem.jquery) elem = elem.get(0);
		return !!$.data(elem, "coral-" + type);
	}
});

$.extend( $.coral, {
	contextPathFun : function () {
		//获取当前网址，如： http://localhost:8080/coral/meun.jsp
		var curWwwPath=window.document.location.href;
		//获取主机地址之后的目录，如：coral/meun.jsp
 	    var pathName=window.document.location.pathname;
 	    var pos=curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
 	    var localhostPaht=curWwwPath.substring(0,pos);
	    //获取带"/"的项目名，如：/coral
 	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 	    return projectName;
	},
	adjusted : function(element){
		var maxHeight,
		$element = $(element),
		parent = $element.parent();
		
		maxHeight = parent.height();
		$element.siblings( ":visible" ).each(function() {
			var elem = $( this ),
				position = elem.css( "position" );

			if ( position === "absolute" || position === "fixed" ) {
				return;
			}
			maxHeight -= elem.outerHeight( true );
		});
		$element.height( Math.max( 0, maxHeight - $element.innerHeight() + $element.height() ) )
			//.css( "overflow", "auto" );//
			.addClass("coral-scroll");
		$.coral.refreshAllComponent(element);
		$.coral.fitParent(parent, true);
	},
	/**
	 * 处理 overflow
	 **/
	beforeDoOverflow : function(element){
		//$(".overflow-auto").removeClass("overflow-auto").addClass("overflow-hidden");
		//$(".coral-panel-body").removeClass("overflow-auto").addClass("overflow-hidden");
		//$(".coral-adjusted").addClass("overflow-hidden");
	},
	/**
	 * 处理 overflow
	 **/
	doOverflow : function(element){
	/*	if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			//$(".overflow-hidden").removeClass("overflow-hidden").addClass("overflow-auto");
			//$(".coral-panel-body").removeClass("overflow-hidden");
			//$(".coral-adjusted").removeClass("overflow-hidden").addClass("overflow-auto");
		},999);*/
	},
	/***
	 * com: compoent
	 * pCom: parentComponent
	 */
	isFit: function(com, pCom){
		// closetParentComponent
		var closestPCom = $(com).parent().closest(".ctrl-fit-element");
		if (!closestPCom.length) {
			closestPCom = $("body");
		}
		// 如果找到的直接父组件（closestPCom）与传进来的父容器（pCom）相等，
		// 或者父容器（pCom）由直接父组件提供（closestPCom），
		// 则判断为是最佳自适应时机
		var isBestFit = closestPCom.length && ( closestPCom[0] === $(pCom)[0] || closestPCom.find( pCom ).length );
		return isBestFit;
	},
	/**
	 * refresh all the coral comonent to adjusted container 
	 **/
	refreshAllComponent : function(parentComponent){
		$.coral.beforeDoOverflow();
		if( typeof(parentComponent)=="undefined" ) {
			parentComponent = "body";
		}
		var layoutSet = null;
		if ($.coral.strictLayout) {
			layoutSet = $(parentComponent).children(
				".fill:visible, " +
				".ctrl-fit-element:visible, " +
				".coral-adjusted:visible"
			);
		} else {
			layoutSet = $(parentComponent).find(
				".ctrl-fit-element:visible, " +
				".fill:visible, " +
				".coral-adjusted:visible"
			);
		}
		layoutSet.each(function() {
			if ($(this).hasClass("coral-adjusted") || $(this).hasClass("fill")) {
				$(this).addClass("ctrl-fit-element coral-scroll");
			}
			var type = $(this).attr("component-role");
			if (!type) {
				if ($(this).hasClass("coral-adjusted") || $(this).hasClass("fill")) {
					$.coral.adjusted(this);
				}
			} else {
				if ($.coral.isFit($(this)[type]("component"), parentComponent)) {
					$(this)[type]("refresh");
/*					if ($(this).hasClass("ctrl-init-layout")) {
						$(this).layout("refresh");
					}
					if ($(this).hasClass("ctrl-init-accordion")) {
						$(this).accordion("refresh");
					}
					if ($(this).hasClass("ctrl-init-tabs")) {
						$(this).tabs("refresh");
					}
					if ($(this).hasClass("ctrl-init-grid")) {
						$(this).grid("refresh");
					}
					if ($(this).hasClass("ctrl-init-toolbar")) {
						$(this).toolbar("refresh");
					}
					if ($(this).hasClass("ctrl-init-form")) {
						$(this).form("refresh");
					}*/
				}
			}
		});
		$.coral.doOverflow();
	}
});
$.coral.contextPath = $.coral.contextPathFun.apply();

})( jQuery );
(function($) {
	$.fn.caret = function(pos) {
	    var target = this[0];
		var isContentEditable = target.contentEditable === 'true';
	    //get
	    if (arguments.length == 0) {
	    	//HTML5
	    	if (window.getSelection) {
	    		//contenteditable
		        if (isContentEditable) {
		        	target.focus();
		        	var range1 = window.getSelection().getRangeAt(0),
		        		range2 = range1.cloneRange();
					range2.selectNodeContents(target);
					range2.setEnd(range1.endContainer, range1.endOffset);
					return range2.toString().length;
		        }
		        //textarea
		        return target.selectionStart;
		      }
	    	//IE<9
	    	if (document.selection) {
	    		target.focus();
	    		//contenteditable
	    		if (isContentEditable) {
	    			var range1 = document.selection.createRange(), 
	    		  		range2 = document.body.createTextRange();
		    		  range2.moveToElementText(target);
		    		  range2.setEndPoint('EndToEnd', range1);
		    		  return range2.text.length;
	    		}
		    	  //textarea
		    	  var pos = 0,
		    	  	range = target.createTextRange(),
		            range2 = document.selection.createRange().duplicate(),
		            bookmark = range2.getBookmark();
		    	  range.moveToBookmark(bookmark);
		    	  while (range.moveStart('character', -1) !== 0) pos++;
		    	  return pos;
	    	}
	    	// Addition for jsdom support
	    	if (target.selectionStart)
	    		return target.selectionStart;
	    	//not supported
	    	return 0;
	    }
	    //set
	    if (pos == -1)
	    	pos = this[isContentEditable? 'text' : 'val']().length;
	    //HTML5
	    if (window.getSelection) {
	    	//contenteditable
	    	if (isContentEditable) {
	    		target.focus();
	    		window.getSelection().collapse(target.firstChild, pos);
	    	}
	    	//textarea
	    	else
	    		target.setSelectionRange(pos, pos);
	    }
	    //IE<9
	    else if (document.body.createTextRange) {
	    	if (isContentEditable) {
	    		var range = document.body.createTextRange();
	    	  		range.moveToElementText(target);
    	  		range.moveStart('character', pos);
    	  		range.collapse(true);
    	  		range.select();
	    	} else {
		    	  var range = target.createTextRange();
		    	  range.move('character', pos);
		    	  range.select();
	    	}
	    }
	    if (!isContentEditable)
	    	target.focus();
	    return pos;
	}
})(jQuery);

