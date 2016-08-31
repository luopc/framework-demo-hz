/*!
 * 组件库4.0：下拉按钮
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 */
$.component("coral.splitbutton",$.coral.button,{version:"4.0.2",componentName:"splitbutton",castProperties:["menuOptions","dataCustom"],options:{id:null,name:null,label:null,cls:null,icons:{primary:null,secondary:null},width:null,text:true,disabled:false,menuOptions:{autoDisplay:false,popup:true},data:null,url:null,onCreate:null,onClick:null,onDblClick:null},component:function(){var a=this;return this.uiBox},uiBorder:function(){return this.uiBorder},uiDropdownButton:function(){return this.dropdownButton},menu:function(){return this.uiMenu},_create:function(){var a=this;this._initElements();this._super()},_initElements:function(){var e=this,d=this.options,c=this.options.menuOptions,f=this.options.data,a=this.options.url;this.element.addClass("ctrl-init ctrl-init-splitbutton coral-splitbutton-element");this.dropdownButton=$("<button class='coral-splitbutton-dropdownbutton' type='button'></button>").uniqueId();this.uiBorder=$('<span class="coral-splitbutton-border"></span>');this.uiBox=$('<span class="coral-splitbutton"></span>');this.uiBox.append(this.uiBorder);this.uiMenu=$('<ul class="coral-splitbutton-menu"></ul>');this.uiBox.insertAfter(this.element);this.uiBorder.append(this.element).append(this.dropdownButton);this.uiMenu.appendTo($(document.body));if(d.width){this.uiBox.css({width:d.width})}if(typeof this.element.attr("id")!="undefined"){this.options.id=this.element.attr("id")}else{if(this.options.id){this.element.attr("id",this.options.id)}else{this.options.id=this.element.uniqueId()}}if(typeof this.element.attr("name")!="undefined"){this.options.name=this.element.attr("name")}else{if(this.options.name){this.element.attr("name",this.options.name)}}this.triggerId=this.dropdownButton.attr("id");this._on(this.element,{buttononclick:function(h,g){e._trigger("onClick",h,g)}});this.dropdownButton.button({label:"下拉按钮",text:false,icons:"cui-icon-arrow-down3",onClick:function(i,h){if(!e._getToolbar().length||e._getToolbar().toolbar("option","clickToDisplay")==0){return
}if(!e._getToolbar().length||!e._getToolbar().toolbar("option","autoDisplay")){return}var g=e._getToolbar(true);if(g.length){g.toggleClass("coral-toolbar-click-active")}},onMouseEnter:function(i,h){if(!e._getToolbar().length||!e._getToolbar().toolbar("option","autoDisplay")){return}var g=e._getToolbar(true);if(g.hasClass("coral-toolbar-click-active")){if($(".coral-tieredmenu:visible").length){e._hideMenus()}e.uiMenu.tieredmenu("show")}}});var b={};if(null!=f){b.data=f}if(null!=a){b.url=a}c=$.extend({},b,d.menuOptions,{id:this.element.attr("id")+"_tieredmenu",trigger:this.dropdownButton,of:this.element});this.uiMenu.tieredmenu(c);if(e._getToolbar().length&&e._getToolbar().toolbar("option","autoDisplay")){this.uiMenu.tieredmenu("component").bind("mouseleave",function(){e._hideMenus()})}this._on(this.uiMenu,{tieredmenuonclick:function(h,g){e._trigger("onClick",h,g)}})},_getToolbar:function(b){var d=this,c=this.options,a=$();if(this.element.hasClass("ctrl-toolbar-element")){a=b?this.element.parents(".coral-toolbar:eq(0)"):this.element.parents(".ctrl-init-toolbar:eq(0)")}return a},_hideMenus:function(){$(".coral-tieredmenu").hide()},hideAllMenus:function(){$(".coral-tieredmenu").hide()},showMenu:function(){this.uiMenu.tieredmenu("show")},_setOption:function(a,c){if(a==="id"||a==="name"){return}var b=this;if(a==="disabled"){this.element.toggleClass("coral-state-disabled",c);this.dropdownButton.button("option","disabled",c)}this._super(a,c)},_destroy:function(){this.uiBox.replaceWith(this.element);this.uiMenu.parent().remove();this.element.removeClass("ctrl-init ctrl-init-splitbutton coral-splitbutton-element")}});