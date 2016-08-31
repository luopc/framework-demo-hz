
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />


<script type="text/javascript">
/* var id='${model.id}';
var model='${model}';

$.parseDone(function(){
	if(id){
		loadForm('addForm',model,function(data){
			
		});
	}
}); */

function saveFun(){
	if ($("#addForm").form("valid")) {
				var formData = $("#addForm").form("formData");
				$.ajax({
					type : 'post',
					url : '${ctx}/codebase/',
					data : formData,
					 dataType : 'json',  
					success : function(data) {
						$.message("保存成功");
						$("#gridCodeBase").grid("reload");
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert(textStatus);
					}
				});
				
	
	} else {
		$.alert("请确认输入是否正确！");
	}
}

</script>


<cui:form id="addForm" method="post" action="" heightStyle="fill">
   <table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
			<tr>
					<td style="width:8%;"><label>分类名称</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control"  name="baseName" required="true"/></td>
					<td style="width:8%;"><label>分类值</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control"  name="baseKey" required="true"/></td>
									
				</tr>
				
				
			</tbody>
		</table>
</cui:form>

<div class="dialog-buttons">
	 <cui:button  label="保存" icons="iconSave"  onClick="saveFun"></cui:button>
	<cui:button  label="关闭" icons="iconClose" onClick="closeDialog"></cui:button> 

	
</div>
<script type="text/javascript">

</script>
