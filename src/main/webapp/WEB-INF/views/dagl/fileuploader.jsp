<%@taglib prefix="ces" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@page contentType="text/html;charset=utf-8"%>
<div class="exampleDiv">
<h3>上传组件</h3>
<p>
	1.跨浏览器特性：兼容主流浏览器，接口一致，实现了两套运行时支持，用户无需关心内部用了什么内核，同时Flash部分没有做任何UI相关的工作，
</p>
<p>
	   方便不关心flash的用户扩展和自定义业务需求。
</p>
<p>
	2.强大的校验机制：支持上传大小、上传类型、上传队列数量、必输项与表单的结合。
</p>
<p>
	3.支持异步加载已经上传过的附件列表。
</p>
<!-- begin -->
<div class="bs-example">
<style>
#form1 {
	width:800px;
}
.button1{
	background: #ffff!important;
	width: 150px;
	height: 112px;
	margin-top: 5px;
}
.que{
	height: 200px;
}
</style>
<form id="form1">
	<input type="hidden" name="id" value="${id}" />
	<span id="file" class="fileupload-buttons fileupload-buttonbar"></span>
	<span id="que" class="que"></span>
	<div class="button1" id="fileBtn">
	</div>
	<ces:button label="上传" id="start" onClick="clickStart">Upload</ces:button>
	<ces:button label="清空" id="cancel" onClick="clickCancel">Cancel</ces:button>
	<ces:button label="禁用" id="disable" onClick="clickDisable">disable</ces:button>
	<ces:button label="启用" id="enable" onClick="clickEnable">enable</ces:button>
	<ces:button label="销毁" id="destroy" onClick="clickDestroy">Destroy</ces:button>
	<ces:button label="getValue" id="getValue">getValue</ces:button>
	<ces:button id="valid" label="校验"></ces:button>
	<ces:button id="mode1" label="切换模式列表"></ces:button>
	<ces:button id="mode2" label="切换模式卡片"></ces:button> 
</form>
<script>
$("#form1").form({
	 ajaxSubmit: true
});
$("#valid").click(function(){
	console.log($("#form1").form("valid"));
});
$("#mode1").click(function(){
	$("#file_queueID").addClass("list-files");
	$("#file_queueID").removeClass("card-files");
});
$("#mode2").click(function(){
	$("#file_queueID").addClass("card-files");
	$("#file_queueID").removeClass("list-files");
});

function clickStart(){
	$("#file").fileuploader("upload");
}
function clickCancel(){
	$("#file").fileuploader("remove");
}
function clickDisable(){
	$("#file").fileuploader("disable");
}
function clickEnable(){
	$("#file").fileuploader("enable");
}
function clickDestroy(){
	$("#file").fileuploader("destroy");
}
function clickStop(){
	$("#file").fileuploader("stop");
}
$("#file").fileuploader({
    uploadBtn: "#fileBtn",
    queueID: "que",
    url: '${ctx}/atth/upload.do/${id}',
    //maxFileSize: 511627776,
  //  filesUrl: $.coral.contextPath+'/resources/json/listflie.json',
    acceptFileTypes: '*.gif; *.jpg; *.png; *.zip;*.rar;*.m4v;*.pdf;*.doc;*.docx;',//可以限制文件类型
    required: true,//必输项，可用于校验
    autoUpload:true,//设置自动上传
    queueMode: "card",
    multiple: true,
    filesLimt:6,
    downloadTmp : function(files) {//上传完成后的模板可以自定义
		var error,itemHTML;
    	itemHTML = '<li id="{{fileId}}" class="fileItem"><div class="fileContent">' +
    		'<span class="fileThumb">{{fileType}}</span>' +
			'<div class="progress"><div class="progressbar-value"></div></div>' +
			'<span class="fileName">'+
    		'<span class="remove cui-icon-minus-circle2 fileAction"></span>' + 
    		'</span>' + 
		'</div></li>';
    	return itemHTML;
	},
    /* uploadBtnOptions:{
    	icons: "icon-upload2",
		label: "&nbsp;"
    }, */
    onSelect: function(e,ui){
    	console.log("onSelect1:",ui.file.name);
    },
    onStart: function(e,ui){
		console.log("onStart2:");
	},
	onSend: function(e,ui){
		console.log("onSend3", ui.file.name);
	},
	onProgress: function(e,ui){
		console.log("onProgress4", ui.file.type);
	},
	onSuccess: function(e,ui){
		console.log("onSucess5", ui.file.size);
	},
	onComplete: function(e,ui){
		console.log("onComplete6",ui);
	},
	onFail: function(e,ui){
		console.log("onFail");
	},
	onRemove: function(e,ui){
		console.log("onRemove");
	}
});
$("#getValue").click(function(){
	var value = $("#file").fileuploader("getValue");
	console.log(value)
});

$('#theme-switcher').change(function () {
    var theme = $('#theme');
    theme.prop(
        'href',
        theme.prop('href').replace(
            /[\w\-]+\/jquery-ui.css/,
            $(this).val() + '/jquery-ui.css'
        )
    );
});
</script>

