(function(){$.blueimp.fileupload.prototype._specialOptions.push("filesContainer","uploadTemplateId","downloadTemplateId");$.component("blueimp.fileupload",$.blueimp.fileupload,{getUnUploadValues:function(){var a=[];for(var b=0;b<this.options.unUploadedFileList.length;b++){a.push(this.options.unUploadedFileList[b][this.options.prmNames.fileId])}return a},remove:function(c){var d=this;function a(f){var e=$("#"+f).data("data");if($("#"+f).hasClass("template-download")){d._trigger("remove",null,$.extend({context:$("#"+f),type:"DELETE"},e))}else{if($("#"+f).hasClass("template-upload")){if(e.abort){e.abort()}else{e.errorThrown="abort";d._trigger("fail",null,$.extend({context:$("#"+f),type:"DELETE"},e))}}}}if(c===undefined){this.options.filesContainer.children().each(function(){a(this.id)})}else{if(typeof c==="array"){for(var b=0;b<c.length;b++){a(c[b])}}else{a(c)}}this._trigger("onDelete",null)},destroy:function(){this.element.find(".fileupload-buttonbar").find(".fileinput-button").each(function(){var a=$(this).find("input:file").detach();$(this).button("destroy").append(a)});this.element.find(".ctrl-init-button").remove();this.options.filesContainer.remove();this._super()},upload:function(b){if($.isArray(b)){for(var a=0;a<b.length;a++){var c=$("#"+b[a]).data("data");if(c&&c.submit){c.submit()}}}else{var c=$("#"+b).data("data");if(c&&c.submit){c.submit()}}}});$.component("coral.fileuploader",{castProperties:["triggers"],checkIE:function(){var a=3,c=document.createElement("div"),b=c.getElementsByTagName("i");while(c.innerHTML="<!--[if gt IE "+(++a)+"]><i></i><![endif]-->",b[0]){}return a>4?a:false},options:{prmNames:{fileName:"name",fileSize:"size",fileURL:"url",fileError:"error",fileId:"id",filetype:"type"},focus:null,clearError:null,triggers:null,postData:{},autoUpload:false,removeCompleted:false,maxFileSize:"5012kb",separator:",",filesUrl:null,filesLimt:9999,multiple:"multiple",uploadBtnOptions:{icons:"",label:"+"}},_getConfig:function(){var d,g=this;var b=this.checkIE();
var c=this.options;if(!c.queueID){c.queueID=this.element[0].id+"_queueID";c.filesContainer=$("<ul/>",{"class":"files",id:c.queueID});this.element.before(c.filesContainer)}else{c.filesContainer=$("#"+c.queueID);c.filesContainer.addClass("files card-files")}if(c.queueMode=="list"){c.filesContainer.addClass("list-files")}if(c.queueMode=="card"){c.filesContainer.addClass("card-files")}if(c.queueMode!=="card"&&c.queueMode!=="list"){c.filesContainer.addClass(c.queueMode)}c.templatesContainer=this.document[0].createElement(c.filesContainer.prop("nodeName"));c.uploadTmp=function(j){var h,i;if(j.fileError){h='<div class="fileError"><span class="error"></span></div>'}else{h=""}i='<li id="${fileId}" class="fileItem"><div class="fileContent"><span class="fileThumb">${fileType}</span><div class="progress"><div class="progressbar-value"></div></div><span class="fileName" title="${fileName}">${fileName}</span><span class="fileSize">(${fileSize})k</span><span class="fileAction"><span class="progressbar-text"></span><span class="upload cui-icon-plus-circle2"></span><span class="remove cui-icon-minus-circle2"></span></span>'+h+"</div></li>";return i};c.uploadTemplate=function(p){var k="fileId_"+new Date().getTime();var j=p.options.prmNames;p.options.unUploadedFileList=p.options.unUploadedFileList||[];var m=p.options.autoUpload,i,l,h={fileName:p.files[0][j.fileName],fileSize:p.files[0][j.fileSize],fileId:p.files[0][j.fileId]||k,fileError:p.files[0][j.fileError],fileType:p.files[0][j.filetype]};p.files[0].id=h.fileId;h.fileType=h.fileName.substring(h.fileName.lastIndexOf(".")+1);p.options.unUploadedFileList.push(h);if(!m){i="disabled"}l=p.options.uploadTmp(h);for(var n in h){l=l.replace(new RegExp("\\$\\{"+n+"\\}","g"),h[n])}return l};c.downloadTmp=function(j){var h,i;if(j.fileError){h='<div class="fileError"><span class="error"></span>${fileError}</div>'}else{h=""}i='<li id="${fileId}" class="fileItem"><div class="fileContent"><span class="fileThumb">${fileType}</span><div class="progress"><div class="progressbar-value"></div></div><span class="fileName"><a href="javascript:void(0)" title="${fileName}" download="${fileName}">${fileName}</a></span><span class="fileSize">(${fileSize})k</span><span class="remove cui-icon-minus-circle2 fileAction"></span></span>'+h+"</div></li>";
return i};c.downloadTemplate=function(h){var q=h.options.prmNames;h.options.uploadedFileList=h.options.uploadedFileList||[];var i="fileId_"+new Date().getTime();var n=h.options.autoUpload,k,p,m,j={fileName:h.files[0][q.fileName],fileSize:h.files[0][q.fileSize],fileUrl:h.options[q.fileUrl],fileError:h.files[0][q.fileError],fileId:h.files[0][q.fileId]||i,fileType:h.files[0][q.filetype]};h.options.uploadedFileList.push(j);p=h.options.downloadTmp(j);for(var l in j){p=p.replace(new RegExp("\\$\\{"+l+"\\}","g"),j[l])}return p};this.useFlash=(b!==false&&b<10);if(this.options.uploadBtn){var f="fileinput-button",e=this.options.uploadBtnOptions;if(e.cls){e=$.extend({},e,{cls:f+" "+e.cls})}else{e=$.extend({},e,{cls:f})}$(this.options.uploadBtn).button(e);var a={type:"file",name:"uploadFile"};if(this.options.multiple){a.multiple="mutiple"}$("<input/>",a).appendTo($(this.options.uploadBtn));this.uploadFile=$(this.options.uploadBtn).find("input[type=file]");this.uploaderBtn=$(this.options.uploadBtn).uniqueId()}else{this.uploadFile=this.element.find("input[type=file]");this.uploaderBtn=this.element.find(".fileinput-button").uniqueId()}if(this.useFlash){this.uploadFile.hide();d={swf:$.coral.scriptPath+"external/swfupload.swf",uploader:this.options.url,auto:this.options.autoUpload,separator:this.options.separator,checkExisting:false,debug:this.options.debug,fileObjName:"uploadFile",height:130,uploadTemplate:this.options.uploadTemplate,downloadTemplate:this.options.downloadTemplate,method:"post",multi:this.options.multi,formData:this.options.formData,preventCaching:true,progressData:"percentage",queueID:this.options.queueID,queueSizeLimit:999,removeCompleted:this.options.removeCompleted,removeTimeout:this.options.removeTimeout,requeueErrors:false,successTimeout:30,uploadLimit:this.options.filesLimt,width:820,maxFileSize:this.options.maxFileSize,fileTypeExts:this.options.acceptFileTypes,onSWFReady:function(){if(g.options.filesUrl){$.ajax({type:"POST",async:false,datatype:"json",url:g.options.filesUrl,data:g.options.postData,success:function(k){for(var h=0;
h<k.length;h++){var j=g._renderDownload([k[h]]).appendTo(g.options.filesContainer);g._transition(j);g.uploaderBtn.swfuploader("addUploadCount")}},error:function(h){}})}},overrideEvents:[]};$.extend(true,d,this.options);this.uploaderBtn.swfuploader(d)}else{d={disabled:false,autoUpload:false,url:this.options.url,maxFileSize:this.options.maxFileSize,maxNumberOfFiles:this.options.maxNumberOfFiles,acceptFileTypes:this.options.acceptFileTypes,uploadTemplate:this.options.uploadTemplate,downloadTemplate:this.options.downloadTemplate,templatesContainer:this.options.templatesContainer,filesContainer:this.options.filesContainer,prependFiles:false,dataType:"json",separator:",",messages:{unknownError:"Unknown error"},processdone:function(i,h){h.context.find(".upload").button("enable")},required:true,getNumberOfFiles:function(){return this.filesContainer.children().not(".processing").length},getFilesFromResponse:function(h){if(typeof(h.result)==="string"){h.result=$.parseJSON(h.result)}if(h.result&&$.isArray(h.result.files)){return h.result.files}return[]},add:function(m,k){if(m.isDefaultPrevented()){return false}var l=$(this),i,j=l.data("blueimp-fileupload"),h=j.options;if(!g.validateFile(h,k)){return}l.fileupload("process",k);k.context=g._renderUpload(k.files).data("data",k).addClass("processing");h.filesContainer[h.prependFiles?"prepend":"append"](k.context);g._forceReflow(k.context);g._transition(k.context);k.process(function(){return l.fileupload("process",k)}).always(function(){k.context.each(function(n){$(this).find(".size").text(g._formatFileSize(k.files[n].size))}).removeClass("processing")}).done(function(){k.context.find(".upload").prop("disabled",false);if((g._trigger("onSelect",m,[{file:k.files[0]}])!==false)&&(h.autoUpload||k.autoUpload)&&k.autoUpload!==false){k.submit()}}).fail(function(){if(k.files.error){k.context.each(function(o){var n=k.files[o].error;if(n){$(this).find(".error").text(n)}})}})},done:function(o,n){if(o.isDefaultPrevented()){return false}var m=$(this).data("blueimp-fileupload"),j=n.getFilesFromResponse||m.options.getFilesFromResponse,l=j(n),k,h;
if(n.context){n.context.each(function(p){var q=l[p]||{error:"Empty file upload result"};h=g._addFinishedDeferreds();g._transition($(this)).done(function(){var r=$(this);k=g._renderDownload([q]).replaceAll(r);g._forceReflow(k);g._transition(k).done(function(){n.context=$(this);g._trigger("onSuccess",o,[{file:n.files[0]}]);g._trigger("onComplete",o,[{file:n.files[0]}]);h.resolve()})})})}else{k=g._renderDownload(l)[m.options.prependFiles?"prependTo":"appendTo"](m.options.filesContainer);g._forceReflow(k);h=g._addFinishedDeferreds();g._transition(k).done(function(){n.context=$(this);g._trigger("onSuccess",o,[{file:n.files[0]}]);g._trigger("onComplete",o,[{file:n.files[0]}]);h.resolve()})}var i=g.options.unUploadedFileList;g.clearFileList(i,n)},stop:function(j){if(j.isDefaultPrevented()){return false}var i=$(this).data("blueimp-fileupload"),h=g._addFinishedDeferreds();$.when.apply($,g._getFinishedDeferreds()).done(function(){g._trigger("onStop",j)});g._transition($(this).find(".fileupload-progress")).done(function(){$(this).find(".progress").attr("aria-valuenow","0").children().first().css("width","0%");$(this).find(".progress-extended").html("&nbsp;");h.resolve()})},processstart:function(h){if(h.isDefaultPrevented()){return false}$(this).addClass("fileupload-processing")},processstop:function(h){if(h.isDefaultPrevented()){return false}$(this).removeClass("fileupload-processing")},fail:function(j,h){if(j.isDefaultPrevented()){return false}var i=$(this).data("blueimp-fileupload"),l,k,m,p;if(h.context){h.context.each(function(q){if(h.errorThrown!=="abort"){var r=h.files[q];r.error=r.error||h.errorThrown||h.i18n("unknownError");p=g._addFinishedDeferreds();g._transition($(this)).done(function(){var s=$(this);m=g._renderDownload([r]).replaceAll(s);g._forceReflow(m);g._transition(m).done(function(){h.context=$(this);g._trigger("onFail",j,[{file:h.files[0],error:h.files[0].error}]);g._trigger("onComplete",j,[{file:h.files[0]}]);p.resolve()})})}else{p=g._addFinishedDeferreds();g._transition($(this)).done(function(){$(this).remove();
g._trigger("onRemove",j);p.resolve()})}})}else{if(h.errorThrown!=="abort"){h.context=g._renderUpload(h.files)[i.options.prependFiles?"prependTo":"appendTo"](i.options.filesContainer).data("data",h);g._forceReflow(h.context);p=g._addFinishedDeferreds();g._transition(h.context).done(function(){h.context=$(this);g._trigger("onFail",j,[{file:h.files[0],error:h.files[0].error}]);g._trigger("onComplete",j,[{file:h.files[0]}]);p.resolve()})}else{g._trigger("onFail",j,[{file:h.files[0],error:h.files[0].error}]);g._trigger("onComplete",j,[{file:h.files[0]}]);g._addFinishedDeferreds().resolve()}}var o=g.options.uploadedFileList;g.clearFileList(o,h);var n=g.options.unUploadedFileList;g.clearFileList(n,h)},progress:function(j,i){if(j.isDefaultPrevented()){return false}var h=Math.floor(i.loaded/i.total*100);if(i.context){i.context.each(function(){$(this).find(".progressbar-value").show().css("width",h+"%");$(this).find(".progressbar-text").text(h+"%")})}g._trigger("onProgress",j,[{file:i.files[0]}])},progressall:function(l,j){if(l.isDefaultPrevented()){return false}var k=$(this),i=Math.floor(j.loaded/j.total*100),h=k.find(".fileupload-progress"),m=h.find(".progress-extended");if(m.length){m.html(g._renderExtendedProgress(j))}},start:function(i){if(i.isDefaultPrevented()){return false}var h=$(this).data("blueimp-fileupload");g._resetFinishedDeferreds();g._transition($(this).find(".fileupload-progress")).done(function(){g._trigger("onStart",i)})},send:function(i,h){if(i.isDefaultPrevented()){return false}if(h.context&&h.dataType&&h.dataType.substr(0,6)==="iframe"){h.context.find(".progress").addClass(!$.support.transition&&"progress-animated").attr("aria-valuenow",100).children().first().css("width","100%")}return g._trigger("onSend",i,[{file:h.files[0]}])},remove:function(l,k){if(l.isDefaultPrevented()){return false}var i=$(this).data("blueimp-fileupload"),j,h,m=function(){g._transition(k.context).done(function(){$(this).remove();g._trigger("onRemove",l)})};if(k.url){k.dataType=k.dataType||i.options.dataType;
$.ajax(k).done(m).fail(function(){g._trigger("onRemoveFailed",l)})}else{m()}var h=g.options.uploadedFileList;g.clearFileList(h,k)}};$.extend(true,d,this.options);this.uploaderBtn.fileupload(d);if(this.options.filesUrl){$.ajax({type:"POST",async:false,datatype:"json",url:this.options.filesUrl,data:this.options.postData,success:function(k){for(var h=0;h<k.length;h++){var j=g._renderDownload([k[h]]).appendTo(g.options.filesContainer);g._transition(j)}},error:function(h){}})}}},upload:function(b){var a=this.checkIE(),c=[];if(this.useFlash){this.uploaderBtn.swfuploader("upload",b)}else{if(b===undefined){b=this.getUnUploadValues()}this.uploaderBtn.fileupload("upload",b)}},_destroy:function(){var a=this.checkIE(),b=[];if(this.useFlash){this.uploaderBtn.swfuploader("destroy")}else{this.uploaderBtn.fileupload("destroy")}},remove:function(b){var a=this.checkIE(),c=[];if(this.useFlash){this.uploaderBtn.swfuploader("cancel",b)}else{this.uploaderBtn.fileupload("remove",b)}},_resetFinishedDeferreds:function(){this._finishedUploads=[]},_addFinishedDeferreds:function(a){if(!a){a=$.Deferred()}this._finishedUploads.push(a);return a},_getFinishedDeferreds:function(){return this._finishedUploads},_enableDragToDesktop:function(){var d=$(this),b=d.prop("href"),a=d.prop("download"),c="application/octet-stream";d.bind("dragstart",function(f){try{f.originalEvent.dataTransfer.setData("DownloadURL",[c,a,b].join(":"))}catch(g){}})},_formatFileSize:function(a){if(typeof a!=="number"){return""}if(a>=1000000000){return(a/1000000000).toFixed(2)+" GB"}if(a>=1000000){return(a/1000000).toFixed(2)+" MB"}return(a/1000).toFixed(2)+" KB"},_formatBitrate:function(a){if(typeof a!=="number"){return""}if(a>=1000000000){return(a/1000000000).toFixed(2)+" Gbit/s"}if(a>=1000000){return(a/1000000).toFixed(2)+" Mbit/s"}if(a>=1000){return(a/1000).toFixed(2)+" kbit/s"}return a.toFixed(2)+" bit/s"},_formatTime:function(b){var a=new Date(b*1000),c=Math.floor(b/86400);c=c?c+"d ":"";return c+("0"+a.getUTCHours()).slice(-2)+":"+("0"+a.getUTCMinutes()).slice(-2)+":"+("0"+a.getUTCSeconds()).slice(-2)
},_formatPercentage:function(a){return(a*100).toFixed(2)+" %"},_renderExtendedProgress:function(a){return this._formatBitrate(a.bitrate)+" | "+this._formatTime((a.total-a.loaded)*8/a.bitrate)+" | "+this._formatPercentage(a.loaded/a.total)+" | "+this._formatFileSize(a.loaded)+" / "+this._formatFileSize(a.total)},_renderTemplate:function(c,b){if(!c){return $()}var a=c({files:b,formatFileSize:this._formatFileSize,options:this.options});if(a instanceof $){return a}return $(this.options.templatesContainer).html(a).children()},_renderPreviews:function(a){a.context.find(".preview").each(function(b,c){$(c).append(a.files[b].preview)})},_renderUpload:function(c,b){var a=this._renderTemplate(this.options.uploadTemplate,c);a.addClass("template-upload fade");if(a.hasClass("fade")){a.hide()}this._trigger("onRenderUploadTmp",null,{item:a});return a},_renderDownload:function(b){var a=this._renderTemplate(this.options.downloadTemplate,b).find("a[download]").each(this._enableDragToDesktop).end();a.addClass("template-download fade");if(a.hasClass("fade")){a.hide()}this._trigger("onRenderDownloadTmp",null,{item:a});return a},_forceReflow:function(a){return $.support.transition&&a.length&&a[0].offsetWidth},_transition:function(b){var a=$.Deferred();if(b.hasClass("fade")){b.fadeToggle(this.options.transitionDuration,this.options.transitionEasing,function(){a.resolveWith(b)})}else{a.resolveWith(b)}return a},_destroyButtonBarEventHandlers:function(){this._off(this.element.find(".fileupload-buttonbar").find(".upload, .remove"),"click");this._off(this.element.find(".fileupload-buttonbar .toggle"),"change.")},_destroyEventHandlers:function(){this._destroyButtonBarEventHandlers();this._off(this.options.filesContainer,"click");this._super()},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",false).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",true).parent().addClass("disabled")
},_create:function(){var a=this.options;this.options.id=this.element.uniqueId().attr("id");this._super();this._resetFinishedDeferreds();if(!$.support.fileInput){this._disableFileInputButton()}this.element.find(".fileupload-buttonbar").find(".fileinput-button").each(function(){});a.uploadedFileList=[];a.unUploadedFileList=[];this._getConfig();if(a.beforeCreate){a.beforeCreate.apply(this)}else{this.beforeCreate()}},beforeCreate:function(){var a=this;this._on(this.options.filesContainer,{"click .upload":function(c){c.preventDefault();var b=$(c.currentTarget).closest(".template-upload");$("#"+a.element[0].id).fileuploader("upload",b[0].id)},"click .remove":function(c){c.preventDefault();var b=$(c.currentTarget).closest(".template-upload,.template-download");$("#"+a.element[0].id).fileuploader("remove",b[0].id)},"click .stop":function(c){c.preventDefault();var b=$(c.currentTarget).closest(".template-upload");$("#"+a.element[0].id).fileuploader("stop",b[0].id)}})},clearFileList:function(c,d){var b,a;if(c===this.options.uploadedFileList){b=this.getValues()}else{if(c===this.options.unUploadedFileList){b=this.getUnUploadValues()}}a=$.inArray(d.context[0][this.options.prmNames.fileId],b);if(a!==-1){c.splice(a,1)}else{c.splice(a,0)}},validateFile:function(b,e){var c=e.files[0].name.substring(e.files[0].name.lastIndexOf(".")+1);c=$.trim(c);var d=$.trim(b.acceptFileTypes);var a=this.getQueueData(),f=this.formatMaxSize(b.maxFileSize);if(a.length>=b.filesLimt){$.messageQueue({message:"Maximum number of files exceeded"});return false}if(e.files[0].size>=f){$.messageQueue({message:"The File is too large"});return false}if(d=="*.*"){return true}else{if(d.indexOf(c)==-1){$.messageQueue({message:"The file is not an accepted file type"});return false}}return true},formatMaxSize:function(b){var d=new RegExp("/^s*|s*$/"),e,c,f=1024;b=b.toLowerCase();b=b.replace(d,"");var a=b.match(/^\d+/);if(a!==null&&a.length>0){c=parseInt(a[0])}if(isNaN(c)||c<0){c=0}e=c*f;return e},getQueueData:function(){var c=[],b=[];
for(var a=0;a<this.options.uploadedFileList.length;a++){c.push(this.options.uploadedFileList[a].fileId)}for(var a=0;a<this.options.unUploadedFileList.length;a++){b.push(this.options.unUploadedFileList[a].fileId)}return $.merge(c,b)},getValues:function(){var b=[];for(var a=0;a<this.options.uploadedFileList.length;a++){b.push(this.options.uploadedFileList[a].fileId)}return b},getValidateValue:function(){var a=this.checkIE();if(this.useFlash){return this.uploaderBtn.swfuploader("getValidateValue")}else{return this.getValue()}},setValue:function(b){var a=this.checkIE();if(this.useFlash){this.uploaderBtn.swfuploader("setValues",b)}else{}},getValue:function(){var a=this.checkIE();if(this.useFlash){return this.uploaderBtn.swfuploader("getValue")}else{return this.getValues().join(this.options.separator)}},clearError:function(){},focus:function(){},getUnUploadValues:function(){var a=[];for(var b=0;b<this.options.unUploadedFileList.length;b++){a.push(this.options.unUploadedFileList[b].fileId)}return a},enable:function(){var a=this.checkIE();if(this.useFlash){this.uploaderBtn.swfuploader("disable",false)}else{var b=false;if(this.options.disabled){b=true}this._super();if(b){this.element.find("input, button").prop("disabled",false);this._enableFileInputButton();this.options.filesContainer.prop("disabled",false).removeClass("coral-state-disabled")}this.options.disabled=false;this._trigger("onEnable",null,[])}},disable:function(){var a=this.checkIE();if(this.useFlash){this.uploaderBtn.swfuploader("disable",true)}else{if(!this.options.disabled){this.element.find("input, button").prop("disabled",true);this._disableFileInputButton();this.options.filesContainer.prop("disabled",true).addClass("coral-state-disabled")}this._super();this.options.disabled=true;this._trigger("onDisable",null,[])}}})})();