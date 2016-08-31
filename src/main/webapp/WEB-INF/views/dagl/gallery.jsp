<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" />
<tiltviewergallery> <photos> <c:forEach
	var="item" items="${fileList }">
	<photo imageurl="${ctx}/static/upload/${item}"
		linkurl="http://www.google.com">
	<title>Image</title>
	<description></description> </photo>
</c:forEach> </photos> </tiltviewergallery>