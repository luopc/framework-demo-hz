<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>档案列表</title>

<script>
	var tmId = "${tmId}";
	function f_upload() {
		var selrow = tmId;
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "上传",
				subTitle : "档案管理",
				url : "${ctx}/atth/openUpload?id=" + selrow.toString()
			});
			$("#adddialog").dialog("open");
		} else {
			$.message({
				message : "请先勾选条目记录！",
				cls : "warning"
			});
		}

	}
	function f_showPhoto(tmId) {

		if (tmId != null) {
			var rowDate = $("#gridAtth").grid("getRowData", selrow);
			var filename = rowDate.fileName.toString();
			if ("" == filename) {
				$.message({
					message : "请上传图片！",
					cls : "warning"
				});
				return;
			}
			var suffx = filename.substring(filename.lastIndexOf(".") + 1);
			if (suffx != "jpg" && suffx != "png" && suffx != "tif") {
				$.message({
					message : "只能查看图片！",
					cls : "warning"
				});
				return;
			}

			$("#adddialog").dialog("option", {
				title : "查看图片",
				subTitle : "档案管理",
				url : "${ctx}/atth/showPhoto?filename=" + filename.toString()
			});
			$("#adddialog").dialog("open");
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}
	function f_showPhotos() {
		$("#adddialog").dialog("option", {
			title : "查看图片",
			subTitle : "档案管理",
			url : "${ctx}/atth/showPhotos/${tmId}"
		});
		$("#adddialog").dialog("open");

	}

	function f_download() {
		var selrow = $("#gridAtth").grid("option", "selarrrow");

		if (selrow != null) {
			var rowDate = $("#gridAtth").grid("getRowData", selrow);
			var filename = rowDate.fileName.toString();
			var ul = "${ctx}/atth/download?fileName=" + filename;
			window.location.href = encodeURI(encodeURI(ul));

		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}

	function f_delete() {
		var selrow = $("#gridAtth").grid("option", "selarrrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : "${ctx}/atth/destroy",
						data : {
							ids : selrow.toString()
						},
						success : function(data) {
							console.log(data);
							$.message({
								message : "操作成功！",
								cls : "success"
							});
							$("#gridAtth").grid("reload");
						}
					});
				}
			});
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}
	}

	function formatOperation(cellvalue, options, rawObject) {
		return result = "<a  href='javascript:f_showPhoto(\""
				+ rawObject.id
				+ "\");' title='查看图片' class='print'><div class='img'></div><span>查看图片</span></a>"

	}
</script>
</head>
<body>
	<input type="hidden" name="ownerId" value="${tmId}" />
	<div class="content">
		<div class="right-content">
			<div class="info">

				<div>
					<cui:button id="uploadBtn" label="上传" onClick="f_upload"></cui:button>
					<cui:button id="downloadBtn" label="下载" onClick="f_download"></cui:button>
					<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
					<cui:button id="showPhotoBtn" label="查看图片" onClick="f_showPhotos"></cui:button>
				</div>
				<cui:grid id="gridAtth" rownumbers="false" multiselect="true"
					sortname="dh" sortorder="asc" url="${ctx}/atth/search/${tmId}"
					fitStyle="fill" onDblClickRow="onDblClickRow" width="auto">
					<cui:gridCols>
						<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
						<cui:gridCol align="center" width="50" name="ownerId"
							sortable="true" formatter="convertCode" revertCode="true"
							hidden="true">条目Id</cui:gridCol>
						<cui:gridCol align="center" width="20" name="fileName"
							sortable="true" formatter="convertCode" revertCode="true">文件名称</cui:gridCol>
						<cui:gridCol align="center" width="20" name="fileType"
							sortable="true" revertCode="true">文件类型</cui:gridCol>
						<cui:gridCol align="center" width="20" name="createUser"
							sortable="true" revertCode="true">创建人</cui:gridCol>
						<cui:gridCol align="center" width="20" name="createDate"
							sortable="true">创建时间</cui:gridCol>
						<%-- <cui:gridCol align="center" width="20" name="cz" sortable="true"
							revertCode="true" formatter="formatOperation">操作</cui:gridCol> --%>
					</cui:gridCols>
					<cui:gridPager gridId="gridAtth"></cui:gridPager>
				</cui:grid>




				<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
					autoOpen="false" width="80%" height="50%" maximizable="false">
				</cui:dialog>


			</div>
		</div>
	</div>
</body>
</html>

