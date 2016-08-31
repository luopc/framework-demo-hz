/*!
 * 组件库4.0：下拉框
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 *    jquery.coral.panel.js
 *    jquery.validatehelper.js
 */

(function ($) {
"use strict";
$.component("coral.formelement", {
	version: "4.0.2",
	options: {
	},
	getValidateValue: function() {
		return this.getValue();
	},
	clearError: function(){
		this.component().removeClass("hasErrorIcon coral-validate-error");
		this.component().find(".coral-errorIcon").remove();
		this.element.prop("isError", false);
	}
});
})(jQuery);
(function ($) {
"use strict";
$.component("coral.inputbase", $.coral.formelement, {
	version: "4.0.2",
	options: {
		inputButtonGutter: 5//textbox和button之间的间距
	},
	_outerButtons: function() {
		this.uiDialogOuterButtonPanel = $('<span/>',{
			className: "coral-outerbuttonset coral-corner-all"
		});
		this.component().append(this.uiDialogOuterButtonPanel);
		this._createButtons(this.options.buttonOptions,null, this.uiDialogOuterButtonPanel);
		this.component().css("padding-right", this.uiDialogOuterButtonPanel.outerWidth() + 8);
	},
	_createButtonPanel: function() {
		var is = false,
			i,
			direction = "right",
			pos = "inner",
			key = "innerRight",
			opermethod = "prepend",
			buttons = this.options.buttons;
		for (i=0; i < this.options.buttons.length;i++) {
			if (buttons[i]["innerLeft"]) {
				key = "innerLeft";
				direction = "left";
				if (buttons[i]["innerLeft"][0].type && buttons[i]["innerLeft"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				}else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
			if (buttons[i]["innerRight"]) {
				key = "innerRight";
				direction = "right";
				opermethod = "append";
				if (buttons[i]["innerRight"][0].type && buttons[i]["innerRight"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				} else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
			if (buttons[i]["outerRight"]) {
				key = "outerRight";
				direction = "right";
				pos = "outer";
				opermethod = "append";
				if (buttons[i]["outerRight"][0].type && buttons[i]["outerRight"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				} else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
			if (buttons[i]["outerLeft"]) {
				key = "outerLeft";
				direction = "left";
				pos = "outer";
				if (buttons[i]["outerLeft"][0].type && buttons[i]["outerLeft"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				} else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
			if (buttons[i]["floatRight"]) {
				key = "floatRight";
				pos = "float";
				opermethod = "append";
				if (buttons[i]["floatRight"][0].type && buttons[i]["floatRight"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				} else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
			if (buttons[i]["floatLeft"]) {
				key = "floatLeft";
				direction = "left";
				pos = "float";
				if (buttons[i]["floatLeft"][0].type && buttons[i]["floatLeft"][0].type == "combobox") {
					this._addComboboxPanel(pos,key,direction,opermethod,i);
					is = true;
				} else {
					this._addButtonPanel(pos,key,direction,opermethod,i);
					is = true;
				}
			}
		}
		if (!is) {
			this.uiDialogButtonPanel = $("<span class='"+ key +" coral-textbox-btn-icons coral-buttonset coral-corner-" + direction+" '></span>"); 
			this._createButtons(this.options.buttons, direction , this.uiDialogButtonPanel);
			this.elementBorder.append(this.uiDialogButtonPanel);
			this.elementBorder.css("padding-right", this.uiDialogButtonPanel.outerWidth());
			this.uiDialogButtonPanel.css("right", 0);
			this.rightPos = this.uiDialogButtonPanel.outerWidth();
		}
	},
	_addButtonPanel: function(pos,key,direction,opermethod,i) {
		this._addPanel(pos,key,direction,opermethod,i,"button");
	},
	_addComboboxPanel: function(pos,key,direction,opermethod,i) {
		this._addPanel(pos,key,direction,opermethod,i,"comboButton");
	},
	_addPanel: function(pos,key,direction,opermethod,i,button) {
		var that = this;
		function createButton(buttons,direction,panel,button) {
			if (button == "button") {
				that._createButtons(buttons, direction , panel);
			} else {
				if (pos == "outer") {
					that._createCombobox(buttons, pos + direction , panel);
				} else {
					that._createCombobox(buttons, direction , panel);
				}
			}
		}
		this.uiButtonPanel = $("<span class='"+ key +" coral-textbox-btn-icons coral-buttonset coral-inner coral-corner-"+direction+" '></span>");
		this.uiOuterButtonPanel = $("<span class=\"coral-outerbuttonset coral-outer coral-corner-all \"></span>");
		if (pos == "inner") {
			createButton( this.options.buttons[i][key], direction , this.uiButtonPanel,button);
			this.elementBorder[opermethod]( this.uiButtonPanel );
			this.elementBorder.css("padding-" + direction, this.uiButtonPanel.outerWidth());
			this.uiButtonPanel.css(direction, 0);
		} else if(pos == "float"){
			this.component()[opermethod]( this.uiOuterButtonPanel );
			createButton( this.options.buttons[i][key], null , this.uiOuterButtonPanel,button );
			this.uiOuterButtonPanel.css(
					direction, -(this.uiOuterButtonPanel.outerWidth() + this.options.inputButtonGutter)
				);
		}else {
			this.component()[opermethod](this.uiOuterButtonPanel);
			createButton(this.options.buttons[i][key], direction, this.uiOuterButtonPanel,button,pos);
			var width = this.uiOuterButtonPanel.outerWidth();
			this.component().css(
					"padding-" + direction, this.uiOuterButtonPanel.outerWidth() + this.options.inputButtonGutter
				);
			this.uiOuterButtonPanel.css( direction, 0 ).css("width",width);
		}
		if(pos + direction === "innerright"){
			this.rightPos = this.uiButtonPanel.outerWidth();
		}

	},
	_createButtons: function(buttons , direction , appendTo) {
		var that = this;
		if ($.isEmptyObject(buttons)) buttons = {};
		if (buttons instanceof Array == false ) {
			buttons = [buttons];
		}
		$.each( buttons, function(i) {
			var buttonOptions,
				addCls = "",
				removeCls = "",
				click,
				props = $.extend({type: "button"}, {click: this.click});
			this.click = this.onClick || this.click;
			delete this.onClick;
			click = this.click || $.noop;
			props.click = function() {
				click.apply(that.element[0], arguments);
			};
			delete this.click;
			removeCls = "coral-corner-all";
			if (direction == "left") {
				if(i == 0){
					addCls = "coral-corner-left";
				}
				$( "<button></button>", props ).button(this)
				.addClass(addCls).removeClass(removeCls).appendTo(appendTo);
			} else if (direction == "right") {
					if(i==(buttons.length-1)) {
						addCls = "coral-corner-right";
					}
					$("<button></button>", props).button(this)
					.addClass(addCls).removeClass(removeCls).appendTo(appendTo);
				}else{
					$("<button></button>", props).button(this)
					.addClass(addCls).appendTo(appendTo);
				}
			this.click = click;
		});
	},
	_createCombobox: function(comboboxs,direction, appendTo) {
		var that = this;
		if ($.isEmptyObject(comboboxs)) comboboxs = {};
		if (comboboxs instanceof Array === false) {
			comboboxs = [comboboxs];
		}
		$.each(comboboxs, function(i) {
			var	addCls = "",
				removeCls = "";
			removeCls = "coral-corner-all";
			delete this.type;
			this.width = "item";
			if (direction == "left") {
				if (i === 0) {
					addCls = "coral-corner-left";
				}
				addCls = "coral-inner-left";
			} else if (direction == "right") {
				if (i == (comboboxs.length - 1)) {
					addCls = "coral-corner-right";
				}
				addCls = "coral-corner-right";
			} else if (direction == "outerright") {
				addCls = "coral-out-right";
			} else if (direction == "outerleft") {
				addCls = "coral-out-left";
			}
			var combobox1 = $("<input type='text'/>").appendTo("body");
			combobox1.off(".aaa")
				.on("comboboxonload.aaa", {target: combobox1}, function(e){
					that.load.apply(e.data.target.combobox("instance"));
				})
				.on("comboboxonchange.aaa", {target: combobox1}, function(e){
					that.load.apply(e.data.target.combobox("instance"));
				})
				.combobox(this);
			combobox1
				.combobox("component").addClass(addCls)
				.removeClass(removeCls)
				.appendTo(appendTo)
			    .addClass("coral-DropDownButton");
		});
	},
	load: function(){
		var opts = this.options,
	        sumWidth = 0;
		if (this.component().closest(".coral-inner")) {
			if (this.component().hasClass("coral-inner-left")) {
				$(".coral-inner").find(".coral-inner-left").each(function() {
					sumWidth += $(this).width();
				})
				var elementBorder = this.component().closest(".coral-textbox-border");
				elementBorder.css("padding-left",sumWidth);
			}
		}
		if (this.component().closest(".coral-outer")) {
			if (this.component().hasClass("coral-out-right")) {
				this._getOuterButton("right");
			} else if (this.component().hasClass("coral-out-left")) {
				this._getOuterButton("left");
			}
		}
	},
	_getOuterButton:function(direction){
		var gutter = this.options.inputButtonGutter,sumWidth = 0;
		if (this.component().hasClass("coral-out-" + direction)) {
			$(".coral-outer").find(".coral-out-" + direction).each(function(){
				sumWidth += $(this).width();
			})
			this.component().closest(".coral-outer").css("width", sumWidth);
			this.component()
				.closest(".coral-outer")
				.closest(".coral-textbox")
				.css(
					"padding-" + direction, 
					sumWidth + gutter
				);
			
		} 
	}
});
})(jQuery);