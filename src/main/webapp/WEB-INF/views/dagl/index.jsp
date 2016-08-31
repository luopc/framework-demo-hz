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
	var combobox_bgqx = [ {
		"value" : 0,
		"text" : "永久"
	}, {
		"value" : 1,
		"text" : "长期"
	}, {
		"value" : 2,
		"text" : "30年"
	}, {
		"value" : 3,
		"text" : "10年"
	} ];
	var combobox_mj = [ {
		"value" : 1,
		"text" : "公开"
	}, {
		"value" : 2,
		"text" : "国内"
	}, {
		"value" : 3,
		"text" : "内部"
	}, {
		"value" : 4,
		"text" : "秘密"
	}, {
		"value" : 5,
		"text" : "机密"
	}, {
		"value" : 6,
		"text" : "绝密"
	} ];
	function f_upload() {
		var selrow = $("#gridDagl").grid("option", "selarrrow");
		if (selrow.length > 1) {
			$("#adddialog").dialog("option", {
				title : "上传",
				subTitle : "档案管理",
				url : "${ctx}/atth/openUpload?id=" + selrow.toString()
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
	function f_relevance() {
		document.location.href = "${ctx}/dagl/relevanceIndex";
	}
	function f_showPhoto(selrow) {

		if (selrow != null) {
			var rowDate = $("#gridDagl").grid("getRowData", selrow);

			$("#adddialog").dialog("option", {
				title : "查看图片",
				subTitle : "档案管理",
				url : "${ctx}/atth/showPhotos/" + selrow.toString()
			});
			$("#adddialog").dialog("open");
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}

	function f_download() {
		var selrow = $("#gridDagl").grid("option", "selarrrow");

		if (selrow != null) {
			var rowDate = $("#gridDagl").grid("getRowData", selrow);
			var filename = rowDate.filename.toString();
			var ul = "${ctx}/dagl/download?fileName=" + filename;
			window.location.href = encodeURI(encodeURI(ul));

		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}
	function f_add() {
		$("#adddialog").dialog("option", {
			title : "新增",
			subTitle : "档案管理",
			url : "${ctx}/dagl/openAddPage"
		});
		$("#adddialog").dialog("open");
	}
	function f_modify() {
		var selrow = $("#gridDagl").grid("option", "selarrrow");
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "修改",
				subTitle : "档案管理",
				url : "${ctx}/dagl/openShow/modify/" + selrow.toString()
			});
			$("#adddialog").dialog("open");
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}
	function f_test1() {
		var selrow = $("#gridDagl").grid("option", "selarrrow");
		if (selrow.length > 1) {
			$.message({
				message : "只能选一条记录！",
				cls : "warning"
			});
			return;
		}
		if (selrow != "") {
			document.location.href = "${ctx}/dagl/oneToMany/" + selrow;
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}
	}
	function f_delete() {
		var selrow = $("#gridDagl").grid("option", "selarrrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : "${ctx}/dagl/destroy",
						data : {
							ids : selrow.toString()
						},
						success : function(data) {
							console.log(data);
							$.message({
								message : "操作成功！",
								cls : "success"
							});
							$("#gridDagl").grid("reload");
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

	function resetHandler() {
		$("#queryForm").form("clear", {
			excluded : [ "readonly" ]
		});
	}
	function search() {
		var postData = {};
		var dh = $('#dh1').val();
		var tm = $('#tm1').val();
		var nd = $('#nd1').val();
		var zrz = $('#zrz1').val();
		var bgqx = $('#bgqx1').combobox("getValue");
		if (dh != "") {
			postData['Q_LIKE_dh'] = dh;
		}
		if (tm != "") {
			postData['Q_LIKE_tm'] = tm;
		}
		if (bgqx != "") {
			postData['Q_LIKE_bgqx'] = bgqx;
		}
		if (nd != "") {
			postData['Q_LIKE_nd'] = nd;
		}
		if (zrz != "") {
			postData['Q_LIKE_zrz'] = zrz;
		}
		$('#gridDagl').grid('option', 'postData', postData);
		$('#gridDagl').grid('reload');
	}
	function onDblClickRow(e, ui) {
		var selrow = ui.rowId;
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "查看",
				subTitle : "档案管理",
				url : "${ctx}/dagl/openShow/view/" + selrow.toString()
			});
			$("#adddialog").dialog("open");
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
				+ "<a  href='${ctx}/atth/index/"+rawObject.id+"' title='查看全文' class='print'><div class='img'></div><span>查看全文</span></a>"

	}
</script>
</head>
<body>

	<div class="content">
		<div class="right-content">
			<div class="info">
				<div class="function clearfix">
					<div class="clearfix">
						<div align="center">
							<cui:form id="queryForm">
								<table class="table table-condensed table table-fixed">
									<tr>
										<td><label>档号</label></td>
										<td><cui:input name="dh" id="dh1" /></td>
										<td><label>题名 </label></td>
										<td><cui:input name="tm" id="tm1" /></td>
										<td><label>保管期限 </label></td>
										<td><cui:combobox id="bgqx1" name="bgqx"
												data="combobox_bgqx" /></td>
									</tr>
									<tr>
										<td><label>年度</label></td>
										<td><cui:datepicker id="nd1" name="nd" dateFormat="yyyy"
												showOn="button" onKeyDown="enterGo" /></td>
										<td><label>责任者 </label></td>
										<td><cui:input name="zrz" id="zrz1" /></td>
										<td style="padding-left: 13%" colspan="2"><cui:button
												id="searchBtn" label="查询" onClick="search"></cui:button> <cui:button
												id="resetBtn" label="重置" onClick="resetHandler"></cui:button>
										</td>
									</tr>

								</table>
							</cui:form>
						</div>
					</div>

				</div>
				<div>
					<cui:button id="addBtn" label="新增" onClick="f_add"></cui:button>
					<cui:button id="updateBtn" label="修改" onClick="f_modify"></cui:button>
					<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
					<cui:button id="uploadBtn" label="上传" onClick="f_upload"></cui:button>
					<cui:button id="testBtn" label="测试一对多" onClick="f_test1"></cui:button>
					<cui:button id="relevanceBtn" label="关联查询" onClick="f_relevance"></cui:button>
					<%-- <cui:button id="downloadBtn" label="下载" onClick="f_download"></cui:button> --%>
				</div>
				<cui:grid id="gridDagl" rownumbers="false" multiselect="true"
					sortname="dh" sortorder="asc" url="${ctx}/dagl/search"
					fitStyle="fill" onDblClickRow="onDblClickRow" width="auto" rowNum="10">
					<cui:gridCols>
						<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
						<cui:gridCol align="center" width="50" name="dh" sortable="true"
							formatter="convertCode" revertCode="true">档号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="tm" sortable="true"
							formatter="convertCode" revertCode="true">题名</cui:gridCol>
						<cui:gridCol align="center" width="20" name="qzh" sortable="true"
							revertCode="true">全宗号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="mlh" sortable="true"
							revertCode="true">目录号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="nd" sortable="true">年度</cui:gridCol>
						<cui:gridCol align="center" width="20" name="bgqx" sortable="true"
							formatter="convertCode" revertCode="true"
							formatoptions="{
								'data':combobox_bgqx
								}">保管期限</cui:gridCol>
						<cui:gridCol align="center" width="20" name="mj" sortable="true"
							formatter="convertCode" revertCode="true"
							formatoptions="{
								'data':combobox_mj
								}">密级</cui:gridCol>
						<cui:gridCol align="center" width="20" name="wh" sortable="true"
							revertCode="true">文号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="jh" sortable="true"
							revertCode="true">件号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="zrz" sortable="true"
							revertCode="true">责任者</cui:gridCol>
						<cui:gridCol align="center" width="20" name="wjqssj"
							sortable="true" revertCode="true">文件起始时间</cui:gridCol>
						<cui:gridCol align="center" width="20" name="wjzzsj"
							sortable="true" revertCode="true">文件终止时间</cui:gridCol>
						<cui:gridCol align="center" width="20" name="filename"
							sortable="true" revertCode="true" hidden="true">文件名称</cui:gridCol>
						<cui:gridCol align="center" width="40" name="cz" sortable="true"
							revertCode="true" formatter="formatOperation">操作</cui:gridCol>
					</cui:gridCols>
					<cui:gridPager gridId="gridDagl"></cui:gridPager>
				</cui:grid>




				<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
					autoOpen="false" width="80%" height="50%" maximizable="false">
				</cui:dialog>


			</div>
		</div>
	</div>
</body>
</html>

