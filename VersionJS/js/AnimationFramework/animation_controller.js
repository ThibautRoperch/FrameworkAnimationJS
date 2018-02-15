
/**********************
 * Global variables
 */

var ANIMATION_FILES_INCLUDED = false;
var ANIMATIONS = new Array();
var FRAME_RATE = 60; // frames displayed per second
var LOOP_DELAY_MAX = 60; // lowest speed of the animation, one frame's duration (ms)
var LOOP_DELAY_MIN = 0; // highest speed of the animation, one frame's duration (ms)


/**********************
 * Loading and execution functions
 */

function load_animation(source_file, target_id, width, height) {
    // Check if animation files are included
    if (!ANIMATION_FILES_INCLUDED) {
        console.log("Animation files are not included. Include them by this way :\n<script>include_animation_files(\"path/of/AnimationFramework/\");</script>");
    }

    // Loop with delay until main animation classes are not loaded
    if (typeof(p5) === "undefined" || typeof(Animation) === "undefined") {
        setTimeout(function() {
            load_animation(source_file, target_id, width, height);
        }, 50);
    }
    // Create the animation object when animation files are included
    else {
        if (!document.getElementById(target_id)) {
            console.log("The HTML element with id '" + target_id + "' is missing.");
            return;
        }

        var parent = document.getElementById(target_id);

        // Create the animation object
        var animation = new Animation(source_file, parent, width, height);
        ANIMATIONS.push(animation);

        // Read the animation's XML file using AJAX
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                animation.displayLoadingMessage();
                animation.readXmlFile(xhr.responseText);
                draw_animation(animation);
            } else if (xhr.readyState == 4 && !(xhr.status == 200 || xhr.status == 0)) {
                animation.displayErrorMessage(source_file, target_id);
            }
        };
        xhr.open("GET", source_file, true);
        xhr.send();
    }
}

function draw_animation(animation_obj) {
    new p5(function(draw_ref) {

        draw_ref.preload = function() { // preload function runs once
            animation_obj.preload(draw_ref);
        }

        draw_ref.setup = function() { // setup function waits until preload one is done
            animation_obj.setup(draw_ref);
        }
        
        draw_ref.draw = function() {
            animation_obj.draw(draw_ref);
        }

        draw_ref.mouseClicked = function() {
            // Get the visible objects that are under the cursor position
            animation_obj.canvasClicked(draw_ref);
            // Prevent default
            return false;
        }

    });
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
			loop_delay = LOOP_DELAY_MAX * 0.75 + LOOP_DELAY_MIN * 0.25;
			break;
		case "normal":
			loop_delay = LOOP_DELAY_MAX * 0.50 + LOOP_DELAY_MIN * 0.50;
			break;
		case "fast":
			loop_delay = LOOP_DELAY_MAX * 0.25 + LOOP_DELAY_MIN * 0.75;
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
		path + "Objects/StartButton.js",
		path + "Objects/Text.js",
		// Instructions
		path + "Instructions/Instruction.js",
		path + "Instructions/SimpleMovement.js",
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
    
    ANIMATION_FILES_INCLUDED = true;
}

/**
 * Parse a a string into an int array, splitting on commas
 */
function parseIntArray(string) {
	var array = string.split(",");

	for (i in array) {
		array[i] = parseInt(array[i]);
	}

	return array;
}
