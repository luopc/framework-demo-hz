<%@ attribute name="id" %><%@ attribute name="name" %><%@ attribute name="style" %><%@ attribute name="uploadBtn"%><%@ attribute name="url" %><%@ attribute name="maxFileSize" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="filesUrl" %><%@ attribute name="acceptFileTypes" %><%@ attribute name="required" type="java.lang.Boolean" %><%@ attribute name="multiple" type="java.lang.Boolean" %><%@ attribute name="filesLimt" %><%@ attribute name="uploadBtnOptions" %><%@ attribute name="onSelect" %><%@ attribute name="onCreate" %><%@ attribute name="onStart" %><%@ attribute name="onSend" %><%@ attribute name="onProgress" %><%@ attribute name="onSuccess" %><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("id", id)
.add("cls", cls)
.add("uploadBtn", uploadBtn)
.add("url", url)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("maxFileSize", maxFileSize)
.add("filesUrl", filesUrl)
.add("acceptFileTypes", acceptFileTypes)
.add("required", required)
.add("multiple", multiple)
.add("filesLimt", filesLimt)
.add("uploadBtnOptions", uploadBtnOptions, "options")
.add("onCreate", onCreate)
.add("onSelect", onSelect)
.add("onStart", onStart)
.add("onClick", onSend)
.add("onMouseEnter", onProgress)
.add("controllerName", request.getAttribute("controllerName"))
.add("onSuccess", onSuccess).toString();
 %><div id="<%=id %>" type="button" <%=(cls == null ? "" : "class='"+cls+"'") %> <%=(style == null ? "" : "style='"+style+"'") %> data-options="<%=dataOption %>"><jsp:doBody /></div >
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("fileuploader", "<%= id%>");
</script>