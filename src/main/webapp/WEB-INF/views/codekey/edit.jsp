
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />


<script type="text/javascript">
	function saveFun() {
		if ($("#addForm").form("valid")) {
			var formData = $("#addForm").form("formData");
			var ur = '${ctx}/codekey/update';

			$.ajax({
				type : 'post',
				url : ur,
				data : formData,
				dataType : 'json',
				success : function(data) {
					$.message("保存成功");
					$("#gridCodeKey").grid("reload");
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
	<input type="hidden" name="id" value="${model.id }" />
	<input type="hidden" name="parentId" value="${model.parentId}" />
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
				<td style="width: 8%;"><label>编码名称</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="keyName" required="true" value="${model.keyName }" /></td>
				<td style="width: 8%;"><label>编码值</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="keyValue" required="true" value="${model.keyValue }" /></td>
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
