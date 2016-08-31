<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>编码列表</title>
 <link rel="stylesheet" href="${ctx}/static/css/codebase-index.css">
  <script type="text/javascript">
    var data=[{name:"编码分类",id:"FFFF",ename:"bo",isParent:true}];
    function als(event,id,node){
    	var id = node.id;
    	if(id=="FFFF"){
    		window.location.href="${ctx}/codebase/search";
    	}else{
    		window.location.href="${ctx}/codekey/"+id+"/index";
    	}
    		
    	
    }
</script>
<script>

	function f_add() {
		$("#adddialog").dialog("option", {
			title : "新增",
			subTitle : "编码管理",
			asyncType : "get",
			url : "${ctx}/codekey/${parentId}/new"
		});
		$("#adddialog").dialog("open");
	}
	function f_modify() {
		var selrow = $("#gridCodeKey").grid("option", "selrow");
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "修改",
				subTitle : "编码管理",
				url : "${ctx}/codekey/edit?id=" + selrow.toString(),
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
		var selrow = $("#gridCodeKey").grid("option", "selrow");
		if (selrow != "") {
			$.confirm("确认是否删除？", function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : "${ctx}/codekey/destory?id=" + selrow.toString(),
						success : function(data) {
							$.message({
								message : "操作成功！",
								cls : "success"
							});
							$("#gridCodeKey").grid("reload");
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
		var keyName = $('#keyName').val();
		var keyValue = $('#keyValue').val();

		if (keyName != "") {
			postData['Q_LIKE_keyName'] = keyName;
		}
		if (keyValue != "") {
			postData['Q_LIKE_keyValue'] = keyValue;
		}

		$('#gridCodeKey').grid('option', 'postData', postData);
		$('#gridCodeKey').grid('reload');
	}
	function f_show(id) {
		$("#adddialog").dialog("option", {
			title : "查看",
			subTitle : "编码管理",
			asyncType : "get",
			url : "${ctx}/codekey/" + id.toString()+"/show"
		});
		$("#adddialog").dialog("open");
	}
	function onDblClickRow(e, ui) {
		var selrow = ui.rowId;
		//var rowData = $("#gridDemo3").grid("getRowData", selarrrow);
		if (selrow != null) {
			$("#adddialog").dialog("option", {
				title : "查看",
				subTitle : "编码管理",
				asyncType : "get",
				url : "${ctx}/codekey/" + selrow.toString()+"/show"
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
</head>
<body>

		<div class="content">
			<div class="right-content">
				<div class="info">
					<div class="list_box">
                    	 <div class="list_table">
								<div class="function clearfix">
									<div class="clearfix">
										<div align="center">
										<cui:form id="queryForm">
											<input type="hidden" name="parentId" value="${parentId }">
			
											<table class="table table-condensed table table-fixed">
												<tr>
													<td><label>编码名称</label></td>
													<td><cui:input name="keyName" id="keyName" /></td>
													<td><label>编码值 </label></td>
													<td><cui:input name="keyValue" id="keyValue" /></td>
													<td><cui:button id="searchBtn" label="查询"
															onClick="search"></cui:button> <cui:button id="resetBtn"
															label="重置" onClick="resetHandler"></cui:button></td>
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
								</div>
								<cui:grid id="gridCodeKey" rownumbers="false" singleselect="true"
									sortname="id" sortorder="asc"
									url="${ctx}/codekey/${parentId}/searchdata" fitStyle="fill"
									onDblClickRow="onDblClickRow" width="auto" height="900">
									<cui:gridCols>
										<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
										<cui:gridCol align="center" width="20" name="keyName"
											sortable="true" formatter="convertCode" revertCode="true">编码名称</cui:gridCol>
										<cui:gridCol align="center" width="20" name="keyValue"
											sortable="true" revertCode="true">编码值</cui:gridCol>
										<cui:gridCol align="center" width="40" name="cz" sortable="true"
											revertCode="true" formatter="formatOperation">操作</cui:gridCol>
									</cui:gridCols>
									<cui:gridPager gridId="gridCodeKey"></cui:gridPager>
								</cui:grid>
							</div>
						</div>

					<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
						autoOpen="false" width="80%" height="50%" maximizable="false">
					</cui:dialog>
					<div class="selectBar">
                         <cui:tree id="tree1" asyncEnable="true" keepParent="true"  asyncType="post" asyncUrl="${ctx}/codebase/getTree" asyncAutoParam="id,name" onClick="als">  
				  		</cui:tree>	
                     </div>

				</div>
			</div>
		</div>
</body>
</html>

