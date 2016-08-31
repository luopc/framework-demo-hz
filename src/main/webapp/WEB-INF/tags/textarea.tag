<%@ tag language="java" pageEncoding="UTF-8"%><%@ attribute name="labelField" %><%@ attribute name="starBefore" type="java.lang.Boolean" %><%@ attribute name="id" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="name" %><%@ attribute name="isLabel" type="java.lang.Boolean"%><%@ attribute name="readonly" type="java.lang.Boolean"%><%@ attribute name="disabled" type="java.lang.Boolean"%><%@ attribute name="required" type="java.lang.Boolean"%><%@ attribute name="showStar" type="java.lang.Boolean"%><%@ attribute name="showRequiredMark"%><%@ attribute name="hideRequiredMark"%><%@ attribute name="maxlength" type="java.lang.Integer"%><%@ attribute name="minlength" type="java.lang.Integer"%><%@ attribute name="height" type="java.lang.Integer"%><%@ attribute name="width" type="java.lang.Integer"%><%@ attribute name="formatter" %><%@ attribute name="unformatter" %><%@ attribute name="pattern" %><%@ attribute name="valid" %><%@ attribute name="validType" %><%@ attribute name="errMsg" %><%@ attribute name="errMsgPosition" %><%@ attribute name="placeholder" %><!-- add events of CamelStyle --><%@ attribute name="onClick" %><%@ attribute name="onBlur" %><%@ attribute name="onFocus" %><%@ attribute name="onKeyDown" %><%@ attribute name="onKeyUp" %><%@ attribute name="onKeyPress" %><%@ attribute name="onChange" %><%@ attribute name="onEnter" %><%@ attribute name="onCreate" %><%@ attribute name="onValidSuccess"%><%@ attribute name="onValidError"%><%@ attribute name="triggers"%><%@ attribute name="excluded" type="java.lang.Boolean"%><%@ attribute name="onValidWarn" %><%@include file="TagUtil.jsp" %><% 	
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("id", id)	
.add("cls", cls)
.add("triggers", triggers)
.add("excluded", excluded)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("name", name)
.add("labelField", labelField)
.add("starBefore", starBefore)
.add("isLabel", isLabel)
.add("readonly", readonly)
.add("disabled", disabled)
.add("required", required)
.add("showStar", showStar).add("showRequiredMark", showRequiredMark).add("hideRequiredMark", hideRequiredMark)
.add("maxlength", maxlength)
.add("minlength", minlength)
.add("height", height)
.add("width", width)
.add("formatter", formatter)
.add("unformatter", unformatter)
.add("pattern", pattern)
.add("valid", valid)
.add("cls", cls)
.add("validType", validType)	
.add("errMsg", errMsg)
.add("errMsgPosition", errMsgPosition)
.add("placeholder", placeholder)

.add("onClick", onClick)
.add("onBlur", onBlur)
.add("onFocus", onFocus)
.add("onKeyDown", onKeyDown)
.add("onKeyUp", onKeyUp)
.add("onKeyPress", onKeyPress)
.add("onChange", onChange)
.add("onEnter", onEnter)

.add("onCreate", onCreate)
.add("onChange", onChange)
.add("onValidSuccess", onValidSuccess)
.add("onValidError", onValidError)
.add("controllerName", request.getAttribute("controllerName"))
.add("onValidWarn", onValidWarn).toString();
%><textarea id="<%=id %>" <%=(name == null ? "" : "name=" + name) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>"><jsp:doBody /></textarea>
<script class="coralscript"  <%= "id=" + id + "_s" %>>
Coral.cc("textbox", "<%= id%>");
</script>