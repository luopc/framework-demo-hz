<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>档案列表</title>

<script>
var combobox_bgqx=[
                   {"value":0,"text":"永久"},
        		   {"value":1, "text":"长期"},
        		   {"value":2,"text":"30年"},
        		   {"value":3,"text":"10年"}
        		   ];
var combobox_mj=[
                   {"value":1,"text":"公开"},
        		   {"value":2, "text":"国内"},
        		   {"value":3,"text":"内部"},
        		   {"value":4,"text":"秘密"},
        		   {"value":5,"text":"机密"},
        		   {"value":6,"text":"绝密"}
        		   ];
		
    	
    	function resetHandler() {
    		$("#queryForm").form("clear", {
    			excluded : [ "readonly" ]
    		});
    	}
    	function search() {
    		var postData = {};
    		var dh = $('#dh1').val();
    		var tm = $('#tm1').val();
    		var nd = $('#nd1').val();
    		var zrz = $('#zrz1').val();
    		var bgqx = $('#bgqx1').combobox("getValue");
    		if (dh != "") {
    			postData['Q_LIKE_dh'] = dh;
    		}
    		if (tm != "") {
    			postData['Q_LIKE_tm'] = tm;
    		}
    		if (bgqx != "") {
    			postData['Q_LIKE_bgqx'] = bgqx;
    		}
    		if (nd != "") {
    			postData['Q_LIKE_nd'] = nd;
    		}
    		if (zrz != "") {
    			postData['Q_LIKE_zrz'] = zrz;
    		}
    		$('#gridDagl').grid('option', 'postData', postData);
    		$('#gridDagl').grid('reload');
    	}
    	
    	
        </script>
</head>
<body>

	<div class="content">
		<div class="right-content">
			<div class="info">
				<div class="function clearfix">
					<div class="clearfix">
						<div align="center">
							<cui:form id="queryForm">
								<table class="table table-condensed table table-fixed">
									<tr>
										<td><label>档号</label></td>
										<td><cui:input name="dh" id="dh1" /></td>
										<td><label>题名 </label></td>
										<td><cui:input name="tm" id="tm1" /></td>
										<td><label>保管期限 </label></td>
										<td><cui:combobox id="bgqx1" name="bgqx"
												data="combobox_bgqx" /></td>
									</tr>
									<tr>
										<td><label>年度</label></td>
										<td><cui:datepicker id="nd1" name="nd1" dateFormat="yyyy"
												showOn="button" onKeyDown="enterGo" /></td>
										<td><label>责任者 </label></td>
										<td><cui:input name="zrz" id="zrz1" /></td>
										<td style="padding-left: 13%" colspan="2"><cui:button
												id="searchBtn" label="查询" onClick="search"></cui:button> <cui:button
												id="resetBtn" label="重置" onClick="resetHandler"></cui:button>
										</td>
									</tr>

								</table>
							</cui:form>
						</div>
					</div>

				</div>
				<div>
					
				</div>
				<cui:grid id="gridDagl" rownumbers="false" multiselect="true"
					sortname="dh" sortorder="asc" url="${ctx}/dagl/relevance"
					fitStyle="fill" onDblClickRow="onDblClickRow" width="auto">
					<cui:gridCols>
						<cui:gridCol name="id" hidden="true" key="true" width="50">主键</cui:gridCol>
						<cui:gridCol align="center" width="50" name="dh" sortable="true"
							formatter="convertCode" revertCode="true">档号</cui:gridCol>
						<cui:gridCol align="center" width="20" name="tm" sortable="true"
							formatter="convertCode" revertCode="true">题名</cui:gridCol>
						
						<cui:gridCol align="center" width="20" name="nd" sortable="true">年度</cui:gridCol>
						<cui:gridCol align="center" width="20" name="bgqx" sortable="true"
							formatter="convertCode" revertCode="true"
							formatoptions="{
								'data':combobox_bgqx
								}">保管期限</cui:gridCol>
						
						<cui:gridCol align="center" width="20" name="fileName" sortable="true"
							revertCode="true">文件名称</cui:gridCol>
						<cui:gridCol align="center" width="20" name="fileSize"
							sortable="true" revertCode="true">文件大小</cui:gridCol>
					</cui:gridCols>
					<cui:gridPager gridId="gridDagl"></cui:gridPager>
				</cui:grid>




				<cui:dialog id="adddialog" reLoadOnOpen="true" modal="true"
					autoOpen="false" width="80%" height="50%" maximizable="false">
				</cui:dialog>

			</div>
		</div>
	</div>
</body>
</html>

