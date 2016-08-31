<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script type="text/javascript">
var combobox_sex = [ {
	"value" : 0,
	"text" : "男"
}, {
	"value" : 1,
	"text" : "女"
} ];
var data = [ {
	name : "部门信息",
	id : "0",
	ename : "bo",
	isParent : true,
	open : true
} ];
$.parseDone(function(){
	if("${isParent }"=="true"){
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
						<label>用户名:</label>
						</td>
						<td><cui:input id="userName" type="text" placeholder="查询用户名"
								onEnter="search"></cui:input>
					</div>
					<div>
						<label>手机号码:</label>
						</td>
						<td><cui:input id="phone" type="text" onEnter="search"
								placeholder="查询手机号码"></cui:input>
					</div>
					<div>
						<label>性别:</label>
						</td>
						<td><cui:combobox id="sex" name="sex" data="combobox_sex"
								placeholder="查询性别" />
					</div>
					<div>
						<label>年龄:</label>
						</td>
						<td><cui:input id="age" type="text" onEnter="search"
								placeholder="查询年龄"></cui:input>
					</div>
					<div>
						<label>所属部门:</label>
						</td>
						<td><cui:combotree id="combotree"  data="data" url="${ctx}/department/getTree" multiple="true" enableFilter="true" showClose="true" ></cui:combotree>
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

			<cui:button id="addBtn" label="新增" onClick="f_add"></cui:button>
			<cui:button id="updateBtn" label="修改" onClick="f_modify"></cui:button>
			<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
		</div>
		<div>
			<cui:grid id="gridUser" rownumbers="false" singleselect="true"
				sortname="id" sortorder="asc"
				url="${ctx}/user/searchdata?departmentId=${departmentId }"
				fitStyle="fill" onDblClickRow="onDblClickRow" width="auto"
				height="550" rowNum="10">
				<cui:gridCols>
					<cui:gridCol name="id" hidden="true">id</cui:gridCol>
					<cui:gridCol name="user_name" width="40">用户名</cui:gridCol>
					<cui:gridCol name="user_pass" width="40">密码</cui:gridCol>
					<cui:gridCol name="sex" width="40" formatter="convertCode" formatoptions="{'data':combobox_sex}">性别</cui:gridCol>
					<cui:gridCol name="age" width="40">年龄</cui:gridCol>
					<cui:gridCol name="phone" width="40">手机号码</cui:gridCol>
					<cui:gridCol name="address" width="40">住址</cui:gridCol>
					<cui:gridCol name="department_name" width="40">所属部门</cui:gridCol>

				</cui:gridCols>
				<cui:gridPager gridId="gridUser" />
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
			url : "${ctx}/user/${departmentId}/new"
		});
		$("#adddialog").dialog("open");
	}
	function f_modify() {
		var selrow = $("#gridUser").grid("option", "selrow");
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "修改",
				subTitle : "部门信息",
				url : "${ctx}/user/edit?id=" + selrow.toString(),
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
		var selrow = $("#gridUser").grid("option", "selrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$
							.ajax({
								type : "post",
								url : "${ctx}/user/destory?id="
										+ selrow.toString(),
								success : function(data) {
									$.message({
										message : "操作成功！",
										cls : "success"
									});
									$("#gridUser").grid("reload");
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
		var userName = $('#userName').val();
		var phone = $('#phone').val();
		var sex = $('#sex').combobox("getValue");
		var age = $('#age').val();
		var departmentName=$("#combotree").combotree("getText");
		

		if (userName != "") {
			postData['userName'] = userName;
		}
		if (phone != "") {
			postData['phone'] = phone;
		}

		if (sex != "") {
			postData['sex'] = sex;
		}

		if (age != "") {
			postData['age'] = age;
		}
		if (departmentName != "") {
			postData['departmentName'] = departmentName;
		}
		$('#gridUser').grid('option', 'postData', postData);
		//$('#gridUser').grid('option','url',"${ctx}/user/searchdata");
		$('#gridUser').grid('reload');
	}
	function f_show(id) {
		$("#adddialog").dialog("option", {
			title : "查看",
			subTitle : "部门信息",
			asyncType : "get",
			url : "${ctx}/user/" + id.toString() + "/show"
		});
		$("#adddialog").dialog("open");
	}
	function onDblClickRow(e, ui) {
		var selrow = ui.rowId;
		//var rowData = $("#gridDemo3").grid("getRowData", selarrrow);
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "查看",
				subTitle : "部门信息",
				asyncType : "get",
				url : "${ctx}/user/" + selrow.toString() + "/show"
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
