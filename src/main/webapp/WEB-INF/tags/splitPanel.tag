<%@attribute name="title"%><%@attribute name="id"%><%@attribute name="showNavButton" type="java.lang.Boolean"%><%@include file="TagUtil.jsp" %>
<% 
String dataOption = tagUtil.add("title", title)
.add("id",id)
.add("showNavButton",showNavButton).toString();
%>
<div id="<%=id %>" data-options="<%=dataOption %>" ><jsp:doBody /></div>