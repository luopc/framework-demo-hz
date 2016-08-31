<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<cui:form id="form1">
		<table align="left" border="0" style="width: 80%;" >
			<tr style="height: 45px; margin-top: 15px;" align="center" >
				<td style="text-align:right">用户登录名:</td>
				<td style="text-align:left">
				<cui:input name="loginName"  required="true"  componentCls="form-control" value="${loginName }"  disabled="true"></cui:input>
				</td>
			</tr>
			
			<tr style="height: 45px; margin-top: 15px;" align="center" >
				<td style="text-align:right">旧密码:</td>
				<td style="text-align:left">
				<cui:input name="userPass" id="userPass" required="true"  componentCls="form-control"  type="password"></cui:input>
				</td>
			</tr>
			<tr style="height: 45px; margin-top: 15px;" align="center" >
				<td style="text-align:right">新密码:</td>
				<td style="text-align:left">
				<cui:input name="newPass" id="newPass" required="true"  componentCls="form-control"  type="password"></cui:input>
				</td>
			</tr>    				
			
			<tr style="height: 45px; margin-top: 15px;" align="center" >
				<td style="text-align:right">密码确认:</td>
				<td style="text-align:left">
				<cui:input name="passConfirm" id="passConfirm" required="true"  type="password" componentCls="form-control"  cls="easyui-validatebox"  validType="equalsValue[password]"></cui:input>
				</td>
			</tr>
			<tr style="height: 45px; margin-top: 15px;" align="center" >
				<td style="text-align:center" colspan="2" >
				 <cui:button  label="保存" icons="iconSave"  onClick="f_save"></cui:button>
				 <cui:button  label="关闭" icons="iconClose" onClick="closeDialog"></cui:button> 
				</td>
			</tr>
		</table>
		
	</cui:form>
</body>
</html>
<script language="JavaScript" type="text/JavaScript">

function f_save(){
	if ($("#form1").form("valid")) {
		if($("#passConfirm").val()!=$("#newPass").val()){
			$.message("密码不一致，请确认！");
			$("#passConfirm").focus();
			return false;
		}
		var formData = $("#form1").form("formData");
		var ur='${ctx}/login/changePass';
		$.ajax({
			type : 'post',
			url : ur,
			data : formData,
			success : function(data) {
				$.message(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus);
			}
		});

	} else {
		$.alert("请确认输入是否正确！");
	}
		
		
	
}