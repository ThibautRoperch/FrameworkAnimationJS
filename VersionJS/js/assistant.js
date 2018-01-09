var last_id = -1;
var objects_list = document.getElementById("objects");
var objects_array = new Array();
var instructions_array = new Array();

wait_for_includes();
function wait_for_includes() {
	// Check if animation files are included
	if (!ANIMATION_FILES_INCLUDED) {
		console.log("Animation files are not included. Include them by this way :\n<script>include_animation_files(\"path/of/AnimationFramework/\");</script>");
	}

	// Loop with delay until main animation classes are not loaded
	if (typeof(p5) === "undefined" || typeof(Animation) === "undefined") {
		setTimeout(function() {
			wait_for_includes();
		}, 50);
	} else {
		draw_animation();
	}
}

function new_object(object_dom) {
	var obj_id = ++last_id;
	var object;

	var li = document.createElement("li");
		li.id = obj_id;
	var header = document.createElement("headerobj");
		header.onclick = function() { expand(obj_id); };
		var id = document.createElement("id");
			id.innerHTML = "Object identifier : " + obj_id;
			header.appendChild(id);
		var type = document.createElement("type");
			type.innerHTML = "Object type : " + object_dom.innerHTML;
			header.appendChild(type);
		var arrow = document.createElement("arrow");
			arrow.innerHTML = "\\/";
			header.appendChild(arrow);
	li.appendChild(header);
	var section = document.createElement("sectionobj");
		// Properties
		var article1 = document.createElement("article");
			// x
			property = document.createElement("property");
				property.className = "x";
				label = document.createElement("label");
					label.innerHTML = "x";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = "0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// y
			property = document.createElement("property");
				property.className = "y";
				label = document.createElement("label");
					label.innerHTML = "y";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = "0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// bgcolor
			property = document.createElement("property");
				property.className = "bgcolor";
				label = document.createElement("label");
					label.innerHTML = "bgcolor";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = "0,0,0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// bgtransparent
			property = document.createElement("property");
				property.className = "bgtransparent";
				label = document.createElement("label");
					label.innerHTML = "bgtransparent";
					property.appendChild(label);
				input = document.createElement("select");
					input.onchange = function() { change_property(obj_id, this); };
						option = document.createElement("option");
							option.value = "true";
							option.innerHTML = "True";
							option.selected = "selected";
							input.appendChild(option);
						option = document.createElement("option");
							option.value = "false";
							option.innerHTML = "False";
							input.appendChild(option);
					property.appendChild(input);
				article1.appendChild(property);
			// bocolor
			property = document.createElement("property");
				property.className = "bocolor";
				label = document.createElement("label");
					label.innerHTML = "bocolor";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = "0,0,0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// botransparent
			property = document.createElement("property");
				property.className = "botransparent";
				label = document.createElement("label");
					label.innerHTML = "botransparent";
					property.appendChild(label);
				input = document.createElement("select");
					input.onchange = function() { change_property(obj_id, this); };
						option = document.createElement("option");
							option.value = "true";
							option.innerHTML = "True";
							option.selected = "selected";
							input.appendChild(option);
						option = document.createElement("option");
							option.value = "false";
							option.innerHTML = "False";
							input.appendChild(option);
					property.appendChild(input);
				article1.appendChild(property);
			// layer
			property = document.createElement("property");
				property.className = "layer";
				label = document.createElement("label");
					label.innerHTML = "layer"
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = "0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// visible
			property = document.createElement("property");
				property.className = "visible";
				label = document.createElement("label");
					label.innerHTML = "visible";
					property.appendChild(label);
				input = document.createElement("select");
					input.onchange = function() { change_property(obj_id, this); };
						option = document.createElement("option");
							option.value = "true";
							option.innerHTML = "True";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "false";
							option.innerHTML = "False";
							option.selected = "selected";
							input.appendChild(option);
					property.appendChild(input);
				article1.appendChild(property);
			// opacity
			property = document.createElement("property");
				property.className = "opacity";
				label = document.createElement("label");
					label.innerHTML = "opacity";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "range";
					input.min = "0";
					input.max = "100";
					input.value = "100";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// angle
			property = document.createElement("property");
				property.className = "angle";
				label = document.createElement("label");
					label.innerHTML = "angle";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = "0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			section.appendChild(article1);
		// Instructions
		var article2 = document.createElement("article");
			var instructions = document.createElement("instructions");
				var categories = ["Position", "Move", "Interact", "Instruction", "Change property"];
				for (cat of categories) {
					button = document.createElement("button");
						button.onclick = function() { display_instructions(this); };
						button.innerHTML = cat;
						instructions.appendChild(button);
				}
				article2.appendChild(instructions);
			section.appendChild(article2);
		li.appendChild(section);
	objects_list.appendChild(li);

	// switch case
	switch (object_dom.innerHTML) {
		case "Text":
			property = document.createElement("property");
				property.className = "text";
				label = document.createElement("label");
					label.innerHTML = "text";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			object = new Text(obj_id, 0, 0, [0, 0, 0], true, [0, 0, 0], true, DEFAULT_STATE, 0, false, 1, 0); // todo
			break;
		case "Image":
			object = new ImageFile();
			break;
		case "Rectangle":
			property = document.createElement("property");
				property.className = "width";
				label = document.createElement("label");
					label.innerHTML = "width";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.value = "50";
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			property = document.createElement("property");
				property.className = "height";
				label = document.createElement("label");
					label.innerHTML = "height";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.value = "50";
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			property = document.createElement("property");
				property.className = "round";
				label = document.createElement("label");
					label.innerHTML = "round";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = "0,0,0,0";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			object = new Rectangle(obj_id, 0, 0, [0, 0, 0], true, [0, 0, 0], true, DEFAULT_STATE, 0, false, 1, 0, 50, 50, [0, 0, 0, 0]);
			console.log(object);
			break;
		case "Polygon":
			break;
		case "Circle":
			break;
		case "Ellipse":
			break;
		case "Landmark":
			break;
		case "Grid":
			break;
	}

	objects_array[obj_id] = object;
	instructions_array[obj_id] = new Array();
}

function new_instruction(object_id, object_dom) {
	// Crée, pour un id d'objet, les balises constituant une nouvelle instruction
}

function change_property(object_id, property_dom) {
	console.log(property_dom.value);
	
// pour les reponses booleenes, on va récupérer des valeurs "true" et "falses" (chaines de caractères), donc traitement préalable
// pour l'opacité, on va récup une valeur entre 0 et 100 à transformer en une valeur entre 0 et 1

	switch (property_dom.className) {
		case "x":
			objects_array[object_id].setX(property_dom.value);
			break;
	}

	draw_animation();
}

function expand(object_id) {
	var object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "displayed";
	object_dom.getElementsByTagName("headerobj")[0].onclick = function() { reduce(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "/\\";
}

function reduce(object_id) {
	var object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "hidden";
	object_dom.getElementsByTagName("headerobj")[0].onclick = function() { expand(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "\\/";
}


/**********************
 * P5.js drawing
 */

var canvas;
var drawing_dom = document.getElementById("drawing");

// re appeller drawanim quand une propertie est changé

function draw_animation() {
	var layers = new Set();

	new p5(function(draw_ref) {

		draw_ref.preload = function() { // preload function runs once
			// // Load the backround image
			// if (this.bg_image != "") {
			// 	this.bg_image = draw_ref.loadImage(this.bg_image);
			// }
			
			// // Load animation's images
			// for (var object_id of this.objects_image) {
			// 	this.objects.get(object_id).loadImage(drawing);
			// }

			for (var object of objects_array) {
				layers.add(object.getLayer());
			}
		}

		draw_ref.setup = function() { // setup function waits until preload one is done
			canvas = draw_ref.createCanvas(400, 200);
			canvas.parent(drawing_dom);
		}
		
		draw_ref.draw = function() {
			draw_ref.clear();

			draw_ref.frameRate(60);
			
			// Display the background image
			// if (BG_IMAGE != null) {
			// 	background(BG_IMAGE);
			// }

			draw_ref.fill(3);
			draw_ref.rect(100, 50, 75, 75);

			// Display objects of each layer, if they're set as visible
			for (var layer of layers) {
				for (var object of objects_array) {
					if (object.getLayer() == layer && object.getVisible()) {
						object.draw(draw_ref);
					}
				}
			}
		}

		// draw_ref.mouseClicked = function() {
		// 	// Get the visible objects that are under the cursor position
		// 	animation_obj.canvasClicked(draw_ref);
		// 	// Prevent default
		// 	return false;
		// }

	});
}
