<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>一对多例子</title>
</head>
<body>
	<div align="center">
		<table>
			<tr>
			
				<td>条目信息：<label>档号</label></td>
				<td><cui:input name="dh"  value="${dagl.dh }" /></td>
				<td><label>题名 </label></td>
				<td><cui:input name="tm" value="${dagl.tm}" /></td>
				<td><label>年度</label></td>
				<td><cui:datepicker  name="nd" dateFormat="yyyy"
						showOn="button" onKeyDown="enterGo" value="${dagl.nd }" /></td>
				<td><label>责任者 </label></td>
				<td><cui:input name="zrz" value="${dagl.zrz}" /></td>
			
			</tr>
			<tr><td colspan="8"><hr align=center width=800 color=#987cb9 size=1> </td></tr>
			
			
			<c:forEach var="atth" items="${atths }">
			<tr>
				<td>全文信息：<label>文件名称</label></td>
				<td><cui:input name="dh"  value="${atth.fileName}" /></td>
				<td><label>文件大小 </label></td>
				<td><cui:input name="tm" value="${atth.fileSize}" /></td>
			</tr>
			
			</c:forEach>
		</table>
	</div>
	<div>
		
	</div>

</body>
</html>

