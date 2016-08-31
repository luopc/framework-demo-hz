<%@attribute name="id" required="true"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="name"%><%@attribute name="disable" type="java.lang.Boolean"%><%@attribute name="max" type="java.lang.Integer"%><%@attribute name="value" type="java.lang.Integer"%><%@attribute name="onCreate" type="java.lang.String" %><%@attribute name="onChange" type="java.lang.String" %><%@attribute name="onComplete" type="java.lang.String" %><%@include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("disable", disable)
.add("max", max)
.add("value", value)

.add("onCreate", onCreate)
.add("onChange", onChange)
.add("controllerName", request.getAttribute("controllerName"))
.add("onComplete", onComplete).toString();
%>
<div <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>" ></div>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("progressbar", "<%= id%>");
</script>