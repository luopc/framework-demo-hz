<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/>
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>食品安全便捷追溯系统<sitemesh:title/></title>
    <%-- <link type="image/x-icon" href="${ctx}/static/images/favicon.ico" rel="shortcut icon"/>
    
    <link rel="stylesheet" href="${ctx}/static/css/backstage_add.css"/>

   
    <script>
       // common.commonCodeList = ${commonCodeList};
        common.contextPath = "${ctx}";
    </script> --%>
    <sitemesh:head/>
</head>
<body>
<sitemesh:body/>
<%-- <div class="wrapper">
    <div class="header">
        <div class="line"></div>
        <div class="logo">
            <img src="${ctx}/static/images/logo.png">
            <span>食品安全便捷追溯系统</span>
        </div>
    </div>
    <sitemesh:body/>
    <div class="footer">
        <%@ include file="/WEB-INF/layouts/footer.jsp" %>
    </div>
</div> --%>
</body>
</html>