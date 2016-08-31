
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script type="text/javascript">
$.parseDone(function(){
		$("#addForm").form("setReadOnly",true);
});
</script>
<cui:form id="addForm" method="post" action="" heightStyle="fill">
	<input type="hidden" name="parentId" value="${parentId }" />
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
				<td style="width: 8%;"><label>部门名称</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="departmentName" required="true"
						value="${model.departmentName }" /></td>
				<td style="width: 8%;"><label>部门领导</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="departmentLeader" required="true"
						value="${model.departmentLeader }" /></td>

			</tr>

			<tr>
				<td style="width: 8%;"><label>是否为叶子节点</label></td>
				<td style="width: 17%;"><cui:combobox componentCls="form-control"
						name="isLeaf" required="true" data="combobox_leaf" value="${model.isLeaf }" /></td>
				<td style="width: 8%;"><label>部门描述</label></td>
				<td style="width: 17%;"><cui:textarea id="departmentDescription" name="departmentDescription" width="400" maxlength="200">${model.departmentDescription }</cui:textarea>   </td>
			</tr>
		</tbody>
	</table>
</cui:form>

<div class="dialog-buttons">
	<cui:button label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>


</div>
<script type="text/javascript">
	
</script>
