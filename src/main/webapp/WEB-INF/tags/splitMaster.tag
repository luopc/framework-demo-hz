<%@attribute name="id"%><%@attribute name="componentCls"%><%@include file="TagUtil.jsp" %>
<% 
String dataOption = tagUtil.add("id", id)
.add("componentCls",componentCls).toString();
%>
<div data-options="<%=dataOption %>" ><jsp:doBody /></div>
