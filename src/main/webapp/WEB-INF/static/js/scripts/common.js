﻿/**
 * @CHARSET "UTF-8"
 */
(function() {
	// name space
	$.ns = $.namespace = function() {
		var o, d;
        $.each(arguments, function(i, v) {
            d = v.split(".");
            o = window[d[0]] = window[d[0]] || {};
            $.each(d.slice(1), function(j, v2){
                o = o[v2] = o[v2] || {};
            });
        });
        return o;
	};
})();

$.ajaxSetup({cache:false}); 

var common = $.extend({},common);
/**
 * 选择罪犯加载罪犯基本信息，用于表单
 * add by fengyoushuang
 */
common.selectJbxx = function (event,ui){
	var formObj = $(this).closest("form");
	if(ui.item.value){
		$.ajax({
			type : 'POST',
			url : $.coral.contextPath+'/common/zf-jbxx!getJbxxByBh.json?bh='+encodeURI(ui.item.value),
			dataType : 'json',
			cache:false,
			success : function(data) {
				formObj.form("loadData", data);
				var fun = formObj.attr("id")+"SetData";
				if ($.isFunction(window[fun])) {
					window[fun](data);
				}
//				$.coral.toFunction(fun).apply(this,[data]);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
};

/**
 * 选择罪犯加载罪犯基本信息，用于列表选择
 * add by fengyoushuang
 */
common.gridRowJbxx = function (e,ui){
	if(ui.item.value){
		$.ajax({
			type : 'get',
			url : $.coral.contextPath+'/common/zf-jbxx!getJbxxByBh.json?bh='+encodeURI(ui.item.value),
			dataType : 'json',
			cache:false,
			success : function(data) {
				$("#"+e.data.gridId).grid("restoreRow", e.data.rowId);
				$("#"+e.data.gridId).grid("setRowData",e.data.rowId,data);
				$("#"+e.data.gridId).grid("editRow", e.data.rowId);
				var fun = e.data.gridId+"SetData";
				if ($.isFunction(window[fun])) {
					window[fun](data,e.data.rowId);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
};

/**
 * 验证罪犯姓名输入是否正确
 */
common.validZfxm = function(ui){
	var acInstance = $(this).autocomplete("instance");
	var textField = $(this).autocomplete("option", "textField");
	var item = acInstance.getLastSelectedItem();
	if(!item&&$.trim(acInstance.getText())!=""){
		return { isValid: false, errMsg: "请选择正确的罪犯姓名！" };
	}
	if(acInstance.getText()!=item[textField]&&$.trim(acInstance.getText())!=""){
		return { isValid: false, errMsg: "罪犯姓名输入不正确！" };
	}
	return {isValid: true};
};

/**
 * 验证自动完成相是否正确
 * 胡增辉
 */
common.validAuto = function(ui){
	var acInstance = $(this).autocomplete("instance");
	var textField = $(this).autocomplete("option", "textField");
	var item = acInstance.getLastSelectedItem();
	if(!item&&$.trim(acInstance.getText())!=""){
		return { isValid: false, errMsg: "请选择正确的选项！" };
	}
	if(acInstance.getText()!=item[textField]&&$.trim(acInstance.getText())!=""){
		return { isValid: false, errMsg: "选项输入不正确！" };
	}
	return {isValid: true};
};

/**
 * 将表单元素转换成json字符串
 * add by fengyoushuang
 */
common.parseForm2Json = function (formId){
	var array = [];
	var params = $("#"+formId).form("formData"); // 序列化表单元素
	jQuery.each(params, function(name,value){
		//array.push('"'+name+'":"'+value+'"');
		array.push('"'+name+'":'+(value?'"'+value+'"':null));
	});
	// alert("{"+array.join(",")+"}"); return;// 调试信息
	return "{"+array.join(",")+"}";
};

/**
 * 转换存储对象的数组为json字符串
 * add by fengyoushuang
 */
common.parseArrayObj2Json = function (arrayObj){
	var array = [];
	$.each(arrayObj, function(index,obj){
		var child = [];
		$.each(obj, function(i,n){
			child.push('"'+common.switchProperty(i)+'":'+(n?'"'+n+'"':null));
		});
		array.push("{"+child.join(",")+"}");
	});
	return "["+array.join(",")+"]";
};

/**
 * 转换带下滑线字段属性，将大写变小写，去掉下滑线首字母大写，如：WORK_SPACE ==>workSpace
 * add by fengyoushuang
 */
common.switchProperty = function (property){
	if(property.search(/_/g)>0){
		var str = property.toLowerCase();
		var reg = /_[a-z]/g;
		return str.replace(reg,function(m){
			return m.substr(1).toUpperCase();
		});
	}
	return property;
};

/**
 * 转换金额成中文大写
 */
common.digitUppercase = function (n) {
	var fraction = [ '角', '分' ];
	var digit = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
	var unit = [ [ '元', '万', '亿' ], [ '', '拾', '佰', '仟' ] ];
	var head = n < 0 ? '欠' : '';
	n = Math.abs(n);

	var s = '';
	for ( var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);
	for ( var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for ( var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};


/**
 * 文件上传前处理事件
 * add by fengyoushuang
 */
common.onUploadStart = function(e, data){
	var idVal = $('input[name=id]',$(e.target).closest("form")).val();
	var uploadId = $(e.target).attr("id");
	$("#"+uploadId).uploader("settings","formData",{"ywId":idVal,"fjfl":uploadId});
};
/**
 * 文件上传成功后处理事件
 * add by fengyoushuang
 */
common.onUploadSuccess = function(e, data){
	var model = $.parseJSON(data.data);
	var affixId = $("#affixIds").val();
	if(affixId){
		affixId += ","+model.id;
		$("#affixIds").val(affixId);
	}else{
		var affixInput = "<input type=\"hidden\" name=\"affixIds\" id=\"affixIds\"/>";
		$(e.target).after(affixInput);
		$("#affixIds").val(model.id);
	}
	if(model.id){
		if("jpg,jpeg,png,bmp".indexOf((model.fileExts).toLowerCase())!=-1){
			var src = $.coral.contextPath+'/common/affix/'+model.id+'.showfile';
			var href = $.coral.contextPath+'/common/affix/'+model.id+'.download';
			var divWrapper = $(e.target).prev("div[class=wrapper]");
			
			if(divWrapper.length>0){
				/*
				var imgDiv = "<div id=\""+model.id+"\"><img src=\""+src+"\" />";
				imgDiv += "<div class=\"image-queue-item\">";
				imgDiv += "<a title='"+data.file.name+"' href='"+href+"'>"+common.abbreviate(data.file.name,14)+"</a>";
				imgDiv += "<span title=\"点击删除文件\" onClick=\"common.deleteAffix('"+model.id+"')\"></span>";
				imgDiv += "</div></div> ";			
				*/
				var imgDiv = "<div id=\""+model.id+"\"  onmouseover=\"$('#del_"+model.id+"').show()\" onmouseout=\"$('#del_"+model.id+"').hide()\">";
				imgDiv += "<div id=\"sit-simple-demo\" style=\"width:180px; height:130px;\">";
				imgDiv += "<span class=\"sit-preview\">";
				imgDiv += "<img src=\""+src+"\" style=\"width:160px; height:105px;\"  data-preview-url=\""+src+"\" />";
				imgDiv += "</span>";
				imgDiv += "<div  class=\"image-queue-item\" style=\"width:160px; height:20px;\">";
				imgDiv += "<a title='"+data.file.name+"' href='"+href+"'>"+common.abbreviate(data.file.name,14)+"</a>";
				imgDiv += "<span style=\"display:none\" id=\"del_"+model.id+"\" title=\"点击删除文件\" onClick=\"common.deleteAffix('"+model.id+"')\"></span>";
				imgDiv += "</div></div></div>";
				divWrapper.append(imgDiv);
				
			}else{
				/*
				var affixImg = "<div class=\"wrapper\">";
				affixImg += "<div id=\""+model.id+"\"><img src=\""+src+"\" />";
				affixImg += "<div class=\"image-queue-item\">";
				affixImg += "<a title='"+data.file.name+"' href='"+href+"'>"+common.abbreviate(data.file.name,14)+"</a>";
				affixImg += "<span title=\"点击删除文件\" onClick=\"common.deleteAffix('"+model.id+"')\"></span>";
				affixImg += "</div></div></div>";
				*/
				var affixImg = "<div class=\"wrapper\">";
				affixImg += "<div id=\""+model.id+"\"  onmouseover=\"$('#del_"+model.id+"').show()\" onmouseout=\"$('#del_"+model.id+"').hide()\">";
				affixImg += "<div id=\"sit-simple-demo\" style=\"width:180px; height:130px;\">";
				affixImg += "<span class=\"sit-preview\">";
				affixImg += "<img src=\""+src+"\" style=\"width:160px; height:105px;\"  data-preview-url=\""+src+"\" />";
				affixImg += "</span>";
				affixImg += "<div  class=\"image-queue-item\" style=\"width:160px; height:20px;\">";
				affixImg += "<a title='"+data.file.name+"' href='"+href+"'>"+common.abbreviate(data.file.name,14)+"</a>";
				affixImg += "<span style=\"display:none\" id=\"del_"+model.id+"\" title=\"点击删除文件\" onClick=\"common.deleteAffix('"+model.id+"')\"></span>";
				affixImg += "</div></div></div></div>";
				
				$(e.target).prev(".uploadify-queue").after(affixImg);
				
			}
			jQuery("#sit-simple-demo .sit-preview").smartImageTooltip({previewTemplate: "simple", imageWidth: "480px"});


		}else{
			var href = $.coral.contextPath+'/common/affix/'+model.id+'.download';
			var affixElement = "<div id=\""+model.id+"\" class=\"uploadify-queue\">";
			affixElement += "<div class=\"uploadify-queue-item\">";
			affixElement += "<div title=\"点击删除文件\" class=\"cancel\"><a onClick=\"common.deleteAffix('"+model.id+"')\" style=\"cursor: pointer;\">X</a></div>";
			affixElement += "<span class=\"fileName\"><a title='"+data.file.name+"' href='"+href+"'>"+common.abbreviate(data.file.name,30)+"("+common.showFileSize(model.fileSize)+")</a></span>";
			affixElement += "</div></div>";
			$(e.target).prevAll(".uploadify-queue").last().after(affixElement);
		}
		var fun = $(e.target).attr("id")+"UploadSuccess";
		if ($.isFunction(window[fun])) {
			window[fun](model);
		}
	}
};



/**
 * 修改表单时加载附件信息
 * add by fengyoushuang
 */
common.loadAffix = function(uploadId,ywId,isView,isEditForm){
	$.ajax({
        type: "POST",
        url: $.coral.contextPath+"/common/affix!listAffix.json?fjfl="+uploadId,
        data: {ywId:ywId},
        dataType: "json",
        cache:false,
        success: function(data){
        	common.drawAffix(data,uploadId,isView,isEditForm);
        }
   });
};



/**
 * 根据 罪犯编号 列表展示 罪犯图片列表  
 */
common.loadAffixByBh = function(uploadId,zfBh,isView,addFunction,isEditForm){
	var re="";
	$.ajax({
		async:false,
        type: "POST",
        url: $.coral.contextPath+"/common/affix!listAffixByBh.json?fjfl="+uploadId,
        data: {zfBh:zfBh},
        dataType: "json",
        cache:false,
        success: function(data){
        	re=common.drawAffixForImg(data,isView,isEditForm,addFunction);
        }
   });
   return re;
};


/**
 * 根据附件的主键ID和附件分类加载附件
 * add by fengyoushuang
 */
common.loadAffixByIdFjfl = function(id,uploadId,isView,isEditForm){
	$.ajax({
        type: "POST",
        url: $.coral.contextPath+"/common/affix!listAffixByIdFjfl.json",
        data: {
        	id:id,
        	fjfl:uploadId
        },
        dataType: "json",
        cache:false,
        success: function(data){
        	common.drawAffix(data,uploadId,isView,isEditForm);
        }
   });	
};

/**
 * 根据附件数据和参数构造附件
 * add by fengyoushuang
 */
common.drawAffix = function(data,uploadId,isView,isEditForm){
	if(data.length>0){
		for(var i=0;i<data.length;i++){
			if("jpg,jpeg,png,bmp".indexOf((data[i].fileExts).toLowerCase())!=-1){
				var src = $.coral.contextPath+'/common/affix/'+data[i].id+'.showfile';
				var href = $.coral.contextPath+'/common/affix/'+data[i].id+'.download';
				var divWrapper = $("#"+uploadId).prev("div[class=wrapper]");
			
				if(divWrapper.length>0){
					/*
					var imgDiv = "<div id=\""+data[i].id+"\"><img src=\""+src+"\" />";
					imgDiv += "<div class=\"image-queue-item\">";
					imgDiv += "<a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,14)+"</a>";
					if(!isView){
						imgDiv += "<span title=\"点击删除文件\" onClick=\"common.deleteAffix('"+data[i].id+"')\"></span>";
					}
					imgDiv += "</div></div> ";
					*/
					var imgDiv = "<div  id=\""+data[i].id+"\"  onmouseover=\"$('#del_"+data[i].id+"').show()\" onmouseout=\"$('#del_"+data[i].id+"').hide()\">";
					imgDiv += "<div id=\"sit-simple-demo\" style=\"width:180px; height:130px;\">";
					imgDiv += "<span class=\"sit-preview\">";
					imgDiv += "<img src=\""+src+"\" style=\"width:160px; height:105px;\"  data-preview-url=\""+src+"\" />";
					imgDiv += "</span>";
					imgDiv += "<div  class=\"image-queue-item\" style=\"width:160px; height:20px;\">";
					imgDiv += "<a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,14)+"</a>";
					if(!isView){
					imgDiv += "<span style=\"display:none\" id=\"del_"+data[i].id+"\" title=\"点击删除文件\" onClick=\"common.deleteAffix('"+data[i].id+"')\"></span>";
					}
					imgDiv += "</div></div></div>";
					console.log(imgDiv);
					divWrapper.append(imgDiv);
				}else{
					/*
					var affixImg = "<div class=\"wrapper\">";
					affixImg += "<div id=\""+data[i].id+"\"><img src=\""+src+"\" />";
					affixImg += "<div class=\"image-queue-item\">";
					affixImg += "<a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,14)+"</a>";
					if(!isView){
						affixImg += "<span title=\"点击删除文件\" onClick=\"common.deleteAffix('"+data[i].id+"')\"></span>";
					}
					affixImg += "</div></div></div>";
					*/
					var affixImg = "<div class=\"wrapper\">";
					affixImg += "<div id=\""+data[i].id+"\"  onmouseover=\"$('#del_"+data[i].id+"').show()\" onmouseout=\"$('#del_"+data[i].id+"').hide()\">";
					affixImg += "<div id=\"sit-simple-demo\" style=\"width:180px; height:130px;\">";
					affixImg += "<span class=\"sit-preview\">";
					affixImg += "<img src=\""+src+"\" style=\"width:160px; height:105px;\"  data-preview-url=\""+src+"\" />";
					affixImg += "</span>";
					affixImg += "<div  class=\"image-queue-item\" style=\"width:160px; height:20px;\">";
					affixImg += "<a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,14)+"</a>";
					if(!isView){
						affixImg += "<span style=\"display:none\" id=\"del_"+data[i].id+"\" title=\"点击删除文件\" onClick=\"common.deleteAffix('"+data[i].id+"')\"></span>";
    				}
					affixImg += "</div></div></div></div>";
					if(!isView){
    					$("#"+uploadId).prev(".uploadify-queue").after(affixImg);
    				}else{
    					if(isEditForm&&isEditForm!=undefined){
    						$("#"+uploadId).prev(".uploadify-queue").after(affixImg);
    						$("#"+uploadId).remove();
    					}else{
    						$("#"+uploadId).after(affixImg);
    					}
    				}			
				}
				
				 jQuery("#sit-simple-demo .sit-preview").smartImageTooltip({previewTemplate: "simple", imageWidth: "480px"});

			}else{
				var href = $.coral.contextPath+'/common/affix/'+data[i].id+'.download';
				var affixElement = "<div id=\""+data[i].id+"\" class=\"uploadify-queue\">";
				affixElement += "<div class=\"uploadify-queue-item\">";
				if(!isView){
					affixElement += "<div class=\"cancel\" title=\"点击删除文件\"><a onClick=\"common.deleteAffix('"+data[i].id+"')\" style=\"cursor: pointer;\">X</a></div>";
				}
				affixElement += "<span class=\"fileName\"><a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,30)+"("+common.showFileSize(data[i].fileSize)+")</a></span>";
				affixElement += "</div></div>";
				if(!isView){
					$("#"+uploadId).prevAll(".uploadify-queue").last().after(affixElement);
				}else{
					if(isEditForm&&isEditForm!=undefined){
    					$("#"+uploadId).prevAll(".uploadify-queue").last().after(affixElement);
						$("#"+uploadId).remove();
					}else{
    					$("#"+uploadId).append(affixElement);
					}
				}
			}
		}
	}
};



/**
 * 根据附件数据和参数构造附件<构造返回值为img>
 */
common.drawAffixForImg = function(data2,isView,isEditForm,addFunction){
	var data=data2.mtxx;
	//console.log(data2);
	var imgTmpl="";
	if(data.length>0){
		for(var i=0;i<data.length;i++){
			if("jpg,jpeg,png,bmp".indexOf((data[i].fileExts).toLowerCase())!=-1){
				var src = $.coral.contextPath+'/common/affix/'+data[i].id+'.showfile';
				var href = $.coral.contextPath+'/common/affix/'+data[i].id+'.download';
				var affixImg = "<div class=\"wrapper\"  id=\""+data[i].id+"\"  onmouseover=\"$('#del_"+data[i].id+"').show()\" onmouseout=\"$('#del_"+data[i].id+"').hide()\">";
				affixImg += "<div id=\"sit-simple-demo\" style=\"width:150px; height:180px;\">";
				affixImg += "<span class=\"sit-preview\">";
				affixImg += "<img src=\""+src+"\" style=\"width:126px; height:140px;\"  data-preview-url=\""+src+"\" />";
				affixImg += "</span>";
				affixImg += "<div  class=\"image-queue-item\" style=\"width:126px; height:20px;\">";
				affixImg += "<a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,14)+"</a>";
				if(!isView){
					affixImg += "<span style=\"display:none\" id=\"del_"+data[i].id+"\" title=\"点击删除文件\" onClick=\"common.deleteAffix('"+data[i].id+"')\"></span>";
				}
				affixImg += "</div></div></div>";
				imgTmpl+=affixImg;
			}
		}
	}
	if(!isView){
	imgTmpl+="<div class=\"wrapper\">";
	imgTmpl+= "<div onClick=\""+addFunction+"()\" style=\"width:180px; height:180px;cursor: pointer;\" ><img src=\""+data2.addpic+"\" style=\"width:160px; height:160px;\"/>";
	imgTmpl += "</div></div>";
	}
	return imgTmpl;

						

};

common.loadImg = function(uploadId,zfbh,width,height){
	$.ajax({
        type: "POST",
        url: $.coral.contextPath+'/common/zf-jbxx!getZfMtxx.json?bh='+zfbh,
        data: {mtfl:'3'},
        dataType: "json",
        cache:false,
        success: function(data){
        	$("#"+uploadId).empty();
        	var affixElement = "";
    		if(width==null||width==undefined){
    			width = $("#"+uploadId).width();
    		}
    		if(height==null||height==undefined){
    			height = $("#"+uploadId).height();
    		}
    		var mtxx = data.mtxx;
        	if(mtxx.length>0){
        		for(var i=0;i<mtxx.length;i++){
                	var src = $.coral.contextPath+'/common/affix/'+mtxx[i].AFFIXID+'.showfile';
//                	affixElement += "<div style='width:"+width+"px;height:"+height+"px;'>";
					affixElement += "<span id=\"sit-simple-demo\">";
					affixElement += "<span class=\"sit-preview\">";
                	affixElement += "<img src='"+src+"' width='"+width+"' height='"+height+"' data-preview-url=\""+src+"\"/>";
					affixElement += "</span>";
					affixElement += "</span>&nbsp;&nbsp;";
//                	affixElement += "</div>";
        		}
			$("#"+uploadId).append(affixElement);
			jQuery("#sit-simple-demo .sit-preview").smartImageTooltip({previewTemplate: "simple", imageWidth: "480px"});
        	}else{
        		affixElement += "<img src='"+data.blank+"' width='"+width+"' height='"+height+"'/>";
			$("#"+uploadId).append(affixElement);
        	}
        	
         }
   });
};




//增加根据罪犯编号 展示 罪犯的正面照、左侧照、又侧照
common.loadImg2 = function(uploadId,zfbh,width,height){
	$.ajax({
        type: "POST",
        url: $.coral.contextPath+'/common/zf-jbxx!getZfMtxx.json?bh='+zfbh,
        data: {mtfl:'3,4,5'},
        dataType: "json",
        cache:false,
        success: function(data){
        	$("#"+uploadId).empty();
        	var affixElement = "";
    		if(width==null||width==undefined){
    			width = $("#"+uploadId).width();
    		}
    		if(height==null||height==undefined){
    			height = $("#"+uploadId).height();
    		}
    		var mtxx = data.mtxx;

        	if(mtxx.length>0){
        		for(var i=0;i<mtxx.length;i++){
					var href = $.coral.contextPath+'/common/affix/'+mtxx[i].AFFIXID+'.download';
                	var src = $.coral.contextPath+'/common/affix/'+mtxx[i].AFFIXID+'.showfile';

				affixElement += "<div class=\"wrapper\"  >";
				affixElement += "<div id=\"sit-simple-demo\"  style=\"width:"+(width*1+10)+"px; height:"+(height*1+25)+"px;\">";
				affixElement += "<span class=\"sit-preview\">";
				affixElement += "<img src=\""+src+"\" style=\"width:"+width+"px; height:"+height+"px;\"  data-preview-url=\""+src+"\" />";
				affixElement += "</span>";
				affixElement += "<div  class=\"image-queue-item\" style=\"width:100px; height:20px;\">";
				affixElement += "<a title='"+mtxx[i].FILE_NAME+"' href='"+href+"'>"+common.abbreviate(mtxx[i].FILE_NAME,8)+"</a>";
				affixElement += "</div></div></div>";

        		}
			$("#"+uploadId).append(affixElement);
			 jQuery("#sit-simple-demo .sit-preview").smartImageTooltip({previewTemplate: "simple", imageWidth: "480px"});
        	}else{
        		affixElement += "<img src='"+data.blank+"' width='"+width+"' height='"+height+"'/>";
			$("#"+uploadId).append(affixElement);
        	}
        	
		 }
   });
};



/**
 * 在表单上删除附件
 * add by fengyoushuang
 */
common.deleteAffix = function(id){
	if(id&&id!="null"){
		$.confirm("确认彻底删除此附件？", function(r) {
            if (r) {//${ctx}/common/affix/${file.id}?_method=delete
            	$.ajax({
		             type: "POST",
		             url: $.coral.contextPath+"/common/affix!destroy.json",
		             data: {id:id},
		             dataType: "json",
		             cache:false,
		             success: function(data){
		             	$.message( {message:"操作成功！", cls:"success"}); 
						var affixIds = $('input[name=affixIds]',$("#"+id).closest("form"));
						if(affixIds.length>0){
							var array = (affixIds.val()).split(",");
							//计算删除的id是否在隐藏input的值中，如果存在将其删除，返回新的数组
							var newArray = $.map(array, function(n){
							  return n != id ? n : null;
							});
							affixIds.val(newArray.join(","));
						}
	             		$("#"+id).remove();
                      }
		        });
            } else {
                $.message( "取消" ); 
            }
        });
	}else{
		$.confirm("确认彻底删除此附件？", function(r) {
			if(r){
				$("#"+id).remove();
			}
		});
	}
};


/**
 * 数据导入前处理事件
 * add by fengyoushuang
 */
common.importStart = function(e, data){
	var sheet = $('input[name=sheet]',$(e.target).closest("form")).val();
	var startRow = $('input[name=startRow]',$(e.target).closest("form")).val();
	var startCol = $('input[name=startCol]',$(e.target).closest("form")).val();
	var uploadId = $(e.target).attr("id");
	$("#"+uploadId).uploader("settings","formData",{"sheet":sheet,"startRow":startRow,"startCol":startCol});
};

/**
 * 数据导入成功后触发事件
 * add by fengyoushuang
 */
common.importSuccess = function(e, data){
	var uploadId = $(e.target).attr("id");
	var map = $.parseJSON(data.data);
	if((map.batchCount) !=''){
		$.alert(map.fileName+"导入情况如下："+"<br\><br\>" +map.batchCount+"<br\>");
	}else if(map.batchmsg !=null && (map.batchmsg) !=''){
		$.alert("经检查"+map.fileName+"中存在如下错误："+"<br\><br\>"+map.batchmsg+"<br\>"+"请修改后再导入！");
	}else{
		$.alert(map.fileName+"中的0条数据导入！");
	}
	
	var fun = uploadId+"ImportSuccess";
	if ($.isFunction(window[fun])) {
		window[fun]();
	}
};

/**
 * 当字符串data的字节长度超过bytelength时，以省略号结尾处理
 */
common.abbreviate = function(data,bytelength){
	if (data) {
		var leave = data;
		var newstr = "";
		var len = 0;
		while (leave.length > 0 && len <= bytelength) {
			var s = leave.substr(0, 1);
			leave = leave.substr(1);
			/[^\x00-\xFF]/.test(s) ? len = len + 2 : len++;
			newstr += s;
		}
		return newstr += (data != newstr ? "..." : "");
	}
	return data;
};

/**
 * 计算文件大小
 */
common.showFileSize = function(b) {
	var dis = "";
	if (b) {
		b = parseFloat(b);
		if (b >= 1024) {
			var k = parseFloat(b / 1024);
			if (k >= 1024) {
				var m = parseFloat(k / 1024);
				if (m >= 1024) {
					var g = parseFloat(m / 1024);
					dis = g.toFixed(2) + "G";
				} else {
					dis = m.toFixed(2) + "M";
				}
			} else {
				dis = k.toFixed(2) + "K";
			}
		} else {
			dis = b + "Byte";
		}
	}
	return dis;
};

/**
 * 将JSON对象填充到form元素中
 * add by fengyoushuang
 */
function loadForm(formId,url,setData){
	if(typeof url == "string"){
		if(url.indexOf('?') != -1){
			url = url + '&tt=' + getRandomId();
		}else{
			url = url + '?tt=' + getRandomId();
		}
		$.ajax({
			url : url,
			type : "GET",
			dataType : "json",
			cache:false,
			success : function(data) {
				if(data!=null){
					$('#'+formId).form("loadData", data);
					if(setData){
						setData(data);
					}
				}
			}
		});
	}else if(typeof url == "object"){
		if(url != null){
			$('#'+formId).form('loadData',url);
			if(setData){
				setData(url);
			}
		}
	}
}
function getRandomId() {
	var now =  new Date();
	return now.getTime();
}

/**
 * 配置分页条去除分页信息后，按钮显示 
 * @returns {String}
 */
function pagerTemplate(){
	return "<div class='toolbarpanel'>{toolbar}</div>";
}

/**
 * 格式化日期(yyyy-MM-dd HH:mm -> yyyy-MM-dd)
 * add by fengyoushuang
 */
common.dateFormatter = function (value,dataType){
	if(dataType == 0){
		if(value != null && value.length >= 16) {
			var index = value.indexOf(" ");
			if (index != -1) value = value.replace(/:/g,"-").replace(/ /g,"-");
			var values = value.split("-");
			return parseInt(values[0], 10)+"年"+parseInt(values[1], 10)+"月"+parseInt(values[2], 10)+"日 "+parseInt(values[3], 10)+"时"+parseInt(values[4], 10)+"分";
		}else {
			return "";
		}
	}else if(dataType == 1) {
		if(value != null && value.length >= 10) {
			var index = value.indexOf(" ");
			if (index != -1) value = value.substring(0, index);
			var values = value.split("-");
			return parseInt(values[0], 10)+"年"+parseInt(values[1], 10)+"月"+parseInt(values[2], 10)+"日";
		}else {
			return "";
		}
	}else if(dataType == 2) {
		if(value != null && value.length >= 7) {
			var index = value.indexOf(" ");
			if (index != -1) value = value.substring(0, index);
			var values = value.split("-");
			return parseInt(values[0], 10)+"年"+parseInt(values[1], 10)+"月";
		}else {
			return "";
		}
	}else if(dataType == 3){
		if(value != null && value.length >= 7) {
			return value.substring(0,4)+"-"+value.substring(5,7)+"";
		}else {
			return "";
		}
	}else if(dataType == 4) {
		if(value != null && value.length >= 10) {
			return value.substring(0,4)+"/"+value.substring(5,7)+"/"+value.substring(8,10);
		}else {
			return "";
		}
	}else if(dataType == 5) {
		if(value != null && value.length >= 4) {
			return value.substring(0,4)+"年";
		}else {
			return "";
		}
	}else {
		return (value) ? value.substring(0, 10) : "";
	}
};

/**
 * 检查日期合法性
 **/
common.checkDate = function (entry) {
	if(entry == "____-__-__" || entry == "") {
		return true;
	}
    var mo, day, yr;
    var re = /\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/;
    if (re.test(entry)) {
        var delimChar = (entry.indexOf("/") != -1) ? "/" : "-";
        var delim1 = entry.indexOf(delimChar);
        var delim2 = entry.lastIndexOf(delimChar);
        yr = parseInt(entry.substring(0, delim1), 10);
        mo = parseInt(entry.substring(delim1+1, delim2), 10);
        day = parseInt(entry.substring(delim2+1), 10);
        var testDate = new Date(yr, mo-1, day);
        //alert(testDate)
        if (testDate.getDate() == day) {
            if (testDate.getMonth() + 1 == mo) {
                if (testDate.getFullYear() == yr) {
                    return true;
                } else {
                    //$.messager.alert('提示','年份不合法！','warning');
                    return false;
                }
            } else {
                //$.messager.alert('提示','月份不合法','warning');
                return false;
            }
        } else {
            //$.messager.alert('提示','日期不合法','warning');
            return false;
        }
    } else {
    	//$.messager.alert('提示','日期格式不合法','warning');
        return false;
    }
    return true;
};

/**
 * 根据出生日期计算年龄
 * add by fengyoushuang
 **/
common.getAge = function (birth,dqrq) {
	var age = 0;
	if(common.checkDate(birth) && common.checkDate(dqrq)) {
		//字符串转换成日期，此方式兼容火狐和IE
		var brDate = eval('new Date(' + birth.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')'); //new Date(birth.replace('-','/'));
		var cuDate = eval('new Date(' + dqrq.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')'); //new Date(dqrq.replace('-','/'));
		age = cuDate.getFullYear() - brDate.getFullYear();
		cMon = cuDate.getMonth();
		dMon = brDate.getMonth();
		cDe = cuDate.getDate();
		dDe = brDate.getDate();

		if(cMon < dMon) {
			age = age - 1;
		}else if(cMon == dMon && cDe < dDe) {
			age = age - 1;
		}
    }
    return age;
};

//文字表达6位数字刑期xq(把6位的数字转成格式为几年几月几日的文本)
common.setXqWb = function(xq){
	var wb="";
	if(xq){
			if(xq=='970000'||xq=='终身'){
				return "终身";	
			}
			else{
				if(xq=='9990'){
					wb= "有期";
				}
				else{
					if(xq=='9995'){
						wb= "无期";
					}else{
							if(xq=='9996'){
								wb= "死刑缓期二年执行";
							}else{
									if(xq=='9997'){
										wb= "死刑";
									}else{
											var year="",month="",day="";
											if(xq.length>=0&&xq.length<=2){
												year=xq;
											}else if(xq.length>2&&xq.length<=4){
												year=xq.substring(0,2);
												month=xq.substring(2);
											}else if(xq.length>4&&xq.length<=6){
												year=xq.substring(0,2);
												month=xq.substring(2,4);
												day=xq.substring(4);
											}
											if(parseInt(year)>0){
												wb=parseInt(year)+"年";
											}
											if(parseInt(month)>0){
												wb=wb+parseInt(month)+"个月";
											}
											if(parseInt(day)>0){
												wb=wb+parseInt(day)+"日";
											}
										}
								}
						}
				}
			}
		}
	return wb;
};

//6位数字 转汉子 YYMMDD
//支持onkey事件动态转汉子（录入<=6位）
//支持负数
common.setXqWbDt = function(sz){
	var wz="";
	if(sz){
		var flag=1;
		if(sz.substring(0,1)=='-'){
			sz=sz.substring(1);
			flag=0;
		}
		var year=0,month=0,day=0;
		if(sz.length>=0&&sz.length<=2){
			year=sz;if(year.length==1)year=year+"0";
			if(year*1>25){
				$.message("最大为25年");
			}
		}
		else if(sz.length>2&&sz.length<=4){
			year=sz.substring(0,2);
			month=sz.substring(2);
			if(month.length==1)month=month+"0";
			if(month*1>11){
				$.message("月份最大是11");
			}
		}
		else if(sz.length>4&&sz.length<=6){
			year=sz.substring(0,2);
			month=sz.substring(2,4);
			day=sz.substring(4);
			if(day.length==1)day=day+"0";
			if(day*1>31){
				$.message("天数最大是31");
			}
		}
		if(year*1!=0)wz=parseInt(year)+"年";
		if(month*1!=0)wz=wz+parseInt(month)+"个月";
		if(day*1!=0)wz=wz+parseInt(day)+"日";
		if(flag==0){
			wz="减"+wz;
		}
	}
	return wz;
		alert(wz);
	
}

/*var completetreeButtons = [{
	label: "点击选择",icons: "icon-checkmark-circle",text: false,
	click: function() {
		if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") == this.id+"_dialog" && !$(".treeSelectDialog").is(":hidden")  ) {
			$("#"+this.id+"_dialog").dialog({modal: true});$("#"+this.id+"_dialog").dialog("open");return;
		} else if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") != this.id ){
			$(".treeSelectDialog").dialog("destroy");$(".treeSelectDialog").remove();
		}
		var $dialog = $("<div>",{id:this.id+"_dialog"});
		$dialog.appendTo("body");
		$dialog.dialog({
			cls: "treeSelectDialog",
			autoOpen: true,autoDestroy: true,reLoadOnOpen: true,width:400,height:400,postData: {id: this.id},
			buttons: {"关闭": function(){$(this).dialog("destroy");$(this).remove();}},
			modal: true,
			url: $.coral.contextPath+"/common/auth/org-user!index" 
		});
	}
}];*/
var completetreeButtons = [{
		
	label: "点击选择",icons: "icon-checkmark-circle",text: false,
	click: function() {
	
	    var flag1 = $('#'+this.id).autocompletetree('option','readonly');
		var flag2= $('#'+this.id).autocompletetree('option','isLabel');
		var flag3 =$('#'+this.id).autocompletetree('option','disabled');

		if(flag1||flag2||flag3){
			return;
		}
		
		
		if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") == this.id+"_dialog" && !$(".treeSelectDialog").is(":hidden")  ) {
			$("#"+this.id+"_dialog").dialog({modal: true});$("#"+this.id+"_dialog").dialog("open");return;
		} else if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") != this.id ){
			$(".treeSelectDialog").dialog("destroy");$(".treeSelectDialog").remove();
		}
		
		var parms = $('#'+this.id).autocompletetree('option','dataCustom');
		var showOrg='';
		if(parms){
			var parmsArray = jQuery.parseJSON(parms);
			
			showOrg = parmsArray[0].showOrg;
		}
		
		var $dialog = $("<div>",{id:this.id+"_dialog"});
		$dialog.appendTo("body");
		$dialog.dialog({
			cls: "treeSelectDialog",
			autoOpen: true,autoDestroy: true,reLoadOnOpen: true,width:400,height:400,postData: {id: this.id},
			buttons: {"关闭": function(){$(this).dialog("destroy");$(this).remove();}},
			modal: true,
			url: $.coral.contextPath+"/common/auth/org-user!index?showOrg="+showOrg 
		});
	}
}];




function closeDialog(e,ui){
	$(this).closest(".ctrl-init-dialog").dialog("close");
}
/**
 * 禁用键盘事件(Backspace、Ctrl+N、Ctrl+R、F5)，兼容火狐和IE
 * add by fengyoushuang
 **/
document.onkeydown = function(event) { 
	e = event?event:(window.event?window.event:null);
	var code = e.keyCode||e.which;
	var obj = e.srcElement||e.target;
	if (((code == 8) &&                                                    //BackSpace   
               ((obj.type != "text" &&
               obj.type != "textarea" &&
               obj.type != "password") ||
               obj.readOnly == true)) ||
               ((e.ctrlKey) && ((code == 78) || (code == 82))) ||    //Ctrl+N,Ctrl+R   
               (code == 116)) {   //F5
	  code = 0;
	  //e.returnValue = false;
	  return false;
	}

};


/**
 * 公共打开连接,罪犯个体信息展示
 * 
 **/
function common_openZfDk(zfBh,dialogId){
	$( "#"+dialogId ).dialog("option",{
		title: "信息展示",
		subTitle: "个体信息",
		width: 1200,
		height: 700,
		url: "/yzgl/dk/xxzs/zfpersonalinfo!openZhxx?bh=" + zfBh
	});
	$( "#"+dialogId ).dialog( "open" ); 
}

/**
 * 刑种和刑期的组合
 **/
 common.setXzXqWb = function(xz,xq){
	var wb="";
	if(xz){
		if(xz=="0000"){//有期徒刑
			if(xq){
				wb=common.setXqWb(xq);
			}
		}else if(xz=="9995"){
			wb="无期";
		}else if(xz=="9996"){
			wb="死刑缓期二年执行";
		}else if(xz=="9997"){
			wb="死刑";
		}
	}
	return wb;
};

    /*导出excel方法，xmlName:配置的xml名称，dataRows：数组对象的json,path:xml配置文件所在项目的根路径*/
    common.doOutputExcel = function (xmlName,dataRows,path){
    	$.ajax({
    	    async:false,
    		type: "post",
    		url: path+"/common/affix!outputData.json?xmlName="+xmlName,
    		dataType: "json",
    		success: function(data){
    			var oXL; 
    			var oWB; 
    			var oSheet; 
    			try {
    				oXL = new ActiveXObject("Excel.Application"); 
    				oWB = oXL.Workbooks.Add(); 
    				oSheet = oWB.Worksheets(1); 
    				oSheet.Cells.WrapText=true;  //自动换行
    				oSheet.Cells.VerticalAlignment = 2;  //垂直居中
    				oSheet.Cells.HorizontalAlignment = 3; //水平居中
    				oSheet.Columns.ColumnWidth = 15;//设置从firstcol到stopcol列的宽度为15
    				oSheet.Rows.RowHeight = 18;//设置从firstrow到stoprow行的宽度为18
    			}catch (e) {
    				alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，"+"那么请调整IE的安全级别。\n\n具体操作：\n\n"+"工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用(或选择提示)");
    				return false;
    			}
    			
    			if(data){
	    			//设置列名		
	    			for(var i=0;i<data.length;i++){
						oSheet.Columns.NumberFormatLocal="@";//所有lie为文本格式
						oSheet.Cells(1,i+1).Interior.ColorIndex=8;//背景为天蓝色
						oSheet.Cells(1,i+1).Font.Bold=true; //字体加粗
	    				oSheet.Cells(1,i+1).Value = data[i].value;
	    			}
    			}
    			
    			if(dataRows){
	    			//设置每行对应列的值
	    			for(var i=0;i<dataRows.length;i++) {
	    				for(var j=0;j<data.length;j++){
	    					var clumn = data[j].key;
	    					
	    					oSheet.Cells(i+2,j+1).Value = dataRows[i][clumn];
	    				}
	    			}
    			}
    			
    			oXL.Visible = true;			
    		}
       });
    };

   /*设置列表是否转码*/
  common.revertCode = function (gridId,flag){
    	var cos = $("#"+gridId).grid("option","colModel");
    	
    	$.each(cos,function (i){
    		$("#"+gridId).grid("setColProp",cos[i].name,{"revertCode":flag});
    	});
    }

	common.treechange = function (aId,bId,vmkey){
		if(aId !=null &&  bId !=null){
		
		var userIdss = $('#'+aId).autocompletetree("getValue");
		$.ajax({
	        type: "post",
	        url: 
	        $.coral.contextPath+"/common/auth/org-user!findDiffentOfTreeValue.json?vmkey="+vmkey,
	        dataType: "json",
	        data: {userIds:userIdss} ,
	        success: function(data){
	        	var userId = "";
	        	var userName = "";
		        if(data){
		        	var parmsArray = data;
			        	for (var i = 0; i < parmsArray.length; i++) {
			        		var tid = parmsArray[i].id;
			        		
			        		var uId = tid;
			        		userId+=uId+",";	
			        		
			        		userName+=parmsArray[i].name+",";	
			    		}
		        	userId=userId.substring(0, userId.length-1);
		        	userName=userName.substring(0, userName.length-1);
		        	
		        	$('#'+bId).autocompletetree("setValue", '');//给autocompletetree组件赋予数值
		        	$('#'+bId).autocompletetree("setText", '');//给autocompletetree组件赋予显示值
		        	$('#'+bId+'text').textbox("setValue",'');//给autocompletetree组件赋予显示值	
		        	
		        	$('#'+bId).autocompletetree("setValue", userId);//给autocompletetree组件赋予数值
		        	$('#'+bId).autocompletetree("setText", userName);//给autocompletetree组件赋予显示值
		        	$('#'+bId+'text').textbox("setValue",userId);//给autocompletetree组件赋予显示值	
	        }
	        }
  			 });
		
		}
	}

		common.initAutocompletetreeText =  function (chmjId,showOrg){
		$ref = $('#'+chmjId);
		$reftext = $('#'+chmjId+'text');
	     	$.ajax({
	        type: "post",
	        url: $.coral.contextPath+"/common/auth/org-user!unitAutocompletetree.json?isInit=true&showOrg="+showOrg,
	        dataType: "json",
	        success: function(data){
	        	var userId = "";
	        	var userName = "";
		        if(data){
		        	var parmsArray = data;
			        	for (i = 0; i < parmsArray.length; i++) {
			        		var tid = parmsArray[i].id;
			        		
			        		var uId = tid.substr(tid.indexOf("user_")+5);
			        		userId+=uId+",";	
			        		userName+=parmsArray[i].name+",";	
			    		}
		        	   userId=userId.substring(0, userId.length-1);
		        	   userName=userName.substring(0, userName.length-1);
		        	
					$ref.autocompletetree("setText", userName);//给autocompletetree组件赋予显示值
		        	$ref.autocompletetree("setValue", userId,true);//给autocompletetree组件赋予数值
		        
		        	$reftext.textbox("setValue",userId);//给autocompletetree组件赋予显示值	
	        }
	        }
  			 });
	};


	var completegroupkeytreeButtons = [{
		
		label: "点击选择",icons: "icon-checkmark-circle",text: false,
		click: function() {

				var flag1 = $('#'+this.id).autocompletetree('option','readonly');
				var flag2= $('#'+this.id).autocompletetree('option','isLabel');
				var flag3 =$('#'+this.id).autocompletetree('option','disabled');

				if(flag1||flag2||flag3){
					return;
				}


			if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") == this.id+"_dialog" && !$(".treeSelectDialog").is(":hidden")  ) {
				$("#"+this.id+"_dialog").dialog({modal: true});$("#"+this.id+"_dialog").dialog("open");return;
			} else if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") != this.id ){
				$(".treeSelectDialog").dialog("destroy");$(".treeSelectDialog").remove();
			}
			
			var parms = $('#'+this.id).autocompletetree('option','dataCustom');
			var groupkey='';
			var allowCheckParent='false';
			var multipleSelect='false';
			if(parms){
				var parmsArray = jQuery.parseJSON(parms);
				groupkey = parmsArray[0].groupkey;
				
				if(parmsArray[1].allowCheckParent !=null && parmsArray[1].allowCheckParent !=''){
					allowCheckParent = parmsArray[1].allowCheckParent;
				}
				
				if(parmsArray[2].multipleSelect !=null && parmsArray[2].multipleSelect !=''){
					multipleSelect = parmsArray[2].multipleSelect;
				}
			}
			
			var $dialog = $("<div>",{id:this.id+"_dialog"});
			$dialog.appendTo("body");
			$dialog.dialog({
				cls: "treeSelectDialog",
				autoOpen: true,autoDestroy: true,reLoadOnOpen: true,width:400,height:400,postData: {id: this.id},
				buttons: {
					"关闭": function(){$(this).dialog("destroy");$(this).remove();},
				},
				modal: true,
				url: $.coral.contextPath+"/common/groupkeyshow/groupkeyshow!index?groupkey="+groupkey+"&allowCheckParent="+allowCheckParent+"&multipleSelect="+multipleSelect  //发请求跳转到树页面
			});
		}
	}];



	//增加 “行政区划” 自动完成 的展示  样式
	common.dealIsVaild = function (item){
    	if(item.isValid=="0"){
		return {"class":"xzqh-backcolor"};
		}
    }


	//-----------刑期编辑相关js  begin
	//formatter方法
	common.setInput1=function (data){
		var sz=data.value;
		return common.setXqWbDt(sz);
	}
	//unformatter方法
	common.setInput2=function (data){
		var cc = data.value;
		return cc;
	}
	//聚焦时显示原输入值
	common.setInput3=function(e,data){
		var value = common.setInput2(data);
		$("#"+this.id).textbox('setText',value);
	}
	//-----------刑期编辑相关js  end
	
	
	
	/**
	 * 文件上传成功后处理事件
	 */
	common.onUploadSuccessPath = function (e, data){
		var uploadId = $(e.target).attr("id");
		model = $.parseJSON(data.data);
		/* var affixId = $("#affixIds").val(); */
		
	/* 	if(affixId){
			affixId += ","+model.id;
			$("#affixIds").val(affixId); 
		}else{
			var affixInput = "<input type=\"hidden\" name=\"affixIds\" id=\"affixIds\"/>";
			$(e.target).after(affixInput);
			$("#affixIds").val(model.id);
		}	 */
			href = './download.jsp?fileName='+data.file.name+"&filePath="+model.filePath;
			model.filePath = model.filePath.replace(/\\/g,"/");
			var affixElement = "<div id=\""+model.id+"\" class=\"uploadify-queue\">";
			affixElement += "<div class=\"uploadify-queue-item\">";
			affixElement += "<div title=\"点击删除文件\" class=\"cancel\"><a onClick=\"common.deleteAffixByPath('"+model.filePath+"','"+model.id+"','"+uploadId+"')\" style=\"cursor: pointer;\">X</a></div>";
			affixElement += "<span class=\"fileName\"><a  href='"+href+"' style=\"cursor: pointer;\">"+common.abbreviate(data.file.name,30)+"("+common.showFileSize(model.fileSize)+")</a></span>";
			affixElement += "</div></div>";
			$(e.target).prevAll(".uploadify-queue").last().after(affixElement);
			//$("#"+uploadId).uploader("disable",true);
			var fun = $(e.target).attr("id")+"UploadSuccess";
			if ($.isFunction(window[fun])) {
				window[fun](model);
			}
	};

	common.deleteAffixByPath = function (filepath,axxid,uploadId){
		
		$.confirm("确认彻底删除此附件？", function(r) {
			if (r) {       	
				$.ajax({
					type: "POST",
					url: $.coral.contextPath+"/common/affix!deleteFile.json",
					data: {"filePath":filepath,"id":axxid},
					cache:false,
					success: function(data){
						$("#"+axxid).remove();
						//$("#"+uploadId).uploader("disable",false);
					 }
			   });
			}
		});
	}
	common.loadAffixPath = function (uploadId,ywId,fjfl,isView,isEditForm){

		$.ajax({
			type: "POST",
			url: $.coral.contextPath+"/common/affix!listAffix.json?fjfl="+fjfl,
			data: {ywId:ywId},
			dataType: "json",
			cache:false,
			success: function(data){
				common.drawAffixPath(data,uploadId,isView,isEditForm);
			}
	   });
	};


	/**
	 * 根据附件数据和参数构造附件
	 */
	common.drawAffixPath = function (data,uploadId,isView,isEditForm){
		if(data.length>0){
			
			//$("#"+uploadId).uploader("disable",true);
			for(var i=0;i<data.length;i++){		
				if(data[i].filePath!=null){
					data[i].filePath = data[i].filePath.replace(/\\/g,"/");
				}
				
				href = './download.jsp?fileName='+data[i].name+"&filePath="+data[i].filePath; 
				var affixElement = "<div id=\""+data[i].id+"\" class=\"uploadify-queue\">";
				affixElement += "<div class=\"uploadify-queue-item\">";
				
				if(!isView){
					affixElement += "<div class=\"cancel\" title=\"点击删除文件\"><a onClick=\"common.deleteAffixByPath('"+data[i].filePath+"','"+data[i].id+"','"+uploadId+"')\" style=\"cursor: pointer;\">X</a></div>";
				}
				affixElement += "<span class=\"fileName\"><a title='"+data[i].fileName+"' href='"+href+"'>"+common.abbreviate(data[i].fileName,30)+"("+common.showFileSize(data[i].fileSize)+")</a></span>";
				affixElement += "</div></div>";
				if(!isView){
					$("#"+uploadId).prevAll(".uploadify-queue").last().after(affixElement);
				}else{
					if(isEditForm&&isEditForm!=undefined){
						$("#"+uploadId).prevAll(".uploadify-queue").last().after(affixElement);
						$("#"+uploadId).remove();
					}else{
						$("#"+uploadId).append(affixElement);
					}
				}
			}
		}
	};
	
	/**
	  * @obj cll对象
	  *  startrowindex 起始行号  endrowindex结束行号   startcellindex 起始列号  endcellindex 结束列号  sheet  list cll中存在列表行数
	  */
 	 common.getCellData = function (obj,startrowindex,endrowindex,startcellindex,endcellindex,sheet,listnum){
		 var sValue="";
		 var xyindex = "";
		 var m_sendTxt ="[";
		 for(var row=startrowindex-1;row<endrowindex;row++)
		  {
		   for(var col=startcellindex-1;col<endcellindex;col++)
			{
			   sValue=obj.getcellstring(col,row,sheet);
			   xyindex = row+","+col;
			   if(listnum!=""&&listnum!=null){
				   xyindex+=","+listnum;
			   }
			   if(sValue==""){
			      sValue=" ";
			   }
			    m_sendTxt+="{\""+xyindex+"\":\""+sValue+"\"},"; 
			  }
		  }  
		 m_sendTxt=m_sendTxt.substring(0, m_sendTxt.length-1);
		 m_sendTxt+="]";
		 return m_sendTxt;
 	 };
	 

	//验证输入刑期是否符合要求
	common.validXqWb =	function (ui){
			var reg1=new RegExp("^[0-9]*[1-9][0-9]*$");//先判断数值是否>=0
			var errorMessage = "";
			var isValid =true;
			var yearindex;
			var monthindex;
			var dayindex;
			var yearint = "";
			var monthint = "";
			var dayint = "";
			var xq = ui.value;
			if(xq!=""){
				if(xq.length>10){
					isValid =false;
					errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
				}else{
					yearindex = xq.indexOf("年");
					monthindex = xq.indexOf("个月");
					dayindex = xq.indexOf("日");
					if(yearindex>0&&monthindex>0&&dayindex>0){
						yearint = xq.substring(0,yearindex);								
						monthint = xq.substring(yearindex+1,monthindex);								
						dayint = xq.substring(monthindex+2,dayindex);													
					
						if(xq.substring(dayindex+1)==""){
							if(reg1.test(yearint)&&reg1.test(monthint)&&reg1.test(dayint)){
								if(Number(yearint)>30){										
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
								if(Number(monthint)<=0||Number(monthint)>11){											
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
								if(Number(dayint)>31){											
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
								
							}else{
								
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}
						
					}else if(yearindex>0&&monthindex>0&&dayindex<=0){
						yearint = xq.substring(0,yearindex);								
						monthint = xq.substring(yearindex+1,monthindex);									
						if(dayindex!=0){
							if(xq.substring(monthindex+2)==""){
								yearint = xq.substring(0,yearindex);
								monthint = xq.substring(yearindex+1,monthindex);
								if(reg1.test(yearint)&&reg1.test(monthint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
									if(Number(dayint)>31){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}										
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}								
					}else if(yearindex>0&&monthindex<=0&&dayindex>0){
						yearint = xq.substring(0,yearindex);																					
						dayint = xq.substring(yearindex+1,dayindex);		
						if(monthindex!=0){
							if(xq.substring(dayindex+1)==""){
								yearint = xq.substring(0,yearindex);
								dayindex = xq.substring(yearindex+1,dayindex);
								if(reg1.test(yearint)&&reg1.test(monthint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
									if(Number(monthint)<=0||Number(monthint)>11){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}						
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}
								
					}else if(yearindex>0&&monthindex<=0&&dayindex<=0){
						yearint = xq.substring(0,yearindex);									
						if(monthindex!=0||dayindex!=0){
							if(xq.substring(yearindex+1)==""){
								if(reg1.test(yearint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
									}else{
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}
					}else if(yearindex<=0&&monthindex<=0&&dayindex<=0){
						isValid =false;
						errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";								
					}else if(yearindex<=0&&monthindex>0&&dayindex<=0){														
						monthint = xq.substring(0,monthindex);								
						if(yearindex!=0||dayindex!=0){
							if(xq.substring(monthindex+2)==""){
								if(reg1.test(monthint)){
									if(Number(monthint)<=0||Number(monthint)>11){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓或无期徒刑";
						}
					}else if(yearindex<=0&&monthindex>0&&dayindex>0){												
						monthint = xq.substring(0,monthindex);								
						dayint = xq.substring(monthindex+2,dayindex);		
						if(yearindex!=0){
							monthint = xq.substring(0,monthindex);
							dayint = xq.substring(monthindex+2,dayindex);
							if(xq.substring(dayindex+1)==""){
								if(reg1.test(monthint)&&reg1.test(dayint)){
								if(Number(monthint)<=0||Number(monthint)>11){
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
								if(Number(dayint)>31){
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}	
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}
					}else if(yearindex<=0&&monthindex<=0&&dayindex>0){						
						dayint = xq.substring(0,dayindex);		
						if(yearindex!=0&&monthindex!=0){
							if(xq.substring(dayindex+1)==""){
								if(reg1.test(dayint)){
									if(Number(dayint)>31){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
									}	
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或死缓";
						}
					}
				}
			}
			if(xq!=""&&xq=="死缓"||xq!=""&&xq=="无期徒刑"||xq!=""&&xq=="无期"||xq!=""&&xq=="死刑缓期二年执行"){
				isValid =true;
			}
			

			 return { isValid: isValid, errMsg: errorMessage };
		}
		
		
		
	//验证输入剥夺政治权利是否符合要求
	common.validbdzzqlWb =function (ui){
			var reg1=new RegExp("^[0-9]*[1-9][0-9]*$");//先判断数值是否>=0
			var errorMessage = "";
			var isValid =true;
			var yearindex;
			var monthindex;
			var dayindex;
			var yearint = "";
			var monthint = "";
			var dayint = "";
			var xq = ui.value;
			if(xq!=""){
				if(xq.length>10){
					isValid =false;
					errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
				}else{
					yearindex = xq.indexOf("年");
					monthindex = xq.indexOf("个月");
					dayindex = xq.indexOf("日");
					if(yearindex>0&&monthindex>0&&dayindex>0){
						yearint = xq.substring(0,yearindex);								
						monthint = xq.substring(yearindex+1,monthindex);								
						dayint = xq.substring(monthindex+2,dayindex);													
					
						if(xq.substring(dayindex+1)==""){
							if(reg1.test(yearint)&&reg1.test(monthint)&&reg1.test(dayint)){
								if(Number(yearint)>30){										
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
								if(Number(monthint)<=0||Number(monthint)>11){											
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
								if(Number(dayint)>31){											
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
								
							}else{
								
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
						
					}else if(yearindex>0&&monthindex>0&&dayindex<=0){
						yearint = xq.substring(0,yearindex);								
						monthint = xq.substring(yearindex+1,monthindex);									
						if(dayindex!=0){
							if(xq.substring(monthindex+2)==""){
								yearint = xq.substring(0,yearindex);
								monthint = xq.substring(yearindex+1,monthindex);
								if(reg1.test(yearint)&&reg1.test(monthint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
									if(Number(dayint)>31){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}										
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}								
					}else if(yearindex>0&&monthindex<=0&&dayindex>0){
						yearint = xq.substring(0,yearindex);																					
						dayint = xq.substring(yearindex+1,dayindex);		
						if(monthindex!=0){
							if(xq.substring(dayindex+1)==""){
								yearint = xq.substring(0,yearindex);
								dayindex = xq.substring(yearindex+1,dayindex);
								if(reg1.test(yearint)&&reg1.test(monthint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
									if(Number(monthint)<=0||Number(monthint)>11){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}						
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
								
					}else if(yearindex>0&&monthindex<=0&&dayindex<=0){
						yearint = xq.substring(0,yearindex);									
						if(monthindex!=0||dayindex!=0){
							if(xq.substring(yearindex+1)==""){
								if(reg1.test(yearint)){
									if(Number(yearint)>30){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
									}else{
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
					}else if(yearindex<=0&&monthindex<=0&&dayindex<=0){
						isValid =false;
						errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";								
					}else if(yearindex<=0&&monthindex>0&&dayindex<=0){														
						monthint = xq.substring(0,monthindex);								
						if(yearindex!=0||dayindex!=0){
							if(xq.substring(monthindex+2)==""){
								if(reg1.test(monthint)){
									if(Number(monthint)<=0||Number(monthint)>11){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
					}else if(yearindex<=0&&monthindex>0&&dayindex>0){												
						monthint = xq.substring(0,monthindex);								
						dayint = xq.substring(monthindex+2,dayindex);		
						if(yearindex!=0){
							monthint = xq.substring(0,monthindex);
							dayint = xq.substring(monthindex+2,dayindex);
							if(xq.substring(dayindex+1)==""){
								if(reg1.test(monthint)&&reg1.test(dayint)){
								if(Number(monthint)<=0||Number(monthint)>11){
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
								if(Number(dayint)>31){
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}	
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
					}else if(yearindex<=0&&monthindex<=0&&dayindex>0){						
						dayint = xq.substring(0,dayindex);		
						if(yearindex!=0&&monthindex!=0){
							if(xq.substring(dayindex+1)==""){
								if(reg1.test(dayint)){
									if(Number(dayint)>31){
										isValid =false;
										errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
									}	
								}else{
									isValid =false;
									errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
								}
							}else{
								isValid =false;
								errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
							}
						}else{
							isValid =false;
							errorMessage ="输入文字格式不正确，如：1年2个月2日或终身";
						}
					}
				}
			}
			if(xq!=""&&xq=="终身"){
				isValid =true;
			}
			 return { isValid: isValid, errMsg: errorMessage };
		}



	//数字类型验证	
	common.onlyNum = function (value){
	var errorMessage = "请输入正整数！";
		if (/^[0-9]*[0-9][0-9]*$/.test(value)) {
			return value;
		} else {
			$.alert(errorMessage);
			return '0';
		}
}
	

	//静态树自动完成	
	common.staticInitAutocompletetreeText =  function (chmjId,showOrg){
		$ref = $('#'+chmjId);
		$reftext = $('#'+chmjId+'text');
	     	$.ajax({
	        type: "post",
	        async:false,
	        url: $.coral.contextPath+"/common/auth/static-org-user!unitAutocompletetree.json?isInit=true&showOrg="+showOrg,
	        dataType: "json",
	        success: function(data){
	        	console.log(data);
	        	
	        	var userId = "";
	        	var userName = "";
		        if(data){
		        	
		        	    var parmsArray = data;
			        	
		        	    for (i = 0; i < parmsArray.length; i++) {
		        	    	if(parmsArray[i].isParent==false){
				        		var tid = parmsArray[i].id;
				        		var uId = tid.substr(tid.indexOf("user_")+5);
				        		userId+=uId+",";	
				        		userName+=parmsArray[i].name+",";	
		        	    	}
			    		}
		        	   userId=userId.substring(0, userId.length-1);
		        	   userName=userName.substring(0, userName.length-1);
		        	
		        
		        	$ref.autocompletetree("setValue", userId,true);//给autocompletetree组件赋予数值
		        	$ref.autocompletetree("setText", userName);//给autocompletetree组件赋予显示值
		        	$reftext.textbox("setValue",userId);//给autocompletetree组件赋予显示值	
	        }
	        }
  			 });
	};



	//静态树展开
	var staticCompletetreeButtons = [{
	
	label: "点击选择",icons: "icon-checkmark-circle",text: false,
	click: function() {
	
	    var flag1 = $('#'+this.id).autocompletetree('option','readonly');
		var flag2= $('#'+this.id).autocompletetree('option','isLabel');
		var flag3 =$('#'+this.id).autocompletetree('option','disabled');

		if(flag1||flag2||flag3){
			return;
		}
		
		if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") == this.id+"_dialog" && !$(".treeSelectDialog").is(":hidden")  ) {
			$("#"+this.id+"_dialog").dialog({modal: true});$("#"+this.id+"_dialog").dialog("open");return;
		} else if ( $(".treeSelectDialog").length && $(".treeSelectDialog").attr("id") != this.id ){
			$(".treeSelectDialog").dialog("destroy");$(".treeSelectDialog").remove();
		}
		
		var parms = $('#'+this.id).autocompletetree('option','dataCustom');
		var showOrg='';
		var multipleSelect='true';
		if(parms){
			var parmsArray = jQuery.parseJSON(parms);
			showOrg = parmsArray[0].showOrg;
			if(parmsArray.length>1){
				multipleSelect = parmsArray[1].multipleSelect;
			}
		}
		var $dialog = $("<div>",{id:this.id+"_dialog"});
		$dialog.appendTo("body");
		$dialog.dialog({
			cls: "treeSelectDialog",
			autoOpen: true,autoDestroy: true,reLoadOnOpen: true,width:400,height:400,postData: {id: this.id},
			buttons: {"关闭": function(){$(this).dialog("destroy");$(this).remove();}},
			modal: true,
			url: $.coral.contextPath+"/common/auth/static-org-user!index?showOrg="+showOrg+"&multipleSelect="+multipleSelect 
		});
	}
}];


/*jquery 获取dataForm json*/
common.getFormData = function (fid){
		var	obj = {},
		arr = $( "#"+fid ).serializeArray();
	
		$( arr ).each( function(index, item) {
		if ( obj[item.name] ) {
			obj[item.name] = obj[item.name] + "," + item.value;
		} else {
			obj[item.name] = item.value;
		}
	});
	return obj;
}


