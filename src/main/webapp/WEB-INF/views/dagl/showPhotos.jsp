<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cui" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>TiltViewer</title>
<script type="text/javascript" src="${ctx}/static/js/tiltviewer/swfobject.js"></script>
<style type="text/css">	
	/* hide from ie on mac \*/
	html {
		height: 100%;
		overflow: hidden;
	}
	
	#flashcontent {
		height: 100%;
	}
	/* end hide */

	body {
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #000000;
		color:#ffffff;
		font-family:sans-serif;
		font-size:40;
	}

	a {	
		color:#cccccc;
	}
</style>
</head>
<body>

	<div id="flashcontent">TiltViewer requires JavaScript and the latest Flash player. <a href="http://www.macromedia.com/go/getflashplayer/">Get Flash here.</a></div>
	<script type="text/javascript">
	
		var fo = new SWFObject("${ctx}/static/js/tiltviewer/TiltViewer.swf", "viewer", "100%", "100%", "9.0.28", "#000000");			
		
		// TILTVIEWER CONFIGURATION OPTIONS
		// To use an option, uncomment it by removing the "//" at the start of the line
		// For a description of config options, go to: 
		// http://www.airtightinteractive.com/projects/tiltviewer/config_options.html
															
		//FLICKR GALLERY OPTIONS
		// To use images from Flickr, uncomment this block
		//fo.addVariable("useFlickr", "true");
		//fo.addVariable("user_id", "48508968@N00");
		//fo.addVariable("tags", "jump,smile");
		//fo.addVariable("tag_mode", "all");
		//fo.addVariable("showTakenByText", "true");			
		
		// XML GALLERY OPTIONS
		// To use local images defined in an XML document, use this block		
		fo.addVariable("useFlickr", "false");
		fo.addVariable("xmlURL", "${ctx}/atth/showPhotogallery/${ownerId}");
		fo.addVariable("maxJPGSize","640");
		
		//GENERAL OPTIONS		
		fo.addVariable("useReloadButton", "false");
		fo.addVariable("columns", "3");
		fo.addVariable("rows", "3");
		//fo.addVariable("showFullscreenOption", "true");
		//fo.addVariable("showFlipButton", "true");
		//fo.addVariable("showLinkButton", "true");		
		//fo.addVariable("linkLabel", "View image info");
		//fo.addVariable("frameColor", "0xFF0000");
		//fo.addVariable("backColor", "0xDDDDDD");
		//fo.addVariable("bkgndInnerColor", "0xFF00FF");
		//fo.addVariable("bkgndOuterColor", "0x0000FF");				
		//fo.addVariable("langAbout", "About");				
		
		// END TILTVIEWER CONFIGURATION OPTIONS
		
		fo.addParam("allowFullScreen","true");
		fo.write("flashcontent");			
	</script>	
</body>
</html>

