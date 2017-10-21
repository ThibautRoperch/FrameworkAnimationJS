

/**********************
 * Global variables
 */

var PARENT = null; // HTML node containing the canevas

var FRAME_RATE = 30; // frame per seconds

var WIDTH = 0; // width of the canevas, in px
var HEIGHT = 0; // height of the canevas, in px

var BG_IMAGE = null; // path of the background image (can be "" if there isn't background image)
var OBJECTS = new Map(); // associative array containing drawing's objects, as object_identifier : Object
var PROGRAMS = new Map() // associative array containing instructions' programs, as object_identifier : array of Instruction elements

var LAYERS = new Set(); // set containing

var DEFAULT_STATE = "normal";


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

	// Include all others scripts
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
			var fgcolor = read_object.hasAttribute("fgcolor") ? parseIntArray(read_object.getAttribute("fgcolor")) : [0, 0, 0];
			var bgcolor = read_object.hasAttribute("bgcolor") ? parseIntArray(read_object.getAttribute("bgcolor")) : [0, 0, 0];
			var bgtransparent = read_object.hasAttribute("bgtransparent") ? read_object.getAttribute("bgtransparent") == "true" : false;
			var bocolor = read_object.hasAttribute("bocolor") ? parseIntArray(read_object.getAttribute("bocolor")) : [0, 0, 0];
			var botransparent = read_object.hasAttribute("botransparent") ? read_object.getAttribute("botransparent") == "true" : false;
			var layer = parseInt(read_object.getAttribute("layer")) | 0;
			LAYERS.add(layer);
			var visible = read_object.hasAttribute("visible") ? read_object.getAttribute("visible") == "true" : true;
			var opacity = parseFloat(read_object.getAttribute("opacity")) | 1;
			// Retrieve the others specific attributes of the object and create the associated animated object
			if (type == "object_text") {
				var text = read_object.getAttribute("text");
				var font = read_object.getAttribute("font");
				var border = parseInt(read_object.getAttribute("border")) | 0;
				var bocolor = read_object.hasAttribute("bocolor") ? read_object.getAttribute("bocolor").split(",") : [0, 0, 0];
					for (c in bocolor) bocolor[c] = parseInt(bocolor[c]);
				new_object = new Text(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, text, font, border);
			} else if (type == "object_image") {
				var width = parseInt(read_object.getAttribute("width")) | 100;
				var height = parseInt(read_object.getAttribute("height")) | 100;
				var image = read_object.getAttribute("image");
				new_object = new Image(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, width, height, image);
			} else if (type == "object_rectangle") {
				var width = parseInt(read_object.getAttribute("width"));
				var height = parseInt(read_object.getAttribute("height"));
				var round = parseInt(read_object.getAttribute("round")) | 0;
				new_object = new Rectangle(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, width, height, round);
			} else if (type == "object_polygon") {
				var coord_x = parseInt(read_object.getAttribute("coord_x"));
				var coord_y = parseInt(read_object.getAttribute("coord_y"));
				new_object = new Polygon(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, coord_x, coord_y);
			} else if (type == "object_circle") {
				var radius = parseInt(read_object.getAttribute("radius"));
				new_object = new Circle(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, radius);
			} else if (type == "object_ellipse") {
				var width = parseInt(read_object.getAttribute("width"));
				var height = parseInt(read_object.getAttribute("height"));
				new_object = new Ellipse(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, width, height);
			}
			OBJECTS.set(id, new_object);
		}
	}

	// If the programs' node exists
	if (programs_node) {
		// Create and push each instruction's program in the programs' array
		for (var read_program of programs_node.children) {
			var object_id = read_program.getAttribute("assigned_to");
			var program = new Array();
			for (var read_instruction of read_program.children) {
				var new_instruction = null;
				// Retrieve the instruction's type
				var type = read_instruction.nodeName;
				// Retrieve the others specific attributes of the instruction and create the associated instruction
				if (type == "setx") {
					var x = read_instruction.getAttribute("x");
					new_instruction = new SetProperty(OBJECTS.get(object_id), "x", x);
				} else if (type == "sety") {
					var y = read_instruction.getAttribute("y");
					new_instruction = new SetProperty(OBJECTS.get(object_id), "y", y);
				} else if (type == "setxy") {
					var x = read_instruction.getAttribute("x");
					var y = read_instruction.getAttribute("y");
					new_instruction = new SetProperty(OBJECTS.get(object_id), "x", x);
					program.push(new_instruction);
					new_instruction = new SetProperty(OBJECTS.get(object_id), "y", y);
				} else if (type == "visible") {
					var value = read_instruction.getAttribute("value") == "true" | false;
					new_instruction = new SetProperty(OBJECTS.get(object_id), "visible", value);
				} else if (type == "click") {
					new_instruction = new Click(OBJECTS.get(object_id));
				} else if (type == "label") {
					var value = read_instruction.getAttribute("value");
					new_instruction = new Label(null, value);
				} else if (type == "moveto") {
					var x = parseInt(read_instruction.getAttribute("x"));
					var y = parseInt(read_instruction.getAttribute("y"));
					var dx = parseInt(read_instruction.getAttribute("dx"));
					var dy = parseInt(read_instruction.getAttribute("dy"));
					var delay = parseInt(read_instruction.getAttribute("delay"));
					new_instruction = new MoveTo(OBJECTS.get(object_id), x, y, dx, dy, delay);
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
					new_instruction = new GoTo(null, value);
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
					var value = read_instruction.getAttribute("value");
					new_instruction = new SetProperty(OBJECTS.get(object_id), property, value);
				} else if (type == "blink") {
					var times = parseInt(read_instruction.getAttribute("object"));
					var delay = parseInt(read_instruction.getAttribute("property"));
					new_instruction = new Blink(OBJECTS.get(object_id), times, delay);
				} else if (type == "stop") {
					new_instruction = new Stop(null);
				}
				program.push(new_instruction);
			}
			PROGRAMS.set(object_id, program);
		}
	}

	// Remove the loading message
	PARENT.removeChild(PARENT.getElementsByClassName("loading")[0]);

	// Execute programs of the programs array, as max 1 program per object
	for (object_id of OBJECTS.keys()) {
		if (PROGRAMS.get(object_id)) {
			execute_instructions(object_id, 0, new Map());
		}
	}
}

function execute_instructions(object_id, instruction_number, labels) {
	// Retrieve the program and the current instruction of the program
	var program = PROGRAMS.get(object_id);
	var instruction = program[instruction_number];

	var continue_execution = instruction_number < (program.length - 1);
	var next_instruction = instruction_number;

	// Execute the instruction if the state of the object is the default one
	if (OBJECTS.get(object_id).getState() == DEFAULT_STATE) {
		if (instruction.name == "Label") {
			labels.set(instruction.getValue(), instruction_number + 1);
			next_instruction = instruction_number + 1;
		} else if (instruction.name == "GoTo") {
			next_instruction = labels.get(instruction.getValue());
		} else if (instruction.name == "Stop") {
			var continue_execution = false;
		} else {
			instruction.execute();
			next_instruction = instruction_number + 1;
		}
	}

	if (continue_execution) {
		setTimeout(function() {
			execute_instructions(object_id, next_instruction, labels);
		}, 1000);
	}
}


/**********************
 * P5.js drawing
 */

var SALOPE;

function setup() {
	var canevas = createCanvas(WIDTH, HEIGHT);
	canevas.parent(PARENT);

	// Try to load the background image while it is null
	load_background();
	function load_background() {
		if (BG_IMAGE != null) {
			if (BG_IMAGE != "") {
				BG_IMAGE = loadImage(BG_IMAGE);
			}
		} else {
			setTimeout(function() {
				load_background();
			}, 10);
		}
	}
}

function draw() {
	clear();

	frameRate(FRAME_RATE);
	
	if (BG_IMAGE != null) {
		background(BG_IMAGE); // TODO marche pas, passer par objet image ?
	}

	// fill(200); // colorie l'interieur des prochaines figures
	// stroke(100, 1, 50); // colorie la bordure des prochaines figures

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
 * Others functions 
 */

function include_scripts() {
	scripts = [
		// p5.js
		"https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js",
		// Objects
		"js/Objects/AnimatedObject.js",
		"js/Objects/Grid.js",
		"js/Objects/Image.js",
		"js/Objects/Polygon.js",
		"js/Objects/Rectangle.js",
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

	for (s of scripts) {
		var script = document.createElement("script");
		script.src = s;
		PARENT.appendChild(script);
	}
}

function parseIntArray(string) {
	var array = string.split(",");

	for (i in array) {
		array[i] = parseInt(array[i]);
	}

	return array;
}
