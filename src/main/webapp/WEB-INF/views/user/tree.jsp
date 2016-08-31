<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div class="F-left" style="width:100%;">
	<!-- 人员信息 -->
	<div class="leftHgroup">人员信息</div>
	 	<cui:tree id="departmentTree" asyncEnable="true" keepParent="true" data="data" asyncType="post" asyncUrl="${ctx}/department/getTree" asyncAutoParam="id,name" onClick="als">  
		</cui:tree>	
	
</div>

<script>
var data=[{name:"部门信息",id:"0",ename:"bo",isParent:true,open:true}];
$.parseDone(function(){
	var panel = $('#coralui-layout1').layout('panel', 'center');
	panel.panel('refresh', "${ctx}/user/0/true/list");
	var nodes = $('#departmentTree').tree("getNodeByParam","id","0");
    if(nodes)
        $('#departmentTree').tree("expandNode",nodes, true, true);
    else
        $.alert("请先选择一个节点");
});
	function als(event, id, node) {
		var id = node.id;
		var isParent=node.isParent;
		var panels = $('#coralui-layout1').layout('panel', 'center');
		panels.panel('refresh', "${ctx}/user/" + id + "/" + isParent + "/list");

	}
</script>