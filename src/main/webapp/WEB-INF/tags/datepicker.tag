<%@ attribute name="labelField" %><%@ attribute name="starBefore" type="java.lang.Boolean" %><%@ attribute name="iframePanel" type="java.lang.Boolean" %><%@attribute name="id"%><%@attribute name="name"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="model" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="dateFormat" %><%@attribute name="srcDateFormat" %><%@attribute name="timeFormat" %><%@attribute name="isLabel" type="java.lang.Boolean"%><%@attribute name="readonly" type="java.lang.Boolean"%><%@attribute name="disabled" type="java.lang.Boolean"%><%@attribute name="maxDate"%><%@attribute name="formatOptions"%><%@attribute name="minDate"%><%@attribute name="minTime"%><%@attribute name="maxTime"%><%@attribute name="value" type="java.lang.Object"%><%@attribute name="width"%><%@attribute name="height"%><%@attribute name="startDateId"%><%@attribute name="defaultTime"%><%@attribute name="firstDay"%><%@attribute name="showWeek" type="java.lang.Boolean"%><%@attribute name="showClose" type="java.lang.Boolean"%><%@attribute name="complete" type="java.lang.Boolean"%><%@attribute name="required" type="java.lang.Boolean"%><%@ attribute name="showStar" type="java.lang.Boolean"%><%@ attribute name="showRequiredMark"%><%@ attribute name="hideRequiredMark"%><%@attribute name="errMsg"%><%@attribute name="errMsgPosition"%><%@attribute name="zindex"%><%@attribute name="showOn"%><%@ attribute name="onValidError"%><%@ attribute name="onValidSuccess"%><%@ attribute name="onKeyDown"%><%@ attribute name="onKeyUp"%><%@attribute name="onChange"%><%@attribute name="onSelect"%><%@attribute name="onFormatError"%><%@attribute name="onformatwarn"%><%@attribute name="onFormatWarn"%><%@ attribute name="triggers"%><%@ attribute name="excluded" type="java.lang.Boolean"%><%@include file="TagUtil.jsp"%><%
id = tagUtil.getClientId( id );
value = tagUtil.formatDate(value, dateFormat);
String dataOption = tagUtil.add("dateFormat", dateFormat)
.add("srcDateFormat", srcDateFormat)
.add("timeFormat", timeFormat)
.add("id", id)
.add("cls", cls)
.add("iframePanel",iframePanel)
.add("triggers", triggers)
.add("excluded", excluded)
.add("labelField", labelField)
.add("starBefore", starBefore)
.add("componentCls", componentCls)
.add("model", model)
.add("rendered", rendered).add("authorized", authorized)
.add("disabled", disabled)
.add("isLabel", isLabel).add("readonly", readonly)
.add("startDateId", startDateId)
.add("defaultTime", defaultTime)
.add("showWeek", showWeek)
.add("showClose", showClose)
.add("complete", complete)
.add("height", height).add("width", width)
.add("name", name).add("id", id)
.add("maxDate", maxDate)
.add("formatOptions", formatOptions,"options")
.add("minDate", minDate)
.add("minTime", minTime)
.add("maxTime", maxTime)
.add("value", value)
.add("required", required).add("showStar", showStar).add("showRequiredMark", showRequiredMark).add("hideRequiredMark", hideRequiredMark)
.add("errMsg", errMsg)
.add("errMsgPosition", errMsgPosition)
.add("zindex", zindex).add("showOn", showOn)
.add("onValidSuccess", onValidSuccess)
.add("onKeyUp", onKeyUp)
.add("onKeyDown", onKeyDown)
.add("onValidError", onValidError)
.add("onChange", onChange).add("onSelect", onSelect)
.add("onFormatError", onFormatError)
.add("onFormatWarm", onFormatWarn)
.add("controllerName", request.getAttribute("controllerName"))
.add("firstDay", firstDay).toString();
%><input <%=(cls == null ? "" : "class='"+cls+"'") %> id="<%=id%>" value="<%=(value == null ? "" : value)%>" type="text" data-options="<%=dataOption%>" />
<script class="coralscript" <%= "id=" + id + "_s" %>>
Coral.cc("datepicker", "<%= id%>");
</script>