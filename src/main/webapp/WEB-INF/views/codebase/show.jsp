
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<cui:form id="addForm" method="post" action="" heightStyle="fill">
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
				<td style="width: 8%;"><label>分类名称</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="baseName" required="true" value="${model.baseName }" /></td>
				<td style="width: 8%;"><label>分类值</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="baseKey" required="true" value="${model.baseKey }" /></td>
			</tr>
		</tbody>
	</table>
</cui:form>
<div class="dialog-buttons">
	<cui:button label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>
</div>

