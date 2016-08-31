
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script type="text/javascript">
	function saveFun() {
		if ($("#addForm").form("valid")) {
			var formData = $("#addForm").form("formData");
			var ur = '${ctx}/department/create';
			$.ajax({
				type : 'post',
				url : ur,
				data : formData,
				dataType : 'json',
				success : function(data) {
					$.message("保存成功");
					$("#gridDepartment").grid("reload");
					 var nodes = $('#departmentTree').tree("getSelectedNodes");
				    var parentNode = nodes[0];
				    var isParent=data.model.isLeaf=="0"?true:false;
				    var newNode = {name : data.model.departmentName,id:data.model.id,isParent:isParent};
				    newNode = $('#departmentTree').tree("addNodes",parentNode, newNode);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus);
				}
			});

		} else {
			$.alert("请确认输入是否正确！");
		}
	}
</script>


<cui:form id="addForm" method="post" action="" heightStyle="fill">
	<input type="hidden" name="parentId" value="${parentId }" />
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
				<td style="width: 8%;"><label>部门名称</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="departmentName" required="true" /></td>
				<td style="width: 8%;"><label>部门领导</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="departmentLeader" required="true" /></td>

			</tr>

			<tr>
				<td style="width: 8%;"><label>是否为叶子节点</label></td>
				<td style="width: 17%;"><cui:combobox componentCls="form-control"
						name="isLeaf" required="true" data="combobox_leaf" /></td>
				<td style="width: 8%;"><label>部门描述</label></td>
				<td style="width: 17%;"><cui:textarea id="departmentDescription" name="departmentDescription" width="400" maxlength="200"></cui:textarea>   
				</td>


			</tr>
		</tbody>
	</table>
</cui:form>

<div class="dialog-buttons">
	<cui:button label="保存" icons="iconSave" onClick="saveFun"></cui:button>
	<cui:button label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>


</div>
<script type="text/javascript">
	
</script>
