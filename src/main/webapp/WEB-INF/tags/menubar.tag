<%@attribute name="id"%><%@ attribute name="minmenu" type="java.lang.Boolean" %><%@ attribute name="responsive" type="java.lang.Boolean" %><%@ attribute name="vertical" type="java.lang.Boolean" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="name"%><%@attribute name="data"%><%@attribute name="disabled"%><%@attribute name="url"%><%@attribute name="method"%><%@attribute name="onclick"%><%@attribute name="onItemClick"%><%@attribute name="onClick"%><%@attribute name="onCreate"%><%@include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("disabled", disabled)
.add("id", id)
.add("cls", cls)
.add("responsive",responsive)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("minmenu",minmenu)
.add("method", method)
.add("url", url)
.add("id", id)
.add("data", data)
.add("vertical", vertical)
.add("name", name)
.add("onClick", onClick)
.add("onItemClick", onItemClick)
.add("controllerName", request.getAttribute("controllerName"))
.add("onCreate", onCreate).toString();
%><ul <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>">
<jsp:doBody />
</ul>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("menubar", "<%= id%>");
</script>