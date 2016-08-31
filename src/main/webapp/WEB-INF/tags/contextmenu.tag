<%@attribute name="id"%><%@attribute name="name"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="data"%><%@attribute name="disabled"%><%@attribute name="url"%><%@attribute name="target"%><%@attribute name="method"%><%@attribute name="onClick"%><%@attribute name="onCreate"%><%@attribute name="onCheck"%><%@include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("disabled", disabled)
.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("method", method)
.add("url", url)
.add("id", id)
.add("data", data)
.add("name", name)
.add("target", target)
.add("onCheck", onCheck)
.add("onClick", onClick)
.add("controllerName", request.getAttribute("controllerName"))
.add("onCreate", onCreate).toString();
%><ul id="<%=id %>" <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>">
<jsp:doBody />
</ul>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("contextmenu", "<%= id%>");
</script>