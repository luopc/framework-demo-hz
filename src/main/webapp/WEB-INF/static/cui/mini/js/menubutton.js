/*!
 * 组件库4.0：下拉按钮
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 */
$(document).unbind(".coral-menubutton").bind("mousedown.coral-menubutton mousewheel.coral-menubutton",function(a){if($(a.target).closest("span.coral-menubutton,.coral-menubutton-buttons").length){return}$(".coral-menubutton-buttons").hide()});$.component("coral.menubutton",$.coral.button,{version:"4.0.2",castProperties:["menuOptions"],options:{id:null,name:null,label:null,cls:null,icons:{primary:null,secondary:"cui-icon-arrow-down3"},width:null,text:true,disabled:false,renderType:"menu",menuOptions:{autoDisplay:false,popup:true},data:null,url:null,method:"get",position:{my:"left top",at:"left bottom"},onCreate:null,onClick:null,onDblClick:null,onLoad:null},showPanel:function(){var e=this,d=this.options;var a=$.extend(d.position,{of:this.element});var b=this.uiButtons.siblings(".coral-front:visible").map(function(){return +$(this).css("z-index")}).get(),c=Math.max.apply(null,b);if(c>=+this.uiButtons.css("z-index")){this.uiButtons.css("z-index",c+1)}this.uiButtons.css({position:"absolute",left:"",top:""}).position(a).show()},hidePanel:function(){this.uiButtons.hide()},_create:function(){this._initElements();this._super()},_getToolbar:function(b){var d=this,c=this.options,a=$();if(this.element.hasClass("ctrl-toolbar-element")){a=b?this.element.parents(".coral-toolbar:eq(0)"):this.element.parents(".ctrl-init-toolbar:eq(0)")}return a},_hideMenus:function(){$(".coral-tieredmenu").hide()},hideAllMenus:function(){$(".coral-tieredmenu").hide()},showMenu:function(){this.uiMenu.tieredmenu("show")},_initElements:function(){var b=this,a=this.options;this.element.addClass("ctrl-init ctrl-init-menubutton coral-menubutton-element");this.uiBorder=$('<span class="coral-menubutton-border"></span>');this.uiBox=$('<span class="coral-menubutton"></span>');this.uiBox.append(this.uiBorder);this.uiBox.insertAfter(this.element);this.uiBorder.append(this.element);if(typeof this.element.attr("id")!="undefined"){this.options.id=this.element.attr("id")
}else{if(this.options.id){this.element.attr("id",this.options.id)}else{this.options.id=this.element.uniqueId().attr("id")}}if(typeof this.element.attr("name")!="undefined"){this.options.name=this.element.attr("name")}else{if(this.options.name){this.element.attr("name",this.options.name)}}this.options.onClick=function(f,d){if(a.renderType=="button"){if(!b.uiButtons.is(":visible")){b.showPanel()}else{b.hidePanel()}}if(!b._getToolbar().length||!b._getToolbar().toolbar("option","autoDisplay")){return}var c=b._getToolbar(true);if(c.length){c.toggleClass("coral-toolbar-click-active")}},this.options.onMouseEnter=function(f,d){if(!b._getToolbar().length||!b._getToolbar().toolbar("option","autoDisplay")){return}if(a.renderType=="button"){return}var c=b._getToolbar(true);if(c.hasClass("coral-toolbar-click-active")){if($(".coral-tieredmenu:visible").length){b._hideMenus()}b.uiMenu.tieredmenu("show")}};this._on(this.element,{buttononclick:function(d,c){b._trigger("onClick",d,c)}});if(a.renderType=="button"){this.uiButtons=$("<div class='coral-menubutton-buttons coral-front'></div>").appendTo($(document.body));this._loadData()}else{this.uiMenu=$('<ul class="coral-menubutton-menu"></ul>').appendTo($(document.body));this._renderMenu()}},_renderMenu:function(){var e=this,d=this.options,c=this.options.menuOptions,f=this.options.data,a=this.options.url;var b={};if(null!=f){b.data=f}if(null!=a){b.url=a}c=$.extend({},b,d.menuOptions,{id:this.element.attr("id")+"_tieredmenu",trigger:this.element,of:this.element});this.uiMenu.tieredmenu(c);if(e._getToolbar().length&&e._getToolbar().toolbar("option","autoDisplay")){this.uiMenu.tieredmenu("component").bind("mouseleave",function(){e._hideMenus()})}this._on(this.uiMenu,{tieredmenuonclick:function(h,g){e._trigger("onClick",h,g)}})},_loadData:function(){var b=this,a=this.options;if(a.url){$.ajax({type:a.method,url:a.url,data:{},dataType:"json",success:function(c){b._initData(c)},error:function(){$.alert("Json Format Error!")}})}else{if(a.data){this._initData(a.data)
}}},_initData:function(b){var a=this;if(typeof b==="object"){this._addItems(null,b)}a._trigger("onLoad",null,{})},_addItems:function(d,g){if(typeof g!=="object"){return}var f=this,c=[],b=g.length;for(var e=0;e<b;e++){var a=g[e];if(!$.isEmptyObject(a)){c.push(f._createButton(a))}}this._appendItems(d,c);this._initItems(c)},_createButton:function(a){return{button:$("<button type='button'></button>").addClass("coral-menubutton-button-item"),options:a}},_appendItems:function(b,a){for(var c in a){a[c].button.appendTo(this.uiButtons)}},_initItems:function(a){var f=this;for(var d in a){var c=a[d].button,e=a[d].options;c.button(e);var b={};b.buttononclick=function(h,g){f._trigger("onClick",h,g)};f._on(c,b)}},add:function(a){},prepend:function(d){if(!d instanceof jQuery){return}var e=this,a=d.length;if(!(d instanceof Array)){d=[d]}for(var c=a-1;c>-1;c--){var b=d[c];b.css({margin:"",left:"",right:""}).removeClass("coral-menubutton-button-item").addClass("coral-menubutton-button-item").prependTo(e.uiButtons)}},append:function(d){if(!d instanceof jQuery){return}var e=this,a=d.length;if(!(d instanceof Array)){d=[d]}for(var c=a-1;c>-1;c--){var b=d[c];b.css({margin:"",left:"",right:""}).removeClass("coral-menubutton-button-item").addClass("coral-menubutton-button-item").prependTo(e.uiButtons)}},pop:function(){var c=this,b=this.options;if("button"!=b.renderType){return $()}var a=this.uiButtons.find(".coral-menubutton-button-item:eq(0)");if(a.length){return a.removeClass("coral-menubutton-button-item")}else{return $()}},component:function(){return this.uiBox},border:function(){return this.uiBorder},buttons:function(){return this.uiButtons},buttonElements:function(){return this.uiButtons.children()},menu:function(){return this.uiMenu},_bindEvents:function(){},_setOption:function(a,c){var b=this;if(a==="id"||a==="name"){return}if(a==="disabled"){this.element.toggleClass("coral-state-disabled",c)}this._super(a,c)},_destroy:function(){var a=this.options;this.uiBox.replaceWith(this.element);
if(a.renderType=="buttons"){this.uiButtons.remove()}else{this.uiMenu.parent().remove()}this.element.children().remove();this.element.removeClass("ctrl-init ctrl-init-menubutton coral-menubutton-element")}});