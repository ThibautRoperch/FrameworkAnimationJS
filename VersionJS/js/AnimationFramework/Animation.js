/**
 * Animation class
 */

class Animation {

    constructor(source_file, parent, width, height) {
        this.source_file = source_file; // path of the XML source file
        
        this.parent = parent; // HTML node containing the canevas
        this.width = width; // width of the canevas, in px
        this.height = height; // height of the canevas, in px

        this.objects = new Map(); // associative array containing drawing's objects, as object_identifier : Object
        this.programs = new Map() // associative array containing instructions' programs, as object_identifier : array of Instruction elements
        this.layers = new Set(); // set containing the differents objects' layers
        this.objects_image = new Array(); // array containing image objects
        
        this.canvas = null;
        this.bg_image = null; // path of the background image (can be "" if there isn't background image)
        this.loop_delay = 10; // delay between two intruction's move // TODO a donner au constructeur d'une instruction

        // Resize the target node
        this.parent.style.width = this.width + "px";
        this.parent.style.height = this.height + "px";
        this.parent.style.display = "flex";
        this.parent.style.flexDirection = "row";
        this.parent.style.alignItems = "center";
        this.parent.style.padding = "0";
    }

    /**
     * Display an error message because the XML file can't be
     */
    displayErrorMessage(source_file, target_id) {
        var error = document.createElement("div");
        error.innerHTML = "The XML file " + source_file + " of the animation " + target_id + " can't be read";
        error.style.flex = "1";
        error.style.textAlign = "center";
        error.style.color = "gray";
        this.parent.appendChild(error);
    }       

    /**
     * Display a loading message while the objects are beeing created
     */
    displayLoadingMessage() {
        var loading = document.createElement("div");
        loading.className = "loading";
        loading.innerHTML = "loading...";
        loading.style.flex = "1";
        loading.style.textAlign = "center";
        loading.style.color = "gray";
        this.parent.appendChild(loading);
    }

    readXmlFile(contents) {
        var parser = new DOMParser();
        var root = parser.parseFromString(contents ,"text/xml");

        // Retrieve sped, init, background, objects and programs nodes
        var speed_node = root.getElementsByTagName("speed")[0];
        var init_node = root.getElementsByTagName("init")[0];
        var background_node = root.getElementsByTagName("background")[0];
        var objects_node = root.getElementsByTagName("objects")[0];
        var programs_node = root.getElementsByTagName("programs")[0];

        // If the speed node node exists
        if (speed_node) {
            this.loop_delay = speed(speed_node.textContent);
        }

        // If the init's node exists
        if (init_node) {
            // TODO
        }

        // If the background's node exists
        if (background_node) {
            this.bg_image = background_node.textContent;
            // The image path is relative to the source file's one
            var source_file_path = this.source_file.substr(0, this.source_file.lastIndexOf("/") + 1);
            this.bg_image = source_file_path + this.bg_image;
        } else {
            this.bg_image = "";
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
                var bgcolor = read_object.hasAttribute("bgcolor") ? parseIntArray(read_object.getAttribute("bgcolor")) : [0, 0, 0];
                var botransparent = read_object.hasAttribute("botransparent") ? read_object.getAttribute("botransparent") == "true" : true;
                var bocolor = read_object.hasAttribute("bocolor") ? parseIntArray(read_object.getAttribute("bocolor")) : [0, 0, 0];
                var botransparent = read_object.hasAttribute("botransparent") ? read_object.getAttribute("botransparent") == "true" : true;
                var layer = parseInt(read_object.getAttribute("layer")) | 0;
                this.layers.add(layer);
                var visible = read_object.hasAttribute("visible") ? read_object.getAttribute("visible") == "true" : false;
                var opacity = parseFloat(read_object.getAttribute("opacity")) | 1;
                var angle = parseFloat(read_object.getAttribute("angle")) | 0;
                // Retrieve the others specific attributes of the object and create the associated animated object
                if (type == "object_text") {
                    var text = read_object.getAttribute("text");
                    var font = read_object.getAttribute("font").split(",");
                    var color = read_object.hasAttribute("color") ? parseIntArray(read_object.getAttribute("color")) : [255, 255, 255];
                    var border = parseInt(read_object.getAttribute("border")) | 0;
                    var width = read_object.hasAttribute("width") ? parseInt(read_object.getAttribute("width")) : undefined;
                    var height = read_object.hasAttribute("height") ? parseInt(read_object.getAttribute("height")) : undefined;
                    var halignment = read_object.hasAttribute("halignment") ? read_object.getAttribute("halignment") : "left";
					var valignment = read_object.hasAttribute("valignment") ? read_object.getAttribute("valignment") : "top";
                    new_object = new Text(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, text, font, color, border, width, height, halignment, valignment);
                } else if (type == "object_image") {
                    var width = read_object.hasAttribute("width") ? parseInt(read_object.getAttribute("width")) : undefined;
                    var height = read_object.hasAttribute("height") ? parseInt(read_object.getAttribute("height")) : undefined;
                    var image = read_object.getAttribute("image");
                    this.objects_image.push(id);
                    new_object = new ImageFile(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, width, height, image);
                } else if (type == "object_rectangle") {
                    var width = parseInt(read_object.getAttribute("width"));
                    var height = parseInt(read_object.getAttribute("height"));
                    var round = parseInt(read_object.getAttribute("round")) | 0;
                    new_object = new Rectangle(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, width, height, round);
                } else if (type == "object_polygon") {
                    var coord_x = parseIntArray(read_object.getAttribute("coord_x"));
                    var coord_y = parseIntArray(read_object.getAttribute("coord_y"));
                    new_object = new Polygon(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, coord_x, coord_y);
                } else if (type == "object_circle") {
                    var radius = parseInt(read_object.getAttribute("radius"));
                    new_object = new Circle(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, radius);
                } else if (type == "object_ellipse") {
                    var width = parseInt(read_object.getAttribute("width"));
                    var height = parseInt(read_object.getAttribute("height"));
                    new_object = new Ellipse(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, width, height);
                } else if (type == "object_landmark") {
                    var width = parseInt(read_object.getAttribute("width"));
                    var height = parseInt(read_object.getAttribute("height"));
                    var scaleX = parseInt(read_object.getAttribute("scaleX"));
                    var scaleY = parseInt(read_object.getAttribute("scaleY"));
                    var unitX = read_object.getAttribute("unitX");
                    var unitY = read_object.getAttribute("unitY");
                    new_object = new Landmark(id, x, y, bgcolor, botransparent, bocolor, botransparent, DEFAULT_STATE, layer, visible, opacity, angle, height, width, scaleX, scaleY, unitX, unitY);
                } else if (type == "object_copy") {
                    var idcopy = read_object.getAttribute("idcopy");
                    var initial_object = this.objects.get(idcopy);
                    if (initial_object == null) {
                        console.log("[animation.js] L'objet " + idcopy + " à copier n'existe pas");
                    } else {
                        new_object = initial_object.clone();
                        new_object.setId(id);
                        for (var i = 1; i < read_object.attributes.length; ++i) { // i = 1 in order to avoid the first attribute (which is "object")
                            new SetProperty(new_object, read_object.attributes[i].name, read_object.attributes[i].value).execute();
                        }
                    }
                }
                this.objects.set(id, new_object);
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
                        var x = read_instruction.getAttribute("x"); // don't parse to an int, already did in SetProperty.execution()
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "x", x);
                    } else if (type == "sety") {
                        var y = read_instruction.getAttribute("y");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "y", y);
                    } else if (type == "setxy") {
                        var x = read_instruction.getAttribute("x");
                        var y = read_instruction.getAttribute("y");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "x", x);
                        program.push(new_instruction);
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "y", y);
                    } else if (type == "visible") {
                        var value = read_instruction.getAttribute("value"); // don't parse to a boolean, already did in SetProperty.execution()
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "visible", value);
                    } else if (type == "click") {
                        new_instruction = new Click(this.objects.get(object_id));
                    } else if (type == "label") {
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new Label(null, value);
                    } else if (type == "moveto") {
                        var x = parseInt(read_instruction.getAttribute("x"));
                        var y = parseInt(read_instruction.getAttribute("y"));
                        var dx = parseInt(read_instruction.getAttribute("dx"));
                        var dy = parseInt(read_instruction.getAttribute("dy"));
                        var delay = parseInt(read_instruction.getAttribute("delay"));
                        new_instruction = new MoveTo(this.objects.get(object_id), x, y, dx, dy, delay);
                    } else if (type == "wait") {
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new Wait(this.objects.get(object_id), value);
                    } else if (type == "sleep") {
                        var value = parseInt(read_instruction.getAttribute("value"));
                        new_instruction = new Sleep(this.objects.get(object_id), value);
                    } else if (type == "state") {
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new State(this.objects.get(object_id), value);
                    } else if (type == "trigger") {
                        var object = read_instruction.getAttribute("object");
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new Trigger(this.objects.get(object_id), this.objects.get(object), value);
                    } else if (type == "goto") {
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new GoTo(null, value);
                    } else if (type == "up") {
                        var y = parseInt(read_instruction.getAttribute("y"));
                        var dy = parseInt(read_instruction.getAttribute("dy"));
                        new_instruction = new Up(this.objects.get(object_id), y, dy);
                    } else if (type == "down") {
                        var y = parseInt(read_instruction.getAttribute("y"));
                        var dy = parseInt(read_instruction.getAttribute("dy"));
                        new_instruction = new Down(this.objects.get(object_id), y, dy);
                    } else if (type == "left") {
                        var x = parseInt(read_instruction.getAttribute("x"));
                        var dx = parseInt(read_instruction.getAttribute("dx"));
                        new_instruction = new Left(this.objects.get(object_id), x, dx);
                    } else if (type == "right") {
                        var x = parseInt(read_instruction.getAttribute("x"));
                        var dx = parseInt(read_instruction.getAttribute("dx"));
                        new_instruction = new Right(this.objects.get(object_id), x, dx);
                    } else if (type == "angle") {
                        var degrees = parseInt(read_instruction.getAttribute("degrees"));
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "angle", degrees);
                    } else if (type == "setproperty") {
                        var object = read_instruction.getAttribute("object");
                        var property = read_instruction.getAttribute("property");
                        var value = read_instruction.getAttribute("value");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object), property, value);
                    } else if (type == "blink") {
                        var times = parseInt(read_instruction.getAttribute("times"));
                        var delay = parseInt(read_instruction.getAttribute("delay"));
                        new_instruction = new Blink(this.objects.get(object_id), times, delay);
                    } else if (type == "stop") {
                        new_instruction = new Stop(null);
                    } else if (type == "center") {
                        new_instruction = new Center(this.objects.get(object_id));
                    } else if (type == "centerx") {
                        new_instruction = new CenterX(this.objects.get(object_id));
                    } else if (type == "centery") {
                        new_instruction = new CenterY(this.objects.get(object_id));
                    }
                    program.push(new_instruction);
                }
                this.programs.set(object_id, program);
            }
        }

        // Execute programs of the programs array, as max 1 program per object
        for (object_id of this.objects.keys()) {
            if (this.programs.get(object_id)) {
                this.execute_instructions(object_id, 0, new Map());
            }
        }
    }

    execute_instructions(object_id, instruction_number, labels) {
        // Retrieve the program and the current instruction of the program
        var program = this.programs.get(object_id);
        var instruction = program[instruction_number];

        var next_instruction = instruction_number;
        var continue_execution = true;
        
        // Execute the instruction if the state of the object is the default one
        if (this.objects.get(object_id).getState() == DEFAULT_STATE) {
            var instruction_type = instruction.constructor.name;
            if (instruction_type == "Label") {
                labels.set(instruction.getValue(), instruction_number + 1);
                next_instruction = instruction_number + 1;
            } else if (instruction_type == "GoTo") {
                next_instruction = labels.get(instruction.getValue());
            } else if (instruction_type == "Stop") {
                var continue_execution = false;
            } else {
                instruction.execute();
                next_instruction = instruction_number + 1;
                continue_execution = next_instruction < program.length;
            }
        }

        if (continue_execution) {
			re_execute(this);
			function re_execute(animation) {
				setTimeout(function() {
					animation.execute_instructions(object_id, next_instruction, labels);
				}, 1);
			}
        }
    }

    preload() {
        // Load the backround image
        if (this.bg_image != "") {
            this.bg_image = loadImage(this.bg_image);
        }
		
		// Load animation's images
        for (var object_id of this.objects_image) {
            this.objects.get(object_id).loadImage();
        }
    }

    setup(drawing) {
        this.canvas = drawing.createCanvas(this.width, this.height);
        this.canvas.mouseClicked(canvasClicked);
        this.canvas.parent(this.parent);

        // Remove the loading message
        this.parent.removeChild(this.parent.getElementsByClassName("loading")[0]);
    }

    draw(drawing) {
		// Display the background image
        if (this.bg_image != null) {
            drawing.background(this.bg_image);
        }

        // Display objects of each layer, if they're set as visible
        for (var layer of this.layers) {
            for (var object of this.objects.values()) {
                if (object.getLayer() == layer && object.getVisible()) {
                    object.draw();
                }
            }
        }
    }

    canvasClicked(mouse_x, mouse_y) {
        // Get the visible objects that are under the cursor position
        for (var object of this.objects.values()) {
            if (object.getVisible()) {
                if (object.isClicked(mouse_x, mouse_y)) {
                    new Trigger(null, object, WAITING_CLICK_STATE).execute();
                }
            }
        }
	}

}
