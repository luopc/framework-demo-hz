<%@ attribute name="id" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="minWidth" %><%@ attribute name="onDetailNavigate" %>
<%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil
.add("id", id)
.add("cls",cls)
.add("minWidth",minWidth)
.add("componentCls",componentCls)
.add("controllerName", request.getAttribute("controllerName"))
.add("onDetailNavigate", onDetailNavigate).toString();
%><div id="<%=id %>" <%=(cls == null ? "" : "class='"+cls+"'") %>  data-options="<%=dataOption %>"><jsp:doBody /></div>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("splitcontainer", "<%= id%>");
</script>