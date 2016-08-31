<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script>
	function f_add() {
		$("#adddialog").dialog("option", {
			title : "新增",
			subTitle : "编码管理",
			asyncType : "get",
			url : "${ctx}/codebase/new"
		});
		$("#adddialog").dialog("open");
	}
	function f_modify() {
		var selrow = $("#gridCodeBase").grid("option", "selrow");
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "修改",
				subTitle : "编码管理",
				url : "${ctx}/codebase/" + selrow.toString() + "/edit",
				asyncType : "get"

			});
			$("#adddialog").dialog("open");
		} else {
			$.message({
				message : "请先勾选需要处理记录！",
				cls : "warning"
			});
		}

	}

	function f_delete() {
		var selrow = $("#gridCodeBase").grid("option", "selrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : "${ctx}/codebase/" + selrow.toString(),
						data : {
							_method : 'DELETE'
						},
						success : function(data) {
							$.message({
								message : "操作成功！",
								cls : "success"
							});
							$("#gridCodeBase").grid("reload");
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
		var baseName = $('#baseName').val();
		var baseKey = $('#baseKey').val();

		if (baseName != "") {
			postData['baseName'] = baseName;
		}
		if (baseKey != "") {
			postData['baseKey'] = baseKey;
		}

		$('#gridCodeBase').grid('option', 'postData', postData);
		$('#gridCodeBase').grid('reload');
	}
	function onDblClickRow(e, ui) {
		var selrow = ui.rowId;
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "查看",
				subTitle : "编码管理",
				asyncType : "get",
				url : "${ctx}/codebase/" + selrow.toString() + "/show"
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
		return result = "<a  href='${ctx}/codebase/"+rawObject.id+" title='查看' class='print'><div class='img'></div><span>查看</span></a>";
	}
</script>


<div align="center">
	<cui:form id="queryForm">
		<table class="table table-condensed table table-fixed">
			<tr>
				<td><label>分类名称</label></td>
				<td><cui:input name="baseName" id="baseName" /></td>
				<td><label>分类值 </label></td>
				<td><cui:input name="baseKey" id="baseKey" /></td>
				<td><cui:button id="searchBtn" label="查询" onClick="search"></cui:button>
					<cui:button id="resetBtn" label="重置" onClick="resetHandler"></cui:button></td>
			</tr>
		</table>
	</cui:form>
</div>

<!-- <div>
						<cui:button id="addBtn" label="新增" onClick="f_add"></cui:button>
						<cui:button id="updateBtn" label="修改" onClick="f_modify"></cui:button>
						<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
					</div> -->
<cui:grid id="gridCodeBase" rownumbers="false" singleselect="true"
	sortname="id" sortorder="asc" url="${ctx}/codebase/search1"
	fitStyle="fill" onDblClickRow="onDblClickRow" width="auto" rowNum="10" height="800">
	<cui:gridCols>
		<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
		<cui:gridCol align="center" width="20" name="base_name"
			sortable="true" formatter="convertCode" revertCode="true">分类名称</cui:gridCol>
		<cui:gridCol align="center" width="20" name="base_key" sortable="true"
			revertCode="true">分类值</cui:gridCol>
		<cui:gridCol align="center" width="40" name="cz" sortable="true"
			revertCode="true" formatter="formatOperation">操作</cui:gridCol>
	</cui:gridCols>
	<cui:gridPager gridId="gridCodeBase"></cui:gridPager>
</cui:grid>

<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
	autoOpen="false" width="80%" height="50%" maximizable="false">
</cui:dialog>





