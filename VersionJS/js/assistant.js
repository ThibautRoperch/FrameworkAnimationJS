import { Animation } from './AnimationFramework/Animation.js';

import { Ellipse } from './AnimationFramework/Objects/Ellipse.js';
import { Circle } from './AnimationFramework/Objects/Circle.js';
import { Grid } from './AnimationFramework/Objects/Grid.js';
import { ImageFile } from './AnimationFramework/Objects/ImageFile.js';
import { Landmark } from './AnimationFramework/Objects/Landmark.js';
import { Polygon } from './AnimationFramework/Objects/Polygon.js';
import { Rectangle } from './AnimationFramework/Objects/Rectangle.js';
import { Text } from './AnimationFramework/Objects/Text.js';
import { Table } from './AnimationFramework/Objects/Table.js';
import { Graph } from './AnimationFramework/Objects/Graph.js';
import { Arrow } from './AnimationFramework/Objects/Arrow.js';

import { SetProperty } from './AnimationFramework/Instructions/SetProperty.js';

import { ANIMATION_FILES_INCLUDED, parseIntArray, include_animation_files } from './AnimationFramework/animation_controller.js';
import { DEFAULT_STATE } from './AnimationFramework/Objects/AnimatedObject.js';

// Global variables
let last_id = -1;
let objects_list = document.getElementById("objects");
let objects_array = new Array();
let instructions_array = new Array();
let objects_image_id = new Array();
let removed_objects_identifier = new Array();

let sketch;

// Setup of the listeners on the different elemnt of the DOM
document.getElementById("openAnimation").addEventListener("click", function () { ask_popup('Change object identifier', 'Choose the XML file containing the animation to open.<input id=\'animation_file\' type=\'file\' placeholder=\'benchmark.xml\' required />', import_xml, 'animation_file') });
document.getElementById("exportAnimation").addEventListener('click', export_xml);
document.getElementById("addText").addEventListener('click', function () { new_object('Text') });
document.getElementById("addImage").addEventListener('click', function () { new_object('ImageFile') });
document.getElementById("addRectangle").addEventListener('click', function () { new_object('Rectangle') });
document.getElementById("addPolygon").addEventListener('click', function () { new_object('Polygon') });
document.getElementById("addCircle").addEventListener('click', function () { new_object('Circle') });
document.getElementById("addEllipse").addEventListener('click', function () { new_object('Ellipse') });
document.getElementById("addLandmark").addEventListener('click', function () { new_object('Landmark') });
document.getElementById("addGrid").addEventListener('click', function () { new_object('Grid') });
document.getElementById("addTable").addEventListener('click', function () { new_object('Table') });
document.getElementById("addGraph").addEventListener('click', function () { new_object('Graph') });
document.getElementById("addArrow").addEventListener('click', function () { new_object('Arrow') });
document.getElementById("width").addEventListener('change', function () { sketch.resizeCanvas(this.value, document.getElementById("height").value); update_section_size();});
document.getElementById("height").addEventListener('change', function () { sketch.resizeCanvas(document.getElementById("width").value, this.value); update_section_size(); });
document.getElementById("myBackground").addEventListener('change', function () { sketch.load_background() });

// Include P5.js
include_animation_files('js/AnimationFramework/');
wait_for_includes();
/**
 * Function to check if p5 JS is include and if it isn't wait before starting the animation
 */
function wait_for_includes() {
	// Check if animation files are included
	if (!ANIMATION_FILES_INCLUDED) {
		console.log("Animation files are not included. Include them by this way :\n<script>include_animation_files(\"path/of/AnimationFramework/\");</script>");
	}

	// Loop with delay until animation classes are not loaded
	if (typeof (p5) === "undefined" || typeof (Animation) === "undefined") {
		setTimeout(function () {
			wait_for_includes();
		}, 150);
	} else {
		draw_animation();
	}
}

/**
 * Import the file inside the specified input
 * @param {String} input_id 
 * @returns 
 */
function import_xml(input_id) {
	let source_file = document.getElementById(input_id).files[0].name;
	if (source_file === "") return; // stop here if the input is empty (won't try to read the file and will keep the popup active)

	let animation = new Animation(source_file, null, undefined, undefined);

	// Read the animation's XML file using AJAX
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			animation.readXmlFile(xhr.responseText);
			// Retrieve background path
			if (animation.getBackground() != null) {
				document.getElementById("myBackground").value = animation.getBackground().trim();
				sketch.load_background();
			}
			// Remove all current objects
			let number_object = document.getElementById("objects").childElementCount;
			for (let i = 0; i < number_object; ++i) {
				remove(i);
			}

			// Re-create all read objects
			for (let obj of animation.getObjects().values()) {
				let fake_button = document.createElement("button");
				fake_button.innerHTML = obj.constructor.name;
				let new_obj_id = new_object(fake_button.innerHTML);
				document.getElementById(new_obj_id).getElementsByTagName("id")[0].innerHTML = "<b>Identifier :</b> " + obj.id;
				for (let prop of obj.toXml().attributes) {
					// Change the value of this property
					new SetProperty(null, objects_array[new_obj_id], prop.name, prop.value).execute();
					// Display the value of this property
					// Try to retrieve the DOM of this property
					let property_dom = objects_list.lastChild.getElementsByClassName(prop.name)[0];
					if (property_dom) {
						// Try to retrieve the input of this property
						// Otherwise, this is a select option
						let property_input = property_dom.getElementsByTagName("input")[0];
						if (property_input) {
							if (property_input.type == "range") property_input.value = parseInt(prop.value) * 100;
							else property_input.value = prop.value;
						} else {
							let i = 0;
							while (property_dom.getElementsByTagName("option")[i]) {
								let option = property_dom.getElementsByTagName("option")[i];
								let selected = (option.value === prop.value) ? "selected" : "";
								property_dom.getElementsByTagName("option")[i].selected = selected;
								++i;
							}
						}
					} else {
						console.log("[assistant.js] La propriété '" + prop.name + "' pour l'objet de type " + fake_button.innerHTML + " est inconnue de l'assistant"); // dans ce cas, rajouter l'attribut (fonction new_object, faire un DOM property qui a pour className le nom de l'attribut)
					}
				}
			}
			//draw_animation();
		}
	};
	xhr.open("GET", source_file, true);
	xhr.send();

	document.getElementById("ask_popup").className = "";
}

/**
 * Create an object of the specified type
 * @param {String} object_type 
 * @returns 
 */
function new_object(object_type) {
	let obj_id = ++last_id;
	let object;

	let li = document.createElement("li");
	li.id = obj_id;
	let header = document.createElement("headerobj");

	let spoiler = document.createElement("div");
	spoiler.onclick = function () { expand(obj_id); };

	let id = document.createElement("id");
	id.innerHTML = "<b>Identifier :</b> " + obj_id;
	spoiler.appendChild(id);

	let type = document.createElement("type");
	type.innerHTML = "<b>Type :</b> " + object_type;
	spoiler.appendChild(type);

	let arrow = document.createElement("arrow");
	arrow.innerHTML = "&#11167;";
	spoiler.appendChild(arrow);
	header.appendChild(spoiler);

	let pen = document.createElement("div");
	pen.className = "warning";
	pen.onclick = function () { ask_popup("Change object identifier", "Enter below the new id for the object <b>" + obj_id + "</b>.<input id='new_id' type='text' value='" + objects_array[obj_id].id  + "' required/>", change_id, [obj_id, "new_id"]); };
	pen.innerHTML = "&#128397;";
	header.appendChild(pen);

	let style = document.createElement("div");
	style.className = "warning";
	style.onclick = function () { customize(obj_id); };
	style.innerHTML = "&#127912;";
	header.appendChild(style);

	let trash = document.createElement("div");
	trash.className = "danger";
	trash.onclick = function () { remove(obj_id); };
	trash.innerHTML = "&#10060;";
	header.appendChild(trash);

	li.appendChild(header);

	// init default attributs
	let x = 0;
	let y = 0;
	let background_color = [0, 0, 0]; // r, g, b
	let background_transparent = true;
	let border_color = [0, 0, 0]; // r, g, b
	let border_transparency = false;
	let border_size = 1;
	let state = DEFAULT_STATE;
	let layer = 0;
	let visible = true;
	let opacity = 1;
	let angle = 0;
	let width = 50;
	let height = 50;

	let section = document.createElement("sectionobj");
	// Properties
	let article1 = document.createElement("article");

	// x
	let property = document.createElement("property");
	property.className = "x";
	let label = document.createElement("label");
	label.innerHTML = "x";
	property.appendChild(label);
	let input = document.createElement("input");
	input.type = "number";
	input.placeholder = x;
	input.onchange = function () { change_property(obj_id, this); };
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
	input.onchange = function () { change_property(obj_id, this); };
	property.appendChild(input);
	article1.appendChild(property);

	// background_color
	property = document.createElement("property");
	property.className = "background_color";
	label = document.createElement("label");
	label.innerHTML = "background_color";
	property.appendChild(label);
	input = document.createElement("input");
	input.type = "text";
	input.placeholder = background_color;
	input.onchange = function () { change_property(obj_id, this); };
	property.appendChild(input);
	article1.appendChild(property);

	// background_transparent
	property = document.createElement("property");
	property.className = "background_transparent";
	label = document.createElement("label");
	label.innerHTML = "background_transparent";
	property.appendChild(label);
	input = document.createElement("select");
	input.onchange = function () { change_property(obj_id, this); };
	let option = document.createElement("option");
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

	// border_color
	property = document.createElement("property");
	property.className = "border_color";
	label = document.createElement("label");
	label.innerHTML = "border_color";
	property.appendChild(label);
	input = document.createElement("input");
	input.type = "text";
	input.placeholder = border_color;
	input.onchange = function () { change_property(obj_id, this); };
	property.appendChild(input);
	article1.appendChild(property);

	// border_transparency
	property = document.createElement("property");
	property.className = "border_transparency";
	label = document.createElement("label");
	label.innerHTML = "border_transparency";
	property.appendChild(label);
	input = document.createElement("select");
	input.onchange = function () { change_property(obj_id, this); };
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

	// border_size
	property = document.createElement("property");
	property.className = "border_size";
	label = document.createElement("label");
	label.innerHTML = "border_size";
	property.appendChild(label);
	input = document.createElement("input");
	input.type = "number";
	input.placeholder = border_size;
	input.onchange = function () { change_property(obj_id, this); };
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
	input.onchange = function () { change_property(obj_id, this); };
	property.appendChild(input);
	article1.appendChild(property);

	// visible
	property = document.createElement("property");
	property.className = "visible";
	label = document.createElement("label");
	label.innerHTML = "visible";
	property.appendChild(label);

	input = document.createElement("select");
	input.onchange = function () { change_property(obj_id, this); };
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
	input.onchange = function () { change_property(obj_id, this); };
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
	input.onchange = function () { change_property(obj_id, this); };
	property.appendChild(input);
	article1.appendChild(property);
	section.appendChild(article1);

	// Instructions
	let article2 = document.createElement("article");
	let instructions = document.createElement("instructions");
	let categories = ["Position", "Move", "Interact", "Instruction", "Change property"];
	for (let cat of categories) {
		let button = document.createElement("button");
		button.onclick = function () { display_instructions(this); };
		button.innerHTML = cat;
		instructions.appendChild(button);
	}
	article2.appendChild(instructions);
	//section.appendChild(article2); // TODO à enlever pour mettre les instructions
	li.appendChild(section);
	objects_list.appendChild(li);

	// switch case
	switch (object_type) {

		case "Text":
			// text
			property = document.createElement("property");
			property.className = "text";
			label = document.createElement("label");
			label.innerHTML = "text";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// font
			let font = ["Courier", 14, "normal"];
			property = document.createElement("property");
			property.className = "font";
			label = document.createElement("label");
			label.innerHTML = "font";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = font;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// color
			let color = [0,0,0];
			property = document.createElement("property");
			property.className = "color";
			label = document.createElement("label");
			label.innerHTML = "color";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = color;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// padding
			let padding = 0;
			property = document.createElement("property");
			property.className = "padding";
			label = document.createElement("label");
			label.innerHTML = "padding";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = padding;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// width
			width = undefined;
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
			label.innerHTML = "width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.placeholder = width;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height
			height = undefined;
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
			label.innerHTML = "height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.placeholder = height;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// round
			let round_text = [0, 0, 0, 0];
			property = document.createElement("property");
			property.className = "round";
			label = document.createElement("label");
			label.innerHTML = "round";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = round_text;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// halignment
			let halignment = "center";
			property = document.createElement("property");
			property.className = "halignment";
			label = document.createElement("label");
			label.innerHTML = "halignment";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
			option = document.createElement("option");
			option.value = "left";
			option.innerHTML = "Left";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "center";
			option.innerHTML = "Center";
			option.selected = "selected";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "right";
			option.innerHTML = "Right";
			input.appendChild(option);
			property.appendChild(input);
			article1.appendChild(property);
			// valignment
			let valignment = "center";
			property = document.createElement("property");
			property.className = "valignment";
			label = document.createElement("label");
			label.innerHTML = "valignment";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
			option = document.createElement("option");
			option.value = "top";
			option.innerHTML = "Top";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "bottom";
			option.innerHTML = "Bottom";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "center";
			option.innerHTML = "Center";
			option.selected = "selected";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "baseline";
			option.innerHTML = "Baseline";
			input.appendChild(option);
			property.appendChild(input);
			article1.appendChild(property);
			object = new Text(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, "", font, color, padding, width, height, halignment, valignment, round_text);
			break;
		case "ImageFile":
			// width
			width = 50;
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
			label.innerHTML = "width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = width;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height
			height = 50;
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
			label.innerHTML = "height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = height;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// image
			let image = "img/yellow_blue_linear_gradient.png";
			property.appendChild(input);
			property = document.createElement("property");
			property.className = "image";
			label = document.createElement("label");
			label.innerHTML = "image";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = image;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new ImageFile(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, image);
			objects_image_id.push(obj_id);
			break;
		case "Rectangle":
			// width
			width = 33;
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
			label.innerHTML = "width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = width;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height
			height = 10;
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
			label.innerHTML = "height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = height;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// round
			let round = [0, 0, 0, 0];
			property = document.createElement("property");
			property.className = "round";
			label = document.createElement("label");
			label.innerHTML = "round";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = round;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Rectangle(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, round);
			break;
		case "Polygon":
			// coord_x
			let coord_x = [0, 80, 80, 40];
			property = document.createElement("property");
			property.className = "coord_x";
			label = document.createElement("label");
			label.innerHTML = "coord_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text"
			input.value = coord_x;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// coord_y
			let coord_y = [0, 0, 60, 60];
			property = document.createElement("property");
			property.className = "coord_y";
			label = document.createElement("label");
			label.innerHTML = "coord_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = coord_y;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Polygon(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, coord_x, coord_y);
			break;
		case "Circle":
			// radius
			let radius = 30;
			property = document.createElement("property");
			property.className = "radius";
			label = document.createElement("label");
			label.innerHTML = "radius";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = "10";
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Circle(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, radius, radius);
			break;
		case "Ellipse":
			// width
			width = 60;
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
			label.innerHTML = "width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = width;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height
			height = 40;
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
			label.innerHTML = "height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = height;
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Ellipse(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height);
			break;
		case "Landmark":
			// We set x-y at 60-60 at default to see it well in preview
			let number_property = document.getElementsByClassName("x").length - 1
			let obj = document.getElementsByClassName("x")[number_property].childNodes[1];
			obj.placeholder = "30";
			obj = document.getElementsByClassName("y")[number_property].childNodes[1];
			obj.placeholder = "110";
			// width
			width = 100;
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
			label.innerHTML = "width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = "50";
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height
			height = 100;
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
			label.innerHTML = "height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = "50";
			input.required = "required";
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// scale_x
			let scale_x = 10;
			property = document.createElement("property");
			property.className = "scale_x";
			label = document.createElement("label");
			label.innerHTML = "scale_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = scale_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// scale_y
			let scale_y = 10;
			property = document.createElement("property");
			property.className = "scale_y";
			label = document.createElement("label");
			label.innerHTML = "scale_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = scale_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// unit_x
			let unit_x = "";
			property = document.createElement("property");
			property.className = "unit_x";
			label = document.createElement("label");
			label.innerHTML = "unit_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = unit_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// unit_y
			let unit_y = "";
			property = document.createElement("property");
			property.className = "unit_y";
			label = document.createElement("label");
			label.innerHTML = "unit_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = unit_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// max_x
			let max_x = 50;
			property = document.createElement("property");
			property.className = "max_x";
			label = document.createElement("label");
			label.innerHTML = "max_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = max_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// max_y
			let max_y = 50;
			property = document.createElement("property");
			property.className = "max_y";
			label = document.createElement("label");
			label.innerHTML = "max_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = max_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// min_x
			let min_x = 0;
			property = document.createElement("property");
			property.className = "min_x";
			label = document.createElement("label");
			label.innerHTML = "min_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = min_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// min_y
			let min_y = 0;
			property = document.createElement("property");
			property.className = "min_y";
			label = document.createElement("label");
			label.innerHTML = "min_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = min_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Landmark(obj_id, 30, 110, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, scale_x, scale_y, unit_x, unit_y, max_x, max_y, min_x, min_y);
			break;
		case "Grid":
			// lines
			let lines = 3;
			property = document.createElement("property");
			property.className = "lines";
			label = document.createElement("label");
			label.innerHTML = "lines";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = lines;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// columns
			let columns = 3;
			property = document.createElement("property");
			property.className = "columns";
			label = document.createElement("label");
			label.innerHTML = "columns";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = columns;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// line_height
			let line_height = 20;
			property = document.createElement("property");
			property.className = "line_height";
			label = document.createElement("label");
			label.innerHTML = "line_height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = line_height;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// column_width
			let column_width = 20;
			property = document.createElement("property");
			property.className = "column_width";
			label = document.createElement("label");
			label.innerHTML = "column_width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = column_width;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Grid(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, lines, columns, line_height, column_width);
			break;
		case "Table" :
			// values
			let values = "";
			property = document.createElement("property");
			property.className = "values";
			label = document.createElement("label");
			label.innerHTML = "values";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = values;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// line_height
			let tab_line_height = "30";
			property = document.createElement("property");
			property.className = "line_height";
			label = document.createElement("label");
			label.innerHTML = "line_height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = tab_line_height;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// column_width
			let tab_column_width = "60";
			property = document.createElement("property");
			property.className = "column_width";
			label = document.createElement("label");
			label.innerHTML = "column_width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = tab_column_width;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// font
			let text_font = ["Courier", 14, "normal"];
			property = document.createElement("property");
			property.className = "font";
			label = document.createElement("label");
			label.innerHTML = "font";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = text_font;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// color
			let text_color = [0,0,0];
			property = document.createElement("property");
			property.className = "color";
			label = document.createElement("label");
			label.innerHTML = "color";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = text_color;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// padding
			let tab_padding = 0;
			property = document.createElement("property");
			property.className = "padding";
			label = document.createElement("label");
			label.innerHTML = "padding";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = tab_padding;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// halignment
			let text_halignment = "center";
			property = document.createElement("property");
			property.className = "halignment";
			label = document.createElement("label");
			label.innerHTML = "halignment";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
			option = document.createElement("option");
			option.value = "left";
			option.innerHTML = "Left";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "center";
			option.innerHTML = "Center";
			option.selected = "selected";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "right";
			option.innerHTML = "Right";
			input.appendChild(option);
			property.appendChild(input);
			article1.appendChild(property);
			// valignment
			let text_valignment = "center";
			property = document.createElement("property");
			property.className = "valignment";
			label = document.createElement("label");
			label.innerHTML = "valignment";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
			option = document.createElement("option");
			option.value = "top";
			option.innerHTML = "Top";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "bottom";
			option.innerHTML = "Bottom";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "center";
			option.innerHTML = "Center";
			option.selected = "selected";
			input.appendChild(option);
			option = document.createElement("option");
			option.value = "baseline";
			option.innerHTML = "Baseline";
			input.appendChild(option);
			property.appendChild(input);
			article1.appendChild(property);
			// has_header_columns
			property = document.createElement("property");
			property.className = "has_header_columns";
			label = document.createElement("label");
			label.innerHTML = "has_header_columns";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
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
			// has_header_rows
			property = document.createElement("property");
			property.className = "has_header_rows";
			label = document.createElement("label");
			label.innerHTML = "has_header_rows";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
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
			// header_font
			let header_font = ["Courier", 14, "normal"];
			property = document.createElement("property");
			property.className = "header_font";
			label = document.createElement("label");
			label.innerHTML = "header_font";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = header_font;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// header_color
			let header_color = [0,0,0];
			property = document.createElement("property");
			property.className = "header_color";
			label = document.createElement("label");
			label.innerHTML = "header_color";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = header_color;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// header_background_color
			let header_background_color = [150,150,150];
			property = document.createElement("property");
			property.className = "header_background_color";
			label = document.createElement("label");
			label.innerHTML = "header_background_color";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.placeholder = header_background_color;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// header_line_height
			let header_line_height = 30;
			property = document.createElement("property");
			property.className = "header_line_height";
			label = document.createElement("label");
			label.innerHTML = "header_line_height";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = header_line_height;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// header_column_width
			let header_column_width = 80;
			property = document.createElement("property");
			property.className = "header_column_width";
			label = document.createElement("label");
			label.innerHTML = "header_column_width";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = header_column_width;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// Create table object
			object = new Table(obj_id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, values, tab_line_height, tab_column_width, text_font, text_color, tab_padding, text_halignment, text_valignment, false, false, header_font, header_color, header_background_color, header_column_width, header_line_height);
			break;
		case "Graph":
			// We set x-y at 60-60 at default to see it well in preview
			let graph_number_property = document.getElementsByClassName("x").length - 1
			let graph_obj = document.getElementsByClassName("x")[graph_number_property].childNodes[1];
			graph_obj.placeholder = "60";
			graph_obj = document.getElementsByClassName("y")[graph_number_property].childNodes[1];
			graph_obj.placeholder = "60";
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
			input.onchange = function () { change_property(obj_id, this); };
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
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// scale_x
			let graph_scale_x = 10;
			property = document.createElement("property");
			property.className = "scale_x";
			label = document.createElement("label");
			label.innerHTML = "scale_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = graph_scale_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// scale_y
			let graph_scale_y = 10;
			property = document.createElement("property");
			property.className = "scale_y";
			label = document.createElement("label");
			label.innerHTML = "scale_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = graph_scale_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// unit_x
			let graph_unit_x = "";
			property = document.createElement("property");
			property.className = "unit_x";
			label = document.createElement("label");
			label.innerHTML = "unit_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_unit_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// unit_y
			let graph_unit_y = "";
			property = document.createElement("property");
			property.className = "unit_y";
			label = document.createElement("label");
			label.innerHTML = "unit_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_unit_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// function
			let algorithmic_function = "";
			property = document.createElement("property");
			property.className = "function";
			label = document.createElement("label");
			label.innerHTML = "function";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = algorithmic_function;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// max_x
			let graph_max_x = 10;
			property = document.createElement("property");
			property.className = "max_x";
			label = document.createElement("label");
			label.innerHTML = "max_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_max_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// max_y
			let graph_max_y = 10;
			property = document.createElement("property");
			property.className = "max_y";
			label = document.createElement("label");
			label.innerHTML = "max_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_max_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			property = document.createElement("property");
			// draw_point
			property = document.createElement("property");
			property.className = "draw_point";
			label = document.createElement("label");
			label.innerHTML = "draw_point";
			property.appendChild(label);
			input = document.createElement("select");
			input.onchange = function () { change_property(obj_id, this); };
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
			// min_x
			let graph_min_x = 0;
			property = document.createElement("property");
			property.className = "min_x";
			label = document.createElement("label");
			label.innerHTML = "min_x";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_min_x;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// min_y
			let graph_min_y = 0;
			property = document.createElement("property");
			property.className = "min_y";
			label = document.createElement("label");
			label.innerHTML = "min_y";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "text";
			input.value = graph_min_y;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			property = document.createElement("property");
			object = new Graph(obj_id, 60, 60, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, graph_scale_x, graph_scale_y, graph_unit_x, graph_unit_y, algorithmic_function, graph_max_x, graph_max_y, false, graph_min_x, graph_min_y);
			break;
		case "Arrow":
			// width_line
			let width_line = 50;
			property = document.createElement("property");
			property.className = "width_line";
			label = document.createElement("label");
			label.innerHTML = "width_line";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = width_line;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height_line
			let height_line = 5;
			property = document.createElement("property");
			property.className = "height_line";
			label = document.createElement("label");
			label.innerHTML = "height_line";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = height_line;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// width_triangle
			let width_triangle = 15;
			property = document.createElement("property");
			property.className = "width_triangle";
			label = document.createElement("label");
			label.innerHTML = "width_triangle";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = width_triangle;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// height_triangle
			let height_triangle = 15;
			property = document.createElement("property");
			property.className = "height_triangle";
			label = document.createElement("label");
			label.innerHTML = "height_triangle";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = height_triangle;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			// rotation
			let rotation = 0;
			property = document.createElement("property");
			property.className = "rotation";
			label = document.createElement("label");
			label.innerHTML = "rotation";
			property.appendChild(label);
			input = document.createElement("input");
			input.type = "number";
			input.value = rotation;
			input.onchange = function () { change_property(obj_id, this); };
			property.appendChild(input);
			article1.appendChild(property);
			object = new Arrow(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width_line, height_line, width_triangle, height_triangle, rotation);
			break;
	}
	objects_array[obj_id] = object;
	instructions_array[obj_id] = new Array();

	//draw_animation();

	return obj_id;
}

/**
 * Change the property of the specified object
 * @param {String} object_id 
 * @param {Element} property_dom 
 */
function change_property(object_id, property_dom) {
	new SetProperty(null, objects_array[object_id], property_dom.parentNode.className, property_dom.value).execute();
	//objects_array[object_id].draw();
	//draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

/**
 * Change the id of a specified object
 * @param {Array} args , 0: object_id, 1: inpu_id
 * @returns 
 */
function change_id(args) {
	let object_id = args[0];
	let input_id = args[1];

	let new_id = document.getElementById(input_id).value;
	if (new_id === "") return; // stop here if the input is empty (won't change the id and will keep the popup active)

	// Change in the objects array (JS)
	objects_array[object_id].id = (new_id);

	// Change in the objects list (HTML)
	document.getElementById(object_id).getElementsByTagName("id")[0].innerHTML = "<b>Identifier :</b> " + new_id;

	document.getElementById("ask_popup").className = "";
}

/**
 * Expand the characteristic window of the specified object id
 * @param {String} object_id 
 */
function expand(object_id) {
	let object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "displayed";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].className = "active";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].onclick = function () { reduce(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "&#11165;";
}

/**
 * Reduce the characteristic window of the specified object id
 * @param {String} object_id 
 */
function reduce(object_id) {
	let object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "hidden";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].className = "";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].onclick = function () { expand(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "&#11167;";
}

window.onresize = update_section_size;

/**
 * Update the size of the section and aside element
 */
function update_section_size() {
	let section = document.getElementsByTagName("section")[0];
	let aside = document.getElementsByTagName("aside")[0];

	// section margin right = aside.(margin left * 2 + margin right + padding left + padding right + width)
	// aside.offsetWidth = aside.paddings + aside.width
	let aside_style = aside.currentStyle || window.getComputedStyle(aside);
	let aside_size = parseInt(aside_style.marginLeft) * 2 + parseInt(aside_style.marginRight) + aside.offsetWidth;
	section.style.marginRight = aside_size + "px";
}

/**
 * Function to affect random color to the background and borders of the object with specified id
 * @param {String} object_id 
 */
function customize(object_id) {
	let object = objects_array[object_id];

	// Set the object as visible
	object.visible = (true);
	document.getElementById(object_id).getElementsByClassName("visible")[0].getElementsByTagName("option")[0].selected = "selected";

	// Set the background object as not transparent
	object.background_transparent = (false);
	document.getElementById(object_id).getElementsByClassName("background_transparent")[0].getElementsByTagName("option")[1].selected = "selected";

	// Set the border object as not transparent
	object.border_transparency = (false);
	document.getElementById(object_id).getElementsByClassName("border_transparency")[0].getElementsByTagName("option")[1].selected = "selected";

	// Give random colors for the background and border object
	object.background_color = (rand_rgb());
	document.getElementById(object_id).getElementsByClassName("background_color")[0].getElementsByTagName("input")[0].value = object.background_color;
	object.border_color = (rand_rgb());
	document.getElementById(object_id).getElementsByClassName("border_color")[0].getElementsByTagName("input")[0].value = object.border_color;

	//draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

/**
 * Function to remove the object with the specified id
 * @param {String} object_id 
 */
function remove(object_id) {
	/*// Remove from the objects array (JS)
	objects_array.splice(objects_array.indexOf(object_id), 1);

	// Remove from the image objects array (JS)
	let pos = objects_image_id.indexOf(object_id);
	if (pos > -1) {
		objects_image_id.splice(pos, 1);
	}*/

	// Add the object to the deleted objects array (JS)
	removed_objects_identifier.push(objects_array[object_id].id); // l'identifiant réel de l'objet plutot que son indice dans le tableau, car renommage possible de l'id

	// Set the object as not visible from the objects array (JS)
	objects_array[object_id].visible = (false);

	// Remove from the objects list (HTML)
	if (document.getElementById(object_id)) {
		objects_list.removeChild(document.getElementById(object_id));
	}	

	//draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

/**
 * Transform the animation into xml
 * Download the xml file and show the content
 */
function export_xml() {
	console.log("--------------------------------\n");

	let docType = document.implementation.createDocumentType('animation', '', 'animation.dtd');
	let doc = document.implementation.createDocument("", "", docType);
	let animation_node = doc.createElement("animation");

	// init node
	let init_node = doc.createElement("init");
	let start_button = doc.createElement("start_button");
	start_button.setAttribute("present", document.getElementById("start_button").value);
	init_node.appendChild(start_button);
	animation_node.appendChild(init_node);

	// speed attribute
	animation_node.setAttribute('speed', document.getElementById("mySpeed").value);
	// marker attribute
	animation_node.setAttribute('marker_enable', document.getElementById('enableMarker').checked);
	animation_node.setAttribute('marker_stroke_weight', document.getElementById('markerStrokeWeight').value);
	animation_node.setAttribute('marker_color', document.getElementById('markerStrokeColor').value);

	// background node
	if (document.getElementById("myBackground").value != "") {
		let background_node = doc.createElement("background");
		background_node.innerHTML = document.getElementById("myBackground").value;
		animation_node.appendChild(background_node);
	}

	// objects node
	let objects_node = doc.createElement("objects");
	for (let object of objects_array) {
		if (removed_objects_identifier.indexOf(object.id) == -1) {
			objects_node.appendChild(object.toXml());
		}
	}
	animation_node.appendChild(objects_node);

	// programs node
	let programs_node = doc.createElement("programs");
	animation_node.appendChild(programs_node);

	doc.appendChild(animation_node);

	// Serialize the animation XML tree
	let serializer = new XMLSerializer();
	let animation_string = `<?xml version="1.0" encoding="UTF-8"?>` + serializer.serializeToString(doc);

	// Creating file printer
	const writer = sketch.createWriter('animation.xml', 'xml');
	writer.print(animation_string);
	writer.close();

	// Display the serialized XML tree in a file
	document.getElementById("xml_output").value = animation_string;
	document.getElementById("convert_popup").className = "display";
}

function ask_popup(title, contents, callback, args) {
	let popup = document.getElementById("ask_popup");

	popup.getElementsByTagName("h2")[0].innerHTML = title;
	popup.getElementsByTagName("p")[0].innerHTML = contents;
	popup.getElementsByTagName("button")[1].onclick = function () { callback(args); };

	popup.className = "display";
}

/**********************
 * P5.js drawing
 */

let canvas;
let drawing_dom = document.getElementById("drawing");

function isValidColor(strColor) {
	try {
		let s = new Option().style;
		s.color = strColor;
		// return 'false' if color wasn't assigned
		return s.color == strColor.toLowerCase();
	} catch (_) {
		return false;
	}
}

function isHexColor(strColor) {
	try {
		let RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		return RegExp.test(strColor);
	} catch (_) {
		return false;
	}
}

function isRgbColor(strColor) {
	let result;
    strColor.includes(",") ? result = true : result = false;
    return result;
}


function draw_animation() {


	sketch = new p5(function (draw_ref) {

		let background_img = null;

		let layers = [];

		/** Preload data */
		draw_ref.preload = function () { // preload function runs once

			// Load the backround
			draw_ref.load_background();
		}

		/** Setup of the canvas */
		draw_ref.setup = function () { // setup function waits until preload one is done
			while (drawing_dom.hasChildNodes()) {
				drawing_dom.removeChild(drawing_dom.firstChild);
			}

			canvas = draw_ref.createCanvas(parseInt(document.getElementById("width").value), parseInt(document.getElementById("height").value));
			canvas.parent(drawing_dom);

			update_section_size();
		}

		/** Drawing loop */
		draw_ref.draw = function () {

			// Display the background image
			if (background_img != null) {
				draw_ref.background(background_img);
			} else {
				draw_ref.background(255);
			}

			// Update the number of layers
			draw_ref.update_layers();

			// Display objects of each layer, if they're set as visible
			for (let layer of layers) {
				for (let object of objects_array) {
					if (object.layer == layer && object.visible) {
						object.draw(draw_ref);
					}
				}
			}
		}

		/** Load the background of the canvas */
		draw_ref.load_background = function () {
			let bg = document.getElementById("myBackground").value.trim();
			if (bg != "") {
				if (!isValidColor(bg) && !isHexColor(bg) && !isRgbColor(bg)) {
					background_img = draw_ref.loadImage(bg);
				} else {
					if(isValidColor(bg) || isHexColor(bg))
						background_img = bg;
					else
						background_img = parseIntArray(bg);
				}
			}
			else {
				background_img = [255,255,255];
			}
		}

		/** Update the layers of the canvas by iterating on the objects_array */
		draw_ref.update_layers = function () {

			let new_layers = new Set();
			// Retrieve all layers in a set
			for (let object of objects_array) {
				new_layers.add(object.layer);
			}

			// Convert and sort the layers set
			layers = Array.from([...new_layers]);
			layers.sort();
		}
	});

}

function rand_rgb() {
	let max = 255;
	// Math.random : [0, 1[
	return [Math.floor(Math.random() * (max + 1)), Math.floor(Math.random() * (max + 1)), Math.floor(Math.random() * (max + 1))];
}
