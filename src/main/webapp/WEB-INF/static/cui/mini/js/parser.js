$.parser={auto:true,doneArr:[],component:[],onComplete:function(a){},onInit:function(a){},plugins:["tabs","layout","grid","panel","button","menubutton","treebutton","splitbutton","accordion","textbox","autocomplete","uploader","radio","radiolist","checkbox","checkboxlist","spinner","slider","combo","combobox","combotree","combogrid","datepicker","form","picgrid","tree","toolbar","progressbar","menu","menubar","contextmenu","slidemenu","tieredmenu","navigatemenu","dialog","subfield","splitcontainer","view"],parse:function(context){$.parser.onInit.call($.parser,context);var aa=[];var htmlParse=function(){$.each($.parser.component,function(i){var c=$.parser.component.shift();if(c){var ele=$("#"+c.id);if(ele.length){if(c.id&&typeof(c.id)=="string"){var $Script=$("#"+c.id+"_s");if($Script.length>0){$Script.remove()}}if(ele[c.componentName]){ele[c.componentName]()}else{aa.push({name:c.componentName,jq:ele})}}}})};htmlParse();$.each($("script.coralscript",context),function(i){eval("( function() { "+this.innerHTML+" } )();");$(this).remove()});htmlParse();for(var i=0;i<$.parser.plugins.length;i++){var name=$.parser.plugins[i];var r=$(".coralui-"+name,context);r.removeClass("coralui-"+name);if(r.length){if(r[name]){r[name]()}else{aa.push({name:name,jq:r})}}}if(aa.length){var names=[];for(var i=0;i<aa.length;i++){names.push(aa[i].name)}easyloader.load(names,function(){for(var i=0;i<aa.length;i++){var name=aa[i].name;var jq=aa[i].jq;jq[name]()}$.parser.onComplete.call($.parser,context);$.each($.parser.doneArr,function(i){var fun=$.parser.doneArr.shift();if($.isFunction(fun)){fun.call($.parser,context)}});$.coral.refreshAllComponent(context);$.parser.onComplete.call($.parser,context);bb={}})}else{$.parser.onComplete.call($.parser,context);$.each($.parser.doneArr,function(i){var fun=$.parser.doneArr.shift();if($.isFunction(fun)){fun.call($.parser)}else{if(fun){var o=fun;if($.isFunction(o.fun)){o.fun.call(o.context,o.args)}}}});$.coral.refreshAllComponent(context);$.parser.onComplete.call($.parser,context);
bb={}}},parseOptions:function(f,g,c){var l=$(f),n=$.trim(l.attr("data-options")),e=null,k=null,a=null,d=0,b=null,j=null,h=null,m={};if(n){e=n.substring(0,1);k=n.substring(n.length-1,1);if(e!="{"){n="{"+n}if(k!="}"){n=n+"}"}m=(new Function("return "+n))()}if(g){a={};for(var d=0;d<g.length;d++){j=g[d];if(typeof j=="string"){if(j=="width"||j=="height"||j=="left"||j=="top"){a[j]=parseInt(f.style[j])||undefined}else{a[j]=l.attr(j)}}else{for(b in j){h=j[b];if(h=="boolean"){a[b]=l.attr(b)?(l.attr(b)=="true"):undefined}else{if(h=="number"){a[b]=l.attr(b)=="0"?0:parseFloat(l.attr(b))||undefined}}}}}$.extend(m,a);a=null}if(c instanceof Array){for(d=0;d<c.length;d++){b=c[d];if(m.controllerName&&typeof m[b]=="string"){m[b]=m.controllerName+"."+m[b]}change2object(m,b.split("."),m.controllerName)}}return m}};$(function(){if(!window.easyloader&&$.parser.auto){$.parser.parse()}});function change2object(d,b){var a=b.shift();if(b.length==0){if(d&&d[a]&&typeof d[a]==="string"){try{d[a]=(new Function("return "+d[a]))()}catch(c){}}}else{change2object(d[a],b)}}$.parseDone=function(a){$.parser.doneArr.push(a)};