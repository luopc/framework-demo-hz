/**
 * 组件库4.0：布局
 * 
 * 依赖JS文件:
 *  jquery.coral.core.js
 *  jquery.coral.component.js
 *  jquery.coral.parser.js
 *  jquery.coral.panel.js
 *	jquery.coral.resizable.js
 */
(function ($) {
"use strict";
	
$.component("coral.layout", {
	version: "4.1.4",
	options:{
		onCreate: null,
		fit : false
	},
	layoutPanelDefault: {
		region: null,
		split: false,
		collapsedSize: 28,
		minWidth: 10,
		minHeight: 10,
		maxWidth: 10000,
		maxHeight: 10000
	},	
	resizing: false,//当分割条在被拖动时,值为true
	_resizeLayout: function() {
		var that = this,
			el = this.element,
			layoutOptions = that.options,
			layoutPanels = that.panels,
			cc = $(el);
		if (el[0].tagName.toLowerCase() == "body") {
			this._fit();
		} else {
			layoutOptions.fit ? cc.css(this._fit()) : this._fit(false);
		}
		//设置中央panel的默认尺寸大小
		var centerPanelSize = {
			top: 0,
			left: 0,
			width: cc.width(),
			height: cc.height()
		};
		resizePanelVertical(this._isPanelVisible(layoutPanels.expandNorth) ? 
			layoutPanels.expandNorth : layoutPanels.north, "n");
		resizePanelVertical(this._isPanelVisible(layoutPanels.expandSouth) ? 
			layoutPanels.expandSouth : layoutPanels.south, "s");
		resizePanelHorizontal(this._isPanelVisible(layoutPanels.expandEast) ? 
			layoutPanels.expandEast : layoutPanels.east, "e");
		resizePanelHorizontal(this._isPanelVisible(layoutPanels.expandWest) ? 
			layoutPanels.expandWest : layoutPanels.west, "w");
		layoutPanels.center.panel("resize", centerPanelSize);
		function _getHeight(pp) {
			var _c = pp.panel("getOptions");
			return Math.min(Math.max(_c.height, _c.minHeight), _c.maxHeight);
		};
		function _getWidth(pp) {
			var _e = pp.panel("getOptions");
			return Math.min(Math.max(_e.width, _e.minWidth), _e.maxWidth);
		};
		//设置南、北panel尺寸大小
		function resizePanelVertical(pp, dir) {
			if (!pp.length || !that._isPanelVisible(pp)) {
				return;
			}
			var panelOpts = pp.panel("getOptions");
			var pHeight = _getHeight(pp);
			pp.panel("resize", {
				width : cc.width(),
				height : pHeight,
				left : 0,
				top : (dir == "n" ? 0 : cc.height() - pHeight)
			});
			centerPanelSize.height -= pHeight;
			if (dir == "n") {
				centerPanelSize.top += pHeight;
				if (!panelOpts.split && panelOpts.border) {
					centerPanelSize.top--;
				}
			}
			if (!panelOpts.split && panelOpts.border) {
				centerPanelSize.height++;
			}
		};
		//设置东、西panel尺寸大小
		function resizePanelHorizontal(pp, dir) {
			if (!pp.length || !that._isPanelVisible(pp)) {
				return;
			}
			var panelOpts = pp.panel("getOptions");
			var pWidth = _getWidth(pp);
			pp.panel("resize", {
				width : pWidth,
				height : centerPanelSize.height,
				left : (dir == "e" ? cc.width() - pWidth : 0),
				top : centerPanelSize.top
			});
			centerPanelSize.width -= pWidth;
			if (dir == "w") {
				centerPanelSize.left += pWidth;
				if (!panelOpts.split && panelOpts.border) {
					centerPanelSize.left--;
				}
			}
			if (!panelOpts.split && panelOpts.border) {
				centerPanelSize.width++;
			}
		};
	},
	_splitLayout: function (region, isSplit) {
		var p = $(this.element).layout("panel", region);
		p.panel("options").split = isSplit;
		var cls = "layout-split-" + region;
		var pElement = p.panel("panel").removeClass(cls);
		if (isSplit) {
			pElement.addClass(cls);
		}
		pElement.resizable({
			disabled : (!isSplit)
		});
		this._resizeLayout();
	},
	_create : function () {
		//layout对象初始化五个方向的panel对象
		this.panels = {
			center : $(),
			north : $(),
			south : $(),
			east : $(),
			west : $()
		};
		var that = this;
		var el = this.element;
		var cc = $(el);
		cc.addClass("coral-layout");
		//为layout中各个方向的div初始化panel
		function createLayoutPanels(cc) {
			cc.children("div").each(function() {
				var options = $.parser.parseOptions(this,[]);
				if ("north,south,east,west,center".indexOf(options.region) >= 0) {
					that._addPanel(el, options, this);
				}
			});
		};
		cc.children("form").length ? createLayoutPanels(cc.children("form")) : createLayoutPanels(cc);
		//layout中添加竖向和横向分割条div
		cc.append("<div class=\"coral-layout-split-proxy-h\"></div><div class=\"coral-layout-split-proxy-v\"></div>");
		//刷新layout中各个panel的尺寸大小
		this._resizeLayout();
		//初始化panel的折叠
		this._initCollapse();
	},
	_addPanel : function (el, options, ele) {
		var that = this;
		options.region = options.region || "center";
		var panels = this.panels;
		var cc = $(el);
		var dir = options.region;
		if (panels[dir].length) {
			return;
		}
		//panel元素对象
		var pp = $(ele);
		if (!pp.length) {
			pp = $("<div></div>").appendTo(cc);
		}
		//创建panel的options属性
		var setting = $.extend( {}, this.layoutPanelDefault, {
			width: (pp.length ? 
				parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
			height: (pp.length ? 
				parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
			doSize: false,
			collapsible: true,
			componentCls: ("coral-layout-panel coral-layout-panel-" + dir),
			bodyCls : "coral-layout-body",
			//初始化时展开的panel，onOpen回调中绑定_collapse方法
			onOpen : function() {
				var panelToolDiv = $(this).panel("header").children("div.coral-panel-tool");
				panelToolDiv.children("a.coral-panel-tool-collapse").hide();
				var panelBtnDirSet = {
					north : "up3",
					south : "down3",
					east : "right3",
					west : "left3"
				};
				if (!panelBtnDirSet[dir]) {
					return;
				}
				var arrowCls = "cui-icon-arrow-" + panelBtnDirSet[dir];
				var t = panelToolDiv.children("a." + arrowCls);
				if (!t.length) {
					t = $("<a href=\"javascript:void(0)\"></a>")
						.addClass("icon " + arrowCls)
						.appendTo(panelToolDiv);
				}
				// fixed: t已经存在，绑定不上事件
				t.unbind("click").bind("click", {
					dir: dir
				}, function(e) {
					that._collapse(e.data.dir);
					return false;
				});
				$(this).panel("getOptions").collapsible ? t.show() : t.hide();
			}
		}, options);
		// fixed: region是center的时候，split设置为true会报错。
		if (setting.region === "center") {
			setting.split = false;
		}
		pp.panel(setting);
		panels[dir] = pp;
		//panel之间是否有分割条
		var panelObj = pp.panel("component");
		var panelHandlesDirSet = {
			north: "s",
			south: "n",
			east: "w",
			west: "e"
		};
		if (pp.panel("option").split) {
			panelObj.addClass("coral-layout-split-" + dir);
		
			// 分割条拖动事件：
			// 使用resizable组件使得panel组件可拖放大小
			// layout: true，告知resizable组件中_mouseDrag方法在拖动时不改变
			// panel的大小，_mouseStop时才改变panel的大小
			panelObj.resizable($.extend({
				handles: (panelHandlesDirSet[dir] || ""),
				disabled : (!pp.panel("option").split),
				start: function(e) {
					that.resizing = true;
					if (dir == "north" || dir == "south") {
						var lSplit = $( ">div.coral-layout-split-proxy-v", el );
					} else {
						var lSplit = $( ">div.coral-layout-split-proxy-h", el );
					}
					var top = 0,
						pos = {
							display : "block"
						};
					if (dir == "north") {
						pos.top = parseInt( panelObj.css("top") ) + 
							panelObj.outerHeight() - lSplit.height();
						pos.left = parseInt( panelObj.css("left"));
						pos.width = panelObj.outerWidth();
						pos.height = lSplit.height();
					} else {
						if (dir == "south") {
							pos.top = parseInt( panelObj.css("top"));
							pos.left = parseInt( panelObj.css("left"));
							pos.width = panelObj.outerWidth();
							pos.height = lSplit.height();
						} else {
							if (dir == "east") {
								pos.top = parseInt(panelObj.css("top")) || 0;
								pos.left = parseInt(panelObj.css("left")) || 0;
								pos.width = lSplit.width();
								pos.height = panelObj.outerHeight();
							} else {
								if (dir == "west") {
									pos.top = parseInt(panelObj.css("top")) || 0;
									pos.left = panelObj.outerWidth()- lSplit.width();
									pos.width = lSplit.width();
									pos.height = panelObj.outerHeight();
								}
							}
						}
					}
					lSplit.css(pos);
					$("<div class=\"coral-layout-mask\"></div>")
						.css({
							left: 0,
							top: 0,
							width: cc.width(),
							height: cc.height()
						}).appendTo(cc);
				},
				resize: function(e) {
					if (dir == "north" || dir == "south") {
						var lSplit = $(">div.coral-layout-split-proxy-v", el);
						lSplit.css( "top", e.pageY - $(el).offset().top - 
							lSplit.height() / 2);
					} else {
						var lSplit = $(">div.coral-layout-split-proxy-h", el);
						lSplit.css("left", e.pageX - $(el).offset().left - 
							lSplit.width() / 2);
					}
					return false;
				},
				helper: "coral-resizable-helper",
				stop: function(e,ui) {
					cc.children("div.coral-layout-split-proxy-v,div.coral-layout-split-proxy-h").hide();
					pp.panel("resize", ui.size);
					that._resizeLayout();
					that.resizing = false;
					cc.find(">div.coral-layout-mask").remove();
				}
			}, options));
		}
	},
	// 删除region对应的panel（折叠与非折叠状态的panel）
	_remove: function (region) {
		var panels = this.panels;
		if (panels[region].length) {
			panels[region].panel("destroy");
			// destroy can't remove panel element
			$(panels[region]).remove();
			panels[region] = $();
			var expandRegion = "expand" + region.substring(0, 1).toUpperCase()
					+ region.substring(1);
			if (panels[expandRegion]) {
				panels[expandRegion].panel("destroy");
				// destroy can't remove panel element
				$(panels[region]).remove();
				panels[expandRegion] = undefined;
			}
		}
	},
	//折叠panel(折叠的panel与展开的panel是两个div)
	_collapse : function (region, speed) {
		var that = this,
			el = this.element;
		if (speed == undefined) {
			speed = "normal";
		}
		var panels = this.panels;
		var p = panels[region];
		var panelOpts = p.panel("getOptions");
		if (panelOpts.beforeCollapse.call(p) == false) {
			return;
		}
		
		var expandRegion = "expand" + region.substring(0, 1).toUpperCase()
				+ region.substring(1);
		if (!panels[expandRegion]) {
			panels[expandRegion] = _createCollapsedPanel(region);
			panels[expandRegion].panel("component").bind("click", function() {
				var styleC = _getStyleC();
				p.panel("expand", false).panel("open").panel(
					"resize", 
					styleC.collapse
				);
				p.panel("component").animate(
					styleC.expand, 
					function() {
						$(this).unbind(".layout").bind(
							"mouseleave.layout", 
							{region: region}, 
							function(e) {
								//当分割条在被拖动时，鼠标离开panel不触发折叠事件
								if (that.resizing == true) {
									return;
								}
								that._collapse(e.data.region);
							});
					});
				return false;
			});
		}
		var styleC = _getStyleC();
		if (!this._isPanelVisible(panels[expandRegion])) {
			panels.center.panel("resize", styleC.resizeC);
		}
		//折叠当前panel的动画效果
		p.panel("component").animate(styleC.collapse, speed, function() {
			p.panel("collapse", false).panel("close");
			panels[expandRegion].panel("open").panel("resize", styleC.expandP);
			$(this).unbind(".layout");
		});
		//创建折叠后的panel
		function _createCollapsedPanel(dir) {
			var iconClass;
			if (dir == "east") {
				iconClass = "cui-icon-arrow-left3";
			} else {
				if (dir == "west") {
					iconClass = "cui-icon-arrow-right3";
				} else {
					if (dir == "north") {
						iconClass = "cui-icon-arrow-down3";
					} else {
						if (dir == "south") {
							iconClass = "cui-icon-arrow-up3";
						}
					}
				}
			}
			var p = $("<div></div>").appendTo(el);
			p.panel($.extend( {}, that.layoutPanelDefault, {
				componentCls : ("coral-layout-expand coral-layout-expand-" + dir),
				title: "&nbsp;",
				closed: true,
				minWidth: 0,
				minHeight: 0,
				doSize: false,
				tools: [{
					iconCls: iconClass,
					handler: function() {
						//折叠后的panel，需要绑定_expand方法
						that._expand(region);
						return false;
					}
				}]
			}));
			p.panel("component").hover(function() {
				$(this).addClass("coral-layout-expand-over");
			}, function() {
				$(this).removeClass("coral-layout-expand-over");
			});
			return p;
		};
		//获得尺寸大小及位置
		function _getStyleC() {
			var cc = $(el);
			var centerOpt = panels.center.panel("getOptions");
			var collapsedSize = panelOpts.collapsedSize;
			if (region == "east") {
				var ww = centerOpt.width + panelOpts.width - collapsedSize;
				if (panelOpts.split || !panelOpts.border) {
					ww++;
				}
				return {
					resizeC: {
						width : ww
					},
					expand: {
						left : cc.width() - panelOpts.width
					},
					expandP: {
						top : centerOpt.top,
						left : cc.width() - collapsedSize,
						width : collapsedSize,
						height : centerOpt.height
					},
					collapse : {
						left : cc.width(),
						top : centerOpt.top,
						height : centerOpt.height
					}
				};
			} else {
				if (region == "west") {
					var ww = centerOpt.width + panelOpts.width - collapsedSize;
					if (panelOpts.split || !panelOpts.border) {
						ww++;
					}
					return {
						resizeC : {
							width : ww,
							left : collapsedSize - 1
						},
						expand : {
							left : 0
						},
						expandP : {
							left : 0,
							top : centerOpt.top,
							width : collapsedSize,
							height : centerOpt.height
						},
						collapse : {
							left : -panelOpts.width,
							top : centerOpt.top,
							height : centerOpt.height
						}
					};
				} else {
					if (region == "north") {
						var hh = centerOpt.height;
						if (!that._isPanelVisible(panels.expandNorth)) {
							hh += panelOpts.height - collapsedSize
									+ ((panelOpts.split || !panelOpts.border) ? 1 : 0);
						}
						panels.east.add(panels.west).add(panels.expandEast).add(
								panels.expandWest).panel("resize", {
							top : collapsedSize - 1,
							height : hh
						});
						return {
							resizeC : {
								top : collapsedSize - 1,
								height : hh
							},
							expand : {
								top : 0
							},
							expandP : {
								top : 0,
								left : 0,
								width : cc.width(),
								height : collapsedSize
							},
							collapse : {
								top : -panelOpts.height,
								width : cc.width()
							}
						};
					} else {
						if (region == "south") {
							var hh = centerOpt.height;
							if (!that._isPanelVisible(panels.expandSouth)) {
								hh += panelOpts.height - collapsedSize
										+ ((panelOpts.split || !panelOpts.border) ? 1 : 0);
							}
							panels.east.add(panels.west).add(panels.expandEast).add(
									panels.expandWest).panel("resize", {
								height : hh
							});
							return {
								resizeC : {
									height : hh
								},
								expand : {
									top : cc.height() - panelOpts.height
								},
								expandP : {
									top : cc.height() - collapsedSize,
									left : 0,
									width : cc.width(),
									height : collapsedSize
								},
								collapse : {
									top : cc.height(),
									width : cc.width()
								}
							};
						}
					}
				}
			}
		};
	},
	//展开panel
	_expand: function (region) {
		var that = this,
			el = this.element,
			panels = this.panels,
			p = panels[region],
			panelOpts = p.panel("getOptions");
		if (panelOpts.beforeExpand.call(p) == false) {
			return;
		}
		var styleE = getBeginEndPos();
		var expandRegion = "expand" + 
			region.substring(0, 1).toUpperCase() + 
			region.substring(1);
		if (panels[expandRegion]) {
			panels[expandRegion].panel("close");
			p.panel("component").stop(true, true);
			p.panel("expand", false).panel("open")
				.panel("resize", styleE.collapse);
			p.panel("component").animate(styleE.expand, function() {
				that._resizeLayout();
			});
		}
		//获得尺寸大小及位置
		function getBeginEndPos() {
			var cc = $(el);
			var centerOpt = panels.center.panel("getOptions");
			if (region == "east" && panels.expandEast) {
				return {
					collapse : {
						left : cc.width(),
						top : centerOpt.top,
						height : centerOpt.height
					},
					expand : {
						left : cc.width() - panels["east"].panel("getOptions").width
					}
				};
			} else {
				if (region == "west" && panels.expandWest) {
					return {
						collapse : {
							left : -panels["west"].panel("getOptions").width,
							top : centerOpt.top,
							height : centerOpt.height
						},
						expand : {
							left : 0
						}
					};
				} else {
					if (region == "north" && panels.expandNorth) {
						return {
							collapse : {
								top : -panels["north"].panel("getOptions").height,
								width : cc.width()
							},
							expand : {
								top : 0
							}
						};
					} else {
						if (region == "south" && panels.expandSouth) {
							return {
								collapse: {
									top: cc.height(),
									width: cc.width()
								},
								expand: {
									top: cc.height()
											- panels["south"].panel("getOptions").height
								}
							};
						}
					}
				}
			}
		};
	},
	_isPanelVisible: function (pp) {
		if (!pp) {
			return false;
		}
		if (pp.length) {
			return pp.panel("component").is(":visible");
		} else {
			return false;
		}
	},
	//layout初始化时，折叠collapse=true的panel
	_initCollapse: function () {
		var panels = this.panels;
		if (panels.east.length && panels.east.panel("getOptions").collapsed) {
			this._collapse("east", 0);
		}
		if (panels.west.length && panels.west.panel("getOptions").collapsed) {
			this._collapse("west", 0);
		}
		if (panels.north.length && panels.north.panel("getOptions").collapsed) {
			this._collapse("north", 0);
		}
		if (panels.south.length && panels.south.panel("getOptions").collapsed) {
			this._collapse("south", 0);
		}
	},
	//layout大小自适应外层html元素
	_fit: function (fit) {
		return $.coral.panel.fit(this.element, fit);
	},
	// 销毁layout
	_destroy: function () {
		//this.panels.north.panel("destroy");
		//this.panels.south.panel("destroy");
		//this.panels.west.panel("destroy");
		//this.panels.east.panel("destroy");
		//this.panels.center.panel("destroy");
		this.element.children().remove();
		this.element.detach();
	},
	// 刷新layout
	refresh: function() {
		this._resizeLayout();
	},
	// 获得layout中对应方位region的panel
	panel: function(region) {
		return this.panels[region];
	},
	// 折叠layout中对应方位region的panel
	collapse: function(region) {
		this._collapse(region);
	},
	// 展开layout中对应方位region的panel
	expand: function(region) {
		this._expand(region);
	},
	// 添加layout中对应方位region的panel
	add: function(options) {
		this._addPanel(this.element, options);
		this._resizeLayout();
		if (this.panels[options.region]
				.panel("getOptions").collapsed) {
			this._collapse(options.region, 0);
		}
	},
	//删除layout中对应方位region的panel
	remove: function(region) {
		this._remove(region);
		this._resizeLayout();
	},
	split: function(region) {
		this._splitLayout(region, true);
	},
	unsplit: function(region) {
		this._splitLayout(region, false);
	},
	//改变layout中对应方位region的大小
	resize: function(pos, region){
		// TODO:
		var props = pos;
		var el = this.element;
		if(region !== undefined){
			var pp = this.panels[region];
			var oldHeight = pp.panel('component').outerHeight();
			var oldWidth = pp.panel('component').outerWidth();
			pp.panel('resize', pos);
			var newHeight = pp.panel('component').outerHeight();
			var newWidth = pp.panel('component').outerWidth();
			
			props.height = $(el).height() + newHeight - oldHeight;
			props.width = $(el).width() + newWidth - oldWidth;
		}
		$(el).css(props);
		this._resizeLayout();
	}
});

})(jQuery);
