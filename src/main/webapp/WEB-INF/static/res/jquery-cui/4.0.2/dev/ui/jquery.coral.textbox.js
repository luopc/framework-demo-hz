/**
 *	Coral 4.0: textbox
 *
 *	Depends:
 *		jquery.coral.core.js
 *		jquery.coral.component.js
 *		jquery.validate.js
 *
 */
( function ( $, undefined ) {
	"use strict";	
	
	$.component ( "coral.textbox", $.coral.inputbase, {
		version: $.coral.version,
		castProperties : ["dataCustom","title","buttons", "buttonOptions","triggers"],
		options: {		
			swfPath: $.coral.contextPath + '/jquery-cui/resource/swfupload.swf',
			hasTips: false,
			showStar: true,
			showClose: false,
			dataCustom: null,
			value: "",
			//formatter: "simple",
			readonly: false,
			readonlyInput: false,
			disabled: false,
			required: false,
			isLabel: false,
			title: null, // title属性
			buttons: [],
			errMsg: null,
			errMsgPosition: "leftBottom",
			placeholder: "",
			type: "text",
			labelField: null,
			starBefore: false,
			valueChangedOnKeyUp: false,
			onClick: null,
			onChange: null,
			onBlur: null,
			onFocus: null,
			onKeyDown: null,
			onKeyUp: null,
			onKeyPress: null,
			onEnter: null, 			// press enter event callback
			onMouseEnter: null,
			onMouseLeave: null,
			onCreate: null,			
			onValidSuccess: null,
			onValidError: null,
			onValidWarn: null,
			onUploadSuccess: null,	// file upload success event callback
			// add sub button options
			buttonOptions: null,
			triggers: null, // 覆盖 validate 里的 triggers
			excluded: false // true 则不单独校验
		},
		/**
		 * 获取textbox的button组件
		 */
		button: function () {
			if (null !== this.options.buttonOptions) {
				return this.$button;
			}
		},
		//获取组件外围元素
		component: function () {
			return this.uiTextbox;
		},
		/**
		 * 获取焦点方法
		 */
		focus: function() {
			if (this.options.disabled || this.options.isLabel || this.options.readonly || this.options.readonlyInput ) return false;
			if ("hidden" == this.element.attr("type")) return ;
			var that = this;			
			this.element.focus();
			return true;
		},
		//创建组件
		_create: function() {
			var that = this;
			if(that.options.hasTips){
				that.options.title = true;
			}
			if ("hidden" !== this.element.attr("type") && 
					"file" !== this.element.attr("type") && 
					"password" !== this.element.attr("type") && 
					"text" !== this.element.attr("type") && 
					"INPUT" == this.element[0].tagName.toUpperCase()) {
				this.element.attr("type", "text");
			}
			this.element.addClass("ctrl-form-element");
			if (this.options.dataCustom) {
				this.element.attr("data-custom",this.options.dataCustom);
			}
			this._initElement();
			this.setValue(this.element.val(), false);
			this.originalValue = this.getValue();
			this._bindEvents();
			// add button code
			if (null !== this.options.buttonOptions) {
				this._outerButtons();
				/*this.$button = this._getButtonEl();
				this.component().append(this.$button).addClass("coral-textbox-hasButton");
				this.$button.button(this.options.buttonOptions);*/
			}
			that._trigger( "onCreate", null, [] );
		},
		_outerButtons: function(){
			this.uiDialogOuterButtonPanel = 
				$("<span class=\"coral-outerbuttonset coral-corner-all \"></span>");
			this.component().append( this.uiDialogOuterButtonPanel );
			this._createButtons( this.options.buttonOptions,null, this.uiDialogOuterButtonPanel );
			this.component().css( 
				"padding-right", 
				this.uiDialogOuterButtonPanel.outerWidth() + 8 
			);
		},
		/**
		 * 返回一个button基础element
		 */
		_getButtonEl: function () {
			return $("<button type='button'></button>").addClass("coral-textbox-button");
		},
		reset : function() {
			this.setValue(this.originalValue);
		},
		_initSimple: function(){
			var that = this,
			id = that.element.uniqueId().attr("id");
		},
		_initUpload: function(){
			var that = this,
				id = that.element.uniqueId().attr("id");
			that.select = [];
			$(this.element).wrap("<span class=\"coral-file-default\"></span>")
				.before("<span class='coral-file'>请选择...</span>")
				.before("<div id='"+id+"_upload'></div>")
				.before("<div id='"+id+"_queue'></div>")
				.hide();
			that.uploader = $("#"+id+"_upload");
			that.uploader.uploadify({
		        'swf'      :  this.options.swfPath,
		        'uploader' : that.options.uploadUrl,
		        'queueID'  : id+'_queue',
		        'height' : '28',
		        width: "800",
		        buttonText: "浏览",
		        'onDialogOpen' : function() {
		        	that.select = [];
		        },
		        'onDialogClose' : function() {
		        	
		        },
		        'onSelect' : function(file) {
		        	that.select.push(file.name);
		        	that.uiTextbox.find(".coral-file").html(that.select.join(","));
		        	that.uiTextbox.find("object").attr("title",that.select.join(","));
		        },
		        'onCancel' : function(file){
		        	//console.log("cancel:"+file.name);
		        },
		        'onQueueComplete' : function(queueData) {
		            //alert(queueData.uploadsSuccessful + ' files were successfully uploaded.');
		        //	$("#"+id+"_queue").html("上传成功！");
		        	setTimeout(function(){
		        		$("#"+id+"_queue").dialog("close");
		        		that.select = [];
		        	},3500);
		        },
		        // lihaibo add begin
		        'onUploadSuccess': function(file, data, response) {
			          that._trigger("onUploadSuccess", null, [{file:file, data:data, response:response}]);
			    },
			    // lihaibo add end
				'auto':false
		        // Put your options here
		    });
			$("#"+id+"_queue").dialog({
				autoOpen: false,
				modal: false,
				resizable: false,
				onOpen: function(){
					that.uploader.uploadify('upload','*');
				}
			});
		},
		upload: function(option){
			var that = this;
			var id = that.element[0].id;
			if(this.select.length === 0)
				return;
			$("#"+id+"_queue").dialog("open");
		},
		cancel: function(option){
			this.uploader.uploadify('cancel');
		},
		clear: function(option){
			this.select = [];
			this.uiTextbox.find(".coral-file").html("请选择...");
			this.uiTextbox.find("object").attr("title","请选择...");
			this.uploader.uploadify('cancel');
		},
		//获取icons的两个class
		_getIcon: function (icons) {
			var iconsJsonArray = []; // [{className: clickHandler}]
			
			if (typeof icons === "undefined" || icons == null || icons == "") {
				return [];
			}
			if (typeof icons == "object" ) {
				for (var i in icons) {
					var data = {};
					data[icons[i].icon] = icons[i].click;
					iconsJsonArray.push(data);
				}
			} else {
				var iconsArray = $.trim( icons).split( "," );
				for ( var i in iconsArray ) {
					var iconArray = iconsArray[i].split(" ");
					
					var data = {};
					data[iconArray[0]] = iconArray[1];					
					iconsJsonArray.push( data );
				}
			}
			return iconsJsonArray;
		},
		//callback click eventHandler
		_triggerClick: function (handler,event,data) {
			var that = this;
			
			var _fn = $.coral.toFunction(handler);
			event = $.Event(event);
			return _fn.apply(that.element[0], [event].concat(data)); 
		},
		/**
		 * update label attribute
		 */
		_updateLabel: function(labelField) {
			this.uiLabel.html(labelField);
		},
		//组件初始化
		_initElement: function () {
			var that = this,
				valuebox = null,
				options = that.options;	
			/*//创建组件外围元素
			this.uiTextbox = $( "<span class=\"coral-textbox\"></span>" );	
			//添加组件外围元素
			that.uiTextbox.insertAfter( that.element );
			that.elementBorder =  $( "<span class=\"coral-textbox-border coral-corner-all\"></span>" );		
			that.uiTextbox.append( that.elementBorder );
			that.element.appendTo( that.elementBorder );*/
			
			this.uiTextbox = $("<span class=\"coral-textbox\"><span class=\"coral-textbox-border coral-corner-all\"></span></span>" )
				.insertAfter(that.element);
			that.elementBorder =  that.uiTextbox.find(".coral-textbox-border");
			that.element.appendTo( that.elementBorder );
			that.element.addClass( "coral-textbox-default coral-validation-textbox" );
			if ( this.options.buttons.length > 0 ) {
				this._createButtonPanel();
			}
			// add label and required star before function @lhb @2015-04-27 add labelField attribute
			if (options.labelField) {
				this.uiLabel = $("<label class=\"coral-label\">"+ options.labelField +"</label>");
				this.elementBorder.before(this.uiLabel);
				this.uiTextbox.addClass("coral-hasLabel");
			}
			this.valuebox = $( "<input type='hidden' class='coral-value-textbox'>" ).appendTo(this.uiTextbox);
			// add label and required star before function @lhb @2015-04-27
			if ( "hidden" == this.element.attr("type") ) {
				that.uiTextbox.hide();
			}
			
			if ( "TEXTAREA" == this.element[0].tagName ) {
				that.component().addClass( "coral-textbox-textarea" );
			} 
			if("file" == that.element.attr("type")){
				if("uploadify"==that.options.formatter)
					that._initUpload();
				if("simple"==that.options.formatter || typeof that.options.formatter == "undefined")
					that._initSimple();
			}
			// 处理 icons || texticons
			var iconsJsonArray = [], isIcons = null;
			
			if ((iconsJsonArray = that._getIcon(that.options.icons)).length != 0) {
				isIcons = true;
			} else if ((iconsJsonArray = that._getIcon( that.options.texticons )).length != 0 ) {
				isIcons = false;
			}
			
			if (isIcons != null) {
				this.uiDialogButtonPanel = $("<span class=\"coral-textbox-btn-icons coral-corner-right\"></span>");
				that.elementBorder.append( this.uiDialogButtonPanel );
				
				for ( var i in iconsJsonArray ) {
					$.each ( iconsJsonArray[i], function ( classText, clickHandler ) {
						var $icon = $("<span class=\"coral-textbox-btn-ico icon\"></span>");
						
						if ( isIcons ) {
							$icon.addClass(classText);/*.height( that.element.outerHeight() ).width( that.element.outerHeight() );*/
							
						} else {
							$icon.addClass("coral-textbox-btn-textico").html(classText);
						}
						
						$icon.bind("click" + that.eventNamespace, function (e) {
							if ( that.options.disabled ) {
								return;
							}
							that._triggerClick(clickHandler,e,[{'value':that.element.val()}]);
							//e.stopPropagation();
						});
						that.uiDialogButtonPanel.append($icon);
					});
				}
				this.rightPos = this.uiDialogButtonPanel.outerWidth();
			}
			
			if (typeof this.element.attr("id") != "undefined") {
	    		this.options.id = this.element.attr("id");
	    	} else if (this.options.id) {
	    		this.element.attr("id", this.options.id);
	    	}
			if (typeof this.element.attr("name") != "undefined") {
	    		this.options.name = this.element.attr("name");
	    	} else if (this.options.name) {
	    		this.element.attr("name", this.options.name);
	    	}
			/*if (typeof this.element.attr("value") != "undefined") {
	    		this.options.value = this.element.attr("value");
	    	}*/
			if ("TEXTAREA" === this.element[0].tagName) {
				if ($.trim(this.element.text()) !== "") {
		    		this.options.value = this.element.text();
		    	} else if (this.options.value){
		    		this.element.text( this.options.value );
		    	}
			} else {
				if ($.trim(this.element.val()) !== "") {
		    		this.options.value = this.element.val();
		    	} else if (this.options.value) {
		    		this.element.val(this.options.value);
		    	}
	    	}
			if (options.width !== "" && options.width !== undefined) {				
				this.uiTextbox.css( "width", options.width );
			}	
			if (options.height !== "" && options.height !== undefined) {				
				this._setOption("height", options.height );
			}
			if (options.readonlyInput) {
				this._setReadonlyInput();
			}
			if (options.readonly) {
				this._setReadonly();
			}

			if ( typeof options.isLabel == "boolean" && options.isLabel ) {
				this._setReadonly();
				this.options.readonly = true;
				this.component().addClass( "coral-isLabel" );
				return ;
			} 
			if ( typeof options.disabled === "boolean" && options.disabled  ) {
				this._setOption( "disabled", options.disabled );
			}
			// clear button
			if ( this.options.showClose ) {
				this.uiClose = $("<span class='coral-textbox-close cui-icon-cross2'></span>");
				this.elementBorder.append(this.uiClose);
				this.uiClose.css( "right", this.rightPos ? this.rightPos: 0 );
			}
			this.element.attr( "placeholder", options.placeholder );
			if ( options.placeholder && "" === this.element.val() ) {
				this._showPlaceholder();
			}
			this._updateTitle();
			this._refresh();
		},
		_setReadonlyInput: function(){
			if(typeof this.element.attr("readonly") != "undefined"){
				this.options.readonlyInput = this.element.prop("readonly");
			} else if (this.options.readonlyInput){
				this.element.prop("readonly", this.options.readonlyInput);
			}
			if (this.element.prop("readonly")) {
				this.component().addClass("coral-readonlyInput");
			}
		},
		_setReadonly: function(){
			this.options.readonlyInput = true;
			this._setReadonlyInput();
			this.component().removeClass("coral-readonlyInput").addClass("coral-readonly");
			var $buttons = this.component().find(".ctrl-init-button");
			$buttons.button("disable");
		},
		_updateTitle: function() {
			var that = this,
				opts = this.options;
			if (opts.title == true) {
				that.element.attr("title", that.element.val( ));
			} else if (opts.title == false) {
				that.element.attr("title", "");
			} else {
				that.element.attr("title", opts.title);
			}
		},
		/**
		 * 显示 placeholder
		 */
		_showPlaceholder: function () {
			if ( $.support.placeholder ) {
				return ;
			}
			var that = this,
				$placeholder = $("<span class='coral-textbox-placeholder-label'>" + that.options.placeholder  + "</span>");
			$(that.element).after( $placeholder );
		},
		/**
		 * 隐藏 placeholder
		 */
		_hidePlaceholder: function () {
			if ( $.support.placeholder ) {
				return ;
			}
			
			var that  = this;

			that.uiTextbox.find( ".coral-textbox-placeholder-label" ).remove();
		},
		//组件绑定事件
		_bindEvents: function () {
			var that = this,
				options = this.options;
			var suppressBlurs;
			this._on( {
				"mouseenter.coral-textbox-border": function( event ) {
					if ( typeof options.isLabel == "boolean" && options.isLabel ) { 
						return;
					}
					if ( typeof options.readonly == "boolean" && options.readonly ) { 
						return;
					}
					/*if ( typeof options.readonlyInput == "boolean" && options.readonlyInput ) { 
						return;
					}*/
					
					that.component().addClass("coral-textbox-hover");
					this._trigger( "onMouseEnter", event, [] );
				},
				"mouseleave.coral-textbox-border": function( event ) {
					if ( typeof options.isLabel == "boolean" && options.isLabel ) { 
						return;
					}
					if ( typeof options.readonly == "boolean" && options.readonly  ) { 
						return;
					}					
					/*if ( typeof options.readonlyInput == "boolean" && options.readonlyInput ) { 
						return;
					}	*/
					that.component().removeClass( "coral-textbox-hover" );	
					this._trigger( "onMouseLeave", event, [] );
				},
				"click": function( event ) {
					that._hidePlaceholder();
					this._trigger( "onClick", event, [] );
				},
				"click.coral-textbox-placeholder-label": function( event ) {
					that._hidePlaceholder();
					that.element.focus();
				},
				"dblclick": function( event ) {
					this._trigger( "onDblClick", event, [] );
				},
				"blur": function( event ) {
					this.component().removeClass( "coral-state-focus" );
					if ( "" === this.element.val() ) {
						this._showPlaceholder();
					}
					if ( suppressBlurs ) {
						suppressBlurs = false;
						return;
					}
					this.setValue( this.element.val(), true );
					this._trigger( "onBlur", event, [] );
				},
				"focusin": function( event ) {
					if ( options.isLabel || options.readonly || options.readonlyInput ) {
						this._trigger( "onFocus", event, [{'value':this.valuebox.val(),'text':this.element.val()}] );
						return;
					}
					this.component().addClass( "coral-state-focus" );
					this._trigger( "onFocus", event, [{'value':this.valuebox.val(),'text':this.element.val()}] );
				},
				"keydown": function( event ) {
					if ( options.isLabel || options.readonly || options.readonlyInput ) { 
						return;
					}
					this._trigger("onKeyDown", event, [{'value':this.valuebox.val(), 'text':this.element.val(), 'id': this.options.id }])
					//key enter and trigger event callback 
					if (event.keyCode == 13) {
						this.setValue(this.element.val(), true);
						this._trigger("onEnter", event, [{'value':this.valuebox.val(), 'text':this.element.val()}]);
					}
					this._hidePlaceholder();
				},
				"keypress": function( event ) {
					if ( options.isLabel || options.readonly || options.readonlyInput ) { 
						return;
					}
					this._trigger("onKeyPress", event, [{'value':this.valuebox.val(), 'text':this.element.val()}]);
				},
				"keyup": function( event ) {
					if ( options.isLabel || options.readonly || options.readonlyInput ) { 
						return;
					}
					if ( this.options.valueChangedOnKeyUp ) {
						this.setValue(this.element.val(), true, false);
					}
					this._trigger("onKeyUp", event, [{
						'value':this.valuebox.val(), 
						'text':this.element.val(), 
						'id': this.options.id 
					}]);
				},
				"click.coral-textbox-close" : function(e) {
					e.preventDefault();
					this.setValue("", true);
					if (this.options.placeholder) {
						this._showPlaceholder();
					}
					this._trigger( "onCloseClick", event, [] );
				},
				"mousedown.coral-textbox-close" : function(e) {
					e.stopPropagation();
					suppressBlurs = true;
				}
			});
		},
		/**
		 * 重新调整大小，以及图标的结构
		 */
		_refresh: function() {
			var that = this,
				opts = this.options;
			
			/*if (opts.icons && !opts.height) {
				var iconHeight = this.uiTextbox.find(".coral-textbox-btn-ico:eq(0)").outerHeight();
				this.element.outerHeight(iconHeight);
			}*/
		},
		//设置属性处理
		_setOption: function ( key, value ) {
			var that = this;
			//默认属性不允许更改
			if  (key === "id" || key === "name" || key === "type" ) {
				return ;
			}
			//TODO: isLabel状态下目前不处理宽度和高度
			if ( key === "height" ) {
				if ( typeof this.options.isLabel === "boolean" && this.options.isLabel ) {
	 				return ;	
	 			}
				if ( value ) {
					this.component().outerHeight( value );	
					//TODO: 如果ie7，则需要给textarea这个元素设置高度和宽度；
					this.uiTextbox.find( ".coral-textbox-btn-textico" ).css({
						"line-height": (value - 6) + "px",
						"height": value + "px"
					});
				}
			}
			if ( key === "width" ) {
				if ( typeof this.options.isLabel === "boolean" && this.options.isLabel ) {
	 				return ;	
	 			}
				if ( value ) {					
					this.uiTextbox.css( "width", this.options.width );
				}	
			}
			// 以上部分如果return后，不对option内部的值进行更改
			this._super( key, value );
			if ( key === "placeholder" ) {
				this.element.attr( "placeholder", this.options.placeholder );	
				if ( this.getValue() === "" ) {
					this._showPlaceholder();					
				}
			}
			// texticons
			if ( key == "texticons" ) {
				var iconsJsonArray = that._getIcon( that.options.texticons );				
				var $icons = $("<span class=\"coral-textbox-btn-icons coral-corner-right\"></span>");
				that.elementBorder.find( ".coral-textbox-btn-icons" ).replaceWith( $icons );
				
				for ( var i in iconsJsonArray ) {
					$.each ( iconsJsonArray[i], function ( classText, clickHandler ) {
						var $icon = $("<span class=\"coral-textbox-btn-ico icon\"></span>")
													.addClass("coral-textbox-btn-textico").html(classText);
						$icon.bind("click" + that.eventNamespace, function (e) {
							if ( that.options.disabled ) {
								return;
							}
							that._triggerClick( clickHandler,e,[{'value':that.element.val()}] );
						});
						$icons.append($icon);
					});
				}
			}
			if ( key === "value" ) {
				that._updateTitle();
				that.setValue(value, false);
			}
			if ( key === "isLabel" ) {
				if ( typeof value == "boolean" && value ) {
					this._setReadonly();
					this.component().removeClass( "coral-readonly" ).addClass( "coral-isLabel" );
				} else if ( typeof value == "boolean" && !value ) {
					this.element.prop( "readonly", false );
					this.options.readonly = false;
					this.component().find(".ctrl-init-button").button("enable");
					this.component().removeClass( "coral-isLabel coral-readonly" );
				}
			}
			if ( key === "readonly" ) {
				if ( typeof value == "boolean" && value ) {		
					this._setReadonly();
					this.component().removeClass( "coral-isLabel" ).addClass("coral-readonly");
				} else if ( typeof value == "boolean" && !value ) {
					this.element.prop( "readonly", false );
					this.options.readonly = false;
					this.options.readonlyInput = false;
					this.component().find(".ctrl-init-button").button("enable");
					this.element.prop( "readonly", false );
					this.component().removeClass("coral-isLabel coral-readonly");
				}
			}
			if ( key === "readonlyInput" ){
				if ( typeof value == "boolean" && value ){
					this._setReadonlyInput();
					this.component().removeClass( "coral-isLabel" ).addClass("coral-readonlyInput");
				}else if ( typeof value == "boolean" && !value ) {
					this.element.prop( "readonly", false );
					this.options.readonlyInput = false;
					this.component().removeClass("coral-isLabel coral-readonlyInput");
				}
			}
	 		if ( key === "disabled" ) {
				if ( value ) {
					this.element.prop( "disabled", true );
					this.component().find(".ctrl-init-button").button("disable");
				} else {
					this.element.prop( "disabled", false );
					this.component().find(".ctrl-init-button").button("enable");
				}
			}	
			if ( key === "labelField" ) {
				that._updateLabel(value);
			}
			if ( key ==="title" ) {
				that._updateTitle();
			}
			if ( key ==="hasTips" ) {
				that._updateTitle();
			}
		},
		_destroy: function() {
			this.uiTextbox.replaceWith( this.element );
			this.element.val("");
		    this.element.removeAttr("value");
			this.element.removeClass("coral-textbox-default")
				.removeClass("coral-validation-textbox")
				.removeClass("coral-textbox-hover")
				.removeClass("coral-textbox-textarea")
				.removeClass("coral-textbox-input")
				.removeAttr("placeholder")
				.removeAttr("title")
				.removeAttr("readonly")
				.removeAttr("disabled");
		},
		disable: function() {
			this._setOption("disabled", true);
		},
		enable: function() {
			this._setOption("disabled", false);
		},
		getHtml: function () {
			return this.element.text();
		},
		setHtml: function () {
			this.element.text( value );
			this._updateTitle();	
		},
		//获取值
		getValue: function () {
			return this.valuebox.val();
		},
		getValidateValue: function () {
			return this.getText();
		},
		getText:function(){
			if( this.component().hasClass("coral-state-focus") ) {
				if ( this.element.is("textarea") ) {
					return this.element.text();
				} else {
					return this.element.val();
				}
			} else {
				return this.valuebox.val();
			}
		},
		//设置值
		setValue: function (value, changeTrigger, changeText) {
			var text = value,
				nData;
			changeText = changeText !== false? true: false;
			var fText = $.coral.toFunction(this.options.formatterText);
			if ($.isFunction(fText)) {
				text = fText.apply(this.options.element,[{'value':value}]);
			}
			if (changeText) {
				this.setText(text);
			}
			this.valuebox.val(value);
			this.options.value = value;
			if (changeTrigger && this.previous != value) {
				this._trigger("onChange", null, [{'value':value, 'text':text}]);
			}
			this.previous = value;

			if ( value !== "" ) {
				this._hidePlaceholder();
			}
		},
		setText: function(text){
			if ( this.element.is("textarea") ) {
				this.element.val( text );
				this.element.text( text );
				//this.element.attr( "placeholder", this.options.placeholder );//在IE下，placeholder不显示
			} else {
				this.element.val( text );
			}
			this._updateTitle();
		},
		/**
		 ** 返回给form要提交的值信息
		 ** return {name: value};
		 **/
		formValue: function() {
			var data = {},
				name = this.element.attr("name");

			if (!name) return null;
			
			data[name] = this.getValue();
			
			return data ;
		}
	});
})(jQuery);
