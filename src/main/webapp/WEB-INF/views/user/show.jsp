
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
	<input type="hidden" name="departmentId" value="${departmentId }" />
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
				<td style="width: 8%;"><label>用户名</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="userName" required="true" maxlength="20" value="${model.userName}"/></td>
				<td style="width: 8%;"><label>密码</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="userPass" required="true" type="password" maxlength="10" value="${model.userPass }"/></td>

			</tr>

			<tr>
				<td style="width: 8%;"><label>性别</label></td>
				<td style="width: 17%;"><cui:combobox name="sex"
						componentCls="form-control" data="combobox_sex" required="true" value="${model.sex }"/></td>
				</td>

				<td style="width: 8%;"><label>年龄</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="age" validType="integer" maxlength="3" value="${model.age }"/>
				</td>
			</tr>
			<tr>
				<td style="width: 8%;"><label>电话</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="phone" validType="mobile" value="${model.phone }"/>
				</td>

				<td style="width: 8%;"><label>住址</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="address" maxlength="100" value="${model.address }"/>
				</td>
			</tr>
			<tr>
				
				<td style="width: 8%;"><label>描述</label></td>
				<td style="width: 17%;"  colspan="3"><cui:textarea id="description" name="description" width="800" maxlength="200">${model.description }</cui:textarea></div>     
				</td>
			</tr>
		</tbody>
	</table>
</cui:form>

<div class="dialog-buttons">
	<cui:button label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>


</div>
<script type="text/javascript">
	
</script>
