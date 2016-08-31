/*!
 * 组件库 4.0：鼠标辅助工具
 *
 * 依赖JS文件:
 *	jquery.coral.component.js
 */
(function(){var a=false;$(document).mouseup(function(){a=false});$.component("coral.mouse",{version:"4.0.1",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.componentName,function(c){return b._mouseDown(c)}).bind("click."+this.componentName,function(c){if(true===$.data(c.target,b.componentName+".preventClickEvent")){$.removeData(c.target,b.componentName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.componentName);if(this._mouseMoveDelegate){this.document.unbind("mousemove."+this.componentName,this._mouseMoveDelegate).unbind("mouseup."+this.componentName,this._mouseUpDelegate)}},_mouseDown:function(d){if(a){return}(this._mouseStarted&&this._mouseUp(d));this._mouseDownEvent=d;var c=this,e=(d.which===1),b=(typeof this.options.cancel==="string"&&d.target.nodeName?$(d.target).closest(this.options.cancel).length:false);if(!e||b||!this._mouseCapture(d)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(d)&&this._mouseDelayMet(d)){this._mouseStarted=(this._mouseStart(d)!==false);if(!this._mouseStarted){d.preventDefault();return true}}if(true===$.data(d.target,this.componentName+".preventClickEvent")){$.removeData(d.target,this.componentName+".preventClickEvent")}this._mouseMoveDelegate=function(f){return c._mouseMove(f)};this._mouseUpDelegate=function(f){return c._mouseUp(f)};this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);d.preventDefault();a=true;return true},_mouseMove:function(b){if($.coral.ie&&(!document.documentMode||document.documentMode<9)&&!b.button){return this._mouseUp(b)}else{if(!b.which){return this._mouseUp(b)
}}if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,b)!==false);(this._mouseStarted?this._mouseDrag(b):this._mouseUp(b))}return !this._mouseStarted},_mouseUp:function(b){this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;if(b.target===this._mouseDownEvent.target){$.data(b.target,this.componentName+".preventClickEvent",true)}this._mouseStop(b)}a=false;return false},_mouseDistanceMet:function(b){return(Math.max(Math.abs(this._mouseDownEvent.pageX-b.pageX),Math.abs(this._mouseDownEvent.pageY-b.pageY))>=this.options.distance)},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})();