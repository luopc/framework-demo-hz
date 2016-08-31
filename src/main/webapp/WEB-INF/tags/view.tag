<%@ attribute name="id" %><%@ attribute name="style" %><%@ attribute name="name" %><%@ attribute name="controllerName" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="onCreate" type="java.lang.String" %><%@ attribute name="onClick" type="java.lang.String" %><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("id", id)
.add("controllerName", controllerName)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)

.add("onCreate", onCreate).toString();
request.setAttribute("controllerName", controllerName);
 %><div id="<%=id %>" <%=(name == null ? "" : "name=" + name) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>"><jsp:doBody /></div>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("view", "<%= id%>");
</script>