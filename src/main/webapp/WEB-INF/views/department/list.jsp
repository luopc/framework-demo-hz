<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script type="text/javascript">
var combobox_leaf = [ {
	"value" : 0,
	"text" : "否"
}, {
	"value" : 1,
	"text" : "是"
} ];
$.parseDone(function(){
	if("${isParent }"=="false"){
		$("#addBtn").hide();
		$("#updateBtn").hide();
		$("#deleteBtn").hide();
	}
});
</script>


<div class="PanelCon">
	<div class="PanelList">
	<cui:form id="queryForm">
		<div class="clearfix panelTop" id="userToolBarArea">
			<div class="globalLoginLayout">
			
				<div>
					<label>部门名称:</label>
					</td>
					<td><cui:input id="departmentName" type="text"
							placeholder="查询部门名称" onEnter="search"></cui:input>
				</div>
				<div>
					<label>部门领导:</label>
					</td>
					<td><cui:input id="departmentLeader" type="text"
							onEnter="search" placeholder="查询部门领导"></cui:input>
				</div>

				<div class="last">
					<cui:button cls="cyanbtn" id="s_userSearchButton" label="查询"
						 name="se" onClick="search" />
					<cui:button id="resetBtn" label="重置" onClick="resetHandler"></cui:button>
				</div>
			</div>
			
		</div>
		</cui:form>
		<div>
		
			<cui:button id="addBtn" label="新增" onClick="f_add" icons="add"></cui:button>
			<cui:button id="updateBtn" label="修改" onClick="f_modify"></cui:button>
			<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
		</div>
		<div >
			<cui:grid id="gridDepartment" rownumbers="false" singleselect="true"
				sortname="id" sortorder="asc"
				url="${ctx}/department/searchdata?parentId=${parentId }" fitStyle="fill"
				onDblClickRow="onDblClickRow" width="auto" height="550" rowNum="10">
				<cui:gridCols>
					<cui:gridCol name="id" hidden="true">id</cui:gridCol>
					<cui:gridCol name="departmentName" width="40">部门名称</cui:gridCol>
					<cui:gridCol name="departmentLeader" width="40">部门领导</cui:gridCol>
					<cui:gridCol name="departmentDescription" width="40">部门描述</cui:gridCol>
					<cui:gridCol name="parentId" hidden="true">父部门id</cui:gridCol>

				</cui:gridCols>
				<cui:gridPager gridId="gridDepartment" />
			</cui:grid>
		</div>
	</div>
</div>

<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
	autoOpen="false" width="60%" height="50%" maximizable="false">
</cui:dialog>
<script>
	function f_add() {
		$("#adddialog").dialog("option", {
			title : "新增",
			subTitle : "部门信息",
			asyncType : "get",
			url : "${ctx}/department/${parentId}/new"
		});
		$("#adddialog").dialog("open");
	}
	function f_modify() {
		var selrow = $("#gridDepartment").grid("option", "selrow");
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "修改",
				subTitle : "部门信息",
				url : "${ctx}/department/edit?id=" + selrow.toString(),
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
		var selrow = $("#gridDepartment").grid("option", "selrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : "${ctx}/department/destory?id=" + selrow.toString(),
						success : function(data) {
							$.message({
								message : "操作成功！",
								cls : "success"
							});
							var nodes = $('#departmentTree').tree("getNodeByParam","id",selrow);
						 	if (nodes) {
						 		  $('#departmentTree').tree("removeNode", nodes);
						    }else{
						        $.alert('请先选择一个节点');
						    }
							
							/*  var nodes = $('#departmentTree').tree("getSelectedNodes");
							 if (nodes.length>0) {
							        $('#departmentTree').tree("removeNode", nodes[0]);
							    }else{
							        $.alert('请先选择一个节点');
							    } */
							$("#gridDepartment").grid("reload");
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
		var departmentName = $('#departmentName').val();
		var departmentLeader = $('#departmentLeader').val();

		if (departmentName != "") {
			postData['Q_LIKE_departmentName'] = departmentName;
		}
		if (departmentLeader != "") {
			postData['Q_LIKE_departmentLeader'] = departmentLeader;
		}

		$('#gridDepartment').grid('option', 'postData', postData);
		$('#gridDepartment').grid('reload');
	}
	function f_show(id) {
		$("#adddialog").dialog("option", {
			title : "查看",
			subTitle : "部门信息",
			asyncType : "get",
			url : "${ctx}/department/" + id.toString() + "/show"
		});
		$("#adddialog").dialog("open");
	}
	function onDblClickRow(e, ui) {
		var selrow = ui.rowId;
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "查看",
				subTitle : "部门信息",
				asyncType : "get",
				url : "${ctx}/department/" + selrow.toString() + "/show"
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
		return result = "<a  href='#' onclick ='f_show("
				+ rawObject.id
				+ ")'title='查看' class='print'><div class='img'></div><span>查看</span></a>";
	}
</script>
