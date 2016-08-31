<%@attribute name="url"%><%@attribute name="iconclass"%><%@attribute name="name"%><%@attribute name="disabled"%><%@attribute name="target"%>
<li>
<%
	disabled=disabled==null?"false":disabled;
%>
<a <%=url==null?"":"data-url='"+url+"'"%>  <%=name==null?"":"data-name='"+name+"'"%> <%=iconclass==null?"":"data-icon='"+iconclass+"'"%> data-disabled='<%=disabled%>' <%=target==null?"":"data-target='"+target+"'"%>><%=name==null?"":name%></a>
<jsp:doBody />
</li>