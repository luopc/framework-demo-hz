/*!
 * 组件库4.0：分栏符
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 */
(function(a){a.component("coral.subfield",{version:"4.0.1",options:{title:"",lineCls:null,textCls:null,onClick:null},_create:function(){if(!this.element.jquery){this.element=a(this.element)}this.element.addClass("coral-subfield");this.fieldset=a('<fieldset class="coral-subfield-fieldset"></fieldset>').appendTo(this.element);if(this.options.lineCls){this.fieldset.addClass(this.options.lineCls)}this.legend=a('<legend class="coral-subfield-legend">'+this.options.title+"</legend>").appendTo(this.fieldset);if(this.options.textCls){this.legend.addClass(this.options.textCls)}this._bindEvent()},_bindEvent:function(){var b=this;this.legend.bind("click"+this.eventNamespace,function(c){if(b.options.disabled){c.preventDefault();c.stopImmediatePropagation()}else{b._trigger("onClick")}})},_setOption:function(b,c){if(b==="title"){this.setTitle(c)}},_destroy:function(){this.uiTitle.remove()},component:function(){return this.element},show:function(){this.component().show()},hide:function(){this.component().hide()},setTitle:function(b){a("legend",this.fieldset).html(b);this.options.title=b},getTitle:function(){return this.options.title}})})(jQuery);