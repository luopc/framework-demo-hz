
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />


<script type="text/javascript">
	function saveFun() {
		if ($("#addForm").form("valid")) {
			var formData = $("#addForm").form("formData");
			//var ur = '${ctx}/dagl/create';

			$.ajax({
				type : 'post',
				url :  '${ctx}/dagl/create',
				data : formData,
				success : function(data) {
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
	function wjqssj() {

		var bdate = $("#wjqssj").datepicker("option", "value");
		var edate = $("#wjzzsj").datepicker("option", "value");
		if (edate != "" && bdate != "" && bdate > edate) {
			$.message("文件起始日期不能大于文件结束时间");
			$("#wjqssj").datepicker("option", "value", edate);
		}
	}
</script>


<cui:form id="addForm" method="post" action="" heightStyle="fill">
	<table class="table table-condensed tableNj table-bordered table-fixed">
		<input type="hidden" name="ys" value="" />
		<tbody>
			<tr>
				<td style="width: 8%;"><label>全宗号</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="qzh" required="true" /></td>
				<td style="width: 8%;"><label>目录号</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="mlh" required="true" /></td>

			</tr>
			<tr>

				<td style="width: 8%;"><label>题名</label></td>
				<td style="width: 27%;" colspan="3"><cui:input
						componentCls="form-control" name="tm" required="true" /></td>

			</tr>
			<tr>
				<td style="width: 8%;"><label>档号</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						name="dh" required="true" /></td>
				<td><label>年度</label></td>
				<td><cui:datepicker name="nd" componentCls="form-control"
						dateFormat="yyyy" /></td>


			</tr>
			<tr>
				<td><label>保管期限</label></td>
				<td><cui:combobox id="bgqx" name="bgqx"
						componentCls="form-control" data="combobox_bgqx" required="true" /></td>
				<td><label>密级</label></td>
				<td><cui:combobox id="mj" name="mj" componentCls="form-control"
						data="combobox_mj" required="true" /></td>

			</tr>
			<tr>
				<td style="width: 8%;"><label>文号</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						id="wh" name="wh" /></td>
				<td style="width: 8%;"><label>件号</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						id="jh" name="jh" required="true" /></td>

			</tr>

			<tr>
				<td style="width: 8%;"><label>主题词</label></td>
				<td style="width: 17%;"><cui:input componentCls="form-control"
						id="ztc" name="ztc" /></td>
				<td><label>责任者</label></td>

				<td><cui:input componentCls="form-control" id="zrz" name="zrz"
						required="true" /></td>
			</tr>
			<td style="width: 8%;"><label>文件起始时间</label></td>
			<td><cui:datepicker componentCls="form-control" id="wjqssj"
					name="wjqssj" dateFormat="yyyy-MM-dd" showOn="button"
					onKeyDown="enterGo" /></td>
			<td><label>文件结束时间</label></td>

			<td><cui:datepicker componentCls="form-control" id="wjzzsj"
					name="wjzzsj" dateFormat="yyyy-MM-dd" onChange="wjqssj"
					showOn="button" onKeyDown="enterGo" /></td>
			</tr>

		</tbody>
	</table>
</cui:form>

<div class="dialog-buttons">
	<cui:button label="保存" icons="iconSave" onClick="saveFun"></cui:button>
	<cui:button label="关闭" icons="iconClose" onClick="closeDialog"></cui:button>

</div>
<script type="text/javascript">
	
</script>
