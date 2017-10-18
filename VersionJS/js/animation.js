

/**********************
 * Global variables
 */

var FRAME_RATE = 60; // frame per seconds
var PARENT = null; // HTML node containing the canevas
var WIDTH = 0; // width of the canevas, px
var HEIGHT = 0; // height of the canevas, px
var BG_IMAGE = null; // path of the background image (can be "" if there isn't background image)
var OBJECTS = []; // associative array containing drawing's objects, as object_identifier : Object
var PROGRAMS = []; // associative array containg instructions' programs, as object_identifier : array of Instruction elements


/**********************
 * Loading and execution functions
 */

function load_animation(source, target_id, width, height) {
	PARENT = document.getElementById(target_id);
	WIDTH = width;
	HEIGHT = height;

	// Resize the target node
	PARENT.style.width = WIDTH + "px";
	PARENT.style.height = HEIGHT + "px";

	// Display a loading message while the objects are beeing created
	var loading = document.createElement("div");
	loading.className = "loading";
	loading.innerHTML = "loading...";
	PARENT.appendChild(loading);

	// Include all other scripts
	include_scripts();

	// Read the XML file using AJAX
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			read_xml_file(xhr.responseText);
		}
	};
	xhr.open("GET", source, true);
	xhr.send();
}

function read_xml_file(contents) {
	var parser = new DOMParser();
	var root = parser.parseFromString(contents ,"text/xml");

	// Retrieve init, background, objects and programs nodes
	var init_node = root.getElementsByTagName("init")[0];
	var background_node = root.getElementsByTagName("background")[0];
	var objects_node = root.getElementsByTagName("objects")[0];
	var programs_node = root.getElementsByTagName("programs")[0];

	// If the init node exists
	if (init_node) {
		// TODO
	}

	// If the background node exists
	if (background_node) {
		BG_IMAGE = background_node.textContent;
	} else {
		BG_IMAGE = "";
	}
	
	// If the objects node exists
	if (objects_node) {
		// Create and push each object in the objects array
		for (var i = 0; i < objects_node.children.length; ++i) {
			var read_object = objects_node.children[i];
			var new_object;
			var type = read_object.nodeName;
			var id = read_object.nodeValue;
			var x = read_object.hasAttribute("x") ? parseInt(read_object.getAttribute("x")) : 0;
			var y = read_object.hasAttribute("y") ? parseInt(read_object.getAttribute("y")) : 0;
			var fgcolor = read_object.hasAttribute("fgcolor") ? read_object.getAttribute("fgcolor").split(",") : [0, 0, 0];
				for (c in fgcolor) fgcolor[c] = parseInt(fgcolor[c]);
			var bgcolor = read_object.hasAttribute("bgcolor") ? read_object.getAttribute("bgcolor").split(",") : [0, 0, 0];
				for (c in bgcolor) bgcolor[c] = parseInt(bgcolor[c]);
			var bocolor = read_object.hasAttribute("bocolor") ? read_object.getAttribute("bocolor").split(",") : [0, 0, 0];
				for (c in bocolor) bocolor[c] = parseInt(bocolor[c]);
			var layer = read_object.hasAttribute("layer") ? parseInt(read_object.getAttribute("layer")) : 0;
			var visible = read_object.hasAttribute("visible") ? read_object.getAttribute("visible") == "true" : false;
			if (type == "object_text") {
				var text = read_object.getAttribute("text");
				var font = read_object.getAttribute("font");
				var border = read_object.hasAttribute("border") ? parseInt(read_object.getAttribute("border")) : 0;
				var bgtransparent = read_object.hasAttribute("bgtransparent") ? read_object.getAttribute("bgtransparent") == "true" : false;
				new_object = new Text(id, x, y, text, font, fgcolor, bgcolor, bocolor, state, border, bgtransparent, layer, VISIBLE ICI ?);
				console.log(new_object);
				// BORDERCOLOR sur tous les objets ? si oui, BORDER sur tous les objets aussi
				// Il manque VISIBLE dans le constructeur des objets
			}
			OBJECTS[id] = new_object;
		}
	}

	// If the programs node exists
	if (programs_node) {
		// Create and push each program in the programs array

	}

	// Remove the loading message
	PARENT.removeChild(PARENT.getElementsByClassName("loading")[0]);

	// Execute programs of the programs array
	execute_animation();
}

function execute_animation() {

}


/**********************
 * P5.js drawing
 */

function setup() {
	var canevas = createCanvas(WIDTH, HEIGHT);
	canevas.parent(PARENT);
	load_background();

	// Try to load the background image while it is null
	function load_background() {
		if (BG_IMAGE != null) {
			if (BG_IMAGE != "") BG_IMAGE = loadImage(BG_IMAGE);
		} else {
			setTimeout(function() {
				load_background();
			}, 10);
		}
	}
}

x = 0;
y = 0;
function draw() {
	clear();

	frameRate(FRAME_RATE);

	if (BG_IMAGE != null) {
		background(BG_IMAGE);
	}
	
	// fill(200); // colorie l'interieur des figures
	// stroke(100, 1, 50); // colorie la bordure des figures

	// ellipse(200, 100, 80, 80);
	ellipse(0 + x, 200 - y, 80, 80);
	x += 0.3;
	if (x > 50) {
		x = 0;
		y += 50;
	}
	if (y >= 150) {
		y = -100;
	}

	// TODO
	// afficher les objets de chaque couche
}


/**********************
 * Other functions 
 */

function include_scripts() {
	scripts = [
		// p5.js
		"https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js",
		// Objects
		"js/Objects/AnimatedObject.js",
		"js/Objects/Box.js",
		"js/Objects/Grid.js",
		"js/Objects/Image.js",
		"js/Objects/Polygon.js",
		"js/Objects/Text.js"
		// Instructions
	];

	// var a = document.createElement("script");
	// a.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js";
	// PARENT.appendChild(a);

	for (s in scripts) {
		var script = document.createElement("script");
		script.src = scripts[s];
		PARENT.appendChild(script);
	}
}
