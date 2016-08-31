<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<div class="top"></div>
<div class="nav clearfix">
    <div class="logo">
        <img src="${ctx}/static/images/logo.png"/>
        <span>食品安全便捷追溯系统</span>
    </div>
    <shiro:user>
        <div class="items-box">
                <span class="item">
                    <img src="${ctx}/static/images/head_icon.png"/>
                        &nbsp;你好，<shiro:principal property="userName"/>&nbsp;
                    </span>|
                    <span class="item">
                    <span class="icon icon1"></span>
                        &nbsp;设置&nbsp;
                    </span>|
                      <span class="item">
                    <span class="icon icon2"></span>
                        <a href="#" onclick="f_changePass()">&nbsp;修改密码&nbsp;</a>
                    </span>|
                    <span class="item">
                    <span class="icon icon2"></span>
                        <a href="${ctx}/logout">&nbsp;退出&nbsp;</a>
                    </span>
        </div>
    </shiro:user>
    <cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
					autoOpen="false" width="50%" height="50%" maximizable="false">
				</cui:dialog>

    
</div>
<script>
function f_changePass(){
	$("#adddialog").dialog("option", {
		title : "修改密码",
		subTitle : "个人信息",
		url : "${ctx}/login/openPass"
	});
	$("#adddialog").dialog("open"); 
}

</script>
