
var OBJECTS = [];
var PROGRAMS = [];

function open_animation(source, target, width, height) {
	target.style.width = width + "px";
	target.style.height = height + "px";

	read_xml_file();
}

function read_xml_file() {
	alert(xmlDoc.getElementsByTagName("objects").childNodes);
	// while (xmlDoc.getElementsByTagName("objects")) {
		
	// }

	/*var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(fichier ,"text/xml");
	
	while (xmlDoc.getElementsByTagName("note")[i]) {
		...
	}
	*/
	
}
