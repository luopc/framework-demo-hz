
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<cui:form id="addForm" method="post" action="" heightStyle="fill">
   <table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
					<td style="width:8%;"><label>编码名称</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control"  name="keyName" required="true" value="${model.keyName }"/></td>
					<td style="width:8%;"><label>编码值</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control"  name="keyValue" required="true" value="${model.keyValue }"/></td>
				</tr>
			</tbody>
		</table>
</cui:form>

<div class="dialog-buttons">
	<cui:button  label="关闭" icons="iconClose" onClick="closeDialog"></cui:button> 
</div>
<script type="text/javascript">

</script>
