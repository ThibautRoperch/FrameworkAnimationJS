

/**********************
 * Global variables
 */

var FRAME_RATE = 60; // frame per seconds
var PARENT = null; // HTML node containing the canevas
var WIDTH = 0; // width of the canevas, px
var HEIGHT = 0; // height of the canevas, px
var BG_IMAGE = null; // path of the background image (can be "" if there isn't background image)
var OBJECTS = new Map(); // associative array containing drawing's objects, as object_identifier : Object
var PROGRAMS = new Map() // associative array containing instructions' programs, as object_identifier : array of Instruction elements
var LAYERS = new Set(); // set containing


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
	var framerate_node = root.getElementsByTagName("framerate")[0];
	var init_node = root.getElementsByTagName("init")[0];
	var background_node = root.getElementsByTagName("background")[0];
	var objects_node = root.getElementsByTagName("objects")[0];
	var programs_node = root.getElementsByTagName("programs")[0];

	// If the framerate node node exists
	if (framerate_node) {
		// TODO
	}

	// If the init's node exists
	if (init_node) {
		// TODO
	}

	// If the background's node exists
	if (background_node) {
		BG_IMAGE = background_node.textContent;
	} else {
		BG_IMAGE = "";
	}
	
	// If the objects' node exists
	if (objects_node) {
		// Create and push each object in the objects' array
		for (var read_object of objects_node.children) {
			var new_object = null;
			// Retrieve the AnimatedObjects' attributes
			var type = read_object.nodeName;
			var id = read_object.textContent;
			var x = parseInt(read_object.getAttribute("x")) | 0;
			var y = parseInt(read_object.getAttribute("y")) | 0;
			var fgcolor = read_object.hasAttribute("fgcolor") ? read_object.getAttribute("fgcolor").split(",") : [0, 0, 0];
				for (c in fgcolor) fgcolor[c] = parseInt(fgcolor[c]);
			var bgcolor = read_object.hasAttribute("bgcolor") ? read_object.getAttribute("bgcolor").split(",") : [0, 0, 0];
				for (c in bgcolor) bgcolor[c] = parseInt(bgcolor[c]);
			var bgtransparent = read_object.hasAttribute("bgtransparent") ? read_object.getAttribute("bgtransparent") == "true" : false;
			var bocolor = read_object.hasAttribute("bocolor") ? read_object.getAttribute("bocolor").split(",") : [0, 0, 0];
				for (c in bocolor) bocolor[c] = parseInt(bocolor[c]);
			var botransparent = read_object.hasAttribute("botransparent") ? read_object.getAttribute("botransparent") == "true" : false;
			var layer = parseInt(read_object.getAttribute("layer")) | 0;
			LAYERS.add(layer);
			var state = "normal";
			var visible = read_object.hasAttribute("visible") ? read_object.getAttribute("visible") == "true" : true;
			var opacity = parseInt(read_object.getAttribute("opacity")) | 1;
			// Retrieve the others specific attributes and create the associated animated object
			if (type == "object_text") {
				var text = read_object.getAttribute("text");
				var font = read_object.getAttribute("font");
				var border = parseInt(read_object.getAttribute("border")) | 0;
				var bocolor = read_object.hasAttribute("bocolor") ? read_object.getAttribute("bocolor").split(",") : [0, 0, 0];
					for (c in bocolor) bocolor[c] = parseInt(bocolor[c]);
				new_object = new Text(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, border);
			} else if (type == "object_image") {
				var width = parseInt(read_object.getAttribute("width")) | 100;
				var height = parseInt(read_object.getAttribute("height")) | 100;
				var image = read_object.getAttribute("image");
				new_object = new Image(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height, image);
			} else if (type == "object_rectangle") {
				var width = parseInt(read_object.getAttribute("width"));
				var height = parseInt(read_object.getAttribute("height"));
				var round = parseInt(read_object.getAttribute("round")) | 0;
				// new_object = new Rectangle(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height, round); // TODO renommer Box en Rectangle
			} else if (type == "object_polygon") {
				var coord_x = parseInt(read_object.getAttribute("coord_x"));
				var coord_y = parseInt(read_object.getAttribute("coord_y"));
				new_object = new Polygon(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, coord_x, coord_y);
			} else if (type == "object_circle") {
				var radius = parseInt(read_object.getAttribute("radius"));
				// new_object = new Circle(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, radius); // TODO revoir le constructeur
			} else if (type == "object_ellipse") {
				var width = parseInt(read_object.getAttribute("width"));
				var height = parseInt(read_object.getAttribute("height"));
				new_object = new Ellipse(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height);
			}
			OBJECTS.set(id, new_object);
		}
	}

	// If the programs' node exists
	if (programs_node) {
		// Create and push each instruction's program in the programs' array
		for (var read_program of programs_node.children) {
			var object_id = read_program.getAttribute("assigned_to");
			var instructions = new Array();
			for (var read_instruction of read_program.children) {
				var new_instruction = null;
				// Retrieve ...
				var type = read_instruction.nodeName;
				// Retrieve ...
				if (type == "click") {
					new_instruction = new Click(OBJECTS.get(object_id));
				} else if (type == "label") {
					var value = read_instruction.getAttribute("value");
					// new_instruction = new Label(OBJECTS.get(object_id), value); // TODO objet qui a un execute() vide
				} else if (type == "moveto") {
					// TODO plein d'attributs
					new_instruction = new MoveTo(OBJECTS.get(object_id));
				} else if (type == "wait") {
					var value = read_instruction.getAttribute("value");
					new_instruction = new Wait(OBJECTS.get(object_id), value);
				} else if (type == "sleep") {
					var value = parseInt(read_instruction.getAttribute("value"));
					new_instruction = new Sleep(OBJECTS.get(object_id), value);
				} else if (type == "state") {
					var value = read_instruction.getAttribute("value");
					new_instruction = new State(OBJECTS.get(object_id), value);
				} else if (type == "trigger") {
					var object = read_instruction.getAttribute("object");
					var value = read_instruction.getAttribute("value");
					new_instruction = new Trigger(OBJECTS.get(object_id), object, value);
				} else if (type == "goto") {
					var value = read_instruction.getAttribute("value");
					// new_instruction = new GoTo(OBJECTS.get(object_id), value); // TODO GoTo ou Goto ?
				} else if (type == "up") {
					var y = parseInt(read_instruction.getAttribute("y"));
					var dy = parseInt(read_instruction.getAttribute("dy"));
					new_instruction = new Up(OBJECTS.get(object_id), y, dy);
				} else if (type == "down") {
					var y = parseInt(read_instruction.getAttribute("y"));
					var dy = parseInt(read_instruction.getAttribute("dy"));
					new_instruction = new Down(OBJECTS.get(object_id), y, dy);
				} else if (type == "left") {
					var x = parseInt(read_instruction.getAttribute("x"));
					var dx = parseInt(read_instruction.getAttribute("dx"));
					new_instruction = new Left(OBJECTS.get(object_id), x, dx);
				} else if (type == "right") {
					var x = parseInt(read_instruction.getAttribute("x"));
					var dx = parseInt(read_instruction.getAttribute("dx"));
					new_instruction = new Right(OBJECTS.get(object_id), x, dx);
				} else if (type == "angle") {
					var degrees = parseInt(read_instruction.getAttribute("degrees"));
					new_instruction = new Angle(OBJECTS.get(object_id), degrees);
				} else if (type == "setproperty") {
					var object = read_instruction.getAttribute("object");
					var property = read_instruction.getAttribute("property");
					var value = read_instruction.getAttribute("value"); // TODO la value peut etre un entier, un bool, ou encore une cdc ; parseint dans le switch case setproperty
					new_instruction = new SetProperty(OBJECTS.get(object_id), object, property, value);
				} else if (type == "blink") {
					var times = parseInt(read_instruction.getAttribute("object"));
					var delay = parseInt(read_instruction.getAttribute("property"));
					new_instruction = new Blink(OBJECTS.get(object_id), times, delay);
				} else if (type == "stop") {
					// new_instruction = new Stop(OBJECTS.get(object_id)); // TODO objet qui a un execute() vide
				}
				instructions.push(new_instruction);
			}
			PROGRAMS.set(object_id, )
		}
	}

	// Remove the loading message
	PARENT.removeChild(PARENT.getElementsByClassName("loading")[0]);

	// Execute programs of the programs array
	execute_animation();
}

function execute_animation() {
	// Tous les programmes où l'objet assoocié n'est pas dans l'etat normal, je continue pas le programme (while obj.etat == "normal")
	// L'état peut etre : sleeping (<sleep>), l'état donné par <wait>, 
	// Traiter <label>, <goto>, <stop>
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
	
	// fill(200); // colorie l'interieur des prochaines 	figures
	// stroke(100, 1, 50); // colorie la bordure des prochaines figures

	/*ellipse(0 + x, 200 - y, 80, 80);
	x += 0.3;
	if (x > 50) {
		x = 0;
		y += 50;
	}
	if (y >= 150) {
		y = -100;
	}*/

	// Display objects of each layer, if they're set as visible
	for (var layer of LAYERS) {
		for (var object of OBJECTS.values()) {
			if (object.getLayer() == layer && object.getVisible()) {
				object.draw();
			}
		}
	}
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
		"js/Objects/Text.js",
		// Instructions
		"js/Instructions/Instruction.js",
		"js/Instructions/Angle.js",
		"js/Instructions/Blink.js",
		"js/Instructions/Center.js",
		"js/Instructions/CenterX.js",
		"js/Instructions/CenterY.js",
		"js/Instructions/Click.js",
		"js/Instructions/Down.js",
		"js/Instructions/GoTo.js",
		"js/Instructions/Label.js",
		"js/Instructions/Left.js",
		"js/Instructions/MoveTo.js",
		"js/Instructions/Right.js",
		"js/Instructions/SetProperty.js",
		"js/Instructions/Sleep.js",
		"js/Instructions/State.js",
		"js/Instructions/Stop.js",
		"js/Instructions/Trigger.js",
		"js/Instructions/Up.js",
		"js/Instructions/Visible.js",
		"js/Instructions/Wait.js",
	];

	// var a = document.createElement("script");
	// a.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js";
	// PARENT.appendChild(a);

	for (s of scripts) {
		var script = document.createElement("script");
		script.src = s;
		PARENT.appendChild(script);
	}
}
