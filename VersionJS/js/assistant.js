let last_id = 0;
let objects_list = document.getElementById("objects");
let objects_array = new Array();
let instructions_array = new Array();

function new_object(object_dom) {
	let obj_id = ++last_id
	let object;

	let li = document.createElement("li");
		li.id = obj_id;
	let header = document.createElement("header");
		header.onclick = function() { expand(obj_id); };
		let id = document.createElement("id");
			id.innerHTML = "Object identifier : " + obj_id;
			header.appendChild(id);
		let type = document.createElement("type");
			type.innerHTML = "Object type : " + object_dom.innerHTML;
			header.appendChild(type);
		let arrow = document.createElement("arrow");
			arrow.innerHTML = "\\/";
			header.appendChild(arrow);
	li.appendChild(header);
	let section = document.createElement("section");
		let article1 = document.createElement("article");
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
		let article2 = document.createElement("article");
			let button = document.createElement("button");
			article2.appendChild(button);
			section.appendChild(article2);
	li.appendChild(section);
	objects_list.appendChild(li);

	// switch case
	switch (object_dom.value) {
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
			object = new Text(obj_id, 0, 0, [0, 0, 0], true, [0, 0, 0], true, 0, false, 1, 0); // todo
			break;
		case "Image":
			object = new ImageFile();
			break;
		case "Rectangle":
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

	objects_array[last_id] = object;
	instructions_array[last_id] = new Array();
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
}

function expand(object_id) {
	let object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("section")[0].className = "displayed";
	object_dom.getElementsByTagName("header")[0].onclick = function() { reduce(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "/\\";
}

function reduce(object_id) {
	let object_dom = document.getElementById(object_id);
	object_dom.getElementsByTagName("section")[0].className = "hidden";
	object_dom.getElementsByTagName("header")[0].onclick = function() { expand(object_id); };
	object_dom.getElementsByTagName("arrow")[0].innerHTML = "\\/";
}
