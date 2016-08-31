<%@ tag language="java" pageEncoding="UTF-8"%><%@ attribute name="id" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="name" %><%@ attribute name="value" %><%@ attribute name="max" %><%@ attribute name="min" %><%@ attribute name="step" %><%@ attribute name="disabled" type="java.lang.Boolean" %><%@ attribute name="onCreate" %><%@ attribute name="onChange" %><%@ attribute name="onStart" %><%@ attribute name="onStop" %><%@ attribute name="triggers"%><%@ attribute name="excluded" type="java.lang.Boolean"%><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("id", id)
.add("name", name)
.add("cls", cls)
.add("triggers", triggers)
.add("excluded", excluded)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("value", value)
.add("max", max)
.add("min", min)
.add("step", step)
.add("disabled", disabled)

.add("onCreate", onCreate)
.add("onChange", onChange)
.add("onStart", onStart)
.add("controllerName", request.getAttribute("controllerName"))
.add("onStop", onStop).toString();
 %><input <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> <%=(name == null ? "" : "name="+name) %> data-options="<%=dataOption %>"/>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("spinner", "<%= id%>");
</script>