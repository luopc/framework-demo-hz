
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%-- <%@ include file="../include/global.jsp"%> --%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="cache-control" content="no-store, no-cache, must-revalidate"> 
<meta http-equiv="pragma" content="no-cache"> 
<meta http-equiv="expires" content="0">
<title>mydemo演示</title>
<style>
html, body {
	height: 100%;
	width: 100%;
}
</style>
<script type="text/javascript">
</script>
<script src="${ctx}/static/jquery-cui/js/jquery-1.11.3.min.js"></script>
    <link rel="stylesheet" href="${ctx}/static/cui/cui.min.css"/>
     <script src="${ctx}/static/cui/cui.js"></script>
<link href="${ctx}/static/res/resource/style/css/common.css" type="text/css" rel="stylesheet" />
 <%-- <link href="${ctx}/static/res/resource/style/css/white/forcoraltheme.css" type="text/css" rel="stylesheet" /> --%> 
<link href="${ctx}/static/res/resource/style/css/jquery.pagewalkthrough.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/res/resource/style/css/body.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/res/resource/style/css/inforGlobal.css" type="text/css" rel="stylesheet" />
<script src="${ctx}/static/js/layouts/default.js"></script>
<script src="${ctx}/static/js/scripts/common.js"></script>
<script src="${ctx}/static/js/common/common.js"></script> 
<%-- 
<script type="text/javascript" src="${ctx}/res/resource/style/js/respond.min.js"></script>
<script type="text/javascript" src="${ctx}/res/resource/style/js/function.js"></script>
<script type="text/javascript" src="${ctx}/res/resource/style/js/inforGlobal.js"></script>

<script src="${ctx}/res/resource/style/js/sessionCheck.js"></script>
<script src="${ctx}/res/resource/style/js/jquery.form.js"></script> --%>
<sitemesh:head />
</head>
<body>
	<cui:layout id="coralui-layout" fit="true">
		<cui:layoutRegion region="north" split="false" style="height:60px;border:none">
		</cui:layoutRegion>

		<div style="height: 60px; width: 100%; position: absolute; left: 0; top: 0; z-index: 22;">
			<%@ include file="/WEB-INF/layouts/head.jsp"%>
		</div>
		<cui:layoutRegion region='center' split="false" style="border:0;"  onLoad="layoutCenterResize"  onResize="layoutCenterResize">
			<sitemesh:body />
		</cui:layoutRegion>
		<cui:layoutRegion region='south' split="false" style="height:25px"  onLoad="layoutCenterResize"  onResize="layoutCenterResize">
			<div id="footer" class="PanelFoot">
				<h2 class="F-right">信息发展©2016版权所有</h2>
			</div>
		</cui:layoutRegion>
	</cui:layout>
</body>
</html>
