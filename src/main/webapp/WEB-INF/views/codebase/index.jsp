<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>分类管理</title>
<link rel="stylesheet" href="${ctx}/static/css/codebase-index.css">
<script type="text/javascript">
	var data = [ {
		name : "编码分类",
		id : "FFFF",
		ename : "bo",
		isParent : true,
		open : true
	} ];
	function als(event, id, node) {
		var id = node.id;
		if (id == "FFFF") {
			window.location.href = "${ctx}/codebase/search";
		} else {
			window.location.href = "${ctx}/codekey/" + id + "/index";
		}

	}
</script>

</head>

<body>
	<div class="content">
		<div class="right-content">
			<div class="info">
				<div class="list_box">
					<div class="list_table">
						<div class="function clearfix">
							<span class="tip">分类列表</span> 此列表主要实现参数类型和返回类型 为map
						</div>
						<!--表格-->
						<div id="varietyGrid">
							<%@ include file="/WEB-INF/views/codebase/list1.jsp"%>
						</div>
					</div>
				</div>
				<div class="selectBar">
					<cui:tree id="tree1" asyncEnable="true" keepParent="true"
						asyncType="post" asyncUrl="${ctx}/codebase/getTree"
						asyncAutoParam="id,name" onClick="als">
					</cui:tree>
				</div>
			</div>
		</div>
	</div>
</body>

</html>

