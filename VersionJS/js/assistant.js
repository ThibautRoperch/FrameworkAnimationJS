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

	// init default attributs
	var x = 0;
	var y = 0;
	var bgcolor = [0,0,0]; // r, g, b
	var bgtransparent = true;
	var bocolor = [0,0,0]; // r, g, b
	var botransparent = true;
	var state = DEFAULT_STATE;
	var layer = 0;
	var visible = false;
	var opacity = 1;
	var angle = 0;
	var width = 50;
	var height = 50;

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
					input.placeholder = x;
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
					input.placeholder = y;
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
					input.placeholder = bgcolor;
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
					input.placeholder = bocolor;
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
					input.placeholder = layer;
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
					input.placeholder = angle;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				// article1.appendChild(property);
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
			//section.appendChild(article2); // TODO enlever pour mettre les instructions
		li.appendChild(section);
	objects_list.appendChild(li);

	// switch case
	switch (object_dom.innerHTML) {
		case "Text":
			// text
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
			// font
			var font = ["Courier", 14, "normal"];
			property = document.createElement("property");
				property.className = "font";
				label = document.createElement("label");
					label.innerHTML = "font";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.value = font;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// color
			var color = [255, 255, 255];
			property = document.createElement("property");
				property.className = "color";
				label = document.createElement("label");
					label.innerHTML = "color";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = color;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// border
			var border = 0;
			property = document.createElement("property");
				property.className = "border";
				label = document.createElement("label");
					label.innerHTML = "border";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = border;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// width
			var width = undefined;
			property = document.createElement("property");
				property.className = "width";
				label = document.createElement("label");
					label.innerHTML = "width";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = width;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// height
			var height = undefined;
			property = document.createElement("property");
				property.className = "height";
				label = document.createElement("label");
					label.innerHTML = "height";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = height;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// halignment
			var halignment = "left";
			property = document.createElement("property");
				property.className = "halignment";
				label = document.createElement("label");
					label.innerHTML = "halignment";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = halignment;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// valignment
			var valignment = "top";
			property = document.createElement("property");
				property.className = "valignment";
				label = document.createElement("label");
					label.innerHTML = "valignment";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = valignment;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			object = new Text(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, "", font, color, border, width, height, halignment, valignment);
			break;
		case "Image":
			// width
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
				label.innerHTML = "width";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// height
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
				label.innerHTML = "height";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// image
			property.appendChild(input);
			property = document.createElement("property");
			property.className = "image";
			label = document.createElement("label");
				label.innerHTML = "image";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "file";
				input.required = "required";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new ImageFile(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, undefined, undefined, image); 
			break;
		case "Rectangle":
			// width
			var width = 33;
			property = document.createElement("property");
				property.className = "width";
				label = document.createElement("label");
					label.innerHTML = "width";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.value = width;
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// height
			var height = 10;
			property = document.createElement("property");
				property.className = "height";
				label = document.createElement("label");
					label.innerHTML = "height";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.value = height;
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// round
			var round = [0, 0, 0, 0];
			property = document.createElement("property");
				property.className = "round";
				label = document.createElement("label");
					label.innerHTML = "round";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.placeholder = round;
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			object = new Rectangle(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, width, height, round);
			break;
		case "Polygon":
			// coord_x
			var coord_x = [];
			property = document.createElement("property");
				property.className = "coord_x";
				label = document.createElement("label");
					label.innerHTML = "coord_x";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text"
					input.value = "";
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// coord_y
			var coord_y = [];
			property = document.createElement("property");
				property.className = "coord_y";
				label = document.createElement("label");
					label.innerHTML = "coord_y";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.value = "";
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);	
			object = new Polygon(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, coord_x, coord_y); 
			break;
		case "Circle":
			// radius
			var radius = 10;
			property = document.createElement("property");
			property.className = "radius";
			label = document.createElement("label");
				label.innerHTML = "radius";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "10";
				input.required = "required";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new Circle(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, radius, radius); 
			break;
		case "Ellipse":
			// width
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
			// height
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
			object = new Ellipse(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, width, height); 
			break;
		case "Landmark":			
			// width
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
			// height
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
			// scaleX
			var scaleX = 1;
			property = document.createElement("property");
			property.className = "scaleX";
			label = document.createElement("label");
				label.innerHTML = "scaleX";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "1";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// scaleY
			var scaleY = 1;
			property = document.createElement("property");
			property.className = "scaleY";
			label = document.createElement("label");
				label.innerHTML = "scaleY";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "1";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// unitX
			var unitX = "cm";
			property = document.createElement("property");
			property.className = "unitX";
			label = document.createElement("label");
				label.innerHTML = "unitX";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "text";
				input.value = "cm";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// unitY
			var unitY = "cm";
			property = document.createElement("property");
			property.className = "unitY";
			label = document.createElement("label");
				label.innerHTML = "unitY";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "text";
				input.value = "cm";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new Landmark(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, width, height, scaleX, scaleY, unitX, unitY); 
			break;
		case "Grid":
			// columns
			var columns = 3;
			property = document.createElement("property");
			property.className = "column";
			label = document.createElement("label");
				label.innerHTML = "column";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "3";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// lines
			var lines = 4;
			property = document.createElement("property");
			property.className = "line";
			label = document.createElement("label");
				label.innerHTML = "line";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "4";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// column_width
			var column_width = 15;
			property = document.createElement("property");
			property.className = "column_width";
			label = document.createElement("label");
				label.innerHTML = "column_width";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "15";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// line_height
			var line_height = 10;
			property = document.createElement("property");
			property.className = "line_height";
			label = document.createElement("label");
				label.innerHTML = "line_height";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = "10";
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new Grid(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, lines, columns, line_height, column_width); //todo
			break;
	}

	objects_array[obj_id] = object;
	instructions_array[obj_id] = new Array();
}

function new_instruction(object_id, object_dom) {
	// Crée, pour un id d'objet, les balises constituant une nouvelle instruction
}

function change_property(object_id, property_dom) {
	new SetProperty(null, objects_array[object_id], property_dom.parentNode.className, property_dom.value).execute();
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

function to_xml() {
	console.log("--------------------------------\n");
	for (var object of objects_array) {
		console.log(object.toXml());
	}
}

/**********************
 * P5.js drawing
 */

var canvas;
var drawing_dom = document.getElementById("drawing");

// re appeller drawanim quand une propertie est changé

function draw_animation() {
	var layers = new Set();

	if (drawing_dom.hasChildNodes()) {
		drawing_dom.removeChild(drawing_dom.firstChild);
	};

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
			canvas = draw_ref.createCanvas(parseInt(document.getElementById("width").value), parseInt(document.getElementById("height").value));
			canvas.parent(drawing_dom);
		}
		
		draw_ref.draw = function() {
			draw_ref.clear();

			draw_ref.frameRate(60); // 60 fps
			
			// Display the background image
			// if (BG_IMAGE != null) {
			// 	background(BG_IMAGE);
			// }

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
