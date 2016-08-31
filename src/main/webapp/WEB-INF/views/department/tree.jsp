<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div class="F-left" style="width: 100%;">
	<!-- 部门信息 -->
	<div class="leftHgroup">部门信息</div>
	<cui:tree id="departmentTree" asyncEnable="true" keepParent="true"
		 asyncType="post" data="data" asyncUrl="${ctx}/department/getTree"
		asyncAutoParam="id,name" editable="false" onClick="als" onDrag="treeonDrag" onDrop="treeonDrop" beforeCheck="beforeCheck">
	</cui:tree>
</div>

<script>
	var data = [ {
		name : "部门信息",
		id : "0",
		ename : "bo",
		isParent : true,
		open : true
	} ];
	$.parseDone(function() {

		var panel = $('#coralui-layout1').layout('panel', 'center');
		panel.panel('refresh', "${ctx}/department/0/true/list");
		
		 var nodes = $('#departmentTree').tree("getNodeByParam","id","0");
	    if(nodes)
	        $('#departmentTree').tree("expandNode",nodes, true, true);
	    else
	        $.alert("请先选择一个节点");
		
		
	});
	function als(event, id, node) {
		console.log(node)
		var id = node.id;
		var isParent=node.isParent;
		var panels = $('#coralui-layout1').layout('panel', 'center');
		if(isParent==true){
			panels.panel('refresh', "${ctx}/department/" + id + "/" + isParent + "/list");
		}
			
		
		
		

	}
	function treeonDrag(event, treeId, treeNodes){
	    //$.alert('移动：'+ treeNodes[0].name)
	}    
	function treeonDrop(event, treeId, treeNodes, targetNode, moveType, isCopy){
	    //$.alert('移动到：'+targetNode.name + '的' + moveType)
	}
	function beforeCheck(treeId, treeNode,clickFlag){
	   return (treeNode.click!=false);
	}
</script>