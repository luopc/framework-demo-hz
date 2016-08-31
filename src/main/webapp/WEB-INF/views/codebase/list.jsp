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
    var data=[{name:"编码分类",id:"FFFF",ename:"bo",isParent:true,open:true}];
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
					/* document.getElementById('queryForm').action="${ctx}/codebase/"+selrow.toString();
					//document.forms[0].method="delete";
					document.getElementById('queryForm').submit(); */
					$.ajax({
						type : "post",
						url : "${ctx}/codebase/" + selrow.toString(),
						 data: {
						     _method: 'DELETE'
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
			postData['Q_LIKE_baseName'] = baseName;
		}
		if (baseKey != "") {
			postData['Q_LIKE_baseKey'] = baseKey;
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
				url : "${ctx}/codebase/" + selrow.toString()+"/show"
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
</head>
<body>
	
		<div class="content">
			<div class="right-content">
				<div class="info">
					<div class="list_box">
                        	<div class="list_table">
                        		
                                <div class="function clearfix">
	                                <div align="center">
										<cui:form id="queryForm">
											<table class="table table-condensed table table-fixed">
												<tr>
													<td><label>分类名称</label></td>
													<td><cui:input name="baseName" id="baseName" /></td>
													<td><label>分类值 </label></td>
													<td><cui:input name="baseKey" id="baseKey" /></td>
													<td><cui:button id="searchBtn" label="查询"
															onClick="search"></cui:button> <cui:button id="resetBtn"
															label="重置" onClick="resetHandler"></cui:button></td>
												</tr>
											</table>
										</cui:form>
									</div>
									
									<!-- 按钮 -->
									<div>
										<cui:button id="addBtn" label="新增" onClick="f_add"></cui:button>
										<cui:button id="updateBtn" label="修改" onClick="f_modify"></cui:button>
										<cui:button id="deleteBtn" label="删除" onClick="f_delete"></cui:button>
										<cui:button id="deleteBtn" label="测试传参map" onClick="f_test1"></cui:button>
									</div>
									
									<!-- 列表 -->
									<div>
                        			
                        	
									<cui:grid id="gridCodeBase" rownumbers="false" singleselect="true"
									sortname="id" sortorder="asc" url="${ctx}/codebase/searchdata"
									fitStyle="fill" onDblClickRow="onDblClickRow" width="auto" rowNum="10"  height="900">
									<cui:gridCols>
										<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
										<cui:gridCol align="center" width="20" name="baseName"
											sortable="true" formatter="convertCode" revertCode="true">分类名称</cui:gridCol>
										<cui:gridCol align="center" width="20" name="baseKey"
											sortable="true" revertCode="true">分类值</cui:gridCol>
										<cui:gridCol align="center" width="40" name="cz" sortable="true"
											revertCode="true" formatter="formatOperation">操作</cui:gridCol>
									</cui:gridCols>
									<cui:gridPager gridId="gridCodeBase"></cui:gridPager>
								</cui:grid>
									</div>
                                </div>
                            </div>
                       </div>
				
					<%-- <div class="function clearfix">
						<div class="clearfix">
							<div align="center">
							<cui:form id="queryForm">
								<table class="table table-condensed table table-fixed">
									<tr>
										<td><label>分类名称</label></td>
										<td><cui:input name="baseName" id="baseName" /></td>
										<td><label>分类值 </label></td>
										<td><cui:input name="baseKey" id="baseKey" /></td>
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
						<cui:button id="deleteBtn" label="测试传参map" onClick="f_test1"></cui:button>
					</div>
					<cui:grid id="gridCodeBase" rownumbers="false" singleselect="true"
						sortname="id" sortorder="asc" url="${ctx}/codebase/searchdata"
						fitStyle="fill" onDblClickRow="onDblClickRow" width="auto">
						<cui:gridCols>
							<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
							<cui:gridCol align="center" width="20" name="baseName"
								sortable="true" formatter="convertCode" revertCode="true">分类名称</cui:gridCol>
							<cui:gridCol align="center" width="20" name="baseKey"
								sortable="true" revertCode="true">分类值</cui:gridCol>
							<cui:gridCol align="center" width="40" name="cz" sortable="true"
								revertCode="true" formatter="formatOperation">操作</cui:gridCol>
						</cui:gridCols>
						<cui:gridPager gridId="gridCodeBase"></cui:gridPager>
					</cui:grid> --%>

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

