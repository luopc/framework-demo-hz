/*
 * jQuery File Upload User Interface Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            './jquery.fileupload-image',
            './jquery.fileupload-audio',
            './jquery.fileupload-video',
            './jquery.fileupload-validate'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('tmpl')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl
        );
    }
}(function ($, tmpl) {
    'use strict';

    $.blueimp.fileupload.prototype._specialOptions.push(
        'filesContainer',
        'uploadTemplateId',
        'downloadTemplateId'
    );
    $.component('blueimp.fileupload', $.blueimp.fileupload, {
    	getUnUploadValues: function(){
        	var fileArray = [];
        	for(var i = 0; i < this.options.unUploadedFileList.length; i++){
        		fileArray.push(this.options.unUploadedFileList[i][this.options.prmNames.fileId]);
        	}
        	return fileArray;
        },
        remove: function(ids){
        	var that = this;
        	function clear(id){
        		var data = $("#"+ id).data("data");
        		if ($("#"+ id).hasClass("template-download")) {
        			that._trigger('remove', null, $.extend({
    					context: $("#"+ id),
    					type: 'DELETE'
    				}, data));
    			} else if ($("#"+ id).hasClass("template-upload")) {
    				if (data.abort) {
    	                data.abort();
    	            } else {
    	                data.errorThrown = 'abort';
    	                that._trigger('fail', null, $.extend({
    	                	context: $("#"+ id),
    	                	type: 'DELETE'
    	                }, data));
    	            }
    			}
        	}
        	if(ids === undefined){
        		this.options.filesContainer.children().each(function(){
        			clear(this.id);
        		});
        	} else if(typeof ids === "array") {
        		for(var i = 0; i < ids.length; i++){
        			clear(ids[i]);
        		}
        	}else{
        		clear(ids);
        	}
        	this._trigger('onDelete', null);
        },
        destroy: function () {
            this.element
                .find('.fileupload-buttonbar')
                .find('.fileinput-button').each(function () {
                    var input = $(this).find('input:file').detach();
                    $(this)
                        .button('destroy')
                        .append(input);
                });
            this.element.find(".ctrl-init-button").remove();
            this.options.filesContainer.remove();
               /* .end().find('.start')
                .button('destroy')
                .end().find('.cancel')
                .button('destroy')
                .end().find('.delete')
                .button('destroy')
                .end().find('.progress').progressbar('destroy');*/
            this._super();
        },
        upload: function(ids){
        	if($.isArray(ids)){
        		for(var i = 0; i < ids.length; i++){
    				var data = $("#"+ ids[i]).data('data');
            		if(data.files[0].error){
            			return;
            		}
    				if (data && data.submit) {
    					data.submit();
    				}
    			}
        	} else {
        		var data = $("#"+ ids).data('data');
        		if(data.files[0].error){
        			return;
        		}
				if (data && data.submit) {
					data.submit();
				}
        	}
        }
    });
    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.component('coral.fileuploader', {
    	castProperties : ["triggers"],
    	checkIE: function(){
    		var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    		while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
    		);
    		return v > 4 ? v : false ;
    	},
    	options: {
    		 prmNames:{ fileName: "name", fileSize: "size", fileURL: "url", fileError: "error", fileId: "id",filetype:"type"},
    		 focus: null,
             clearError: null,
    		 triggers: null,
    		 postData: {},
    		 listUrl: null,
    		 autoUpload: false,
    		 removeCompleted: false,
    		 maxFileSize: 511627776,
    		 uploadedFileList: [],
             unUploadedFileList:[],
             separator:',',
             filesLimt: 9999 ,
             multiple: 'multiple',
             uploadBtnOptions:{
            	icons: "",
 				label: "+"
             }
    	},
        _getConfig: function() {
        	var config,
        		$t = this;
        	var version = this.checkIE();
			var options = this.options;
			if (!options.queueID) {
			 	options.queueID = this.element[0].id +'_queueID';
			 	options.filesContainer = $('<div/>', {
					'class': 'files',
					'id': options.queueID
			 	});
			 	this.element.before(options.filesContainer);
			} else {
			    options.filesContainer = $("#"+options.queueID);
			}
			options.templatesContainer = this.document[0].createElement(
	            options.filesContainer.prop('nodeName')
	        );
			options.uploadTmp = function(files) {
				var error,itemHTML;
				if(files.error){
		    		error = '<div><span class="error"></span></div>';
		    	}else{
		    		error = "";
		    	}
	        	itemHTML = '<div id= ${fileId} >' +
					'<span class="name">${fileName}</span>' +
					'<span class="size">(${fileSize})k</span>' + 
		    		'<span class = "iconsClass">' +
		    		'<span class="upload icon-checkmark3"></span>' +
		    		'<span class="remove icon-bin"></span>' +  
		    		'</span>' + error +
		    		'<div class="progress" style="width:100%;"></div>' +
				'</div>';
	        	return itemHTML;
			};
			options.uploadTemplate = function(o){
				var randomId = "fileId_" + new Date().getTime();
	        	var prm = o.options.prmNames;
	        	o.options.unUploadedFileList = o.options.unUploadedFileList || [];
	        	var	autoUpload = o.options.autoUpload,isAuto,itemHTML,
	        	 	itemData = {
						'fileName': o.files[0][prm.fileName],
						'fileSize': o.files[0][prm.fileSize],
						'fileId': o.files[0][prm.fileId] || randomId,
						'fileError': o.files[0][prm.fileError],
						'type': o.files[0][prm.filetype]
	        		}; 
	        	o.files[0].id = itemData.fileId;
	        	$.extend(itemData, o.files[0]);
	        	o.options.unUploadedFileList.push(itemData);
	        	if(!autoUpload){
	        		isAuto = "disabled";
	        	}
	        	itemHTML = o.options.uploadTmp(o.files[0]);
				for (var d in itemData) {
					itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), itemData[d]);
				}
	        	//itemData.elementId = this.element[0].id;
	        	return itemHTML;
			};
			options.downloadTmp = function(files) {
				var error,itemHTML;
				if(files.error){
		    		error = '<div><span class="error"></span>${fileError}</div>';
		    	}else{
		    		error = "";
		    	}
		    	itemHTML = '<div id=${fileId}>' +
					'<span class="name">' + 
					'<a href="${fileUrl} title="${fileName} download=${fileName}">${fileName}</a>' +
		    		'</span>' + 
					'<span class="size">(${fileSize})k</span>' + 
		    		'<span class="remove icon-bin iconsClass"></span>' + 
		    		'</span>' + error +
				'</div>';
		    	return itemHTML;
			};
			options.downloadTemplate = function(o){
				var prm = o.options.prmNames;
	        	o.options.uploadedFileList = o.options.uploadedFileList || [];
	        	var randomId = "fileId_" + new Date().getTime();
	        	var	autoUpload = o.options.autoUpload,isAuto,itemHTML,error,
	    	 	itemData = {
	        		'fileName': o.files[0][prm.fileName],
					'fileSize': o.files[0][prm.fileSize],
					'fileUrl': o.options[prm.fileUrl],
					'fileError':  o.files[0][prm.fileError],
					'fileId':  o.files[0][prm.fileId] || randomId
	    		};
	        	o.options.uploadedFileList.push(itemData);
	        	itemHTML = o.options.downloadTmp(o.files[0]);
				for (var d in itemData) {
					itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), itemData[d]);
				}
		    	//itemData.elementId = this.element[0].id;
		    	return itemHTML;
			}
			if (this.options.listUrl) {
				$.ajax({
					type    : 'POST',
					async   : false,
					datatype: "json",
					url     : this.options.listUrl,
					data    : this.options.postData,
					success : function(data) {
						for(var i=0; i< data.length; i++) {
							var template = $t._renderDownload([data[i]]).appendTo($t.options.filesContainer);
							$t._transition(template);
						}
					},
					error: function(e){
					}
				});
			}
			this.useFlash = (version !== false && version < 10);
			//this.useFlash = true;
			if (this.options.uploadBtn) {
				var btnClass = "fileinput-button",
					uploadBtnOptions = this.options.uploadBtnOptions;
				if(uploadBtnOptions.cls){
					uploadBtnOptions = $.extend({},
							uploadBtnOptions,
							{cls: btnClass + " " + uploadBtnOptions.cls});
				} else {
					uploadBtnOptions = $.extend({},uploadBtnOptions,{cls: btnClass});
				}
				$(this.options.uploadBtn).button(uploadBtnOptions);
				var upOption = {
					'type': 'file',
					'name':'uploadFile'
			 	};
				if (this.options.multiple) {
					upOption.multiple = "mutiple";
				}
				$('<input/>', upOption).appendTo($(this.options.uploadBtn));
				this.uploadFile = $(this.options.uploadBtn).find("input[type=file]");
				this.uploaderBtn = $(this.options.uploadBtn).uniqueId();
			} else {
				this.uploadFile = this.element.find("input[type=file]");
				this.uploaderBtn = this.element.find(".fileinput-button").uniqueId();
			}
			//this.uploader = $("<div id=\""+ this.element[0].id +"_uploaderID\"></div>");
        	if (this.useFlash) {
        		this.uploadFile.hide();
        		config = {
    				swf: $.coral.contextPath+'/jquery-cui/resource/swfupload.swf',
    				uploader: this.options.url,
        			auto      : this.options.autoUpload,               // Automatically upload files when added to the queue
        			separator :this.options.separator,
        			checkExisting   : false,              // The path to a server-side script that checks for existing files on the server
					preventCaching: false,
					debug           : this.options.debug,              // Turn on swfUpload debugging mode
					fileObjName     : "uploadFile",         // The name of the file object to use in your server-side script
					height          : 530,                 // The height of the browse button
					uploadTemplate  : this.options.uploadTemplate,              // The template for the file item in the queue
					downloadTemplate: this.options.downloadTemplate,
					method          : 'post',             // The method to use when sending files to the server-side upload script
					multi           : this.options.multi,               // Allow multiple file selection in the browse dialog
					formData        : this.options.formData,                 // An object with additional data to send to the server-side upload script with every file upload
					preventCaching  : true,               // Adds a random value to the Flash URL to prevent caching of it (conflicts with existing parameters)
					progressData    : "percentage",       // ('percentage' or 'speed') Data to show in the queue item during a file upload
					queueID         : this.options.queueID,              // The ID of the DOM object to use as a file queue (without the #)
					queueSizeLimit  : 1999,                // The maximum number of files that can be in the queue at one time
					uploadLimit     : 999,  
					removeCompleted : this.options.removeCompleted,               // Remove queue items from the queue when they are done uploading
					removeTimeout   : this.options.removeTimeout,                  // The delay in seconds before removing a queue item if removeCompleted is set to true
					requeueErrors   : false,              // Keep errored files in the queue and keep trying to upload them
					successTimeout  : 30,                 // The number of seconds to wait for Flash to detect the server's response after the file has finished uploading
					uploadLimit     : this.options.uploadLimit,                  // The maximum number of files you can upload
					width           : 1120,                // The width of the browse button
					maxFileSize     : this.options.maxFileSize,
		            maxNumberOfFiles: this.options.maxNumberOfFiles,
		            acceptFileTypes : this.options.acceptFileTypes,
					// Events
					overrideEvents  : []             // (Array) A list of default event handlers to skip	
        		};
        		$.extend(true, config, this.options);
        		this.uploaderBtn.swfuploader(config);
        	} else {
        		config = {
	                // By default, files added to the widget are uploaded as soon
	                // as the user clicks on the start buttons. To enable automatic
	                // uploads, set the following option to true:
        			disabled: false,
	                autoUpload: false,
	                url: this.options.url,
	                maxFileSize: this.options.maxFileSize,
	                maxNumberOfFiles: this.options.maxNumberOfFiles,
	                acceptFileTypes: this.options.acceptFileTypes,
	                // The ID of the upload template:
	                uploadTemplate: this.options.uploadTemplate,
	                // The ID of the download template:
	                downloadTemplate: this.options.downloadTemplate,
	                templatesContainer: this.options.templatesContainer,
	                // The container for the list of files. If undefined, it is set to
	                // an element with class "files" inside of the widget element:
	                filesContainer: this.options.filesContainer,
	                // By default, files are appended to the files container.
	                // Set the following option to true, to prepend files instead:
	                prependFiles: false,
	                // The expected data type of the upload response, sets the dataType
	                // option of the $.ajax upload requests:
	                dataType: 'json',
	                separator:',',
	                uploadedFileList: this.options.uploadedFileList,
	                unUploadedFileList:this.options.unUploadedFileList,
	                // Error and info messages:
	                messages: {
	                    unknownError: 'Unknown error'
	                },
	               
	                processdone: function (e, data) {
	                    data.context.find('.upload').button('enable');
	                },
	                required:true,
	                // used by the maxNumberOfFiles validation:
	                getNumberOfFiles: function () {
	                    return this.filesContainer.children()
	                        .not('.processing').length;
	                },
	                // Callback to retrieve the list of files from the server response:
	                getFilesFromResponse: function (data) {
	                	if (typeof(data.result)==="string") {
	                		data.result = $.parseJSON(data.result);
	                	}
	                    if (data.result && $.isArray(data.result.files)) {
	                        return data.result.files;
	                    }
	                    return [];
	                },
	                // The add callback is invoked as soon as files are added to the fileupload
	                // widget (via file input selection, drag & drop or add API call).
	                // See the basic file upload widget for more information:
	                add: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var $this = $(this),size,
	                        that = $this.data('blueimp-fileupload'),
	                        options = that.options;
	                    var numbers = $t.getQueueData();
	                    if( numbers.length >= options.filesLimt){
	                    	$.messageQueue( {
	                            message:"Maximum number of files exceeded:" + options.filesLimt
	                        }); 
	                    	return;
	                    }
	                    //选择后校验
	                    $this.fileupload('process', data);
	                    data.context = $t._renderUpload(data.files)
	                        .data('data', data)
	                        .addClass('processing');
	                    options.filesContainer[
	                        options.prependFiles ? 'prepend' : 'append'
	                    ](data.context);
	                    $t._forceReflow(data.context);
	                    $t._transition(data.context);
	                    data.process(function () {//上传后校验
	                        return $this.fileupload('process', data);
	                    }).always(function () {
	                        data.context.each(function (index) {
	                            $(this).find('.size').text(
	                            		$t._formatFileSize(data.files[index].size)
	                            );
	                        }).removeClass('processing');
	                       // $t._renderPreviews(data);
	                    }).done(function () {
	                        data.context.find('.upload').prop('disabled', false);
	                        if (($t._trigger('onSelect', e, [{"file": data.files[0]}])!== false) &&
	                                (options.autoUpload || data.autoUpload) &&
	                                data.autoUpload !== false) {
	                            data.submit();
	                        }
	                    }).fail(function () {
	                        if (data.files.error) {
	                            data.context.each(function (index) {
	                                var error = data.files[index].error;
	                                if (error) {
	                                    $(this).find('.error').text(error);
	                                }
	                            });
	                        }
	                    });
	                },
	                done: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var that = $(this).data('blueimp-fileupload'),
	                        getFilesFromResponse = data.getFilesFromResponse ||
	                            that.options.getFilesFromResponse,
	                        files = getFilesFromResponse(data),
	                        template,
	                        deferred;
	                    if (data.context) {
	                        data.context.each(function (index) {
	                            var file = files[index] ||
	                                    {error: 'Empty file upload result'};
	                            deferred = $t._addFinishedDeferreds();
	                            $t._transition($(this)).done(
	                                function () {
	                                    var node = $(this);
	                                    template = $t._renderDownload([file])
	                                        .replaceAll(node);
	                                    $t._forceReflow(template);
	                                    $t._transition(template).done(
	                                        function () {
	                                            data.context = $(this);
	                                            $t._trigger('onSuccess', e, [{"file": data.files[0]}]);
	                                            $t._trigger('onComplete', e, [{"file": data.files[0]}]);
	                                            deferred.resolve();
	                                        }
	                                    );
	                                }
	                            );
	                        });
	                    } else {
	                        template = $t._renderDownload(files)[
	                            that.options.prependFiles ? 'prependTo' : 'appendTo'
	                        ](that.options.filesContainer);
	                        $t._forceReflow(template);
	                        deferred = $t._addFinishedDeferreds();
	                        $t._transition(template).done(
	                            function () {
	                                data.context = $(this);
	                                $t._trigger('onSuccess', e, [{"file": data.files[0]}]);
	                                $t._trigger('onComplete', e, [{"file": data.files[0]}]);
	                                deferred.resolve();
	                            }
	                        );
	                    }
	                    var arrList = $t.options.unUploadedFileList;
	                    $t.clearFileList(arrList,data);
	                },
	             // Callback for uploads stop, equivalent to the global ajaxStop event:
	                stop: function (e) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var that = $(this).data('blueimp-fileupload'),
	                        deferred = $t._addFinishedDeferreds();
	                    $.when.apply($, $t._getFinishedDeferreds())
	                        .done(function () {
	                        	$t._trigger('onStop', e);
	                        });
	                    $t._transition($(this).find('.fileupload-progress')).done(
	                        function () {
	                            $(this).find('.progress')
	                                .attr('aria-valuenow', '0')
	                                .children().first().css('width', '0%');
	                            $(this).find('.progress-extended').html('&nbsp;');
	                            deferred.resolve();
	                        }
	                    );
	                },
	                processstart: function (e) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    $(this).addClass('fileupload-processing');
	                },
	                processstop: function (e) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    $(this).removeClass('fileupload-processing');
	                },
	                // Callback for failed (abort or error) uploads:
	                fail: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var that = $(this).data('blueimp-fileupload'), value, arrList,
	                        template,
	                        deferred;
	                    if (data.context) {
	                        data.context.each(function (index) {
	                            if (data.errorThrown !== 'abort') {
	                                var file = data.files[index];
	                                file.error = file.error || data.errorThrown ||
	                                    data.i18n('unknownError');
	                                deferred = $t._addFinishedDeferreds();
	                                $t._transition($(this)).done(
	                                    function () {
	                                        var node = $(this);
	                                        template = $t._renderDownload([file])
	                                            .replaceAll(node);
	                                        $t._forceReflow(template);
	                                        $t._transition(template).done(
	                                            function () {
	                                                data.context = $(this);
	                                                $t._trigger('onFail', e, [{"file": data.files[0],"error":data.files[0].error}]);
	                                                $t._trigger('onComplete', e, [{"file": data.files[0]}]);
	                                                deferred.resolve();
	                                            }
	                                        );
	                                    }
	                                );
	                            } else {
	                                deferred = $t._addFinishedDeferreds();
	                                $t._transition($(this)).done(
	                                    function () {
	                                        $(this).remove();
	                                        $t._trigger('onRemove', e);
	                                        deferred.resolve();
	                                    }
	                                );
	                            }
	                        });
	                    } else if (data.errorThrown !== 'abort') {
	                        data.context = $t._renderUpload(data.files)[
	                            that.options.prependFiles ? 'prependTo' : 'appendTo'
	                        ](that.options.filesContainer)
	                            .data('data', data);
	                        $t._forceReflow(data.context);
	                        deferred = $t._addFinishedDeferreds();
	                        $t._transition(data.context).done(
	                            function () {
	                                data.context = $(this);
	                                $t._trigger('onFail', e, [{"file": data.files[0],"error":data.files[0].error}]);
	                                $t._trigger('onComplete', e, [{"file": data.files[0]}]);
	                                deferred.resolve();
	                            }
	                        );
	                    } else {
	                    	$t._trigger('onFail', e, [{"file": data.files[0],"error":data.files[0].error}]);
	                    	$t._trigger('onComplete', e, [{"file": data.files[0]}]);
	                    	$t._addFinishedDeferreds().resolve();
	                    }
	                    var arrList1 = $t.options.uploadedFileList;
	                    $t.clearFileList(arrList1,data);
	                    var arrList2 = $t.options.unUploadedFileList;
	                    $t.clearFileList(arrList2,data);
	                },
	                // Callback for upload progress events:
	                progress: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var progress = Math.floor(data.loaded / data.total * 100);
	                    if (data.context) {
	                        data.context.each(function () {
	                            $(this).find('.progress').progressbar("value", progress)
	                        });
	                    }
	                    $t._trigger('onProgress', e, [{"file": data.files[0]}]);
	                },
	                // Callback for global upload progress events:
	                progressall: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var $this = $(this),
	                        progress = Math.floor(data.loaded / data.total * 100),
	                        globalProgressNode = $this.find('.fileupload-progress'),
	                        extendedProgressNode = globalProgressNode
	                            .find('.progress-extended');
	                    if (extendedProgressNode.length) {
	                        extendedProgressNode.html(
	                            $t._renderExtendedProgress(data)
	                        );
	                    }
	                    globalProgressNode
	                        .find('.progress').progressbar("value", progress)
	                },
	                start: function (e) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var that = $(this).data('blueimp-fileupload');
	                    $t._resetFinishedDeferreds();
	                    $t._transition($(this).find('.fileupload-progress')).done(
	                        function () {
	                        	$t._trigger('onStart', e);
	                        }
	                    );
	                },
	                // Callback for successful uploads:
	                send: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    /*var that = $(this).data('blueimp-fileupload') ||
	                            $(this).data('fileupload');*/
	                    if (data.context && data.dataType &&
	                            data.dataType.substr(0, 6) === 'iframe') {
	                        // Iframe Transport does not support progress events.
	                        // In lack of an indeterminate progress bar, we set
	                        // the progress to 100%, showing the full animated bar:
	                        data.context
	                            .find('.progress').addClass(
	                                !$.support.transition && 'progress-animated'
	                            )
	                            .attr('aria-valuenow', 100)
	                            .children().first().css(
	                                'width',
	                                '100%'
	                            );
	                    }
	                    return $t._trigger('onSend', e, [{"file": data.files[0]}]);
	                },
	                // Callback for the start of each file upload request:
	                // Callback for file deletion:
	                remove: function (e, data) {
	                    if (e.isDefaultPrevented()) {
	                        return false;
	                    }
	                    var that = $(this).data('blueimp-fileupload'), value, arrList,
	                        removeNode = function () {
	                            $t._transition(data.context).done(
	                                function () {
	                                    $(this).remove();
	                                    $t._trigger('onRemove', e);
	                                }
	                            );
	                        };
	                    if (data.url) {
	                        data.dataType = data.dataType || that.options.dataType;
	                        $.ajax(data).done(removeNode).fail(function () {
	                        	$t._trigger('onRemoveFailed', e);
	                        });
	                    } else {
	                        removeNode();
	                    }
	                    var arrList = $t.options.uploadedFileList;
	                    $t.clearFileList(arrList,data);
	                }
        		};
        		$.extend(true, config, this.options);
        		this.uploaderBtn.fileupload(config);
        	}
        },
        upload: function(fileId){
        	var version = this.checkIE(),ids=[];
        	if (this.useFlash) {
        		this.uploaderBtn.swfuploader("upload",fileId);
        	} else {
        		if(fileId === undefined){
        			fileId = this.getUnUploadValues();
        		}
        		this.uploaderBtn.fileupload("upload",fileId);
        	}
        },
        _destroy: function(){
        	var version = this.checkIE(),ids=[];
        	if (this.useFlash) {
        		this.uploaderBtn.swfuploader("destroy");
        	} else {
        		this.uploaderBtn.fileupload("destroy");
        	}
        },
        remove: function(fileId){
        	var version = this.checkIE(),ids=[];
        	if (this.useFlash) {
        		this.uploaderBtn.swfuploader("cancel", fileId);
        	} else {
        		this.uploaderBtn.fileupload("remove", fileId);
        	}
        },
        _resetFinishedDeferreds: function () {
            this._finishedUploads = [];
        },

        _addFinishedDeferreds: function (deferred) {
            if (!deferred) {
                deferred = $.Deferred();
            }
            this._finishedUploads.push(deferred);
            return deferred;
        },

        _getFinishedDeferreds: function () {
            return this._finishedUploads;
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (ignore) {}
            });
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits.toFixed(2) + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = Math.floor(seconds / 86400);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreviews: function (data) {
            data.context.find('.preview').each(function (index, elm) {
                $(elm).append(data.files[index].preview);
            });
        },

        _renderUpload: function (func, files) {
        	var item = this._renderTemplate(
    			this.options.uploadTemplate,
    			func
        	);
        	item.find('.progress').empty().progressbar();
        	item.addClass("template-upload fade");
        	if (item.hasClass('fade')) {
        		item.hide();
           	}
        	this._trigger("onRenderUploadTmp", null, {"item":item});
        	return item;
        },

        _renderDownload: function (files) {
            var item = this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
            item.addClass("template-download fade");
            if (item.hasClass('fade')) {
            	item.hide();
            }
            this._trigger("onRenderDownloadTmp", null, {"item":item});
            return item;
        },
        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        /*_transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade') && node.is(':visible')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },*/
        _transition: function (node) {
            var deferred = $.Deferred();
            if (node.hasClass('fade')) {
                node.fadeToggle(
                    this.options.transitionDuration,
                    this.options.transitionEasing,
                    function () {
                        deferred.resolveWith(node);
                    }
                );
            } else {
                deferred.resolveWith(node);
            }
            return deferred;
        },
        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('.fileupload-buttonbar')
                    .find('.upload, .remove'),
                'click'
            );
            this._off(
                this.element.find('.fileupload-buttonbar .toggle'),
                'change.'
            );
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        
        _create: function () {
        	this.options.id = this.element.uniqueId().attr("id");
            this._super();
            this._resetFinishedDeferreds();
            
            if (!$.support.fileInput) {
                this._disableFileInputButton();
            }
            this.element
            .find('.fileupload-buttonbar')
            .find('.fileinput-button').each(function () {
               /* var input = $(this).find('input:file').detach();
                $(this)
                    .button({icons: 'icon-plus3'})
                    .append(input);*/
            });
            this._getConfig();
            if(this.options.beforeCreate){
            	this.options.beforeCreate.apply(this);
            } else {
            	this.beforeCreate();
            }
        },
        beforeCreate: function () {
        	//this.options.id = this.element.uniqueId()[0].id;
        	var that = this;
        	this._on(this.options.filesContainer, {
                'click .upload': function(e){
                	e.preventDefault();
                    var template = $(e.currentTarget).closest('.template-upload');
                    $("#"+that.element[0].id).fileuploader("upload", template[0].id);
                },
                'click .remove': function(e){
                	e.preventDefault();
                    var template = $(e.currentTarget).closest('.template-upload,.template-download');
                    $("#"+that.element[0].id).fileuploader("remove", template[0].id);
                },
                'click .stop': function(e){
                	e.preventDefault();
                    var template = $(e.currentTarget).closest('.template-upload');
                    $("#"+that.element[0].id).fileuploader("stop", template[0].id);
                },
            });
        },
        clearFileList: function(arrList,data){
        	var values,arr;
        	if(arrList ===this.options.uploadedFileList){
        		values = this.getValues();
        	}else if (arrList === this.options.unUploadedFileList) {
        		values = this.getUnUploadValues();
        	}
        	arr = $.inArray(data.context[0][this.options.prmNames.fileId],values)
        	if(arr!== -1){
        		arrList.splice(arr,1); 
        	}else{
        		arrList.splice(arr,0);
        	}
        },
        getQueueData: function(){
        	var valArr1 = [],valArr2 = [];
        	for(var i = 0; i < this.options.uploadedFileList.length; i++){
        		valArr1.push(this.options.uploadedFileList[i].fileId);
        	}
        	for(var i = 0; i < this.options.unUploadedFileList.length; i++){
        		valArr2.push(this.options.unUploadedFileList[i].fileId);
        	}
        	return $.merge(valArr1,valArr2);
        },
        getValues: function(){
        	var valArr = [];
        	for(var i = 0; i < this.options.uploadedFileList.length; i++){
        		valArr.push(this.options.uploadedFileList[i].fileId);
        	}
        	return valArr;
        },
        getValidateValue:function(){
        	var version = this.checkIE();
        	if (this.useFlash) {
        		return this.uploaderBtn.swfuploader("getValidateValue");
        	} else {
        		return this.getValue();
        	}
        },
    	getValue: function() {
        	var version = this.checkIE();
        	if (this.useFlash) {
        		return this.uploaderBtn.swfuploader("getValue");
        	} else {
        		return this.getValues().join( this.options.separator );
        	}
    	},
    	clearError: function(){},
    	focus: function(){},
        getUnUploadValues: function(){
        	var fileArray = [];
        	for(var i = 0; i < this.options.unUploadedFileList.length; i++){
        		fileArray.push(this.options.unUploadedFileList[i][this.options.prmNames.fileId]);
        	}
        	return fileArray;
        },
        enable: function () {
        	var version = this.checkIE();
        	if (this.useFlash) {
        		this.uploaderBtn.swfuploader("disable",false);
        	} else {
        		var wasDisabled = false;
        		if (this.options.disabled) {
        			wasDisabled = true;
        		}
        		this._super();
        		if (wasDisabled) {
        			this.element.find('input, button').prop('disabled', false);
        			this._enableFileInputButton();
        			this.options.filesContainer.prop('disabled', false)
					   						   .removeClass('coral-state-disabled');
        		}
        		this.options.disabled = false;
        		this._trigger("onEnable", null, []);
        	}
        },

        disable: function () {
        	var version = this.checkIE();
        	if (this.useFlash) {
        		this.uploaderBtn.swfuploader("disable",true);
        	} else {
        		if (!this.options.disabled) {
        			this.element.find('input, button').prop('disabled', true);
        			this._disableFileInputButton();
        			this.options.filesContainer.prop('disabled', true)
        									   .addClass('coral-state-disabled');
        		}
        		this._super();
        		this.options.disabled = true;
        		this._trigger("onDisable", null, []);
        	}
        }
        // uploadify function
    });
    
    
}));

