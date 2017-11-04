
/**********************
 * Global variables
 */

var ANIMATIONS = new Array();
var FRAME_RATE = 60; // frames displayed per second
var LOOP_DELAY_MAX = 60; // lowest speed of the animation, one frame's duration (ms)
var LOOP_DELAY_MIN = 0; // highest speed of the animation, one frame's duration (ms)


/**********************
 * Loading and execution functions
 */

function load_animation(source_file, target_id, width, height) {
	var parent = document.getElementById(target_id);
	
	// Create the animation
	var animation = new Animation(source_file, parent, width, height);
	ANIMATIONS.push(animation);

	// Read the animation's XML file using AJAX
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			animation.displayLoadingMessage();
			animation.readXmlFile(xhr.responseText);
		} else if (xhr.readyState == 4 && !(xhr.status == 200 || xhr.status == 0)) {
			animation.displayErrorMessage(source_file, target_id);
		}
	};
	xhr.open("GET", source_file, true);
	xhr.send();
}

/**********************
 * P5.js drawing
 */

function preload() { // preload() runs once
	for (animation of ANIMATIONS)
		animation.preload();
}

function setup() { // setup() waits until preload() is done
	for (animation of ANIMATIONS)
		animation.setup();
}

function draw() {
	frameRate(FRAME_RATE);
	
	for (animation of ANIMATIONS)
		animation.draw();
}

function canvasClicked() {
	console.log("click en " + mouseX + " " + mouseY); // TODO pour savoir si les coordonées sont les mêmes d'un canvas à l'autre
	// Get the visible objects that are under the cursor position
	for (animation of ANIMATIONS)
		animation.canvasClicked(mouseX, mouseY);

	// Prevent default
	return false;
}


/**********************
 * Others functions 
 */

function speed(speed) {
	var loop_delay = 30;

	switch (speed) {
		case "very slow":
			loop_delay = LOOP_DELAY_MAX;
			break;
		case "slow":
			loop_delay = LOOP_DELAY_MAX * 0.75 + LOOP_DELAY-MIN * 0.25;
			break;
		case "normal":
			loop_delay = LOOP_DELAY_MAX * 0.50 + LOOP_DELAY-MIN * 0.50;
			break;
		case "fast":
			loop_delay = LOOP_DELAY_MAX * 0.25 + LOOP_DELAY-MIN * 0.75;
			break;
		case "very fast":
			loop_delay = LOOP_DELAY_MIN;
			break;
		default:
			console.log("Unrecognized speed, availables values are 'very slow', 'slow', 'normal', 'fast', 'very fast'.");
	}

	return loop_delay;
}

function include_animation_files(path) {
	path += "/";
	scripts = [
		// p5.js
        "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js",
        // Animation
		path + "Animation.js",
		// Objects
		path + "Objects/AnimatedObject.js",
		path + "Objects/Ellipse.js",
		path + "Objects/Circle.js",
		path + "Objects/Grid.js",
		path + "Objects/ImageFile.js",
		path + "Objects/Landmark.js",
		path + "Objects/Polygon.js",
		path + "Objects/Rectangle.js",
		path + "Objects/Text.js",
		// Instructions
		path + "Instructions/Instruction.js",
		path + "Instructions/Blink.js",
		path + "Instructions/Center.js",
		path + "Instructions/CenterX.js",
		path + "Instructions/CenterY.js",
		path + "Instructions/Click.js",
		path + "Instructions/Down.js",
		path + "Instructions/GoTo.js",
		path + "Instructions/Label.js",
		path + "Instructions/Left.js",
		path + "Instructions/MoveTo.js",
		path + "Instructions/Right.js",
		path + "Instructions/SetProperty.js",
		path + "Instructions/Sleep.js",
		path + "Instructions/State.js",
		path + "Instructions/Stop.js",
		path + "Instructions/Trigger.js",
		path + "Instructions/Up.js",
		path + "Instructions/Wait.js",
	];

	for (s of scripts) {
		var script = document.createElement("script");
		script.src = s;
		document.lastChild.appendChild(script);
	}
}

function parseIntArray(string) {
	var array = string.split(",");

	for (i in array) {
		array[i] = parseInt(array[i]);
	}

	return array;
}


