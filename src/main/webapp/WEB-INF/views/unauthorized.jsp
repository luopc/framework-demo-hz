<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory" %>
<%	
	//设置返回码401，避免浏览器自带的错误页面
	response.setStatus(401);
	//记录日志
	Logger logger = LoggerFactory.getLogger("401.jsp");
	logger.error(exception.getMessage(), exception);
%>
<html>
<head>
    <title>没有权限</title>
    <style>.error{color:red;}</style>
</head>
<body>

<div class="error">
<c:choose>
	<c:when test="${fn:containsIgnoreCase(exception.message, 'permission') or fn:containsIgnoreCase(exception.message, 'permitted')}">
		您没有权限[${fn:substring(exception.message, fn:indexOf(exception.message, '[') + 1,fn:indexOf(exception.message, ']')) }]！
	</c:when>
	<c:when test="${fn:containsIgnoreCase(exception.message, 'role')}">
		您没有角色[${fn:substring(exception.message, fn:indexOf(exception.message, '[') + 1,fn:indexOf(exception.message, ']')) }]！
	</c:when>
	<c:otherwise>
		您没有权限[${exception.message}]！
	</c:otherwise>
</c:choose>
</div>
</body>
</html>