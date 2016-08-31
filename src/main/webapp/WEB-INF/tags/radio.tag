<%@ attribute name="id" %><%@ attribute name="labelField" %><%@ attribute name="starBefore" type="java.lang.Boolean" %><%@ attribute name="checked" type="java.lang.Boolean" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="name" %><%@ attribute name="onKeyDown" %><%@ attribute name="label" %><%@ attribute name="required" type="java.lang.Boolean" %><%@ attribute name="showStar" type="java.lang.Boolean"%><%@ attribute name="showRequiredMark"%><%@ attribute name="hideRequiredMark"%><%@ attribute name="width" type="java.lang.Integer" %><%@ attribute name="height" type="java.lang.Integer" %><%@ attribute name="allowCancel" type="java.lang.Boolean" %><%@ attribute name="disabled" type="java.lang.Boolean" %><%@ attribute name="readonly" type="java.lang.Boolean" %><%@ attribute name="value" %><%@ attribute name="errMsg" %><%@ attribute name="errMsgPosition" %><% //事件 %><%@ attribute name="onValidError" %><%@ attribute name="onClick" %><%@ attribute name="onValidSuccess" %><%@ attribute name="onChange" type="java.lang.String" %><%@ attribute name="triggers"%><%@ attribute name="excluded" type="java.lang.Boolean"%><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("id", id)
.add("checked", checked)
.add("labelField", labelField)
.add("starBefore", starBefore)
.add("cls", cls)
.add("triggers", triggers)
.add("excluded", excluded)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("label", label)
.add("required", required)
.add("showStar", showStar).add("showRequiredMark", showRequiredMark).add("hideRequiredMark", hideRequiredMark)
.add("height", height)
.add("width", width)
.add("disabled", disabled)
.add("readonly", readonly)
.add("onClick", onClick)
.add("allowCancel", allowCancel)
.add("value", value)
.add("errMsg", errMsg)
.add("errMsgPosition", errMsgPosition)

.add("onValidSuccess", onValidSuccess)
.add("onKeyDown", onKeyDown)
.add("onValidError", onValidError)
.add("controllerName", request.getAttribute("controllerName"))
.add("onChange", onChange).toString();
%><input type="radio" <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>" />
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("radio", "<%= id%>");
</script>