<%@attribute name="id"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="name"%><%@attribute name="active"%><%@attribute name="disabled"%><%@attribute name="collapsible"%><%@attribute name="url"%><%@attribute name="method"%><%@attribute name="onCreate"%><%@attribute name="onCheck"%><%@include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("disabled", disabled)
.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("method", method)
.add("url", url)
.add("id", id)
.add("ulid", id)
.add("name", name)
.add("onCheck", onCheck)
.add("controllerName", request.getAttribute("controllerName"))
.add("onCreate", onCreate).toString();


if(dataOption.length()>0)
	dataOption = dataOption.substring(0, dataOption.length()-1);
%><ul <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>">
<jsp:doBody />
</ul>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("menu", "<%= id%>");
</script>