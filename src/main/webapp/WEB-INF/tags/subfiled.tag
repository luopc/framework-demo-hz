<%@attribute name="id"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="title" required="true"%><%@attribute name="lineCls"%><%@attribute name="textCls"%><%@include file="TagUtil.jsp"%>
<% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("title", title)
.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("lineCls", lineCls)
.add("controllerName", request.getAttribute("controllerName"))
.add("textCls", textCls).toString();
		
System.out.println(dataOption);
%><div id="<%=id %>" <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>"></div>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("subfiled", "<%= id%>");
</script>