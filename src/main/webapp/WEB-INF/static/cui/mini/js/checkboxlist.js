/*!
 * 组件库4.0：复选框组
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 *    jquery.validatehelper.js
 */
$.component("coral.checkboxlist",$.coral.formelement,{version:"4.0.1",castProperties:["data","triggers"],options:{id:null,name:null,valueField:"value",textField:"text",required:false,showStar:true,maxLabelWidth:"auto",labelField:null,starBefore:false,column:null,disabled:false,readonly:false,value:"",data:null,url:null,termSplit:";",itemSplit:":",errMsg:null,errMsgPosition:"leftBottom",repeatLayout:"table",itemWidth:"auto",onValidError:null,onKeyDown:null,onValidSuccess:null,triggers:null,excluded:false,onChange:$.noop},_create:function(){var e=this,b=null,a=null,f=null,d=this.options;if(!this.element.jquery){this.element=$(this.element)}this.element.addClass("coral-form-element-checkboxlist  ctrl-init ctrl-form-element ctrl-init-checkboxlist coral-validation-checkboxlist");typeof e.element.attr("id")=="undefined"&&!!e.options.id&&e.element.attr("id",e.options.id);e.options.id=e.element.uniqueId().attr("id");var c=e.element.attr("name");typeof c!="undefined"?(e.options.name=c):(e.element.attr("name",e.options.name));this.uiBoxlist=$('<span class="coral-checkboxlist"></span>');this.uiInput=$('<input type="hidden">');if(this.options.name){this.uiInput.attr("name",this.options.name)}if(this.options.value){this.uiInput.val(this.options.value)}this._initData();this.uiInput.appendTo(this.uiBoxlist);if(d.labelField){this.uiLabel=$('<label class="coral-label">'+d.labelField+"</label>");this.uiBoxlist.prepend(this.uiLabel);this.uiBoxlist.addClass("coral-hasLabel")}this.uiBoxlist.insertAfter(this.element);this.element.hide();this._bindEvent()},reload:function(a){},_initData:function(){var b=this,a=this.options;if(this.options.url){if(this.xhr){this.xhr.abort()}this.xhr=$.ajax(this._ajaxSettings());this.xhr.success(function(c){b._loadData(c)}).complete(function(d,c){if(d===b.xhr){b.xhr=null}}).error(function(){$.alert("Json Format Error!")})}else{if(this.options.data){this._loadData(this.options.data)
}}},_ajaxSettings:function(){var b=this.options,a=this;return{type:"get",url:b.url,data:{},async:false,dataType:"json"}},_loadData:function(g){var b=null,f=[],h,c=0,d=null,a=null,e=null;if(typeof g==="string"){b=g.split(this.options.termSplit);g=[];for(;c<b.length;c++){a=b[c];e=a.split(this.options.itemSplit);d={};d[this.options.valueField]=e[0];d[this.options.textField]=e[1];g.push(d)}}this.data=g;for(c;c<g.length;c++){h=g[c];if(h.checked){f.push(h[this.options.valueField])}}if(this.options.value){f=this.options.value.split(",")}if(!this.isInit){this.isInit=true;this.originalValue=f.join(",")}this._renderChkItem();this.setValue(f)},_renderChkItem:function(){if(this.options.repeatLayout=="table"){if(this.options.column==null){this.options.column=3}this._renderTableItem();this.uiTable.appendTo(this.uiBoxlist)}else{if(this.options.repeatLayout=="flow"){if(this.options.column==null){this.options.column=this.data.length}this._renderBorderItem();this.uiBorder.appendTo(this.uiBoxlist)}}},reset:function(){this.setValue(this.originalValue)},_renderBorderItem:function(){var d=this,c=this.options,b=this.options.column,e=this.data;d.uiBorder=$('<span class="coral-checkboxlist-border"></span>');for(var a in e){if(a>(b-1)&&a%(b)==0){$("<br/>").appendTo(d.uiBorder)}d._renderItem(e[a]).css("width",c.itemWidth).appendTo(d.uiBorder)}},_renderTableItem:function(){this.uiTable=$("<table></table>");var d=0,c=0,g=this.data,b=g.length||0,e=this.options.column,f=0,h=null,a=null;if(!g||g.length<1){return}f=Math.ceil(b/e);for(;d<f;d++){h=$("<tr></tr>");for(c=0;c<e;c++){a=$("<td></td>");if((d*e+c)<b){this._renderItem(g[(d*e+c)]).appendTo(a)}a.appendTo(h)}h.appendTo(this.uiTable)}},_renderItem:function(d){var b=d.hidden==true?"hidden":"";var e=$("<span class='coral-checkbox tabbable "+b+"'tabindex=0></span>"),c=$("<span class='coral-checkbox-label'></span>"),g=$("<span class='coral-checkbox-icon'></span>"),a=this.options.maxLabelWidth,i=$(),f=d[this.options.valueField],h=d[this.options.textField];
if(a=="auto"){i=$('<span class="coral-checkbox-text"></span>')}else{i=$("<span class='coral-checkbox-text'  title='"+h+"' style='max-width:"+a+"px;'></span>")}e.attr("data-value",f);c.append(g).append(i);c.appendTo(e);g.addClass("cui-icon-checkbox-unchecked");i.append(h);return e},_bindEvent:function(){var a=this;if(this.options.disabled){this._setDisabled(this.options.disabled)}this.uiBoxlist.find(".coral-checkbox").each(function(){$(this).bind("click"+a.eventNamespace,function(b){a._selectItems(b);b.stopPropagation()})});this._on({"keydown .coral-checkbox":function(c){var b=$.coral.keyCode;switch(c.keyCode){case b.SPACE:c.preventDefault();a._selectItems(c);break}a._trigger("onKeyDown",c,{})},"mouseenter .coral-checkbox":function(b){var c=$(b.target).closest(".coral-checkbox");if(c.hasClass("coral-state-disabled")){return}c.addClass("coral-checkbox-hover")},"mouseleave .coral-checkbox":function(b){var c=$(b.target).closest(".coral-checkbox");if(c.hasClass("coral-state-disabled")){return}c.removeClass("coral-checkbox-hover")}});this.uiBoxlist.find(".coral-checkbox-label").each(function(){$(this).bind("click"+a.eventNamespace,function(b){if(a.options.readonly){return false}})})},_selectItems:function(d){var c=this;if(c.options.disabled){return}var f=$(d.target).closest(".coral-checkbox"),a=f.find(".coral-checkbox-icon");if(f.hasClass("coral-state-disabled")){event.stopPropagation();return}if(a.hasClass("coral-checkboxlist-item-highlight")){a.removeClass("cui-icon-checkbox-checked coral-checkboxlist-item-highlight").addClass("cui-icon-checkbox-unchecked")}else{a.removeClass("cui-icon-checkbox-unchecked").addClass("coral-checkboxlist-item-highlight cui-icon-checkbox-checked")}var b=c.getValue();c._changeValue();c._trigger("onChange",null,{value:c.uiInput.val(),oldValue:b,checked:a.hasClass("coral-checkboxlist-item-highlight")})},_changeValue:function(){var b=this,a=[];this.uiBoxlist.find(".coral-checkbox").each(function(){if($(this).find(".coral-checkbox-icon").hasClass("coral-checkboxlist-item-highlight")){a.push($(this).attr("data-value"))
}});this.uiInput.val(a.toString())},_setDisabled:function(a){a=!!a;this.uiBoxlist.find(".coral-checkbox").each(function(){$(this).toggleClass("coral-state-disabled",a)});this.options.disabled=a},_setReadonly:function(a){a=!!a;this.uiBoxlist.find(".coral-checkbox").each(function(){$(this).toggleClass("coral-readonly",a)});this.options.readonly=a},_setOption:function(b,c){if(b==="id"||b==="name"){return}if(b==="readonly"){this._setReadonly(c)}if(b==="disabled"){this._setDisabled(c);return}if(b==="maxLabelWidth"){var e=c;if(c!="auto"){e=e+"px";var f=this.component().find(".coral-checkbox-text");for(var a=0;a<f.length;a++){var d=$(f[a]).html();$(f[a]).attr("title",d)}}else{e="";this.component().find(".coral-checkbox-text").attr("title","")}this.component().find(".coral-checkbox-text").css("max-width",e)}this._super(b,c)},_destroy:function(){this.component().remove();if(this.options.name){this.element.removeAttr("orgname").attr("name",this.options.name)}this.element.removeClass("coral-form-element-checkboxlist");this.element.removeClass("coral-validation-checkboxlist");this.element.show()},focus:function(){},component:function(){return this.uiBoxlist},disable:function(){this._setOption("disabled",true);this._setDisabled(true)},readonly:function(){this._setReadonly("readonly",true)},enable:function(){this._setOption("disabled",false);this._setDisabled(false)},disableItem:function(a){this.uiBoxlist.find('.coral-checkbox[data-value="'+a+'"]').toggleClass("coral-state-disabled",true)},enableItem:function(b){this.options.disabled=false;var a=this.uiBoxlist.find('.coral-checkbox[data-value="'+b+'"]').toggleClass("coral-state-disabled",false)},show:function(){this.component().show()},hide:function(){this.component().hide()},getValue:function(){return this.uiInput.val()},setValue:function(e,d){var a=this.getValue()||[];this.uiBoxlist.find(".coral-checkboxlist-item-highlight").each(function(){$(this).removeClass("cui-icon-checkbox-checked coral-checkboxlist-item-highlight").addClass("cui-icon-checkbox-unchecked")
});e=e||"";var b=0,c=$.isArray(e)?e:((!e||typeof e!=="string"||""===$.trim(e))?[]:e.split(","));for(;b<c.length;b++){this.uiBoxlist.find('.coral-checkbox[data-value="'+c[b]+'"]').find(".coral-checkbox-icon").removeClass("cui-icon-checkbox-unchecked").addClass("cui-icon-checkbox-checked coral-checkboxlist-item-highlight")}this.uiInput.val(c.toString())},invertCheck:function(b){var a=[];this.uiBoxlist.find(".coral-checkboxlist-item-highlight").each(function(){$(this).removeClass("cui-icon-checkbox-checked coral-checkboxlist-item-highlight").addClass("coral-checkbox-temp")});this.uiBoxlist.find(".cui-icon-checkbox-unchecked").each(function(){$(this).removeClass("cui-icon-checkbox-unchecked").addClass("cui-icon-checkbox-checked coral-checkboxlist-item-highlight")});this.uiBoxlist.find(".coral-checkbox-temp").each(function(){$(this).removeClass("coral-checkbox-temp").addClass("cui-icon-checkbox-unchecked")});this.uiBoxlist.find(".coral-checkbox").each(function(){if($(this).find(".coral-checkbox-icon").hasClass("coral-checkboxlist-item-highlight")){a.push($(this).attr("data-value"))}});this.setValue(a,b)},checkAll:function(){var b=[],a=0,d=null,c=this.data;for(;a<c.length;a++){d=c[a];b.push(d[this.options.valueField])}this.setValue(b)},getText:function(b){var c=0,d=this.data,e=null,a=[];if(!b){b=this.getValue().split(",")}else{if(typeof b){b=b.split(",")}}for(;c<d.length;c++){e=d[c][this.options.valueField];if($.inArray(e,b)>-1){a.push(d[c][this.options.textField])}}return a.toString()}});