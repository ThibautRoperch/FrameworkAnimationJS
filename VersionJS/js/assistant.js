var last_id = -1;
var objects_list = document.getElementById("objects");
var objects_array = new Array();
var instructions_array = new Array();
var objects_image_id = new Array();

wait_for_includes();
function wait_for_includes() {
	// Check if animation files are included
	if (!ANIMATION_FILES_INCLUDED) {
		console.log("Animation files are not included. Include them by this way :\n<script>include_animation_files(\"path/of/AnimationFramework/\");</script>");
	}

	// Check if object classes are loaded
	var objects_classes_loaded = true;
	for (obj_cl of OBJECT_CLASSES) {
		objects_classes_loaded = objects_classes_loaded & typeof(obj_cl) !== "undefined";
	}
	
	// Check if instruction classes are loaded
	var instruction_classes_loaded = true;
	for (instr_cl of INSTRUCTION_CLASSES) {
		instruction_classes_loaded = instruction_classes_loaded & typeof(instr_cl) !== "undefined";
	}

	// Loop with delay until animation classes are not loaded
    if (typeof(p5) === "undefined" || typeof(Animation) === "undefined" || !objects_classes_loaded || !instruction_classes_loaded) {
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
		var spoiler = document.createElement("div");
			spoiler.onclick = function() { expand(obj_id); };
			var id = document.createElement("id");
				id.innerHTML = "<b>Identifiant :</b> " + obj_id;
				spoiler.appendChild(id);
			var type = document.createElement("type");
				type.innerHTML = "<b>Type :</b> " + object_dom.innerHTML;
				spoiler.appendChild(type);
			var arrow = document.createElement("arrow");
				arrow.innerHTML = "&#11167;";
				spoiler.appendChild(arrow);
		header.appendChild(spoiler);
		var style = document.createElement("div");
			style.className = "warning";
			style.onclick = function() { customize(obj_id); };
			style.innerHTML = "&#127912;";
		header.appendChild(style);
		var trash = document.createElement("div");
			trash.className = "danger";
			trash.onclick = function() { remove(obj_id); };
			trash.innerHTML = "&#10060;";
		header.appendChild(trash);
	li.appendChild(header);

	// init default attributs
	var x = 0;
	var y = 0;
	var bgcolor = [0,0,0]; // r, g, b
	var bgtransparent = true;
	var bocolor = [0,0,0]; // r, g, b
	var botransparent = true;
	var bosize = 1;
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
			// bosize
			property = document.createElement("property");
				property.className = "bosize";
				label = document.createElement("label");
					label.innerHTML = "bosize";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = bosize;
					input.onchange = function() { change_property(obj_id, this); };
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
			//section.appendChild(article2); // TODO à enlever pour mettre les instructions
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
			// padding
			var padding = 0;
			property = document.createElement("property");
				property.className = "padding";
				label = document.createElement("label");
					label.innerHTML = "padding";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "number";
					input.placeholder = padding;
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
				input = document.createElement("select");
					input.onchange = function() { change_property(obj_id, this); };
						option = document.createElement("option");
							option.value = "left";
							option.innerHTML = "Left";
							option.selected = "selected";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "center";
							option.innerHTML = "Center";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "right";
							option.innerHTML = "Right";
							input.appendChild(option);
					property.appendChild(input);
				article1.appendChild(property);
			// valignment
			var valignment = "top";
			property = document.createElement("property");
				property.className = "valignment";
				label = document.createElement("label");
					label.innerHTML = "valignment";
					property.appendChild(label);
				input = document.createElement("select");
					input.onchange = function() { change_property(obj_id, this); };
						option = document.createElement("option");
							option.value = "top";
							option.innerHTML = "Top";
							option.selected = "selected";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "bottom";
							option.innerHTML = "Bottom";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "center";
							option.innerHTML = "Center";
							input.appendChild(option);
							option = document.createElement("option");
							option.value = "baseline";
							option.innerHTML = "Baseline";
							input.appendChild(option);
					property.appendChild(input);
				article1.appendChild(property);
			object = new Text(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, "", font, color, padding, width, height, halignment, valignment);
			break;
		case "ImageFile":
			// width
			var width = "50";
			property = document.createElement("property");
			property.className = "width";
			label = document.createElement("label");
				label.innerHTML = "width";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = width;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// height
			var height = "50";
			property = document.createElement("property");
			property.className = "height";
			label = document.createElement("label");
				label.innerHTML = "height";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = height;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// image
			var image = "img/yellow_blue_linear_gradient.png";
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
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new ImageFile(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, width, height, image);
			objects_image_id.push(obj_id);
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
			object = new Rectangle(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, width, height, round);
			break;
		case "Polygon":
			// coord_x
			var coord_x = [0, 80, 80, 40];
			property = document.createElement("property");
				property.className = "coord_x";
				label = document.createElement("label");
					label.innerHTML = "coord_x";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text"
					input.value = coord_x;
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);
			// coord_y
			var coord_y = [0, 60, 0, 60];
			property = document.createElement("property");
				property.className = "coord_y";
				label = document.createElement("label");
					label.innerHTML = "coord_y";
					property.appendChild(label);
				input = document.createElement("input");
					input.type = "text";
					input.value = coord_y;
					input.required = "required";
					input.onchange = function() { change_property(obj_id, this); };
					property.appendChild(input);
				article1.appendChild(property);	
			object = new Polygon(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, coord_x, coord_y); 
			break;
		case "Circle":
			// radius
			var radius = 30;
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
			object = new Circle(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, radius, radius); 
			break;
		case "Ellipse":
			// width
			var width = 60;
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
			var height = 40;
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
			object = new Ellipse(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, width, height); 
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
			object = new Landmark(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, width, height, scaleX, scaleY, unitX, unitY); 
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
				input.value = columns;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// lines
			var lines = 3;
			property = document.createElement("property");
			property.className = "line";
			label = document.createElement("label");
				label.innerHTML = "line";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = lines;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// column_width
			var column_width = 20;
			property = document.createElement("property");
			property.className = "column_width";
			label = document.createElement("label");
				label.innerHTML = "column_width";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = column_width;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			// line_height
			var line_height = 20;
			property = document.createElement("property");
			property.className = "line_height";
			label = document.createElement("label");
				label.innerHTML = "line_height";
				property.appendChild(label);
			input = document.createElement("input");
				input.type = "number";
				input.value = line_height;
				input.onchange = function() { change_property(obj_id, this); };
				property.appendChild(input);
			article1.appendChild(property);
			object = new Grid(obj_id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, lines, columns, line_height, column_width);
			break;
	}

	objects_array[obj_id] = object;
	instructions_array[obj_id] = new Array();

	draw_animation();
}

function new_instruction(object_id, object_dom) {
	// Crée, pour un id d'objet, les balises constituant une nouvelle instruction
}

function change_property(object_id, property_dom) {
	new SetProperty(null, objects_array[object_id], property_dom.parentNode.className, property_dom.value).execute();
	draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

function expand(object_id) {
	var object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "displayed";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].className = "active";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].onclick = function() { reduce(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "&#11165;";
}

function reduce(object_id) {
	var object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("sectionobj")[0].className = "hidden";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].className = "";
	object_dom.getElementsByTagName("headerobj")[0].getElementsByTagName("div")[0].onclick = function() { expand(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "&#11167;";
}

function update_section_size() {
	var section = document.getElementsByTagName("section")[0];
	var aside = document.getElementsByTagName("aside")[0];

	// section margin right = aside.(margin left * 2 + margin right + padding left + padding right + width)
	// aside.offsetWidth = aside.paddings + aside.width
	var aside_style = aside.currentStyle || window.getComputedStyle(aside);
	var aside_size = parseInt(aside_style.marginLeft) * 2 + parseInt(aside_style.marginRight) + aside.offsetWidth; 
	section.style.marginRight = aside_size + "px";
}

function customize(object_id) {
	var object = objects_array[object_id];

	// Set the object as visible
	object.setVisible(true);
	document.getElementById(object_id).getElementsByClassName("visible")[0].getElementsByTagName("option")[0].selected = "selected";

	// Set the background object as not transparent
	object.setBgtransparent(false);
	document.getElementById(object_id).getElementsByClassName("bgtransparent")[0].getElementsByTagName("option")[1].selected = "selected";

	// Set the border object as not transparent
	object.setBotransparent(false);
	document.getElementById(object_id).getElementsByClassName("botransparent")[0].getElementsByTagName("option")[1].selected = "selected";

	// Give random colors for the background and border object
	object.setBgcolor(rand_rgb());
	document.getElementById(object_id).getElementsByClassName("bgcolor")[0].getElementsByTagName("input")[0].value = object.getBgcolor();
	object.setBocolor(rand_rgb());
	document.getElementById(object_id).getElementsByClassName("bocolor")[0].getElementsByTagName("input")[0].value = object.getBocolor();
	
	draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

function remove(object_id) {
	/*// Remove from the objects array (JS)
	objects_array.splice(objects_array.indexOf(object_id), 1);

	// Remove from the image objects array (js)
	var pos = objects_image_id.indexOf(object_id);
	if (pos > -1) {
		objects_image_id.splice(pos, 1);
	}*/

	// Set the object as visible
	objects_array[object_id].setVisible(false);

	// Remove from the objects list (HTML)
	objects_list.removeChild(document.getElementById(object_id));

	draw_animation(); // redessiner le canevas depuis le début sinon ca bug...
}

function to_xml() {
	console.log("--------------------------------\n");

	var animation_node = document.createElement("animation");

	// init node
	var init_node = document.createElement("init");
	var start_button = document.createElement("start_button");
	start_button.setAttribute("present", document.getElementById("start_button").value);
	init_node.appendChild(start_button);
	animation_node.appendChild(init_node);

	// speed node
	var speed_node = document.createElement("speed");
	speed_node.innerHTML = document.getElementById("speed").value;
	animation_node.appendChild(speed_node);

	// background image node
	if (document.getElementById("background").value != "") {
		var background_node = document.createElement("background");
		animation_node.appendChild(background_node);
	}

	// objects node
	var objects_node = document.createElement("objects");
	for (var object of objects_array) {
		console.log(object.toXml());
		objects_node.appendChild(object.toXml());
	}
	animation_node.appendChild(objects_node);

	// programs node
	var programs_node = document.createElement("programs");
	animation_node.appendChild(programs_node);

	// Serialize the animation XML tree
	var serializer = new XMLSerializer();
	var animation_string = serializer.serializeToString(animation_node);

	// Display the serialized XML tree in a file
	document.getElementById("xml_output").innerHTML = animation_string;
	document.getElementsByTagName("popup")[0].className = "display";
}

/**********************
 * P5.js drawing
 */

var canvas;
var drawing_dom = document.getElementById("drawing");

function draw_animation() {
	var layers = new Set();

	new p5(function(draw_ref) {

		var BG_IMAGE = null;

		draw_ref.preload = function() { // preload function runs once
			// Load the backround image
			var bg_image = document.getElementById("background").value;
			if (bg_image != "") {
				BG_IMAGE = draw_ref.loadImage(bg_image);
			}
			
			// Load animation's images
			for (var id of objects_image_id) {
				var object = objects_array[id];
				object.loadImage(draw_ref);
			}

			// Retrieve all layers in a set
			for (var object of objects_array) {
				layers.add(object.getLayer());
			}

			// Convert and sort the layers set
			layers = Array.from(layers);
			layers.sort();
		}

		draw_ref.setup = function() { // setup function waits until preload one is done
			while (drawing_dom.hasChildNodes()) {
				drawing_dom.removeChild(drawing_dom.firstChild);
			}

			canvas = draw_ref.createCanvas(parseInt(document.getElementById("width").value), parseInt(document.getElementById("height").value));
			canvas.parent(drawing_dom);

			update_section_size();
		}
		
		draw_ref.draw = function() {
			draw_ref.clear();

			draw_ref.frameRate(60); // 60 fps
			
			// Display the background image
			if (BG_IMAGE != null) {
				draw_ref.background(BG_IMAGE);
			}

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

function rand_rgb() {
	var max = 255;
	// Math.random : [0, 1[
	return [Math.floor(Math.random() * (max + 1)), Math.floor(Math.random() * (max + 1)), Math.floor(Math.random() * (max + 1))];
}
