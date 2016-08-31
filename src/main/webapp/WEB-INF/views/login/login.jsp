<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <title>登录页</title>
    <link type="image/x-icon" href="${ctx}/static/images/favicon.ico" rel="shortcut icon">
    <script src="${ctx}/static/jquery-cui/js/jquery-1.11.3.min.js"></script>
      <link rel="stylesheet" href="${ctx}/static/cui/cui.min.css"/>
     <script src="${ctx}/static/cui/cui.min.js"></script>
    <link rel="stylesheet" href="${ctx}/static/css/reset.css">
    <link rel="stylesheet" href="${ctx}/static/css/login.css">
  
    <script src="${ctx}/static/js/login/login.js"></script>
    <script>
    $(function() {
        $(".jcaptcha-btn").click(function() {
            $(".jcaptcha-img").attr("src", '${pageContext.request.contextPath}/jcaptcha.jpg?'+new Date().getTime());
        });
    });
</script>
</head>

<body>
<div class="wrapper clearfix">
    <div class="content">
        <div class="box clearfix">
           <%--  <img src="${ctx}/static/images/show.png" class="show"> --%>

            <div class="form">
                <img src="${ctx}/static/res/resource/style/images/logo.png" class="logo">

                <form id="form1" action="${ctx}/login" method="post">
                    <c:if test="${not empty shiroLoginFailure}">
						<c:choose>
							<c:when test="${not empty shiroLoginFailureException}">
								${shiroLoginFailureException.message}
							</c:when>
							<c:when test="${shiroLoginFailure == 'jCaptcha.error'}">
								验证码输入错误！
							</c:when>
							<c:otherwise>
								用户名密码错误！
							</c:otherwise>
						</c:choose>
					</c:if>
					<c:if test="${empty shiroLoginFailure and param.timeout == 'true'}">
				    	登录超时，请重新登录！
				    </c:if>
                    <div class="line1">
                        <label id="username_label" for="username" class="label_input">请输入用户名！</label>
                        <input id="username" name="username" />
                    </div>
                    <div class="line2">
                        <label id="pass_label" for="password" class="label_input">请输入密码！</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <c:if test="${jcaptchaEnabled}">
					<span class="line3">
                        <input id="verification" name="jcaptchaCode" placeholder="请输入验证码！" autocomplete="off"/>
                        <span id="verification-code"><a class="jcaptcha-btn" href="javascript:;">
                        <img class="jcaptcha-btn jcaptcha-img" src="${ctx}/jcaptcha.jpg" title="点击更换验证码"></a></span>
                    </span>
                    </c:if>
					<div class="remberme">
						<label for="rememberMe"><input type="checkbox" name="rememberMe" id="rememberMe">
						<font style="font-size: 15px;">自动登录</font></label>
					</div>
                    <input type="submit" value="登录" name="submit" />
                </form>
            </div>
        </div>
    </div>
    <div class="foot">
        版权所有（C）上海中信信息
    </div>
</div>
</body>
</html>
