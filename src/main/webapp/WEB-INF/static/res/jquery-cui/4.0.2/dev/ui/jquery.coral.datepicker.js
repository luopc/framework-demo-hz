/*!
 * jQuery CORALI Datepicker 4.0.1
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.coral, { datepicker: { version: "4.0.2" } });

var PROP_NAME = "coral-datepicker",
	datepicker_instActive;

/* 日历组件管理
 * 此类使用单例模式，$.datepicker用于该日历选择框的交互。
 * 日历选择组件的配置通过一个实例对象来维护，允许多个不同的配置方案在用一个页面上
 */
function Datepicker() {
	this.componentName = "datepicker";
	this.componentFullName = "coral-datepicker";
	this._curInst = null; // 当前在用的实例
	this._keyEvent = false; //  若最后一个是键盘事件
	this._disabledInputs = []; //  日历选择输入框中被禁用的
	this._datepickerShowing = false; //  日历是否为正显示，True为是
	this._inDialog = false; // 日历是否正显示为一个对话框中，True为是
	this._mainDivId = "coral-datepicker-divId"; // 日历选择组件主ID
	this._inlineClass = "coral-datepicker-inline"; // 内嵌标记类名
	this._appendClass = "coral-datepicker-append"; // 附加标记类名
	this._triggerClass = "coral-datepicker-trigger"; //  触发标记类名
	this._dialogClass = "coral-datepicker-dialog"; // 对话框标记类名
	this._disableClass = "coral-datepicker-disabled"; // 禁用标记类名
	this._unselectableClass = "coral-datepicker-unselectable"; // 为选择标记类名
	this._currentClass = "coral-datepicker-current-day"; //当前日期标记类名
	this._dayOverClass = "coral-datepicker-days-cell-over"; // 日期单元格类名
	this.regional = []; // 地域性设置，通过语言代码索引
	this.regional[""] = { // 默认地域设置
		
		//将默认英文改为中文
		closeText: '关闭',//关闭
		prevText: '上月',//上月
		nextText: '下月&#x3E;',//下月
		currentText: '今天',//今天
		// 以下两个属性，将“月”字去掉，选择框内只显示数字，“月”字写死在 select 外面，配置在 monthSuffix 属性
		monthNames: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],//月的名字
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],//月的短名
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],//日期名
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],//日期短名
		dayNamesMin: ['日','一','二','三','四','五','六'],//日期单名
		weekHeader: '周',//周前缀
		dateFormat: 'yyyy-MM-dd',//日期格式
		formatOptions: {
		  ymdFormat: ["dd","MMdd","yyyyMM","yyyyMMdd"],
		  ymFormat:["yyyy","yyyyMM"],
		  yFormat:["yyyy"]
		},
		firstDay: 1,//每周第一天
		isRTL: false,//为True表示右到左语言，否则为左到右
		showMonthAfterYear: true,// 为True表示年份选择优选月份
		yearSuffix: '年',//年与月之间的分隔文字
		monthSuffix: '月' // 月文本配置
		
		
	};
	this._defaults = { //全局默认设置，针对所有日历组件实例
		showOn: "button", //  “focus” 即获得焦点后弹出
			//  “button” 按钮点击后触发，“both” 两者
		showAnim: "fadeIn", // 日历组件弹出时动画，参照jquery动画
		showOptions: {}, // 动画增强选项
		iframePanel: false,
		defaultDate: null, //  默认时间，为空则为今天
		appendText: "", // 输入框显示的文字，例如显示格式 
		buttonText: "...", // 按钮的文字
		buttonImage: "", //按钮的图片Url
		buttonImageOnly: false, // 为True则只有图片，否则将图片赋予按钮
		hideIfNoPrevNext: false, //  为True隐藏 上一个月/下一个月
			// 若为不可用，false 就只是禁用他们
		navigationAsDateFormat: false, //为True日期格式应用于  prev/today/next
		gotoCurrent: false, // 为True则today链接返回为当前选择
		changeMonth: true, //  为True则能直接选择月份，否则仅为 prev/next
		changeYear: true, // 为True则能直接选择年度，否则仅为 prev/next
		complete: true,//是否自动补全日期
		yearRange: "c-30:c+30", //  下拉框中年度范围，默认为当前年度+-10年
		showOtherMonths: true, //为True显示非本月的日期，否则为空白
		selectOtherMonths: true, // 为True允许选择非本月的日期，否则不能
		showWeek: false, // 为True显示 周 的序号
		calculateWeek: this.iso8601Week, //  如何计算年当中的周
			// 使用Date对象返回 周 的数量
		shortYearCutoff: "+10", 
		validDate: true,
		minDate: null, //最小的可选日期，为null则无限制
		maxDate: null, // 最大的可选日期，为null则无限制
		duration: "fast", // 显示、关闭的速度
		beforeShowDay: null, //  方法，使用date并返回一个数组
			// [0]=true 则为可选则的，[1]=自定义css名
			// [2]= 单元格标题，
		beforeShow: null, // 方法，在输入框中返回个性化设定的日历组件
	//	onSelect: null, // 当日期被选择后的方法回调
		onChangeMonthYear: null, // 当月份和年度发生改变时的方法回调
		onClose: null, //当日历组件被关闭时的方法回调
		numberOfMonths: 1, // 显示的月份的数量
		showCurrentAtPos: 0, // 在多月份中当前月份的位置，起始为0
		stepMonths: 1, // 跳过月份的步长
		stepBigMonths: 12, //big links中back/forward跳过月份的步长
		altField: "", //  alt键被存储的值
		altFormat: "", // alt键被存储的日期格式
		constrainInput: true, // 输入被迫按照当前日期格式
		showButtonPanel: true, //  True为显示一个button面板
		autoSize: false, // True输入时按照日期格式调整大小
		disabled: false, // 初始为禁用状态
		
		//补充。。。
		//autoFormat : false, // 是否自动格式化输入日期
		isLabel : false, // 是否输入框为标签项
		readonly : false, // 输入框是否为只读
		showClose: false,
		value : null ,//输入框值
		required : false,//是否为只读
		showStar : true,
		starBefore: false,
		errMsg: null,
		errMsgPosition: "leftBottom",
		startDateId: null,
		endDateId: null,
		onSelect : null ,
		onChange : null,
		onFormatError : null,
		onFormatWarn : null,
		//原始的dateFormat
		srcDateFormat : null,
		zIndex : null,
		name : null,
		triggers: null, // 覆盖 validate 里的 triggers
		excluded: false // true 则不单独校验
		
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend( true, {}, this.regional[ "" ]);
	this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
	this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='coral-datepicker coral-component coral-component-content coral-helper-clearfix coral-corner-all'></div>"));
	this.iframePanel = $("<iframe class='coral-datepicker-iframePanel' style='position:absolute;height:auto;'></iframe>" )

	$( document ).off(".coral-datepicker").on("mousedown.coral-datepicker", "#"+this._mainDivId, function(e){
		if ( $(e.target).hasClass("menuTimeSel")) {
			e.stopPropagation();
			return;
		}
		$(".menuSel").hide();
		e.stopPropagation();
	});
}

$.extend(Datepicker.prototype, {
	//为元素添加类名，指出一个已配置的日历组件
	markerClassName: "hasDatepicker",

	//跟踪最大的显示行数
	maxRows: 4,

	// TODO 重命名“widget”
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/*
	 * 覆盖日历组件实例的默认设置方法。
	 * @param settings object - 新的设置
	 * @return 管理的对象
	 */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},
	// get uiDatepicker
	_componentDatepicker: function (target) {
		return $(target).parent().parent();
	},
	//初始化hidden span input元素
	_init : function(target,inst){
		var id=this._get(inst,"id"),
			name = $(target).attr("name") || this._get(inst,"name") || "",
			value=this._get(inst,"value"),
			width=this._get(inst,"width"),
			height=this._get(inst,"height"),
			cls = this._get(inst,"cls"),
			labelField = this._get(inst, "labelField"),
			showClose = this._get(inst, "showClose"),
			clearIcon = "",
			componentCls = this._get(inst,"componentCls");
		this.originalValue = value;
		if ( name ) { 
			$(target).removeAttr("name");
		}
		if (showClose) {
			clearIcon = "<span class='coral-input-clearIcon cui-icon-cross2'></span>";
		}
		var hidden=$("<input id='"+id+"_srcval' name='"+name+"' type='hidden' value='"+(value==null?"":value)+"'>");
		var span2=$("<span id='"+id+"_span2' class='coral-textbox-border coral-corner-all'>" + clearIcon + "</span>");
		var span1=$("<span id='"+id+"_span1' class='coral-textbox'></span>");
		$(target).addClass("coral-textbox-default coral-validation-datepicker");
		$(target).addClass("coral-form-element-datepicker ctrl-init ctrl-form-element ctrl-init-datepicker");

		if(height!=null){
			span1.outerHeight(height);
			$(target).outerHeight("100%");
		}
		if(width!=null){
			span1.outerWidth(width);
		}
		span1.insertAfter($(target)).addClass(componentCls);
		hidden.appendTo(span2);
		$(target).appendTo(span2).addClass(cls);
	   
		span2.appendTo(span1);
		if( inst.settings.iframePanel ){
			$.datepicker.iframePanel.appendTo("body").hide();
		};
		if (null != labelField) {
			var uiLabel = $("<label class=\"coral-label\">"+ labelField +"</label>");
			span2.before(uiLabel);
			span1.addClass("coral-hasLabel");
		}
	},
	/*
	 * 日历组件附加jquery选择器
	 * @param target element - 目标对象为 输入框或div或span
	 * @param settings object - 为日历组件实例使用新的设置
	 */
	_attachDatepicker: function(target, settings) {
		settings = settings || {};
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		
		if (!target.id) {
			if (settings.id) {
				target.id = settings.id;
			}else{
				/*this.uuid += 1;
				target.id = "dp" + this.uuid;*/
			}
			settings.id = $(target).uniqueId().attr("id");
		} else {
			if (settings.id) {
				target.id = settings.id;
			} else {
				settings.id = $(target).uniqueId().attr("id");
			}
		}
		settings.value =  $(target).val() || settings.value || "";
		inst = this._newInst($(target), inline);
		
		//解析input对象中data-options并赋值给响应的settings
		if(nodeName === "input"){
			var dataoptions=$.parser.parseOptions(target,[], ['dataCustom','formatOptions']);
			$.extend( true, settings, dataoptions );
		}
		
		if ( settings.startDateId ) {
			$( "#"+settings.startDateId ).datepicker("option", "endDateId", target.id);
		}
		settings = $.extend({}, this._defaults, $.fn["datepicker"].defaults, settings || {});		
		//如果srcDateFormat没有指定，则将dateFormat复制到srcDateFormat
		if( settings["dateFormat"] != null && 
			settings["srcDateFormat"] == null ){
			settings["srcDateFormat"] = settings["dateFormat"];
		}
		inst.settings = $.extend({}, settings || {});
		//初始化
		this._init(target,inst);
		
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
		//var form = $(target).closest("form");
		// 如果form存在，则不进行添加
		// 如果form不存在，额外的进行添加
		//if ( !form.length && !$.data( $(target)[0], "inited" )) {
		$.validate.addField( $(target), settings );
		//}
	},
	
	//创建一个新的实例对象
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
		this.dpDiv.css({display:"none"});//默认隐藏组件外框Div
		target.attr( "component-role", this.componentName );//身份识别
		return {id: id, input: target, 
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, 
			drawMonth: 0, drawYear: 0, 
			inline: inline, 
			isShow: false,
			dpDiv: (!inline ? this.dpDiv : 
			bindHover($("<div class='" + this._inlineClass + " coral-datepicker coral-datepicker-panel coral-component coral-component-content coral-helper-clearfix coral-corner-all'></div>")))};
	},
	//输入框附加日历组件
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName)
			.keydown(this._doKeyDown)
			.keypress(this._doKeyPress)
			.keyup(this._doKeyUp);
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
		
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		if( inst.settings.readonly ) {
			this._readonlyDatepicker( target,inst.settings.readonly);
		}
		if( inst.settings.isLabel ) {
			this._isLabelDatepicker( target,inst.settings.isLabel);
		}
		/*if( inst.settings.required && inst.settings.showStar) {
			$.validate._showRequire(input.parent().parent());
		}*/
	},
	//处理defaultDate
	_processDefaultDate : function(that,inst,defaultDate){
		if(defaultDate==""){
			inst.selectedDay = inst.currentDay = null;
			inst.selectedMonth = inst.currentMonth = null;
			inst.selectedYear = inst.currentYear = null;
			
			inst.currentHur=null;
			inst.currentMiu=null;
			inst.currentSed=null;
			inst.input.val("");
			return null;
		}
		var dateFormat=that._get(inst,"dateFormat");
		var defaultDateObj=null;
		try{
			defaultDateObj=that.parseDate(dateFormat,defaultDate,that._getFormatConfig(inst));
		}catch(e){
			//触发格式化错误事件
			that._apply(inst,"onFormatError",[defaultDate,inst]);
			that._apply(inst,"onFormatWarn",[defaultDate,inst]);
			return null;
		}
		inst.selectedDay = inst.currentDay = defaultDateObj.getDate();
		inst.selectedMonth = inst.currentMonth = defaultDateObj.getMonth();
		inst.selectedYear = inst.currentYear = defaultDateObj.getFullYear();
		
		inst.currentHur=defaultDateObj.getHours();
		inst.currentMiu=defaultDateObj.getMinutes ();
		inst.currentSed=defaultDateObj.getSeconds();
		var date=that._daylightSavingAdjustWidthTime(new Date(inst.currentYear, inst.currentMonth, inst.currentDay),[inst.currentHur,inst.currentMiu,inst.currentSed]);
		var datestr = "";
		if ( !inst.settings.value && defaultDate ) {
			inst.settings.value = defaultDate;
		}
		if ( inst.settings.value != "" ) {
			var srcDateFormat = this.getFormatter(inst.settings.value,this._get(inst,"dateFormat"), this._getFormatConfig(inst));
			datestr = this.completeFormate(srcDateFormat,dateFormat,inst);
			datestr = this.formatDate(datestr, date, this._getFormatConfig(inst));
		} 
		inst.input.val(datestr);
		return date;
	},
	//基于settings上附加内容
	_attachments: function(input, inst) {
		var that =this;
		var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.unbind("focus", this._showDatepicker);
		input.unbind("blur");
		input.parent().unbind("mouseleave");
		input.parent().unbind("mouseenter");
		input.unbind(".attachments");

		if (inst.trigger) {
			inst.trigger.remove();
		}
		//将defaultDate值赋值给input，并格式化为显示格式
		var defaultDate= that._get(inst, "value");
		if("" == input.parent().find("input[type='hidden']").val() && typeof defaultDate==="string" && defaultDate!=''){				
			that._processDefaultDate(that,inst,defaultDate);
			that._setHiddenInputValue(inst);//设置隐藏字段值
		} else {
			var valueDate = that._getHiddenInputValue(inst);
			that._processDefaultDate(that,inst,valueDate);
		}
		input.parent().find(".coral-input-clearIcon").unbind("click").bind("click", function(e){
			that._clearDate(inst);
		});
		showOn = this._get(inst, "showOn");
		input.focus(function(e){
			//that._inputFocus(inst);
			if (showOn === "focus" || showOn === "both") { //  在被标记的域中弹出日历组件
				that._showDatepicker(e);
			}
		});
		if (showOn === "button" || showOn === "both") {
			// 按钮点击时弹出日历组件
			buttonText = this._get(inst, "buttonText");
			inst.trigger = $("<span/>").addClass("coral-icon-calendar cui-icon-calendar4");
			
			input[isRTL ? "before" : "after"](inst.trigger);
			if(this._get(inst, "isLabel")!=true){
				input.parent().addClass("coral-datepicker-no-close");
			}
			inst.trigger.click(function(e) {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					//$.datepicker._showDatepicker(input[0]);//取消重复调用
				} else {
					//$.datepicker._showDatepicker(input[0]);//取消重复调用
				}
				$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
		input.blur(function(e){
			that._inputBlur(inst,e);
		});
		//增加验证
		input.parent().mouseleave(function() {
			if ( inst.settings.readonly || inst.settings.isLabel || inst.settings.disabled ) {
				return ;
			}
			input.parent().parent().removeClass("coral-textbox-hover");
		});    
		//lihaibo add
		input.parent().mouseenter(function(){
			if ( inst.settings.readonly || inst.settings.isLabel || inst.settings.disabled ) {
				return ;
			}
			input.parent().parent().addClass("coral-textbox-hover");
		});
	/*	input.keyup(function(e){
			switch (e.keyCode) {
			case 9:
				$.datepicker._showDatepicker( e );
				break;
			}
		});*/
		input.bind("keyup.attachments", function(e){
			switch (e.keyCode) {
			case 9:
				$.datepicker._showDatepicker( e );
				break;
			}
		})
	},

	//为日期格式应用最大长度
	_autoSize: function(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // 确定浮点位数
				dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},
	//div中加入日历组件
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//若disabled 为True，在显示前禁用日历组件
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// 设置display为block 代替 inst.dpDiv.show() 不能工作在未连接的元素
		inst.dpDiv.css( "display", "block" );
	},

	/*
	 * 在对话框中弹出日历组件
	 * @param input - 忽略的
	 * @param data string or Date - 显示的初始日期
	 * @param onSelect function - 当日期被选中是触发的回调函数
	 * @param settings object - 更新对话框中日历组件实例的设置
	 * @param pos int[2] - 等同于 对话框在屏幕中的位置
	 * 					event - x/y
	 * @return 对象 
	 */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.keydown(this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = 
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// 移动焦点至屏幕中的输入项，之后隐藏对话框
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},
	//将目标对象与日历组件分离
	_destroyDatepicker: function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		$(target).parent().parent().replaceWith($target);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind("blur").
				unbind("focus", this._showDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}
		$(target).val("");
		$(target).removeAttr("value");
		$target.removeAttr( "component-role" )
			   .removeClass("coral-textbox-default coral-validation-datepicker coral-form-element-datepicker ctrl-init ctrl-form-element ctrl-init-datepicker")
			   .removeAttr("data-options");
	},

	//启用日历组件到一个jquery选择器上
	_enableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		//$(target).parent().parent().css({opacity: "1"});
		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").
				each(function() { this.disabled = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
			$target.parent().parent().removeClass("coral-state-disabled");
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("coral-state-disabled");
			inline.find("select.coral-datepicker-month, select.coral-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
	},

	//禁用日历组件到一个jquery选择器上
	_disableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		//$(target).parent().parent().css({opacity: "0.5"});
		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.css({opacity: "0.5", cursor: "default"});
			
			$target.parent().parent().addClass("coral-state-disabled");
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("coral-state-disabled");
			inline.find("select.coral-datepicker-month, select.coral-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},
	/**
	 * 设置日历组件为只读
	 */
	_readonlyDatepicker: function(target,flag){
		var inline,
			$target = $(target);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		$(target).parent().parent().removeClass( "coral-isLabel" );
		$(target).parent().parent().toggleClass( "coral-readonly", flag );
		$.datepicker._readonly(target,flag);
	},
	_readonly: function(target,flag){
		var nodeName = target.nodeName.toLowerCase(),
			inst = $.data(target, PROP_NAME);
		if (nodeName === "input" && flag) {
			target.readOnly = true;
			inst.trigger.filter("button").
				each(function() { this.readOnly = true; }).end().
				filter("img").css({opacity: "0.5", cursor: "default"});
		}
		if (nodeName === "input" && !flag) {
			if($.datepicker._isIsLabelDatepicker(inst))return ;
			target.readOnly = false;
			inst.trigger.filter("button").
				each(function() { this.readOnly = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
		}
	},
	/**
	 * 日历组件是否为只读
	 */
	_isReadonlyDatepicker: function(inst) {
		if($.datepicker._get(inst,"readonly")){
			return $.datepicker._get(inst,"readonly");
		}
		return false;
	},
	
	_isIsLabelDatepicker: function(inst) {
		if($.datepicker._get(inst,"isLabel")){
			return $.datepicker._get(inst,"isLabel");
		}
		return false;
	},
	/**
	 * 设置日历组件为只读
	 */
	_isLabelDatepicker: function(target,flag){
		var inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var id=$.datepicker._get(inst,"id");
		//修改样式
		if(flag){
			$target.parent().removeClass("coral-datepicker-no-close");
			$target.parent().parent().removeClass("coral-readonly");
			$target.parent().parent().addClass("coral-isLabel");
		}else{
			$target.parent().parent().removeClass("coral-isLabel coral-readonly");
			$target.parent().addClass("coral-datepicker-no-close");
		}
		//设置为只读 标签
		$.datepicker._set(inst,"readonly",flag);
		$.datepicker._set(inst,"isLabel",flag);
		$.datepicker._readonly(target,flag);
	},
	
	/*
	 * 是否第一个jquery组件禁用的日历组件
	 * @param target element - 输入框  或 div 或 span
	 * @return boolean - true 为禁用的，false 为启用的
	 */	
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/*
	 * 从目标对象中得到日历组件的实例
	 * @param target element - 输入框  或 div 或 span
	 * @return object - 关联的实例对象
	 * @throws 获得实例对象报错
	 */
	_getInst: function(target) {
		try {
			if('object' === target.nodeName.toLowerCase()){
				return false;
			}

			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/**
	 * 用于更新option参数时赋值的方法
	 * @param target element - 目标对象
	 * @param key object - 新的设置对象
	 * 			   string - 设置的key
	 * @param value any - 新的value
	 */
	_optionDatepicker: function(target, key, value) {
		var that = this;
		var settings, date, minDate, maxDate,
			inst = this._getInst(target);

		if (arguments.length === 2 && typeof key === "string") {
			return (key === "defaults" ? $.extend({}, $.datepicker._defaults) :
				(inst ? (key === "all" ? $.extend({}, inst.settings) :
				this._get(inst, key)) : null));
		}
		if (arguments.length === 1 ) {
			return inst ? $.extend({}, inst.settings) : null;
		}
		settings = key || {};
		if (typeof key === "string") {
			settings = {};
			settings[key] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date=this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			extendRemove(inst.settings, settings);
			if( key=="value" ){
				date = that._processDefaultDate(that,inst, value);
				//设置隐藏字段值
			}
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			
			if ( "disabled" in settings ) {
				if ( settings.disabled ) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			if ( "readonly" in settings ) {
				this._readonlyDatepicker(target,settings.readonly);
			}
			if ( "isLabel" in settings ) {
				this._isLabelDatepicker(target,settings.isLabel);
			}
			if ( "showAnim" in settings ) {
				//下拉显示的时候无需进行下面的初始化操作
				return;
			}
			if ( key === "startDateId" ) {
				$( "#"+value ).datepicker( "option", "endDateId", this._get( inst, "id" ) );
			}
			
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			if ( inst.isShow ) {
				this._updateDatepicker(inst);
			}
			this._updateAlternate(inst);
			this._setHiddenInputValue(inst);
			/*//防止日期框意外显示
			if($.datepicker._datepickerShowing===false){
				inst.dpDiv.css({display:"none"});
			}*/
			$(target).trigger( "onOptionChange", {key: key, value: settings[ key ]} );
		}
	},
	_validDatepicker: function( target ){
		var data = {
			hasTips: false,
			element: $(target)
		};
		return ( $.validate.validateField( null, data ).length > 0 ? false : true );
	},
	//发生变化的方法
	_changeDatepicker: function(target, key, value) {
		this._optionDatepicker(target, key, value);
	},
	/**
	 * 日历组件的刷新方法
	 */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},
	_resetDatepicker: function(target){
		$(target).datepicker("option", "value", this.originalValue);
	},
	/**
	 * 设置日历组件的日期
	 */
	_setValueDatepicker: function(target, value) {
		$(target).datepicker("option", "value", value)
	},
	
	/**
	 * 取得日历组件的日期
	 */
	_getValueDatepicker: function(target, noDefault) {
		return $(target).datepicker("option", "value");
	},
	/**
	 * 设置日历组件的日期
	 */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			//var tmpDateFormat=this._get(inst,"dateFormat");
		//	this._set(inst,"dateFormat",editFormat);
			this._setDate(inst, date);
			//this._set(inst,"dateFormat",tmpDateFormat);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//设置隐藏字段值
			this._setHiddenInputValue(inst);
		}
	},
	
	/**
	 * 取得日历组件的日期
	 */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return (inst ? this._getDate(inst) : null);
	},
	/**
	 * 取得日历组件的显示值
	 */
	_getDateValueDatepicker: function(target) {
		var inst = this._getInst(target);
		//if( !inst.currentYear ) return "";
		return this._getHiddenInputValue(inst);
		/*var str=this._formatDate(inst);
		return str;*/
	},

	//执行keydown事件
	_doKeyDown: function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".coral-datepicker-rtl");
		var oldValue = $.datepicker._getHiddenInputValue(inst);
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; //  屏蔽Tab
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
									$.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);
							// 触发回调
							//onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}
						return false; // form中不提交
				case 27: $.datepicker._hideDatepicker();
						break; // 屏蔽 escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(inst);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // 显示日历 date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			// 对输入框的keyDown事件
			handled = false;
			switch (event.keyCode) {
			case 9:
			case 13: 
				$.datepicker._setHiddenInputValue(inst);
				datestr = $.datepicker._getHiddenInputValue(inst);
				$.datepicker._change(inst, oldValue, datestr);
				break; 
			}
		}
		// added by mengshuai begin onKeydown
		$.datepicker._trigger(inst, "onKeyDown", event, [ { "oldValue": oldValue, "value": inst.input.val() } ]);
		// added by mengshuai end
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},
	_change: function(inst, oldValue, value, event){
		if ( oldValue != value ) {
			this._trigger(inst, "onChange", event, [ { "oldValue": oldValue,"newValue": value,"value": value } ]);
		}
	},

	//执行keypress事件
	_doKeyPress: function(event) {
		/*var chars, chr,
			inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
		}*/
	},

	//执行keyup事件
	_doKeyUp: function(event) {
		var date,
			inst = $.datepicker._getInst(event.target);
		var oldValue = $.datepicker._getHiddenInputValue(inst);
		if (inst.input.val() !== inst.lastVal) {
			try {
				//支持通过键盘删除日期操作
				if(inst.input.val()==""){
					inst.selectedDay = null;
					inst.drawMonth = inst.selectedMonth = null;
					inst.drawYear = inst.selectedYear = null;
					inst.currentDay = null;
					inst.currentMonth = null;
					inst.currentYear = null;
					inst.currentHur = null;
					inst.currentMiu = null;
					inst.currentSed = null;
					
				}
				
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				// 标识是用户在键盘输入的编辑状态
				inst.input.addClass("isEdit");
					

				if (date && $.datepicker._checkDateRange(inst,date)===0) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					//$.datepicker._updateDatepicker(inst);
				}
				//触发修改事件
				var dateStr=inst.input.val();
			//	$.datepicker._trigger(inst, "onChange", event, [ { "oldValue": oldValue, "newValue": datestr,"value": datestr } ]);
			//	$.datepicker._apply(inst,"onChange",[dateStr,inst]);
			//	this._apply( inst,"onChange",[ { "oldValue": oldValue, "newValue": datestr,"value": datestr } ] );
				//设置隐藏字段值
			//	$.datepicker._setHiddenInputValue(inst);
			}catch (err) {
				//触发格式化错误事件
				var dateStr=inst.input.val();
				$.datepicker._apply(inst,"onFormatError",[dateStr,inst]);
				$.datepicker._apply(inst,"onFormatWarn",[dateStr,inst]);
			}
			$.datepicker._trigger(inst, "onKeyUp", event, [ { "oldValue": oldValue, "value": inst.input.val() } ]);
		}
		return true;
	},
	/**
	 * 重定义_trigger
	 */
	_trigger: function( inst, type, event, data ) {
		var prop, orig, rData = {};

		data = data || {};
		event = $.Event( event );
		event.type = ("datepicker" + type ).toLowerCase();
		event.target =  inst.input[0];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		$(event.target).trigger( event, data );
		var callback = $.datepicker._get(inst, type);
		var dataCustom = $.datepicker._get(inst, "dataCustom");
		var fn = $.coral.toFunction(callback);
		event.data = event.data || {};
		// TODO: dataCustom// 
		$.extend(event.data, dataCustom);
		return !( $.isFunction(fn) && fn.apply( (inst.input ? inst.input[0] : null), [ event ].concat( data ) ) === false || event.isDefaultPrevented() );
	},
	/**
	 * 检查日期时间是否在最大最小日期范围内
	 * @return 0在minDate和maxDate之间  1大于maxDate 2小于minDate 
	 */
	_checkDateRange : function(inst,date){
		var minDate = this._getMinMaxDate(inst, "min");
		var maxDate = this._getMinMaxDate(inst, "max");
		if(maxDate!=null && date>maxDate){
			return 1;
		}
		if(minDate!=null && date<minDate){
			return 2;
		}
		return 0; 
	},
	//获取srcDateFormat的分隔符是什么
	_srcDateFormatSeparator : function(srcDateFormat){
		var separator = "/";
		if(srcDateFormat.indexOf("/")>-1){
			return separator;
		}
		if(srcDateFormat.indexOf("-")>-1){
			separator = "-";
			return separator;
		}
	},
	/**
	 * 设置隐藏input字段值,getValue()取值的时候，若complete==false,只能根据显示值的格式来显示，但是分隔符可以根据隐藏值的格式显示，
	 * 例如：显示值为2015-12，隐藏值srcDateFormat=“yyyy/MM/dd”，则getValue()取到的值为2015/12
	 */
	_setHiddenInputValue :function(inst) {
		// 修改赋值bug 20150129
		if (inst.input.val() == "") {
			inst.input.parent().find("input[type='hidden']").val("");
			return ;
		}
		var dateFormat=this._get(inst,"dateFormat");
		var srcDateFormat = srcDateFormat || this._get(inst,"srcDateFormat");//this._get(inst,"srcDateFormat");
		var separator = this._srcDateFormatSeparator(srcDateFormat);
		if(inst.currentYear==null || inst.currentMonth==null){
			inst.input.parent().find("input[type='hidden']").val("");
			return ;
		}
		var date=this._daylightSavingAdjustWidthTime(new Date(inst.currentYear, inst.currentMonth, inst.currentDay),[inst.currentHur,inst.currentMiu,inst.currentSed]);
		var format = this.getFormatter(inst.input.val(),this._get(inst,"dateFormat"), this._getFormatConfig(inst));
			datestr = this.completeFormate(format,dateFormat,inst);
		if(this._get(inst,"complete")){
			var dateStr=this.formatDate(srcDateFormat, date, this._getFormatConfig(inst));
		}else {
			//getValue()的时候如果配置的srcDateFormat有分隔符，按照下面的处理，取到值的分隔符按照srcDateFormat的分隔符显示
			if(srcDateFormat.indexOf("-")>-1 ||srcDateFormat.indexOf("/")>-1 ){
				datestr = (datestr.indexOf("y")>-1 && datestr.indexOf("M")>-1 && datestr.indexOf("d")>-1)?srcDateFormat:datestr; 
				var dateStr = this.formatDate(datestr, date, this._getFormatConfig(inst));
				if(dateStr.indexOf("-") > -1){
					var dateStr = dateStr.indexOf(separator) ==-1 ? dateStr.replace(/-/gm,separator):dateStr;
				}else if(dateStr.indexOf("/") > -1){
					var dateStr = dateStr.indexOf(separator) ==-1 ? dateStr.replace(/\//gm,separator):dateStr;
				}
			}else{
				//如果srcDateFormat没有分隔符，例如srcDateFormat=“yyyyMMdd”,按如下处理
				datestr = datestr.indexOf("-")>-1?datestr.replace(/-/gm,""):datestr.replace(/\//gm,"");
				if(datestr.indexOf("y")>-1){
					if(datestr.indexOf("d")==-1 && datestr.indexOf("y")>-1 && datestr.indexOf("M")>-1){
						srcDateFormat = (srcDateFormat.split(" "))[0];
						datestr = srcDateFormat.replace(/d/gm,"");
					}
					if(datestr.indexOf("y")>-1 && datestr.indexOf("M")>-1 && datestr.indexOf("d")>-1){
						datestr = srcDateFormat;
					}else{
						datestr = datestr;
					}
				}
				var dateStr=this.formatDate(datestr, date, this._getFormatConfig(inst));
			}
		}
		inst.input.parent().find("input[type='hidden']").val(dateStr);
	},
	/**
	 * 取得隐藏字段值
	 */
	_getHiddenInputValue:function(inst){
		var id=this._get(inst,"id");
		return inst.input.parent().find("input[type='hidden']").val();
	},
	//根据dateFormat构件editFormat
	_createEditFormat : function(dateFormat){
		var editFormat="";
		if(dateFormat!=null){
			if(this._isYearMonthMode(dateFormat)){
				editFormat+="yyyy-MM";
			}else if(this._isYearMode(dateFormat)){
				editFormat+="yyyy";
			}else{
				editFormat+="yyyy-MM-dd";
			}
			if(this._hasTime(dateFormat)){
				editFormat+=" HH:mm:ss";
			}
		}
		return editFormat;
	},
	//如果complete为true，返回dateFormat即自动补全；若complete为false,根据配置的格式来显示
	completeFormate : function(dateshow,dateFormat,inst){
		var str1,str2,mark = null;
		var dateformat = dateFormat.indexOf("H")>-1?(dateFormat.split(" "))[0]:dateFormat;
		if(this._get(inst,"complete")){
			return dateFormat;
		}else{
			//若dateformat不含“dd”,则只需根据dateFormat的格式来显示
			if(dateformat.indexOf("d") == -1){
				if(dateformat.indexOf("d") == -1 && dateshow.indexOf("M") == -1){
					return dateshow;
				}
				return dateformat;
			}
			//若dateFormat中有“dd”,则根据配置的模式显示，但是样式要和dateFormat的样式一样
			if(dateformat.indexOf("d") > -1){
				var posYear = dateformat.indexOf("y"),
				 	posDay =  dateformat.indexOf("d"),
				 	substr1 = dateformat.substr(posDay + 2,dateformat.length),
					substr2 = dateformat.substr(0,posDay-1),
					substr3 = dateformat.substr(0,posDay + 2);
				//如果dateshow只有两位,即dd,则直接返回dateshow
				if(dateshow.length == 2){
					return dateshow;
				}
				//如果dateshow为yyyyMMdd,则返回dateFormat的格式
				if(dateshow.indexOf("y") > -1 && dateshow.indexOf("d") > -1 && dateshow.indexOf("M") > -1){
					return dateFormat;
				}
				//如果dateshow不含dd,比如“yyyyMM”,根据dateFormat格式返回
				if(dateshow.indexOf("d") == -1){
					if(dateshow.indexOf("M") == -1){
						return dateshow;
					}
					if( posDay == 0){
						datestr = substr1;
					}
					if(posDay == 8){
						datestr = substr2;
					}
					if(posDay == 3){
						datestr = substr2 + substr1;
					}
				}else if(dateshow.indexOf("y") == -1){
					if( posYear == 0){
						datestr = dateformat.substr(posYear + 5,5);
					}
					if(posYear == 6){
						datestr = dateformat.substr(0,posYear-1);
					}
				}
			}
			return datestr;
		}
	},
	//输入框获得焦点的时候将显示格式换成编辑格式
	_inputFocus : function(inst){
		/*var dateFormat=this._get(inst,"dateFormat");
		
		if($.datepicker._isReadonlyDatepicker(inst) || $.datepicker._isIsLabelDatepicker(inst)){
			return ;
		}
		$.datepicker._componentDatepicker(inst.input).addClass( "coral-state-focus" );
		var datestr = "";
		//TODO: 是否需要删除赋值
		// 修改赋值bug 20150129
		var date=this._daylightSavingAdjustWidthTime(new Date(inst.currentYear, inst.currentMonth, inst.currentDay),[inst.currentHur,inst.currentMiu,inst.currentSed]);
		if ( inst.currentYear && inst.input.val() !== "") {
			var srcDateFormat = this.getFormatter(inst.input.val(),this._get(inst,"dateFormat"), this._getFormatConfig(inst));
			var datestr = this.completeFormate(srcDateFormat,dateFormat,inst);
			datestr = this.formatDate(datestr, date, this._getFormatConfig(inst));
		}
		inst.input.val(datestr);*/
		//$("#dateinput2").val("dateFormat="+this._get(inst,"dateFormat"));
	},
	//失去焦点的时候将编辑格式换成显示格式
	_inputBlur : function(inst,e){
		$.datepicker._componentDatepicker(inst.input).removeClass( "coral-state-focus" );
		var dateFormat=this._get(inst,"dateFormat");
		if($.datepicker._isReadonlyDatepicker(inst) || $.datepicker._isIsLabelDatepicker(inst)){
			return ;
		}
		var oldValue = this._getHiddenInputValue(inst);
		var datestr = "";
		var date=this._daylightSavingAdjustWidthTime(new Date(inst.currentYear, inst.currentMonth, inst.currentDay),[inst.currentHur,inst.currentMiu,inst.currentSed]);
		// 日期面板不显示的时候才触发onBlur事件和onChange事件；
		// 日期面板显示的时候，onChange事件交给面板上面的事件去处理；
		if ( (typeof inst.currentYear != "undefined" || inst.currentYear != null) && !inst.isShow ) {
			var srcDateFormat = this.getFormatter(inst.input.val(),this._get(inst,"dateFormat"), this._getFormatConfig(inst));
			// 修改赋值bug 20150129
			if ( "" != inst.input.val() ) {
				datestr = this.completeFormate(srcDateFormat,dateFormat,inst);
				datestr = this.formatDate(datestr, date, this._getFormatConfig(inst));
			} 
			inst.input.val(datestr);
			this._setHiddenInputValue(inst);
			//var value = this._getHiddenInputValue(inst);
			//设置隐藏字段值
			if( datestr !== oldValue ) {
				var startDateId = this._get(inst, "startDateId");
				var endDateId = this._get(inst, "endDateId");
				if ( startDateId ) {
					$( "#"+startDateId ).datepicker("option", "maxDate", datestr);
				}
				if ( endDateId ) {
					$( "#"+endDateId ).datepicker("option", "minDate", datestr);
				}
			}
			$.datepicker._change(inst, oldValue, datestr, null);
			this._trigger(inst, "onBlur", e, [ { "value": datestr } ]);
		}
	},
	/**
	 * 获取焦点方法
	 */
	_focusDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input || $.datepicker._isReadonlyDatepicker($.datepicker._getInst(input)) || $.datepicker._isIsLabelDatepicker($.datepicker._getInst(input))) { // already here
			return false;
		}

		var inst = $.datepicker._getInst(input);
		inst.input.focus();
		return true;
	},
	//在给定的输入字段上弹出日历组件
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ( $.datepicker._isDisabledDatepicker(input) || 
				$.datepicker._lastInput === input || 
				$.datepicker._isReadonlyDatepicker( $.datepicker._getInst( input ) ) || 
				$.datepicker._isIsLabelDatepicker( $.datepicker._getInst( input ) ) ) { // already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		
		if ( $.datepicker._curInst && $.datepicker._curInst !== inst ) {
			$.datepicker._curInst.dpDiv.stop( true, true );
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ( $.datepicker._inDialog ) { // 隐藏 cursor
			input.value = "";
		}
		if ( !$.datepicker._pos ) { // 
			$.datepicker._pos = $.datepicker._findPos( input );
			$.datepicker._pos[1] += input.offsetHeight; // 增加高度
		}
		isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;

		inst.dpDiv.empty();
		
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
		this.iframePanel.css({position: "absolute", display: "block", top: "-1000px"});
		$.datepicker._updateDatepicker(inst);
		
		var panel = $(inst.dpDiv),
	        ifPanel = this.iframePanel, 
            width = panel.width(),
	        height = panel.height();
	    
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px"});
		this.iframePanel.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px", width:width, height:height});
		if ( !inst.isShow ) {
			inst.isShow = true;
			if (!inst.inline) {
				showAnim = $.datepicker._get(inst, "showAnim");
				duration = $.datepicker._get(inst, "duration");
				if(this._get(inst,"zIndex")!=null){
					inst.dpDiv.zIndex(this._get(inst,"zIndex")+1);
					this.iframePanel.zIndex(this._get(inst,"zIndex"));
				}
				//inst.dpDiv.zIndex($(input).zIndex()+1);
				$.datepicker._datepickerShowing = true;
	
				if ( $.effects && $.effects.effect[ showAnim ] ) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
				} else {
					inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
				}
				this.iframePanel.show(showAnim);   
				if ( $.datepicker._shouldFocusInput( inst ) ) {
					inst.input.focus();
				}
	
				$.datepicker._curInst = inst;
			}
			
			(function move () {
				var datepickerComponent = $(input).parent().parent();
				    
				
				if (inst.isShow) {
					panel.css({
						left : $.coral.getLeft( panel, datepickerComponent ),
						top  : $.coral.getTop( panel, datepickerComponent )
					});
					ifPanel.css({
						left : $.coral.getLeft( panel, datepickerComponent ),
						top  : $.coral.getTop( panel, datepickerComponent )
					});
					setTimeout(move, 200);
				}
			})();
		}
		inst.dpDiv.find( "#dpTimeSpinner" ).spinner( "setValue", inst.dpDiv.find("#dpTimeHour").val() );
	},
	_updateDateTime: function(inst){
		var that = this,hur,min,sed;
		var minDate = this._getMinMaxDate(inst, "min");
		var maxDate = this._getMinMaxDate(inst, "max");
		var minDay = new Date(minDate);
			maxDay = new Date(maxDate);
		var compDate = new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay),
			compMin= new Date(minDay.getFullYear(),minDay.getMonth(),minDay.getDate()),
			compMax= new Date(maxDay.getFullYear(),maxDay.getMonth(),maxDay.getDate());
		inst.dpDiv.find( "#dpTimeSpinner" ).spinner({
			max: 24,
			min: 0,
			step: 1,
			componentCls: "dptimespinner",
			onSpin: function( e, ui ){
				var value = $(this).spinner( "getValue" );
				if ( $.datepicker.focusInput == "dpTimeHour" ) {
						inst.dpDiv.find("#dpTimeHour").val(ui.value);
						hur = inst.dpDiv.find("#dpTimeHour").val();
					if(new Date(compDate).getTime() == new Date(compMin).getTime() &&(minDate && hur < minDay.getHours())|| (maxDate && hur > maxDay.getHours())){
						inst.dpDiv.find("#dpTimeHour").val(value);
						return false;
					}
				}
				if ( $.datepicker.focusInput == "dpTimeMinute" ) {
						inst.dpDiv.find("#dpTimeMinute").val(ui.value);
						var min = inst.dpDiv.find("#dpTimeMinute").val();
						var hour = inst.dpDiv.find("#dpTimeHour").val();
					if(new Date(compDate).getTime() == new Date(compMin).getTime() && (minDate && min < minDay.getMinutes() && hour <= minDay.getHours())|| (maxDate && min >= maxDay.getMinutes() && hour >= maxDay.getHours())){
						inst.dpDiv.find("#dpTimeMinute").val(value);
						return false;
					}
				}
				if ( $.datepicker.focusInput == "dpTimeSecond" ) {
						inst.dpDiv.find("#dpTimeSecond").val(ui.value);
						sed = inst.dpDiv.find("#dpTimeSecond").val();
						var hour = inst.dpDiv.find("#dpTimeHour").val(),
							miu = inst.dpDiv.find("#dpTimeMinute").val();
					if(new Date(compDate).getTime() == new Date(compMin).getTime() &&(minDate && sed < minDay.getSeconds() && hour <= minDay.getHours() && miu <= minDay.getMinutes())|| (maxDate && sed > maxDay.getSeconds()&& hour >= maxDay.getHours()&& miu >= maxDay.getMinutes())){
						inst.dpDiv.find("#dpTimeSecond").val(value);
						return false;
					}
				}
			}
		});
		inst.dpDiv.find( "#dpTimeSpinner" ).spinner( "setValue", inst.dpDiv.find("#dpTimeHour").val() );
	},
	// 更新日历组件
	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		
		this._updateDateTime(inst);
		this._attachHandlers(inst);
		this._attachTimeHandlers(inst);
		
		var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17,
			activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );

		if ( activeCell.length > 0 ) {
			datepicker_handleMouseover.apply( activeCell.get( 0 ) );
		}
		
		inst.dpDiv.removeClass("coral-datepicker-multi-2 coral-datepicker-multi-3 coral-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("coral-datepicker-multi-" + cols).css("width", (width * cols) + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("coral-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("coral-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
			//inst.input.focus();
		}		
		// 
		if( inst.yearshtml ){
			origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find("select.coral-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	
	_shouldFocusInput: function( inst ) {
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
	},

	/* 检查屏幕中剩余位置 */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* 发现指定对象在屏幕中的位置. */
	_findPos: function(obj) {
		var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	//隐藏日历组件
	_hideDatepicker: function(input) {
		var showAnim, duration, postProcess, onClose,
			inst = this._curInst;
		if (!inst || (input && inst !== $.data(input, PROP_NAME))) {
			return;
		}
		inst.isShow = false;
		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
			}
            this.iframePanel.hide();
            
			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},


	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind(".coral-datepicker-calendar");
	},


	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);
		if (event.isDefaultPrevented()) {return};
		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
		}
	},

	//调整日期字段
	_adjustDate: function(id, offset, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0]) || $.datepicker._isReadonlyDatepicker(inst) || $.datepicker._isIsLabelDatepicker(inst)) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), 
			period);
		this._updateDatepicker(inst);
	},

	//响应gotoToday
	_gotoToday: function(id) {
		var that = this,
			date,
			target = $(id),
			inst = this._getInst(target[0]);
		var hasTime = this._hasTime(this._get(inst,"dateFormat"));
		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			if ( !hasTime ) {
				date.setHours(0, 0, 0, 0);
			}
			if(that._checkDateRange(inst,date)===1){
				return;
			}else if(that._checkDateRange(inst,date)===2){
				return;
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentHur = date.getHours();
			inst.currentMiu = date.getMinutes();
			inst.currentSed = date.getSeconds();
			
		}
		this._notifyChange(inst);
		this._adjustDate(target);
		// 如果没有时间格式，点击“今天”按钮， 则默认选中今天的日期
		
		if (!hasTime) {
			var $targetToday = inst.dpDiv.children("table").find(".coral-datepicker-today");
			this._selectDay(id, +$targetToday.attr("data-month"), +$targetToday.attr("data-year"), $targetToday[0]);
		}else{
			this._selectDateTime(inst);
		}
		this._updateDateTime(inst);
	},

	//响应年月选择

	_selectMonthYear: function(id, select, period, change) {
		var target = $(id),
			inst = this._getInst(target[0]);
		var isYearMonth=this._isYearMonthMode(this._get(inst,"dateFormat"));
		var isYear = this._isYearMode(this._get(inst,"dateFormat"));
		//inst["selected" + (period === "M" ? "Month" : "Year")] =		
		if(isYearMonth===true){
			inst["draw" + (period === "M" ? "Month" : "Year")]=
			parseInt(period === "M" ? $(select).attr("data-month"): select.options[select.selectedIndex].value,10);
		}else if(isYear===true){
			inst["drawYear"]=
				parseInt(period === "Y" ? $(select).attr("data-year"): select.options[select.selectedIndex].value,10);
		}else{
			inst["draw" + (period === "M" ? "Month" : "Year")]=
			parseInt(select.options[select.selectedIndex].value,10);
		}
		inst["selected" + (period === "M" ? "Month" : "Year")]=
		inst["draw" + (period === "M" ? "Month" : "Year")];
			
		var oldValue = this._getHiddenInputValue(inst);
		if(isYearMonth===true && period === "M"){
			this._setMonthYearValue(this,inst);
		}
		if(isYear === true){
			this._setMonthYearValue(this,inst);
			//change = false;
		}
		var value = this._getHiddenInputValue(inst);
		this._notifyChange(inst);
		if(change){
			$.datepicker._change(inst, oldValue, value, null);
		}
		this._adjustDate(target);
	},
	//针对年月模式时的值处理
	_setMonthYearValue : function($this,inst){
		var dateFormat=$this._get(inst,"dateFormat");
		if($this._isYearMonthMode(dateFormat)){
			inst.currentYear=inst.selectedYear;
			inst.currentMonth=inst.selectedMonth;
			inst.currentDay=inst.selectedDay=1;
		}
		if($this._isYearMode(dateFormat)){
			inst.currentYear=inst.selectedYear;
			inst.currentMonth=inst.selectedMonth=1;
			inst.currentDay=inst.selectedDay=1;
		}
		var dateStr = $this._formatDate(inst);
		if (inst.input) {
			inst.input.val(dateStr);
		}
		//设置隐藏字段值
		$this._setHiddenInputValue(inst);
	},

	// 选择的天更新到输入域中
	_selectDay: function(id, month, year, td) {
		var inst,minDate,maxDate
			target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || $.datepicker._isReadonlyDatepicker($.datepicker._getInst(target[0])) || $.datepicker._isIsLabelDatepicker($.datepicker._getInst(target[0]))) {
			return;
		}
		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;	
		dateFormat = this._get(inst,"dateFormat");
		//验证时间是否超范围
		this._autoFixInput(this,inst);
		//加入时间字段
		var hur=inst.dpDiv.find("#dpTimeHour").val();
		var miu=inst.dpDiv.find("#dpTimeMinute").val();
		var sed=inst.dpDiv.find("#dpTimeSecond").val();
		inst.currentHur=hur;
		inst.currentMiu=miu;
		inst.currentSed=sed;
		
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
		//日期选中时增加样式
		$(td).parent().parent().find("a").removeClass("coral-state-active");	
		$(td).children("a").addClass("coral-state-active");
		this._updateDatepicker(inst);
	},
	//清楚日期
	_clearDate: function(inst) {
		this._setDate(inst, "");
	},
	_clearErrorDatepicker:function(target){
		$(".coral-validate-state-error").remove();
		$(".coral-errorIcon").remove();
		$(".coral-validate-error").removeClass("coral-validate-error");
		$(target).prop("isError", false);
	},
	// 选择的日期更新到输入域中
	_selectDate: function(id, dateStr) {
		var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

		//取得日期时间格式，查看是否含有时间
		var dateFormat=this._get(inst, "dateFormat");
		
		var hasTime = this._hasTime(dateFormat);
		
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input) {
			if(!hasTime){
				inst.input.val(dateStr);
			}
		}
		this._updateAlternate(inst);
		//不触发修改时间
		/* else if (inst.input && !hasTime) {
			inst.input.trigger("change"); // fire the change event
		}*/
		if (inst.inline){
			this._updateDatepicker(inst);
		} else {
			if(!hasTime){
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (typeof(inst.input[0]) !== "object") {
					inst.input.focus(); // restore focus
				}
				this._lastInput = null;
				
				var oldValue = this._getHiddenInputValue(inst);
				//设置隐藏字段值
				this._setHiddenInputValue(inst);
				
				var datestr=this._getHiddenInputValue(inst);
				if( datestr !== oldValue ) {
					var startDateId = this._get(inst, "startDateId");
					var endDateId = this._get(inst, "endDateId");
					if ( startDateId ) {
						$( "#"+startDateId ).datepicker("option", "maxDate", datestr);
					}
					if ( endDateId ) {
						$( "#"+endDateId ).datepicker("option", "minDate", datestr);
					}
					$.datepicker._change(inst, oldValue, datestr, null);
				}
				
			}else{
				
			}
		}
		/*var oldValue = this._getHiddenInputValue(inst);
		//设置隐藏字段值
		this._setHiddenInputValue(inst);
		
		var datestr=this._getHiddenInputValue(inst);
		if( datestr !== oldValue ) {
			//
			this._trigger( inst, "onChange", null, [ { "oldValue": oldValue, "newValue": datestr } ]);
			this._apply( inst,"onChange",[ { "oldValue": oldValue, "newValue": datestr } ] );
		}*/
		//触发日期选择时间
		this._trigger( inst, "onSelect", null, [ { "oldValue": oldValue, "newValue": datestr } ]);
	},
	
	/**********************************时间处理start*********************************/
	//增加时间按钮事件及输入框验证处理
	_attachTimeHandlers :function(inst){
		var that = this,datestr="";
		var oldValue = this._getHiddenInputValue(inst);
			$.datepicker._setHiddenInputValue(inst);
		var	datestr = $.datepicker._getHiddenInputValue(inst);
		// 对时间边栏的处理，点击确定按钮后触发时间选择
		inst.dpDiv.find("#dpTimeEnsure").bind('mousedown',function(e){
			that._autoFixInput(that,inst);
			$.datepicker._selectDateTime(inst);
			//e.stopPropagation();
			e.preventDefault();
			$.datepicker._change(inst, oldValue, datestr);
		});
		this._verifyInput(inst,inst.dpDiv.find("#dpTimeHour"),"H");
		this._verifyInput(inst,inst.dpDiv.find("#dpTimeMinute"),"m");
		this._verifyInput(inst,inst.dpDiv.find("#dpTimeSecond"),"s");
	},
	//自动更正时间范围
	_autoFixInput : function (that,inst){
		var min = 0;
		var minDate = that._getMinMaxDate(inst, "min");
		var maxDate = that._getMinMaxDate(inst, "max");
		var hur=inst.dpDiv.find("#dpTimeHour").val();
		var miu=inst.dpDiv.find("#dpTimeMinute").val();
		var sed=inst.dpDiv.find("#dpTimeSecond").val();
		//如果时间的输入框输入的不是数字，那么返回上一个日期
		hur = hur.replace(/[^0-9]/g,'');
		if(hur=='')  hur = inst.currentHur;
		miu = miu.replace(/[^0-9]/g,'');
		if(miu=='')  miu = inst.currentMiu;
		sed = sed.replace(/[^0-9]/g,'');
		if(sed=='')  sed = inst.currentSed;
		var date=new Date(inst.currentYear,inst.currentMonth,inst.currentDay,hur,miu,sed);
		var tmpDate=date;
		if(that._checkDateRange(inst,date)===1){
			tmpDate=maxDate;
		}else if(that._checkDateRange(inst,date)===2){
			tmpDate=minDate;
		}
		inst.dpDiv.find("#dpTimeHour").val(tmpDate.getHours()||"00");
		inst.dpDiv.find("#dpTimeMinute").val(tmpDate.getMinutes()||"00");
		inst.dpDiv.find("#dpTimeSecond").val(tmpDate.getSeconds()||"00");
	},
	//增加输入框验证
	_verifyInput : function(inst,input,type){
		var that=this,min=0,max=59;
		max=type=="H"?23:max;
		input.change(function(){   
                    that._autoFixInput(that,inst); 
                }).bind("paste",function(){  //CTR+V事件处理    
                    //处理最大最小日期时间范围
                    that._autoFixInput(that,inst); 
                });
	},
	//将选择的日期时间更新到输入框中
_selectDateTime : function(inst){
		var oldValue = this._getHiddenInputValue(inst);
		var hur=inst.dpDiv.find("#dpTimeHour").val();
		var miu=inst.dpDiv.find("#dpTimeMinute").val();
		var sed=inst.dpDiv.find("#dpTimeSecond").val();
				
		inst.currentHur=hur;
		inst.currentMiu=miu;
		inst.currentSed=sed;
			
		//取得日期时间格式，查看是否含有时间
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max");	
		var date = new Date();
		if ( !inst.selectedYear ) {
			inst.currentDay = inst.selectedDay= date.getDate();
			inst.currentMonth = inst.selectedMonth = date.getMonth();
			inst.currentYear = inst.selectedYear = date.getFullYear();
			var tmpDate = new Date(inst.currentYear,inst.currentMonth,inst.currentDay,hur,miu,sed);
			if(!(minDate || maxDate)){
				inst.input.val(tmpDate);
			}else {
				if(this._checkDateRange(inst,tmpDate)===1){
					 inst.selectedDay= maxDate.getDate();
					 inst.selectedMonth = maxDate.getMonth();
					 inst.selectedYear = maxDate.getFullYear();
				}else if(this._checkDateRange(inst,tmpDate)===2){
					 inst.selectedDay= minDate.getDate();
					 inst.selectedMonth = minDate.getMonth();
					 inst.selectedYear = minDate.getFullYear();
				}
			}
		}
		inst.input.val( this._formatDate(inst) );
		//设置隐藏字段值
		this._setHiddenInputValue(inst);
		this._updateAlternate(inst);
		
		var datestr=this._getHiddenInputValue(inst);
		$.datepicker._change(inst, oldValue, datestr, null);
		target = $(inst.input[0]);
		if (target) {
			var startDateId = this._get(inst, "startDateId");
			var endDateId = this._get(inst, "endDateId");
			if ( startDateId ) {
				$( "#"+startDateId ).datepicker("option", "maxDate", datestr);
			}
			if ( endDateId ) {
				$( "#"+endDateId ).datepicker("option", "minDate", datestr);
			}
		}
		this._hideDatepicker();
	},
	//检查日期格式中是否含有时间格式
	//返回 true or false
	_hasTime : function( dateFormat ){
		var format = (dateFormat+"");
		if( format.indexOf("H")!=-1 || format.indexOf("m")!=-1 || format.indexOf("s")!=-1 ){
			return true;
		}
		return false;
	},
	_hasHur : function( dateFormat ){
		var format = ( dateFormat+"" );
		if( format.indexOf("H")!=-1 ){
			return true;
		}
		return false;
	},
	_hasMin : function( dateFormat ){
		var format = ( dateFormat+"" );
		if( format.indexOf("m")!=-1 ){
			return true;
		}
		return false;
	},
	_hasSec : function( dateFormat ){
		var format = ( dateFormat+"" );
		if( format.indexOf("s")!=-1 ){
			return true;
		}
		return false;
	},
	//是否为年月模式的
	_isYearMonthMode : function(dateFormat){
		if(!this._hasTime(dateFormat)){
			return dateFormat.indexOf("M")!=-1 && dateFormat.indexOf("y")!=-1 &&dateFormat.indexOf("d")==-1;
		}
		return false;
	},
	//是否为只有年的模式
	_isYearMode : function(dateFormat){
		if(!this._hasTime(dateFormat)){
			return dateFormat.indexOf("y")!=-1 && dateFormat.indexOf("M")==-1 && dateFormat.indexOf("d")==-1;
		}
		return false;
	},
	/**********************************时间处理end*********************************/

	//交替更新
	_updateAlternate: function(inst) {
		var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

		if (altField) { // update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ""];
	},

	/* 计算当前Date对象的年周数 基于ISO 8601 定义
	 * @param date Date - 日期对象
	 * @return  number - Date对象在年中的周数
	 */
	iso8601Week: function(date) {
		var time,
			checkDate = new Date(date.getTime());

		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},
	/*// yyyy-MM-dd 
	// 11
	//查找format的分隔符在什么位置
	searchIndex : function(format){
		var i=0,j=0,temp = [];
		format = format.indexOf("/")>-1 ? format.replace( /\//g, "" ):format.replace( /-/g, "" );
		for( i = 0; i < format.length - 1; i++ ){
			if ( format[i] != format[i+1] ){//splice
				temp.push(j+1);
				j++;
			}
			j++;
		}
		return temp;
	},*/
	//该方法的作用：根据value得到format
	getFormatter:function(value, format, settings){
		var inputFormats = null,
			inputFormat = null;
		if(format.indexOf("y")>-1 && format.indexOf("M")>-1 && format.indexOf("d")>-1){
			inputFormats = "ymdFormat";
		}
		if(format.indexOf("y")>-1 && format.indexOf("M")>-1 && format.indexOf("d")==-1){
			inputFormats = "ymFormat";
		}
		if(format.indexOf("y")>-1 && format.indexOf("M") == -1 && format.indexOf("d") ==-1){
			inputFormats = "yFormat";
		}
		var editFormate = "yyyy-MM-dd";
		var formatOpts = settings.inst ? $.extend({},this._defaults.formatOptions,settings.inst.settings.formatOptions): 
			this._defaults.formatOptions;
		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}
		var vValue = value.split(" ");
		if(vValue[0].indexOf("/")>-1 || vValue[0].indexOf("-")>-1){
			var subStr =vValue[0].indexOf("/")>-1 ? vValue[0].split("/") : vValue[0].split("-");
			//实现日期框中月份和日期可以输入个位数字
			for(var i=0;i<subStr.length;i++){
				if(subStr[i].length % 2 != 0  ){
					subStr[i] = "0"+ subStr[i];
				}
				vValue[0] = subStr.join("-");
			}
		}
		var valRep = vValue[0].indexOf("/")>-1 ? vValue[0].replace( /\//g, "" ):vValue[0].replace( /-/g, "" );//去除value中的特殊字符
		var	str1 = vValue[0].split("/").length-1;//value中有几个分隔符
			str2 = vValue[0].split("-").length-1;
		//将去掉特殊分隔符的value的长度与formatOpts里面存的format的长度进行比较，取得长度相等的format
		for(var i=0;i<formatOpts[inputFormats].length;i++){
			if(formatOpts[inputFormats][i].length == valRep.length){
				inputFormat = formatOpts[inputFormats][i];
			}
		}
		return (inputFormat ? inputFormat: format) || null ;
		
	},
	//得到配置的模式format，和输入框中的value值
	configDateFormat: function(format,value,settings){
		//若有hh:mm:ss的时候，只取前面的年日月
		var orgFormat = format;
		var vformat = format.split(" ");
		var timeFormat = vformat[1] || "";
		var vValue = value.split(" ");
		if(vValue[0].indexOf("/")>-1 || vValue[0].indexOf("-")>-1){
			var subStr =vValue[0].indexOf("/")>-1 ? vValue[0].split("/") : vValue[0].split("-");
			//实现日期框中月份和日期可以输入个位数字
			for(var i=0;i<subStr.length;i++){
				if(subStr[i].length % 2 != 0  ){
					subStr[i] = "0"+ subStr[i];
				}
				vValue[0] = subStr.join("-");
			}
		}
		settings.inst && (settings.inst.beforevalue = vValue);
		format = this.getFormatter( vValue[0], vformat[0], settings);
		format += orgFormat.substr(vformat[0].length, orgFormat.length);//将时间与年月日拼在一起显示
		vValue[0] = vValue[0].indexOf("/")>-1? vValue[0].replace( /\//g, "" ):vValue[0].replace( /-/g, "" );//将value中的分隔符去掉
		value = vValue.join(" "); 
		return {
			format: format,
			value: value
		};
	},
	//解析指定格式的字符串为一个Date对象
	//指定格式为yyyy-MM 或 yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss
	parseDate: function (format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}
		settings = settings || {};	
		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}
	    var fValue = this.configDateFormat(format,value,settings);
	    format = fValue.format;	    
	    value = fValue.value;
		//是否含有时间
		var hasTime=this._hasTime(format);

		var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			inst=settings.inst,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			hur = -1,
			miu = -1,
			sed = -1,
			literal = false,
			date,
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			//判断格式匹配长度  如 yyyy 返回4 ，yyy 返回3
			lookMathesLength = function(match){
				var length=1;
				while(iFormat+1 < format.length && format.charAt(iFormat+1) == match){
					length++;
					iFormat++;
				}
				return length;
			},
			getNumber = function(match) {
				var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					minSize = (match === "y" ? size : 1),
					digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			//带有长度的数字
			getNumber2 = function(match,size) {
				if ( iValue > value.length || iValue == value.length) {
					return -1;
				}
				var digits = new RegExp("^\\d{1," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			getName = function(match, shortNames, longNames) {
				var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
						return [ [k, v] ];
					}).sort(function (a, b) {
						return -(a[1].length - b[1].length);
					});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},
			checkLiteral = function() {
				if ("" !== value.charAt(iValue) && value.charAt(iValue) !== format.charAt(iFormat)) {
					return; // 支持没有格式化符号的输入
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};
			

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					// 解析日期
					case "d":
						var ml=lookMathesLength("d");
						day = getNumber2("d",ml);
						break;
					case "M":
						ml=lookMathesLength("M");
						month = getNumber2("M",ml);
						break;
					case "y":
						ml=lookMathesLength("y");
						year = getNumber2("y",ml);
						break;

					//解析时间
					case "H":
						ml=lookMathesLength("H");
						hur = getNumber2("H",ml);
						break;	
					case "m":
						ml=lookMathesLength("m");
						miu = getNumber2("m",ml);
						break;	
					case "s":
						ml=lookMathesLength("s");
						sed = getNumber2("s",ml);
						break;
					default:
						checkLiteral();
				}
			}
		}
		//如果年月模式将日期改为1
//		if(format=="yyyy-MM"){
//			day=1;
//		}
//		// ??
		/*if (iValue < value.length){
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}*/
		//??
		if( day == -1 ){
			day = 1;
			if(month == -1 ){
				month = 1;
			}
		}
		
		if(day != -1 && month == -1){
			month = new Date().getMonth() + 1;
		}
		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				//dim = this._getDaysInMonth(year, month - 1,inst);
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}
			year = ( year==-1 ? 1 : year);
//			month = ( month==-1 ? 1 : month);
//			day = ( day==-1 ? 1 : day);
			hur = ( hur==-1? 0 : hur);
			miu = ( miu==-1? 0 : miu);
			sed = ( sed==-1? 0 : sed);
		// ??
		//date = this._daylightSavingAdjustWidthTime(new Date(year, month - 1, day,hur,miu,sed),[inst.currentHur,inst.currentMiu,inst.currentSed]);
		date = this._daylightSavingAdjustWidthTime(new Date(year, month - 1, day),[hur,miu,sed]);
		if ( 
			( date.getFullYear() !== year || 
			date.getMonth() + 1 !== month ||
			date.getDate() !== day ) ||
			( hasTime && (date.getHours() !== hur || 
			date.getMinutes() !== miu ||
			date.getSeconds() !== sed ) )
			) {
			throw "Invalid date"; // E.g. 31/02/00
			
		}
		return date;
	},

	
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* 
	 * 将Date对象格式化为一个字符串
y	将年份表示为最多两位数字。如果年份多于两位数，则结果中仅显示两位低位数。
yy	同上，如果小于两位数，前面补零。
yyy	将年份表示为三位数字。如果少于三位数，前面补零。
yyyy	将年份表示为四位数字。如果少于四位数，前面补零。
M	将月份表示为从 1 至 12 的数字
M M	同上，如果小于两位数，前面补零。
M M M	返回月份的缩写 一月 至 十二月 (英文状态下 Jan to Dec) 。
M M M M	返回月份的全称 一月 至 十二月 (英文状态下 January to December) 。
d	将月中日期表示为从 1 至 31 的数字。
d d	同上，如果小于两位数，前面补零。
H	将小时表示为从 0 至 23 的数字。
H H	同上，如果小于两位数，前面补零。
m	将分钟表示为从 0 至 59 的数字。
m m	同上，如果小于两位数，前面补零。
s	将秒表示为从 0 至 59 的数字。
s s	同上，如果小于两位数，前面补零。
w	返回星期对应的数字 0 (星期天) - 6 (星期六) 。
D	返回星期的缩写 一 至 六 (英文状态下 Sun to Sat) 。
D D	返回星期的全称 星期一 至 星期六 (英文状态下 Sunday to Saturday) 。
W	返回周对应的数字 (1 - 53) 。
W W	同上，如果小于两位数，前面补零 (01 - 53) 。
	 */
	formatDate: function (format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			// Check whether a format character is doubled
			//是否为两个相同的字符
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			//判断格式匹配长度  如 yyyy 返回4 ，yyy 返回3
			lookMathesLength = function(match){
				var length=1;
				while(iFormat+1 < format.length && format.charAt(iFormat+1) == match){
					length++;
					iFormat++;
				}
				return length;
			},
			formatNumber = function(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},
			formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						/*case "o":
							output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;*/
						case "M":
							var ml=lookMathesLength("M");
							if(ml==4){
								output += monthNames[date.getMonth()];
							}else if(ml==3){
								output += monthNames[date.getMonth()];
							}else if(ml==2){
								output += (date.getMonth() + 1>9?date.getMonth() + 1:"0"+(date.getMonth() + 1));
							}else if(ml==1){
								output += date.getMonth() + 1;
							}
							
							//output += formatNumber("M", date.getMonth() + 1, 2);//formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							ml=lookMathesLength("y");
							if(ml==4){
								output += date.getFullYear();
							}else if(ml==3){
								output += (date.getFullYear()+"").substring(1,4);
							}else if(ml==2){
								output += ((date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							}else if(ml==1){
								output += date.getYear() % 100;
							}
							//output += (lookAhead("y") ? date.getFullYear() :
							//	(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
							
						// 时间解析	
						case "H":
							ml=lookMathesLength("H");
							if(ml==2){
								output += (date.getHours()>9?date.getHours():"0"+(date.getHours()));
							}else if(ml==1){
								output += date.getHours();
							}
						break;
						case "m":
							ml=lookMathesLength("m");
							if(ml==2){
								output += (date.getMinutes()>9?date.getMinutes():"0"+(date.getMinutes()));
							}else if(ml==1){
								output += date.getMinutes();
							}
						break;
						case "s":
							ml=lookMathesLength("s");
							if(ml==2){
								output += (date.getSeconds()>9?date.getSeconds():"0"+(date.getSeconds()));
							}else if(ml==1){
								output += date.getSeconds();
							}
						break;
						//计算年周数
						case "W":
							ml=lookMathesLength("W");
							if(ml==2){
								output += (settings.calculateWeek(date)>9?settings.calculateWeek(date):"0"+settings.calculateWeek(date));
							}else if(ml==1){
								output += settings.calculateWeek(date);
							}
						break;
						//返回一周中的天数
						case "w":
							output += date.getDay();
						break;
						/*case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;*/
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},


	_possibleChars: function (format) {
		var iFormat,
			chars = "",
			literal = false,

			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					//case "d": case "m": case "y": case "@":
					case "d": case "m": case "y": case "@": case "H": case "M": case "s":
						chars += "0123456789";
						break;
					//case "D": case "M":
					case "D": case "W":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	//得到属性值
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},
	//设置属性值
	_set: function(inst, name,val) {
		return inst.settings[name] = val;
	},
	//解析可执行的Date对象初始化日历组件
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			dateValue = inst.input.val(),
			settings = this._getFormatConfig(inst);
		
		try {
			date = this.parseDate(dateFormat, dateValue, settings) || defaultDate;
		} catch (event) {
			//dateValue = (noDefault ? "" : dateValue);
			date = defaultDate;
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = date.getDate();
		inst.currentMonth = date.getMonth();
		inst.currentYear = date.getFullYear();
		
		inst.currentHur = date.getHours();
		inst.currentMiu = date.getMinutes();
		inst.currentSed = date.getSeconds();
		this._adjustInstDate(inst);
		//设置隐藏字段值
		//this._setHiddenInputValue(inst);
		var datestr=this._getHiddenInputValue(inst);
		var startDateId = this._get(inst, "startDateId");
		var endDateId = this._get(inst, "endDateId");
		if ( startDateId ) {
			$( "#"+startDateId ).datepicker("option", "maxDate", datestr);
		}
		if ( endDateId ) {
			$( "#"+endDateId ).datepicker("option", "minDate", datestr);
		}
	},

	//取得默认的date在显示时
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},
	/* A date may be specified as an exact value or a relative one. */
	//按照指定格式来判定时间范围
	//指定格式 为 yyyy-MM-dd HH:mm:ss 或者 yyyy-MM-dd
	_determineDate: function(inst, date, defaultDate) {
		var that = this;
		var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			offsetString = function(offset) {
				try {
					var tmpFormat="yyyy-MM-dd";
					var srcDateFormat=that._get(inst,"srcDateFormat");
					if(that._isYearMonthMode(srcDateFormat)){
						tmpFormat="yyyy-MM";
					}
					if(that._isYearMode(srcDateFormat)){
						tmpFormat="yyyy";
					}
					if((offset+"").length>10 && that._hasTime(srcDateFormat)){
						tmpFormat+=" HH:mm:ss";
					}
					tmpFormat = $.datepicker._get(inst, "dateFormat");
					//return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					return $.datepicker.parseDate(tmpFormat,
						offset, $.datepicker._getFormatConfig(inst));
				}catch (e) {
					// Ignore
					//return "Invalid Date";
					//触发格式化错误事件
					$.datepicker._apply(inst,"onFormatError",[date,inst]);
					$.datepicker._apply(inst,"onFormatWarn",[date,inst]);
				}

				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d" : case "D" :
							day += parseInt(matches[1],10); break;
						case "w" : case "W" :
							day += parseInt(matches[1],10) * 7; break;
						case "m" : case "M" :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y": case "Y" :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? 
					defaultDate : 
					(typeof date === "string" ? 
						offsetString(date) : 
						(typeof date === "number" ? 
							(isNaN(date) ? 
								defaultDate : 
								offsetNumeric(date)
							) : 
							new Date(date.getTime())
						)
					)
				);

		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
		var hur = 0, miu = 0, sed = 0, msed = 0;
		if (newDate) {
			hur = newDate.getHours(),
			miu = newDate.getMinutes(),
			sed = newDate.getSeconds(),
			msed = newDate.getMilliseconds();
			
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjustWidthTime(newDate,[hur,miu,sed]);
	},

	//调整日期时间
	_daylightSavingAdjust: function(date,inst) {
		if (!date) {
			return null;
		}
		/*var hasTime=false;
		if(inst!=null){
			var dateFormat=this._get(inst,"dateFormat");
			hasTime=this._hasTime(dateFormat);
		}
		if(!hasTime){
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		}*/
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	//直接设置日期
	_setDate: function(inst, date, noChange) {
		var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		var dateFormat=this._get(inst,"dateFormat");
		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		
		inst.currentHur=newDate.getHours();
		inst.currentMiu=newDate.getMinutes();
		inst.currentSed=newDate.getSeconds();
		
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			if ( clear ) {
				this._processDefaultDate(this,inst,"");
				this._setHiddenInputValue(inst);//设置隐藏字段值
			} else {
				if(this._get(inst,"complete")){
					inst.input.val(this._formatDate(inst));
				}else{
					var format = this.getFormatter(inst.settings.value,this._get(inst,"dateFormat"), this._getFormatConfig(inst));
					var datestr = this.completeFormate(format,dateFormat,inst);
					datestr = this.formatDate(datestr, date, this._getFormatConfig(inst));
					/*var format = this.getFormatter(inst.input.val(),this._get(inst,"srcDateFormat"), this._getFormatConfig(inst));
				var datestr = this.completeFormate(format,this._get(inst,"srcDateFormat"),inst);*/
					inst.input.val(datestr);
				}
			}
		}
	},

	//取回日期对象
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjustWidthTime( new Date( inst.currentYear, inst.currentMonth, inst.currentDay ), [inst.currentHur,inst.currentMiu,inst.currentSed] ) );
		return startDate;
	},
	
	_daylightSavingAdjustWidthTime: function(date,timeArr) {
		var ndate = this._daylightSavingAdjust( date );
		if ( ndate ) {
			ndate.setHours(timeArr[0]);
			ndate.setMinutes(timeArr[1]);
			ndate.setSeconds(timeArr[2]);
			ndate.setMilliseconds(0);
		}
		return date;
	},
	//响应日历组件上的各种动作事件 
	_attachHandlers: function(inst) {
		var $this=this;
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		var isYearMonth=this._isYearMonthMode(this._get(inst,"dateFormat"));
		var isYear = this._isYearMode(this._get(inst,"dateFormat"));
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function () {
					if(isYearMonth===true){
						$.datepicker._adjustDate(id, -1, "Y");
					}else if(isYear===true){
						$.datepicker._adjustDate(id, -12, "Y");
					}else{
						$.datepicker._adjustDate(id, -stepMonths, "M");
					}
					//$this._setMonthYearValue($this,inst);
					return false;
				},
				next: function () {
					if(isYearMonth===true){
						$.datepicker._adjustDate(id, +1, "Y");
					}else if(isYear===true){
						$.datepicker._adjustDate(id, +12, "Y");
					}else{
						$.datepicker._adjustDate(id, +stepMonths, "M");
					}
					//$this._setMonthYearValue($this,inst);
					return false;
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				today: function () {
					$.datepicker._gotoToday(id);					
					return false;
				},
				selectDay: function () {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonthAndHide: function(){
					$.datepicker._selectMonthYear(id, this, "M", true);
					$.datepicker._hideDatepicker();
					return false;
				},
				selectYearAndHide: function(){
					$.datepicker._selectMonthYear(id, this, "Y", true);
					$.datepicker._hideDatepicker();
					return false;
				},
				selectMonth: function () {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				},
				/*clickHour: function(){
					inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
						max: 24,
						min: 0,
						step: 1,
						value: $(this).html()
					});
					inst.dpDiv.find("#dpTimeHour").val($(this).html());
					inst.dpDiv.find(".menuSel").hide();
				},
				clickMinute: function(){
					inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
						max: 60,
						min: 0,
						step: 1,
						value: $(this).html()
					});
					inst.dpDiv.find("#dpTimeMinute").val($(this).html());
					inst.dpDiv.find(".menuSel").hide();
				},
				clickSecond: function(){
					inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
						max: 60,
						min: 0,
						step: 1,
						value: $(this).html()
					});
					inst.dpDiv.find("#dpTimeSecond").val($(this).html());
					inst.dpDiv.find(".menuSel").hide();
				},*/
				focusTime: function () {
					if ( $(this).prop("readonly") ) return false;
					
					$.datepicker.focusInput = this.id;
					if ( this.id == "dpTimeHour" ){
						inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
							max: 24,
							min: 0,
							step: 1,
							value: this.value
						});
						inst.dpDiv.find(".menuSel").hide();
						inst.dpDiv.find(".hourMenu").show();
					}
					if ( this.id == "dpTimeMinute" ){
						inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
							max: 60,
							min: 0,
							step: 1,
							value: this.value
						});
						//获得时间的值，然后判断如果大于最小日期的时间，例如最小日期的时间为09:20:45，那么可以获得时间的值为09，那么选择大于9点的时候，分钟和秒
						//都是可以选择的，用新生成的面板来取代原来的面板。
						var value = $("#dpTimeHour").val();
						inst.dpDiv.find(".minuteMenu").replaceWith($this._modifiedMin(inst,value));
						inst.dpDiv.find(".menuSel").hide();
						inst.dpDiv.find(".minuteMenu").show();
					}
					if ( this.id == "dpTimeSecond" ){
						inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
							max: 60,
							min: 0,
							step: 1,
							value: this.value
						});
						var value = $("#dpTimeHour").val();
						var value1 = $("#dpTimeMinute").val();
						inst.dpDiv.find(".secondMenu").replaceWith($this._modifiedSed(inst,value,value1));
						inst.dpDiv.find(".menuSel").hide();
						inst.dpDiv.find(".secondMenu").show();
					}
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
			//重新生成的时间面板绑定"mousedown"事件，点击事件面板选中时间
			$(inst.dpDiv).off(".hourMenu").on("mousedown.hourMenu", ".hourMenu", function(e){
				if ( !$(e.target).hasClass("menuTimeSel") ) return false;;
				inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
					max: 24,
					min: 0,
					step: 1,
					value: $(e.target).html()
				});
				inst.dpDiv.find("#dpTimeHour").val($(e.target).html());
				inst.dpDiv.find(".menuSel").hide();	
				$this._autoFixInput($this,inst);
				return false;
			});
			$(inst.dpDiv).off(".minuteMenu").on("mousedown.minuteMenu", ".minuteMenu", function(e){
				if ( !$(e.target).hasClass("menuTimeSel") ) return false;;
				inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
					max: 60,
					min: 0,
					step: 1,
					value: $(e.target).html()
				});
				inst.dpDiv.find("#dpTimeMinute").val($(e.target).html());
				inst.dpDiv.find(".menuSel").hide();
				$this._autoFixInput($this,inst);
				return false;
			});
			$(inst.dpDiv).off(".secondMenu").on("mousedown.secondMenu", ".secondMenu", function(e){
				if ( !$(e.target).hasClass("menuTimeSel") ) return false;;
				inst.dpDiv.find( "#dpTimeSpinner" ).spinner("option",{
					max: 60,
					min: 0,
					step: 1,
					value: $(e.target).html()
				});
				inst.dpDiv.find("#dpTimeSecond").val($(e.target).html());
				inst.dpDiv.find(".menuSel").hide();
				$this._autoFixInput($this,inst);
				return false;
			});
		});
	},
	// 生成 当前状态日历组件的html代码
	_generateHTML: function(inst) {
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate,defaultDateTime, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjustWidthTime(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()),[0,0,0]), // clear time
			isRTL = this._get(inst, "isRTL"),
			isYearMonth=this._isYearMonthMode(this._get(inst,"dateFormat")),
			isYear=this._isYearMode(this._get(inst,"dateFormat"));
			showButtonPanel = isYearMonth==true || isYear==true?false:this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjustWidthTime((!inst.currentDay ? new Date(9999,9,9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay)),[0,0,0]),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),		
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear,
			//日期时间格式
			dateFormat = this._get(inst,"dateFormat");
			//根据日期时间格式调整最大最小值，在日历绘制时
			var hasTime = this._hasTime(this._get(inst,"dateFormat"));
			//有time情况，最小日期要-1
			/*if(minDate!=null && hasTime){
				minDate.setDate(minDate.getDate());
			}*/
			//无time情况，最大日期要+1(作废)
			/*if(maxDate!=null && !hasTime){
				maxDate.setDate(maxDate.getDate());
			}*/

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjustWidthTime(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()),[inst.currentHur,inst.currentMiu,inst.currentSed]);
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjustWidthTime(new Date(drawYear, drawMonth, 1),[inst.currentHur,inst.currentMiu,inst.currentSed]) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjustWidthTime(new Date(drawYear, drawMonth - stepMonths, 1),[inst.currentHur,inst.currentMiu,inst.currentSed]),
			this._getFormatConfig(inst)));

		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='coral-datepicker-prev coral-state-default coral-corner-all' data-handler='prev' data-event='mousedown'" +
			" title='" + prevText + "'><span class='icon  cui-icon-arrow-" + ( isRTL ? "right3" : "left3") + "'></span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='coral-datepicker-prev coral-state-default coral-corner-all coral-state-disabled' title='"+ prevText +"'><span class='coral-icon coral-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

		nextText = this._get(inst, "nextText");
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjustWidthTime(new Date(drawYear, drawMonth + stepMonths, 1),[inst.currentHur,inst.currentMiu,inst.currentSed]),
			this._getFormatConfig(inst)));

		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='coral-datepicker-next coral-state-default coral-corner-all' data-handler='next' data-event='mousedown'" +
			" title='" + nextText + "'><span class='cui-icon-arrow-" + ( isRTL ? "left3" : "right3") + "'></span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='coral-datepicker-next coral-state-default coral-corner-all coral-state-disabled' title='"+ nextText + "'><span class='coral-icon coral-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

		currentText = this._get(inst, "currentText");
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

		controls = "";//(!inst.inline ? "<button type='button' class='coral-datepicker-close coral-state-default coral-priority-primary coral-corner-all' data-handler='hide' data-event='click'>" +
			//this._get(inst, "closeText") + "</button>" : "");

		buttonPanel = (showButtonPanel) ? "<div class='coral-datepicker-buttonpane coral-component-content' "+(isYearMonth || isYear?"style='display:none'":"")+">" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='coral-datepicker-current coral-state-default coral-priority-primary coral-corner-all' data-handler='today' data-event='mousedown'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
		var buttonPanelstr = "";
		!hasTime||(buttonPanelstr += '<button class="coral-datepicker-close coral-state-default coral-priority-secondary coral-corner-all" id="dpTimeEnsure">确定</button>');	
		buttonPanelstr += (showButtonPanel)? "<button type='button' class='coral-datepicker-current coral-state-default coral-priority-primary coral-corner-all' data-handler='today' data-event='mousedown'" +
			">" + currentText + "</button>":"";

		firstDay = parseInt(this._get(inst, "firstDay"),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDateTime = this._getDefaultDate(inst);//原始defaultDate，会含有时间格式
		//只含年月日
		defaultDate=new Date(defaultDateTime.getFullYear(),defaultDateTime.getMonth(),defaultDateTime.getDate());
		html = "";
		dow;
		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjustWidthTime(new Date(drawYear, drawMonth, inst.selectedDay),[inst.currentHur,inst.currentMiu,inst.currentSed]);
				cornerClass = " coral-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='coral-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0: calender += " coral-datepicker-group-first";
								cornerClass = " coral-corner-" + (isRTL ? "right" : "left"); break;
							case numMonths[1]-1: calender += " coral-datepicker-group-last";
								cornerClass = " coral-corner-" + (isRTL ? "left" : "right"); break;
							default: calender += " coral-datepicker-group-middle"; cornerClass = ""; break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='coral-datepicker-header coral-component-header coral-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort,isYearMonth) + // draw month headers
					"</div>" ;
				if(isYearMonth===true){
					//生成月份
					calender += this._generateMonthHTML(inst, drawMonth, drawYear, minDate, maxDate,
						row > 0 || col > 0, monthNames, monthNamesShort,currentDate,today);
				}
				//生成年份
				if(isYear == true){
					calender += this._generateYearHTML(inst,drawYear, minDate, maxDate,
							row > 0 || col > 0,currentDate,today);
				}
				calender += "<table class='coral-datepicker-calendar' "+(isYearMonth || isYear ? "style='display:none'":"")+"><thead>" +
					"<tr>";
				thead = (showWeek ? "<th class='coral-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
				for (dow = 0; dow < 7; dow++) { // days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='coral-datepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth,inst);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjustWidthTime(new Date(drawYear, drawMonth, 1 - leadDays),[0,0,0]);
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += "<tr>";
					tbody = (!showWeek ? "" : "<td class='coral-datepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) + "</td>");
					for (dow = 0; dow < 7; dow++) { // create date picker days
						daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
						otherMonth = (printDate.getMonth() !== drawMonth);
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate<= new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate()-1)) || (maxDate && printDate > maxDate);
						tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " coral-datepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " coral-datepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " coral-state-disabled": "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " coral-datepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='mousedown' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='coral-state-default'>" + printDate.getDate() + "</span>" : "<a class='coral-state-default" +
							(printDate.getTime() === today.getTime() ? " coral-state-highlight" : "") +
							(printDate.getTime() === currentDate.getTime() ? " coral-state-active" : "") + // highlight selected day
							(otherMonth ? " coral-priority-secondary" : "") + // distinguish dates from other months
							"' href='javascript:void(0);'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjustWidthTime(printDate,[0,0,0]);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				if(isYearMonth == false && isYear == false){
					calender += "</tbody></table>" + this._generateDateTimeHTML(inst,dateFormat, buttonPanelstr)+(isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='coral-datepicker-row-break'></div>" : "") : "");
				}
				group += calender;
			}
			html += group;
		}
		//html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},
	//生成 仿win8 风格 月份
	_generateMonthHTML : function(inst,drawMonth,drawYear,minDate, maxDate,
			secondary, monthNames, monthNamesShort,currentDate,today){
		var html="<table class='coral-datepicker-calendar' ><tbody>";
		var month=0;var highlightcss="";var activecss="";
		var inMinYear = (minDate && minDate.getFullYear() === drawYear);
		var inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
		for(var i=0;i<3;i++){
			html+="<tr>"
			for(var j=0;j<4;j++){
				if(month === today.getMonth() && drawYear === today.getFullYear()){
					highlightcss="coral-state-highlight";
				}else{
					highlightcss="";
				}
				if(month === drawMonth){
					activecss="coral-state-active";
				}else{
					activecss="";
				}
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())){
					html+="<td data-handler='selectMonthAndHide' data-event='mousedown' data-month='"+ month +"'>" +
						"<a class='coral-state-default date-month "+ highlightcss + " "+activecss+"' href='javascript:void(0);'" +
						">"+ monthNames[month++] +"</a></td>";
				}else{
					html+="<td class='"+ this._unselectableClass + " coral-state-disabled'>" +
						"<span class='date-month' >"+ monthNames[month++] + "</span></td>";
				}
			}
			html+="</tr>";
		}
		return html+"</tbody></table>";
	},
	//只生成年份
	_generateYearHTML : function(inst,drawYear,minDate, maxDate,
			secondary, currentDate,today){
		var html="<table class='coral-datepicker-calendar' ><tbody>";
		var highlightcss="";var activecss="";
		var year = drawYear-(drawYear%12);
		var inMinYear = (minDate && minDate.getFullYear() === drawYear);
		var inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
		
		for(var i=0;i<3;i++){
			html+="<tr>"
			for(var j=0;j<4;j++){
				/*if(drawYear === today.getFullYear()){
					highlightcss="coral-state-highlight";
				}else{*/
					highlightcss="";
				//}
				if(year == inst.currentYear){
					activecss="coral-state-active";
				}else{
					activecss="";
				}
				if ((!inMinYear || year >= minDate.getFullYear()) && (!inMaxYear || year <= maxDate.getFullYear())){
					html+="<td data-handler='selectYearAndHide' data-event='mousedown' data-year='"+ year +"'>" +
						"<a class='coral-state-default date-year "+ " "+activecss+"' href='javascript:void(0);'" +
						">"+ year++ +"</a></td>";
				}else{
					html+="<td class='"+ this._unselectableClass + " coral-state-disabled'>" +
						"<span class='date-year' >"+ year++ + "</span></td>";
				}
			}
			html+="</tr>";
		}
		return html+"</tbody></table>";
	},
	//生成时间输入框
	_generateDateTimeHTML : function(inst,dateFormat,buttonPanelstr){
		var divStyle='style="display:none"';
		var minMaxDate,hur,min,sed,minDay,maxDay,compMin,compMax;
		var hasTime=this._hasTime(dateFormat),
			hasHur=this._hasHur(dateFormat),
			hasMin=this._hasMin(dateFormat),
			hasSec=this._hasSec(dateFormat);
		if(hasTime){
			divStyle='style="display:block"';
		}
		var date=new Date();
		var minDate = this._get(inst, "minDate");
		var maxDate = this._get(inst, "maxDate");
			hur = hasHur?( inst.currentHur || date.getHours() ):"00";
			min = hasMin?( inst.currentMiu || date.getMinutes() ):"00";
			sed = hasSec?( inst.currentSed || date.getSeconds() ):"00";
		var tmpDate=new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay,hur,min,sed);
		var compDate = new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay);
			if (minDate && minDate != ""){
				minDay = new Date(minDate.replace(/-/g, "/"));
				compMin= new Date(minDay.getFullYear(),minDay.getMonth(),minDay.getDate());
			}
			if (maxDate && maxDate != ""){
				maxDay = new Date(maxDate.replace(/-/g, "/"));
				compMax= new Date(maxDay.getFullYear(),maxDay.getMonth(),maxDay.getDate());
			}
		//验证时间是否超范围
		if(this._checkDateRange(inst,tmpDate)===1){
			tmpDate=new Date(maxDate.replace(/-/g, "/"));
			hur=tmpDate.getHours();
			min=tmpDate.getMinutes();
			sed=tmpDate.getSeconds();
		}else if(this._checkDateRange(inst,tmpDate)===2){
			tmpDate=new Date(minDate.replace(/-/g, "/"));
			hur=tmpDate.getHours();
			min=tmpDate.getMinutes();
			sed=tmpDate.getSeconds();
		}
		$.datepicker.focusInput = "dpTimeHour";
		var dateTimeHTML= [];
		dateTimeHTML.push( "<div class='coral-datepicker-time' >" );
		// init hour
		dateTimeHTML.push( "<div class='menuSel hourMenu' style='display: none; margin-left: 6px; margin-top: -90px;'>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='3' border='0<tr' nowrap='nowrap'><tbody>" );
		var k= 0;
		for ( var i = 0; i < 4; i++ ) {
			dateTimeHTML.push( "<tr nowrap='nowrap'></tr>" );
			for ( var j = 0; j < 6; j++ ) {
					if((minDate && k < new Date(minDate).getHours() && new Date(compDate).getTime() == new Date(compMin).getTime())
							||(maxDate && k > new Date(maxDate).getHours() && new Date(compDate).getTime() == new Date(compMax).getTime())){
						dateTimeHTML.push( "<td nowrap='' class='menuTimeSel coral-state-disabled' data-handler='clickHour' data-event='click' >" +
								"<span class='coral-state-default'>"+ k++ +"</span></td>" );
					}else{
						dateTimeHTML.push( "<td nowrap='' class='menuTimeSel' data-handler='clickHour' data-event='click' >"+ k++ +"</td>" );
				}
			}
			dateTimeHTML.push( "</tr>" );
		}
		dateTimeHTML.push( "</tbody></table></div>" );
		// init minute
		dateTimeHTML.push( "<div class='menuSel minuteMenu' style='display: none; margin-left: 6px; margin-top: -48px;'>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='3' border='0<tr' nowrap='nowrap'><tbody>" );
		k= 0;
		for ( var i = 0; i < 2; i++ ) {
			dateTimeHTML.push( "<tr nowrap='nowrap'></tr>" );
			for ( var j = 0; j < 6; j++ ) {
				if((minDate && k < new Date(minDate).getMinutes() && new Date(compDate).getTime() == new Date(compMin).getTime() )
						||(maxDate && k > new Date(maxDate).getMinutes() && new Date(compDate).getTime() == new Date(compMax).getTime())){
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel coral-state-disabled' data-handler='clickMinute' data-event='click'>" +
							"<span class='coral-state-default'>"+ k +"</span></td>" );
				}else{
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel' data-handler='clickMinute' data-event='click' >"+ k +"</td>" );
				}
				k+=5;
			}
			dateTimeHTML.push( "</tr>" );
		}
		dateTimeHTML.push( "</tbody></table></div>" );
		// init second
		dateTimeHTML.push( "<div class='menuSel secondMenu' style='display: none; margin-left: 6px; margin-top: -48px;'>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='3' border='0<tr' nowrap='nowrap'><tbody>" );
		k= 0;
		for ( var i = 0; i < 2; i++ ) {
			dateTimeHTML.push( "<tr nowrap='nowrap'></tr>" );
			for ( var j = 0; j < 6; j++ ) {
				if((minDate && k < new Date(minDate).getSeconds() && new Date(compDate).getTime() == new Date(compMin).getTime() )
						||(maxDate && k > new Date(maxDate).getSeconds() && new Date(compDate).getTime() == new Date(compMax).getTime())){
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel coral-state-disabled' data-handler='clickSecond' data-event='click'>" +
							"<span class='coral-state-default'>"+ k +"</span></td>" );
				}else{
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel' data-handler='clickSecond' data-event='click' >"+ k +"</td>" );
				}
				k+=5;
			}
			dateTimeHTML.push( "</tr>" );
		}
		dateTimeHTML.push( "</tbody></table></div>" );

		dateTimeHTML.push( "<table cellspacing='0' cellpadding='0' border='0'>" );
			dateTimeHTML.push( "<tr>" );
				dateTimeHTML.push( "<td class='datepicker-time-input'" + divStyle +">");
					dateTimeHTML.push( "<input data-handler='focusTime' data-event='focus' id='dpTimeHour' class='datepicker-timeinput datepicker-time-tB1' " + (hasHur ? "":"readonly") +" value='"+hur+"' maxlength='2'>" );
					dateTimeHTML.push( "<input value=':' class='coral-datepicker-time-tm' readonly>" );
					dateTimeHTML.push( "<input data-handler='focusTime' data-event='focus' id='dpTimeMinute' class='datepicker-timeinput datepicker-time-tE' " + (hasMin ? "":"readonly") +" value='"+min+"' maxlength='2'>" );
					dateTimeHTML.push( "<input value=':' class='coral-datepicker-time-tm' readonly>" );
					dateTimeHTML.push( "<input data-handler='focusTime' data-event='focus' id='dpTimeSecond' class='datepicker-timeinput datepicker-time-tB2' " + (hasSec ? "":"readonly") +" value='"+sed+"' maxlength='2'>" );
					dateTimeHTML.push( "<input id='dpTimeSpinner'/>" );
				dateTimeHTML.push( "</td>" );
			dateTimeHTML.push( "</tr>" );
		dateTimeHTML.push( "</table></div>" );
		dateTimeHTML.push( "<div class='coral-datepicker-time' >" );
		dateTimeHTML.push( "<div cellspacing='0' cellpadding='0' border='0'></div>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='0' border='0'>" );
			dateTimeHTML.push( "<tr>" );
				dateTimeHTML.push( "<td>" + buttonPanelstr + "</td>" );
			dateTimeHTML.push( "</tr>" );
		dateTimeHTML.push( "</table></div>" );
		return dateTimeHTML.join("");
	},
	//有最小值和最大值的时候，例如最小日期为2015-08-12 09:45:10 ，当选择2015-08-12，时间大于9点的时候，分钟和秒的面板上的所有值都可以点击，因此重新生成面板
	_modifiedMin: function(inst,value){
		var minDate = this._get(inst, "minDate");
		var maxDate = this._get(inst, "maxDate");
		var compDate = new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay),
			minDay = new Date(minDate),
			maxDay = new Date(maxDate),
			compMin= new Date(minDay.getFullYear(),minDay.getMonth(),minDay.getDate()),
			compMax= new Date(maxDay.getFullYear(),maxDay.getMonth(),maxDay.getDate());
		var dateTimeHTML= [];
		dateTimeHTML.push( "<div class='menuSel minuteMenu' style='display: none; margin-left: 6px; margin-top: -48px;'>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='3' border='0<tr' nowrap='nowrap'><tbody>" );
		k= 0;
		for ( var i = 0; i < 2; i++ ) {
			dateTimeHTML.push( "<tr nowrap='nowrap'></tr>" );
			for ( var j = 0; j < 6; j++ ) {
				if((minDate && k < new Date(minDate).getMinutes() && new Date(compDate).getTime() == new Date(compMin).getTime() && value == new Date(minDate).getHours())
						||(maxDate && k > new Date(maxDate).getMinutes() && new Date(compDate).getTime() == new Date(compMax).getTime() && value == new Date(maxDate).getHours())){
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel coral-state-disabled' data-handler='clickMinute' data-event='click'>" +
							"<span class='coral-state-default'>"+ k +"</span></td>" );
				}else{
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel' data-handler='clickMinute' data-event='click' >"+ k +"</td>" );
				}
				k+=5;
			}
			dateTimeHTML.push( "</tr>" );
		}
		dateTimeHTML.push( "</tbody></table></div>" );
		return dateTimeHTML.join("");
	},
	_modifiedSed: function(inst,value,value1){
		var minDate = this._get(inst, "minDate");
		var maxDate = this._get(inst, "maxDate");
		var compDate = new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay),
			minDay = new Date(minDate),
			maxDay = new Date(maxDate),
			compMin= new Date(minDay.getFullYear(),minDay.getMonth(),minDay.getDate()),
			compMax= new Date(maxDay.getFullYear(),maxDay.getMonth(),maxDay.getDate());
		var dateTimeHTML= [];
		dateTimeHTML.push( "<div class='menuSel secondMenu' style='display: none; margin-left: 6px; margin-top: -48px;'>" );
		dateTimeHTML.push( "<table cellspacing='0' cellpadding='3' border='0<tr' nowrap='nowrap'><tbody>" );
		k= 0;
		for ( var i = 0; i < 2; i++ ) {
			dateTimeHTML.push( "<tr nowrap='nowrap'></tr>" );
			for ( var j = 0; j < 6; j++ ) {
				if((minDate && k < new Date(minDate).getSeconds() && new Date(compDate).getTime() == new Date(compMin).getTime() && value == new Date(minDate).getHours() && value1 == new Date(minDate).getMinutes())
						||(maxDate && k > new Date(maxDate).getSeconds() && new Date(compDate).getTime() == new Date(compMax).getTime()&& value == new Date(maxDate).getHours() && value1 == new Date(maxDate).getMinutes())){
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel coral-state-disabled' data-handler='clickSecond' data-event='click'>" +
							"<span class='coral-state-default'>"+ k +"</span></td>" );
				}else{
					dateTimeHTML.push( "<td nowrap='' class='menuTimeSel' data-handler='clickSecond' data-event='click' >"+ k +"</td>" );
				}
				k+=5;
			}
			dateTimeHTML.push( "</tr>" );
		}
		dateTimeHTML.push( "</tbody></table></div>" );
		return dateTimeHTML.join("");
	},
	// 生成月份和年度的头部
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort,isYearMonth) {

		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='coral-datepicker-title'>",
			monthHtml = "",
			monthSuffix = this._get(inst, "monthSuffix");
		//年份
		//月份选择
		if(!this._isYearMonthMode(dateFormat)&&!this._isYearMode(dateFormat)){
			if (secondary || !changeMonth) {
				monthHtml += "<span class='coral-datepicker-month'>" + monthNames[drawMonth] + "</span>";
			} else {
				inMinYear = (minDate && minDate.getFullYear() === drawYear);
				inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
				monthHtml += "<select class='coral-datepicker-month' data-handler='selectMonth' data-event='change'>";
				for ( month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
					}
				}
				
				monthHtml += "</select>";
				monthHtml += monthSuffix;// “月”，写死在panel
			}
			
			if (!showMonthAfterYear) {
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
			}
		}

		// 年度选择
		if ( !inst.yearshtml ) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='coral-datepicker-year'>" + drawYear + "</span>";
			} else {
				// 判断 年度范围用来显示
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function(value) {
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				if(this._isYearMode(dateFormat)){
					var year = drawYear-(drawYear % 12)
					inst.yearshtml +="<span class = 'coral-datepicker-year'>" + year + "-" + (year+11) + "</span>";
				}else{
					inst.yearshtml += "<select class='coral-datepicker-year' data-handler='selectYear' data-event='change'>";
					for (; year <= endYear; year++) {
						inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
					}
					inst.yearshtml += "</select>";
				}

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + (isYearMonth===false?monthHtml:"");
		}
		html += "</div>"; // 关闭 datepicker_header
		return html;
	},
	
	//调整日期子字段
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month,inst)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjustWidthTime(new Date(year, month, day),[inst.currentHur,inst.currentMiu,inst.currentSed]));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	//保证一个日期在最大和最小范围内
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
		return (maxDate && newDate > maxDate ? maxDate : newDate);
	},

	//通知月份或月份发生改变
	_notifyChange: function(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	//判断 显示的月份数量
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
	},

	//判定当前最大最小的日期 - 保证没有时间组件被设定
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	//查找月中的日期
	_getDaysInMonth: function(year, month,inst) {
		// TODO: 代码优化；
		if ( inst ) {
			return 32 - this._daylightSavingAdjustWidthTime(new Date(year, month, 32),[inst.currentHur,inst.currentMiu,inst.currentSed]).getDate();
		} else {
			return 32 - this._daylightSavingAdjustWidthTime(new Date(year, month, 32),[0,0,0]).getDate();
		}
	},

	//查找月中的第一天的date
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	//判定 是否允许调整月份
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjustWidthTime(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1),[inst.currentHur,inst.currentMiu,inst.currentSed]);

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth(),inst));
		}
		return this._isInRange(inst, date);
	},

	//给定的日期是否在接收范围内
	_isInRange: function(inst, date) {
		var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
			if (years){
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if ( yearSplit[0].match(/[+\-].*/) ) {
					minYear += currentYear;
				}
				if ( yearSplit[1].match(/[+\-].*/) ) {
					maxYear += currentYear;
				}
			}

		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
	},

	//提供配置用来格式化和解析
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames"),calculateWeek:this._get(inst,"calculateWeek"),"inst":inst};
	},

	//格式化给定的日期用来显示
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjustWidthTime(new Date(year, month, day),[inst.currentHur,inst.currentMiu,inst.currentSed])) :
			this._daylightSavingAdjustWidthTime(new Date(inst.currentYear, inst.currentMonth, inst.currentDay),[inst.currentHur,inst.currentMiu,inst.currentSed]));
		date.setHours(inst.currentHur);
		date.setMinutes(inst.currentMiu);
		date.setSeconds(inst.currentSed);
		date.setMilliseconds(0);
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	},
	//调用事件
	_apply : function(inst,type,datas,event){
		var callback = $.datepicker._get(inst,type);
		if (callback) {
			if(typeof callback ==="string"){
				return window[callback].apply((inst.input ? inst.input[0] : null),[event].concat(datas));
			}else if($.isFunction( callback )){
				return callback.apply((inst.input ? inst.input[0] : null), [event].concat(datas));
			}
		}
	}
});

//为日历组件元素绑定事件
function bindHover(dpDiv) {
	var selector = "button, .coral-datepicker-prev, .coral-datepicker-next, .coral-datepicker-calendar td a, .menuTimeSel";
	var selectormousedown = "#coral-datepicker-divId";
	return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("coral-state-hover");
			if (this.className.indexOf("coral-datepicker-prev") !== -1) {
				$(this).removeClass("coral-datepicker-prev-hover");
			}
			if (this.className.indexOf("coral-datepicker-next") !== -1) {
				$(this).removeClass("coral-datepicker-next-hover");
			}
		})
		.delegate( selector, "mouseover", datepicker_handleMouseover );
}
function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".coral-datepicker-calendar").find("a").removeClass("coral-state-hover");
		$(this).addClass("coral-state-hover");
		if (this.className.indexOf("coral-datepicker-prev") !== -1) {
			$(this).addClass("coral-datepicker-prev-hover");
		}
		if (this.className.indexOf("coral-datepicker-next") !== -1) {
			$(this).addClass("coral-datepicker-next-hover");
		}
	}
}
// jquery extend 忽略null
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/**
 * 日历组件的工厂方法调用
 * @param option string - 命令 ， 附加参数选项
 * 				 object - 为日历组件附加设置
 * @return jquery对象
 */
$.fn.datepicker = function(options){
	var returnValue = this;
	if ( !this.length ) {
		return this;
	}
	//初始化日历组件
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}
	//在body中加入日历组件
	if ($("#"+$.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);

	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);

	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "getDateValue" || options === "widget" || options == "component")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (typeof options === "string" && (options === "valid")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		//对 datepicker("option","xxx")进行处理
		//value -> getDateValue
		var method=options;
		if(arguments[1]=="value"){
			method="getDateValue";
		}
		return $.datepicker["_" + method + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	this.each(function() {
		//实例为空，判断为初始化
		if ( !$.data(this, PROP_NAME) ) {
			returnValue = typeof options === "string" ?
				$.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this].concat(otherArgs)) :
					$.datepicker._attachDatepicker(this, options);
		//判断为调用方法
		} else if ( !!$.data(this, PROP_NAME) ) {
			returnValue = typeof options === "string" ?
					$.datepicker["_" + options + "Datepicker"].
					apply($.datepicker, [this].concat(otherArgs)) :
						$.datepicker._attachDatepicker(this, options);
		}
	});
	return returnValue;
};

$.datepicker = new Datepicker(); // 单例模式
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "4.0.1";

})(jQuery);
