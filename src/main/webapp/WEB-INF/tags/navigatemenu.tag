<%@attribute name="id"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="name"%><%@attribute name="data"%><%@attribute name="disabled"%><%@attribute name="url"%><%@attribute name="method"%><%@attribute name="onClick"%><%@attribute name="checkable"%><%@attribute name="fixmenu"%><%@attribute name="onCreate"%><%@variable name-given="menu_checkable" scope="NESTED"%><%@variable name-given="menu_id" scope="NESTED"%><%@include file="TagUtil.jsp" %><%
id = tagUtil.getClientId( id );
jspContext.setAttribute("menu_id",id);
jspContext.setAttribute("menu_checkable",checkable);

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
.add("onClick", onClick)
.add("checkable", checkable)
.add("fixmenu", fixmenu)
.add("controllerName", request.getAttribute("controllerName"))
.add("onCreate", onCreate).toString();
%><ul <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>">
<jsp:doBody />
</ul>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("navigatemenu", "<%= id%>");
</script>