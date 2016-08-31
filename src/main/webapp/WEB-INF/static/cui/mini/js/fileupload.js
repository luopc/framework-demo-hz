(function(){$.support.fileInput=!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||$('<input type="file">').prop("disabled"));$.support.xhrFileUpload=!!(window.ProgressEvent&&window.FileReader);$.support.xhrFormDataFileUpload=!!window.FormData;$.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);function a(b){var c=b==="dragover";return function(f){f.dataTransfer=f.originalEvent&&f.originalEvent.dataTransfer;var d=f.dataTransfer;if(d&&$.inArray("Files",d.types)!==-1&&this._trigger(b,$.Event(b,{delegatedEvent:f}))!==false){f.preventDefault();if(c){d.dropEffect="copy"}}}}$.component("blueimp.fileupload",{options:{dropZone:$(document),pasteZone:undefined,fileInput:undefined,replaceFileInput:true,paramName:undefined,singleFileUploads:true,limitMultiFileUploads:undefined,limitMultiFileUploadSize:undefined,limitMultiFileUploadSizeOverhead:512,sequentialUploads:false,limitConcurrentUploads:undefined,forceIframeTransport:false,redirect:undefined,redirectParamName:undefined,postMessage:undefined,multipart:true,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:true,progressInterval:100,bitrateInterval:500,autoUpload:true,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(c,b){c=this.messages[c]||c.toString();if(b){$.each(b,function(d,e){c=c.replace("{"+d+"}",e)})}return c},formData:function(b){return b.serializeArray()},add:function(c,b){if(c.isDefaultPrevented()){return false}if(b.autoUpload||(b.autoUpload!==false&&$(this).fileupload("option","autoUpload"))){b.process().done(function(){b.submit()})}},processData:false,contentType:false,cache:false,timeout:0},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:$.support.blobSlice&&function(){var b=this.slice||this.webkitSlice||this.mozSlice;return b.apply(this,arguments)
},_BitrateTimer:function(){this.timestamp=((Date.now)?Date.now():(new Date()).getTime());this.loaded=0;this.bitrate=0;this.getBitrate=function(d,c,b){var e=d-this.timestamp;if(!this.bitrate||!b||e>b){this.bitrate=(c-this.loaded)*(1000/e)*8;this.loaded=c;this.timestamp=d}return this.bitrate}},_isXHRUpload:function(b){return !b.forceIframeTransport&&((!b.multipart&&$.support.xhrFileUpload)||$.support.xhrFormDataFileUpload)},_getFormData:function(b){var c;if($.type(b.formData)==="function"){return b.formData(b.form)}if($.isArray(b.formData)){return b.formData}if($.type(b.formData)==="object"){c=[];$.each(b.formData,function(d,e){c.push({name:d,value:e})});return c}return[]},_getTotal:function(c){var b=0;$.each(c,function(d,e){b+=e.size||1});return b},_initProgressObject:function(c){var b={loaded:0,total:0,bitrate:0};if(c._progress){$.extend(c._progress,b)}else{c._progress=b}},_initResponseObject:function(b){var c;if(b._response){for(c in b._response){if(b._response.hasOwnProperty(c)){delete b._response[c]}}}else{b._response={}}},_onProgress:function(f,d){if(f.lengthComputable){var c=((Date.now)?Date.now():(new Date()).getTime()),b;if(d._time&&d.progressInterval&&(c-d._time<d.progressInterval)&&f.loaded!==f.total){return}d._time=c;b=Math.floor(f.loaded/f.total*(d.chunkSize||d._progress.total))+(d.uploadedBytes||0);this._progress.loaded+=(b-d._progress.loaded);this._progress.bitrate=this._bitrateTimer.getBitrate(c,this._progress.loaded,d.bitrateInterval);d._progress.loaded=d.loaded=b;d._progress.bitrate=d.bitrate=d._bitrateTimer.getBitrate(c,b,d.bitrateInterval);this._trigger("progress",$.Event("progress",{delegatedEvent:f}),d);this._trigger("progressall",$.Event("progressall",{delegatedEvent:f}),this._progress)}},_initProgressListener:function(b){var c=this,d=b.xhr?b.xhr():$.ajaxSettings.xhr();if(d.upload){$(d.upload).bind("progress",function(f){var g=f.originalEvent;f.lengthComputable=g.lengthComputable;f.loaded=g.loaded;f.total=g.total;c._onProgress(f,b)});b.xhr=function(){return d
}}},_isInstanceOf:function(b,c){return Object.prototype.toString.call(c)==="[object "+b+"]"},_initXHRData:function(c){var e=this,g,d=c.files[0],b=c.multipart||!$.support.xhrFileUpload,f=$.type(c.paramName)==="array"?c.paramName[0]:c.paramName;c.headers=$.extend({},c.headers);if(c.contentRange){c.headers["Content-Range"]=c.contentRange}if(!b||c.blob||!this._isInstanceOf("File",d)){c.headers["Content-Disposition"]='attachment; filename="'+encodeURI(d.name)+'"'}if(!b){c.contentType=d.type||"application/octet-stream";c.data=c.blob||d}else{if($.support.xhrFormDataFileUpload){if(c.postMessage){g=this._getFormData(c);if(c.blob){g.push({name:f,value:c.blob})}else{$.each(c.files,function(h,i){g.push({name:($.type(c.paramName)==="array"&&c.paramName[h])||f,value:i})})}}else{if(e._isInstanceOf("FormData",c.formData)){g=c.formData}else{g=new FormData();$.each(this._getFormData(c),function(h,i){g.append(i.name,i.value)})}if(c.blob){g.append(f,c.blob,d.name)}else{$.each(c.files,function(h,i){if(e._isInstanceOf("File",i)||e._isInstanceOf("Blob",i)){g.append(($.type(c.paramName)==="array"&&c.paramName[h])||f,i,i.uploadName||i.name)}})}}c.data=g}}c.blob=null},_initIframeSettings:function(b){var c=$("<a></a>").prop("href",b.url).prop("host");b.dataType="iframe "+(b.dataType||"");b.formData=this._getFormData(b);if(b.redirect&&c&&c!==location.host){b.formData.push({name:b.redirectParamName||"redirect",value:b.redirect})}},_initDataSettings:function(b){if(this._isXHRUpload(b)){if(!this._chunkedUpload(b,true)){if(!b.data){this._initXHRData(b)}this._initProgressListener(b)}if(b.postMessage){b.dataType="postmessage "+(b.dataType||"")}}else{this._initIframeSettings(b)}},_getParamName:function(b){var c=$(b.fileInput),d=b.paramName;if(!d){d=[];c.each(function(){var e=$(this),f=e.prop("name")||"files[]",g=(e.prop("files")||[1]).length;while(g){d.push(f);g-=1}});if(!d.length){d=[c.prop("name")||"files[]"]}}else{if(!$.isArray(d)){d=[d]}}return d},_initFormSettings:function(b){if(!b.form||!b.form.length){b.form=$(b.fileInput.prop("form"));
if(!b.form.length){b.form=$(this.options.fileInput.prop("form"))}}b.paramName=this._getParamName(b);if(!b.url){b.url=b.form.prop("action")||location.href}b.type=(b.type||($.type(b.form.prop("method"))==="string"&&b.form.prop("method"))||"").toUpperCase();if(b.type!=="POST"&&b.type!=="PUT"&&b.type!=="PATCH"){b.type="POST"}if(!b.formAcceptCharset){b.formAcceptCharset=b.form.attr("accept-charset")}},_getAJAXSettings:function(c){var b=$.extend({},this.options,c);this._initFormSettings(b);this._initDataSettings(b);return b},_getDeferredState:function(b){if(b.state){return b.state()}if(b.isResolved()){return"resolved"}if(b.isRejected()){return"rejected"}return"pending"},_enhancePromise:function(b){b.success=b.done;b.error=b.fail;b.complete=b.always;return b},_getXHRPromise:function(e,d,c){var b=$.Deferred(),f=b.promise();d=d||this.options.context||f;if(e===true){b.resolveWith(d,c)}else{if(e===false){b.rejectWith(d,c)}}f.abort=b.promise;return this._enhancePromise(f)},_addConvenienceMethods:function(f,d){var c=this,b=function(e){return $.Deferred().resolveWith(c,e).promise()};d.process=function(g,e){if(g||e){d._processQueue=this._processQueue=(this._processQueue||b([this])).pipe(function(){if(d.errorThrown){return $.Deferred().rejectWith(c,[d]).promise()}return b(arguments)}).pipe(g,e)}return this._processQueue||b([this])};d.submit=function(){if(this.state()!=="pending"){d.jqXHR=this.jqXHR=(c._trigger("submit",$.Event("submit",{delegatedEvent:f}),this)!==false)&&c._onSend(f,this)}return this.jqXHR||c._getXHRPromise()};d.abort=function(){if(this.jqXHR){return this.jqXHR.abort()}this.errorThrown="abort";c._trigger("fail",null,this);return c._getXHRPromise(false)};d.state=function(){if(this.jqXHR){return c._getDeferredState(this.jqXHR)}if(this._processQueue){return c._getDeferredState(this._processQueue)}};d.processing=function(){return !this.jqXHR&&this._processQueue&&c._getDeferredState(this._processQueue)==="pending"};d.progress=function(){return this._progress};d.response=function(){return this._response
}},_getUploadedBytes:function(d){var b=d.getResponseHeader("Range"),e=b&&b.split("-"),c=e&&e.length>1&&parseInt(e[1],10);return c&&c+1},_chunkedUpload:function(m,g){m.uploadedBytes=m.uploadedBytes||0;var f=this,d=m.files[0],e=d.size,b=m.uploadedBytes,c=m.maxChunkSize||e,i=this._blobSlice,j=$.Deferred(),l=j.promise(),h,k;if(!(this._isXHRUpload(m)&&i&&(b||c<e))||m.data){return false}if(g){return true}if(b>=e){d.error=m.i18n("uploadedBytes");return this._getXHRPromise(false,m.context,[null,"error",d.error])}k=function(){var p=$.extend({},m),n=p._progress.loaded;p.blob=i.call(d,b,b+c,d.type);p.chunkSize=p.blob.size;p.contentRange="bytes "+b+"-"+(b+p.chunkSize-1)+"/"+e;f._initXHRData(p);f._initProgressListener(p);h=((f._trigger("chunksend",null,p)!==false&&$.ajax(p))||f._getXHRPromise(false,p.context)).done(function(o,r,q){b=f._getUploadedBytes(q)||(b+p.chunkSize);if(n+p.chunkSize-p._progress.loaded){f._onProgress($.Event("progress",{lengthComputable:true,loaded:b-p.uploadedBytes,total:b-p.uploadedBytes}),p)}m.uploadedBytes=p.uploadedBytes=b;p.result=o;p.textStatus=r;p.jqXHR=q;f._trigger("chunkdone",null,p);f._trigger("chunkalways",null,p);if(b<e){k()}else{j.resolveWith(p.context,[o,r,q])}}).fail(function(o,r,q){p.jqXHR=o;p.textStatus=r;p.errorThrown=q;f._trigger("chunkfail",null,p);f._trigger("chunkalways",null,p);j.rejectWith(p.context,[o,r,q])})};this._enhancePromise(l);l.abort=function(){return h.abort()};k();return l},_beforeSend:function(c,b){if(this._active===0){this._trigger("start");this._bitrateTimer=new this._BitrateTimer();this._progress.loaded=this._progress.total=0;this._progress.bitrate=0}this._initResponseObject(b);this._initProgressObject(b);b._progress.loaded=b.loaded=b.uploadedBytes||0;b._progress.total=b.total=this._getTotal(b.files)||1;b._progress.bitrate=b.bitrate=0;this._active+=1;this._progress.loaded+=b.loaded;this._progress.total+=b.total},_onDone:function(b,g,f,d){var e=d._progress.total,c=d._response;if(d._progress.loaded<e){this._onProgress($.Event("progress",{lengthComputable:true,loaded:e,total:e}),d)
}c.result=d.result=b;c.textStatus=d.textStatus=g;c.jqXHR=d.jqXHR=f;this._trigger("done",null,d)},_onFail:function(d,f,e,c){var b=c._response;if(c.recalculateProgress){this._progress.loaded-=c._progress.loaded;this._progress.total-=c._progress.total}b.jqXHR=c.jqXHR=d;b.textStatus=c.textStatus=f;b.errorThrown=c.errorThrown=e;this._trigger("fail",null,c)},_onAlways:function(d,e,c,b){this._trigger("always",null,b)},_onSend:function(h,f){if(!f.submit){this._addConvenienceMethods(h,f)}var g=this,j,b,i,c,k=g._getAJAXSettings(f),d=function(){g._sending+=1;k._bitrateTimer=new g._BitrateTimer();j=j||(((b||g._trigger("send",$.Event("send",{delegatedEvent:h}),k)===false)&&g._getXHRPromise(false,k.context,b))||g._chunkedUpload(k)||$.ajax(k)).done(function(e,m,l){g._onDone(e,m,l,k)}).fail(function(e,m,l){g._onFail(e,m,l,k)}).always(function(m,n,l){g._onAlways(m,n,l,k);g._sending-=1;g._active-=1;if(k.limitConcurrentUploads&&k.limitConcurrentUploads>g._sending){var e=g._slots.shift();while(e){if(g._getDeferredState(e)==="pending"){e.resolve();break}e=g._slots.shift()}}if(g._active===0){g._trigger("stop")}});return j};this._beforeSend(h,k);if(this.options.sequentialUploads||(this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending)){if(this.options.limitConcurrentUploads>1){i=$.Deferred();this._slots.push(i);c=i.pipe(d)}else{this._sequence=this._sequence.pipe(d,d);c=this._sequence}c.abort=function(){b=[undefined,"abort","abort"];if(!j){if(i){i.rejectWith(k.context,b)}return d()}return j.abort()};return this._enhancePromise(c)}return d()},_onAdd:function(p,l){var o=this,u=true,t=$.extend({},this.options,l),d=l.files,r=d.length,f=t.limitMultiFileUploads,h=t.limitMultiFileUploadSize,s=t.limitMultiFileUploadSizeOverhead,n=0,m=this._getParamName(t),c,b,q,k,g=0;if(!r){return false}if(h&&d[0].size===undefined){h=undefined}if(!(t.singleFileUploads||f||h)||!this._isXHRUpload(t)){q=[d];c=[m]}else{if(!(t.singleFileUploads||h)&&f){q=[];c=[];for(k=0;k<r;k+=f){q.push(d.slice(k,k+f));
b=m.slice(k,k+f);if(!b.length){b=m}c.push(b)}}else{if(!t.singleFileUploads&&h){q=[];c=[];for(k=0;k<r;k=k+1){n+=d[k].size+s;if(k+1===r||((n+d[k+1].size+s)>h)||(f&&k+1-g>=f)){q.push(d.slice(g,k+1));b=m.slice(g,k+1);if(!b.length){b=m}c.push(b);g=k+1;n=0}}}else{c=m}}}l.originalFiles=d;$.each(q||d,function(e,i){var j=$.extend({},l);j.files=q?i:[i];j.paramName=c[e];o._initResponseObject(j);o._initProgressObject(j);o._addConvenienceMethods(p,j);u=o._trigger("add",$.Event("add",{delegatedEvent:p}),j);return u});return u},_replaceFileInput:function(e){var b=e.fileInput,c=b.clone(true),d=b.is(document.activeElement);e.fileInputClone=c;$("<form></form>").append(c)[0].reset();b.after(c).detach();if(d){c.focus()}$.cleanData(b.unbind("remove"));this.options.fileInput=this.options.fileInput.map(function(f,g){if(g===b[0]){return c[0]}return g});if(b[0]===this.element[0]){this.element=c}},_handleFileTreeEntry:function(g,i){var d=this,h=$.Deferred(),c=function(k){if(k&&!k.entry){k.entry=g}h.resolve([k])},e=function(k){d._handleFileTreeEntries(k,i+g.name+"/").done(function(l){h.resolve(l)}).fail(c)},f=function(){j.readEntries(function(k){if(!k.length){e(b)}else{b=b.concat(k);f()}},c)},j,b=[];i=i||"";if(g.isFile){if(g._file){g._file.relativePath=i;h.resolve(g._file)}else{g.file(function(k){k.relativePath=i;h.resolve(k)},c)}}else{if(g.isDirectory){j=g.createReader();f()}else{h.resolve([])}}return h.promise()},_handleFileTreeEntries:function(b,d){var c=this;return $.when.apply($,$.map(b,function(e){return c._handleFileTreeEntry(e,d)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(c){c=c||{};var b=c.items;if(b&&b.length&&(b[0].webkitGetAsEntry||b[0].getAsEntry)){return this._handleFileTreeEntries($.map(b,function(e){var d;if(e.webkitGetAsEntry){d=e.webkitGetAsEntry();if(d){d._file=e.getAsFile()}return d}return e.getAsEntry()}))}return $.Deferred().resolve($.makeArray(c.files)).promise()},_getSingleFileInputFiles:function(d){d=$(d);var b=d.prop("webkitEntries")||d.prop("entries"),c,e;
if(b&&b.length){return this._handleFileTreeEntries(b)}c=$.makeArray(d.prop("files"));if(!c.length){e=d.prop("value");if(!e){return $.Deferred().resolve([]).promise()}c=[{name:e.replace(/^.*\\/,"")}]}else{if(c[0].name===undefined&&c[0].fileName){$.each(c,function(f,g){g.name=g.fileName;g.size=g.fileSize})}}return $.Deferred().resolve(c).promise()},_getFileInputFiles:function(b){if(!(b instanceof $)||b.length===1){return this._getSingleFileInputFiles(b)}return $.when.apply($,$.map(b,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_onChange:function(d){var b=this,c={fileInput:$(d.target),form:$(d.target.form)};this._getFileInputFiles(c.fileInput).always(function(e){c.files=e;if(b.options.replaceFileInput){b._replaceFileInput(c)}if(b._trigger("change",$.Event("change",{delegatedEvent:d}),c)!==false){b._onAdd(d,c)}})},_onPaste:function(d){var b=d.originalEvent&&d.originalEvent.clipboardData&&d.originalEvent.clipboardData.items,c={files:[]};if(b&&b.length){$.each(b,function(e,g){var f=g.getAsFile&&g.getAsFile();if(f){c.files.push(f)}});if(this._trigger("paste",$.Event("paste",{delegatedEvent:d}),c)!==false){this._onAdd(d,c)}}},_onDrop:function(f){f.dataTransfer=f.originalEvent&&f.originalEvent.dataTransfer;var b=this,d=f.dataTransfer,c={};if(d&&d.files&&d.files.length){f.preventDefault();this._getDroppedFiles(d).always(function(e){c.files=e;if(b._trigger("drop",$.Event("drop",{delegatedEvent:f}),c)!==false){b._onAdd(f,c)}})}},_onDragOver:a("dragover"),_onDragEnter:a("dragenter"),_onDragLeave:a("dragleave"),_initEventHandlers:function(){if(this._isXHRUpload(this.options)){this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop,dragenter:this._onDragEnter,dragleave:this._onDragLeave});this._on(this.options.pasteZone,{paste:this._onPaste})}if($.support.fileInput){this._on(this.options.fileInput,{change:this._onChange})}},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragenter dragleave dragover drop");
this._off(this.options.pasteZone,"paste");this._off(this.options.fileInput,"change")},_setOption:function(b,c){var d=$.inArray(b,this._specialOptions)!==-1;if(d){this._destroyEventHandlers()}this._super(b,c);if(d){this._initSpecialOptions();this._initEventHandlers()}},_initSpecialOptions:function(){var b=this.options;if(b.fileInput===undefined){b.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]')}else{if(!(b.fileInput instanceof $)){b.fileInput=$(b.fileInput)}}if(!(b.dropZone instanceof $)){b.dropZone=$(b.dropZone)}if(!(b.pasteZone instanceof $)){b.pasteZone=$(b.pasteZone)}},_getRegExp:function(d){var c=d.split("/"),b=c.pop();c.shift();return new RegExp(c.join("/"),b)},_isRegExpOption:function(b,c){return b!=="url"&&$.type(c)==="string"&&/^\/.*\/[igm]{0,3}$/.test(c)},_initDataAttributes:function(){var c=this,b=this.options,d=this.element.data();$.each(this.element[0].attributes,function(f,e){var g=e.name.toLowerCase(),h;if(/^data-/.test(g)){g=g.slice(5).replace(/-[a-z]/g,function(i){return i.charAt(1).toUpperCase()});h=d[g];if(c._isRegExpOption(g,h)){h=c._getRegExp(h)}b[g]=h}})},_create:function(){this._initDataAttributes();this._initSpecialOptions();this._slots=[];this._sequence=this._getXHRPromise(true);this._sending=this._active=0;this._initProgressObject(this);this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},add:function(c){var b=this;if(!c||this.options.disabled){return}if(c.fileInput&&!c.files){this._getFileInputFiles(c.fileInput).always(function(d){c.files=d;b._onAdd(null,c)})}else{c.files=$.makeArray(c.files);this._onAdd(null,c)}},send:function(f){if(f&&!this.options.disabled){if(f.fileInput&&!f.files){var d=this,b=$.Deferred(),g=b.promise(),c,e;g.abort=function(){e=true;if(c){return c.abort()}b.reject(null,"abort","abort");return g};this._getFileInputFiles(f.fileInput).always(function(h){if(e){return}if(!h.length){b.reject();return}f.files=h;c=d._onSend(null,f);
c.then(function(i,k,j){b.resolve(i,k,j)},function(i,k,j){b.reject(i,k,j)})});return this._enhancePromise(g)}f.files=$.makeArray(f.files);if(f.files.length){return this._onSend(null,f)}}return this._getXHRPromise(false,f&&f.context)}})})();