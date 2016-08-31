<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<cui:layout id="coralui-layout1" fit="true">
	<cui:layoutRegion region='west' split="false" style="width: 220px" maxWidth="220" onLoad="initTreebox" onResize="initTreebox">
		<%@ include file="tree.jsp"%>
	</cui:layoutRegion> 
	<cui:layoutRegion region='center' split="false">
		<%-- <%@ include file="list.jsp"%> --%>
	</cui:layoutRegion>
</cui:layout>
<script>
$(function(){ 
	 $("#headMenu li").each(function(){
		 $(this).removeClass('current');
	  });
	$('#departmentMenu').addClass('current'); 
}); 
</script>