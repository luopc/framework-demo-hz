<%@attribute name="id"%><%@attribute name="style"%><%@attribute name="cls"%><%@attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="active"%><%@attribute name="icons"%><%@attribute name="name"%><%@attribute name="disabled"%><%@attribute name="collapsible"%><%@attribute name="heightStyle"%><%@attribute name="onActivate"%><%@attribute name="beforeActivate"%><%@include file="TagUtil.jsp" %>
<% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("disabled", disabled)
.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("icons", icons)
.add("active", active)
.add("name", name)
.add("collapsible", collapsible)
.add("heightStyle", heightStyle)
.add("onActivate", onActivate)
.add("controllerName", request.getAttribute("controllerName"))
.add("beforeActivate", beforeActivate).toString();
%><div id="<%=id %>" <%=(cls == null ? "" : "class='"+cls+"'") %> <%=(style == null ? "" : "style='"+style+"'") %> data-options="<%=dataOption %>" ><jsp:doBody /></div>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("accordion", "<%= id%>");
</script>