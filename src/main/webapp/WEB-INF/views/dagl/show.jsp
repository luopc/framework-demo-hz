<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script type="text/javascript">

var mode='${mode}';

$.parseDone(function(){
	if("view"==mode){
		$("#btnsave").hide();
		$("#addForm").form("setIsLabel",true);
	}
});
function saveFun(){
	if ($("#addForm").form("valid")) {
				var formData = $("#addForm").form("formData");
				
				$.ajax({
					type : 'post',
					url : '${ctx}/dagl/modify', 
					data : formData,
					/* dataType : 'json', */
					success : function(data) {
						//alert("保存成功");
						$.message("保存成功");
						$("#gridDagl").grid("reload");
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert(textStatus);
					}
				});
				$("#adddialog").dialog("close");
	
	} else {
		$.alert("请确认输入是否正确！");
	}
}
</script>


<cui:form id="addForm" method="post"  action="${ctx}/dagl/dagl/${id}/show" heightStyle="fill">
<input type="hidden" name="ys" value="${model.ys }"/>
<input type="hidden" name="tempForm" value="${model.tempForm }"/>
<input type="hidden" name="delStatus" value="${model.delStatus }"/>
<input type="hidden" name="id" value="${model.id }"/>
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<tbody>
		
			<tr>
					<td style="width:8%;"><label>全宗号</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="qzh" name="qzh" required="true" value="${model.qzh }"/></td>
					<td style="width:8%;"><label>目录号</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="mlh" name="mlh" required="true" value="${model.mlh }"/></td>
									
				</tr>
				<tr>
					
					<td style="width:8%;"><label>题名</label></td>
					<td style="width:27%;" colspan="3"><cui:input componentCls="form-control" id="tm" name="tm" required="true" value="${model.tm }"/></td>
									
				</tr>
				<tr>
					<td style="width:8%;"><label>档号</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="dh" name="dh" required="true" value="${model.dh }"/></td>
					<td><label>年度</label></td>
					<td><cui:datepicker componentCls="form-control" id="nd" name="nd"   dateFormat="yyyy" showOn="button" onKeyDown="enterGo" value="${model.nd }"/></td>
									
					
				</tr>
				<tr>
				<td ><label>保管期限</label></td>
					<td><cui:combobox id="bgqx" name="bgqx"  componentCls="form-control" data="combobox_bgqx" required="true" value="${model.bgqx}"/></td>
					<td ><label>密级</label></td>
					<td><cui:combobox id="mj" name="mj"  componentCls="form-control" data="combobox_mj" required="true" value="${model.mj }"/></td>
					
				</tr>
				<tr>
					<td style="width:8%;"><label>文号</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="wh" name="wh" value="${model.wh }"/></td>
					<td style="width:8%;"><label>件号</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="jh" name="jh" required="true" value="${model.jh }"/></td>
									
				</tr>
				
				<tr>
				<td style="width:8%;"><label>主题词</label></td>
					<td style="width:17%;"><cui:input componentCls="form-control" id="ztc" name="ztc" value="${model.ztc }"/></td>	
					<td ><label>责任者</label></td>
					
					<td ><cui:input componentCls="form-control" id="zrz" name="zrz" required="true" value="${model.zrz}"/></td>
				</tr>
				<td style="width:8%;"><label>文件起始时间</label></td>
					<td><cui:datepicker componentCls="form-control" id="wjqssj" name="wjqssj"   dateFormat="yyyy-MM-dd"  showOn="button" onKeyDown="enterGo" value="${model.wjqssj }"/></td>
					<td ><label>文件结束时间</label></td>
					
					<td><cui:datepicker componentCls="form-control" id="wjzzsj" name="wjzzsj"   dateFormat="yyyy-MM-dd" onChange="wjqssj" showOn="button" onKeyDown="enterGo" value="${model.wjzzsj }"/></td>
				</tr>
				
			</tbody>
		</table>
</cui:form>

<div class="dialog-buttons">
 	<cui:button  label="保存" icons="iconSave" id="btnsave" onClick="saveFun"></cui:button>
	<cui:button  label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>
</div>

<script type="text/javascript">


</script>
