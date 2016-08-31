<%@ attribute name="id" %><%@ attribute name="maxLabelWidth" %><%@ attribute name="labelField" %><%@ attribute name="starBefore" type="java.lang.Boolean" %><%@ attribute name="name" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="onKeyDown" %><%@ attribute name="label" %><%@ attribute name="title" %><%@ attribute name="required" type="java.lang.Boolean" %><%@ attribute name="showStar" type="java.lang.Boolean"%><%@ attribute name="showRequiredMark"%><%@ attribute name="hideRequiredMark"%><%@ attribute name="width" type="java.lang.Integer" %><%@ attribute name="height" type="java.lang.Integer" %><%@ attribute name="disabled" type="java.lang.Boolean" %><%@ attribute name="readonly" type="java.lang.Boolean" %><%@ attribute name="checked" type="java.lang.Boolean" %><%@ attribute name="value" %><%@ attribute name="errMsg" %><%@ attribute name="errMsgPosition" %><% // events %><%@ attribute name="onValidError" %><%@ attribute name="onValidSuccess" %><%@ attribute name="onChange" type="java.lang.String" %><%@ attribute name="triggers"%><%@ attribute name="excluded" type="java.lang.Boolean"%><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("labelField", labelField)
.add("starBefore", starBefore)
.add("id", id)
.add("maxLabelWidth",maxLabelWidth)
.add("triggers", triggers)
.add("excluded", excluded)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("label", label)
.add("title", title)
.add("required", required)
.add("showStar", showStar).add("showRequiredMark", showRequiredMark).add("hideRequiredMark", hideRequiredMark)
.add("height", height)
.add("width", width)
.add("disabled", disabled)
.add("readonly", readonly)
.add("checked", checked)
.add("value", value)
.add("errMsg", errMsg)
.add("errMsgPosition", errMsgPosition)
.add("onValidSuccess", onValidSuccess)
.add("onKeyDown", onKeyDown)
.add("onValidError", onValidError)
.add("controllerName", request.getAttribute("controllerName"))
.add("onChange", onChange).toString(); 
%><input type="checkbox" <%=(id == null ? "" : "id=" + id)  %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption  %>"/>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("checkbox", "<%= id%>");
</script>