<%@ tag language="java" pageEncoding="UTF-8"%><%@ attribute name="id" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="label" %><%@ attribute name="width" type="java.lang.Integer" %><%@ attribute name="text" type="java.lang.Boolean" %><%@ attribute name="disabled" type="java.lang.Boolean" %><%@ attribute name="icons"  %><%@ attribute name="treeOptions" %><%@ attribute name="onCreate" %><%@ attribute name="onClick" %><%@ attribute name="onSelect" %><%@ attribute name="onCheck" %><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("treeOptions", treeOptions)
.add("label", label)
.add("width", width)
.add("disabled", disabled)
.add("text", text)
.add("icons", icons)
.add("onCreate", onCreate)
.add("controllerName", request.getAttribute("controllerName"))
.add("onClick", onClick).toString();
 %><button <%=(id == null ? "" : "id="+id) %> <%=(cls == null ? "" : "class='"+cls+"'") %> data-options="<%=dataOption %>" type="button">
<jsp:doBody/>
</button>
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("treebutton", "<%= id%>");
</script>