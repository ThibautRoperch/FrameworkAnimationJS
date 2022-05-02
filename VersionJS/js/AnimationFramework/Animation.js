import { speedAnim, parseIntArray } from './animation_controller.js';

import { DEFAULT_STATE, WAITING_CLICK_STATE, SLEEPING_STATE, MOVING_STATE , AnimatedObject } from './Objects/AnimatedObject.js';

import { Blink } from './Instructions/Blink.js';
import { Center } from './Instructions/Center.js';
import { CenterX } from './Instructions/CenterX.js';
import { CenterY } from './Instructions/CenterY.js';
import { Click } from './Instructions/Click.js';
import { Down } from './Instructions/Down.js';
import { GoTo } from './Instructions/GoTo.js';
import { Label } from './Instructions/Label.js';
import { Left } from './Instructions/Left.js';
import { MoveTo } from './Instructions/MoveTo.js';
import { Right } from './Instructions/Right.js';
import { SetProperty } from './Instructions/SetProperty.js';
import { Sleep } from './Instructions/Sleep.js';
import { State } from './Instructions/State.js';
import { Stop } from './Instructions/Stop.js';
import { Trigger } from './Instructions/Trigger.js';
import { Up } from './Instructions/Up.js';
import { Wait } from './Instructions/Wait.js';

import { Ellipse } from './Objects/Ellipse.js';
import { Circle } from './Objects/Circle.js';
import { Grid } from './Objects/Grid.js';
import { ImageFile } from './Objects/ImageFile.js';
import { Landmark } from './Objects/Landmark.js';
import { Polygon } from './Objects/Polygon.js';
import { Rectangle } from './Objects/Rectangle.js';
import { StartButton } from './Objects/StartButton.js';
import { Text } from './Objects/Text.js';

/**
 * Animation class
 * Parse and read a given XML file andlaunch objects program
 * Preload, setup and draw according to animation_controller.js
 */

export class Animation {

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
        this.loop_delay = speedAnim("normal"); // delay between two intruction's move

        this.start_button = new StartButton(this.width / 2, this.height / 2, "Click me to start", true);
        new Blink(this.start_button, 6, 20, this.loop_delay).execute();

        this.stop_animation = false;

        // Resize the target node if given
        if (this.parent != null) {
            this.parent.style.width = this.width + "px";
            this.parent.style.height = this.height + "px";
            this.parent.style.display = "flex";
            this.parent.style.flexDirection = "row";
            this.parent.style.alignItems = "center";
            this.parent.style.padding = "0";
        }
    }

    getBgImage() {
        return this.bg_image;
    }
    
    getObjects() {
        return this.objects;
    }

    /**
     * Display an error message because the XML file can't be
     */
    displayErrorMessage(source_file, target_id) {
        let error = document.createElement("div");
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
        let loading = document.createElement("div");
        loading.className = "loading";
        loading.innerHTML = "loading...";
        loading.style.flex = "1";
        loading.style.textAlign = "center";
        loading.style.color = "gray";
        this.parent.appendChild(loading);
    }

    stopAnimation() {
        return this.stop_animation;
    }

    readXmlFile(contents) {
        let parser = new DOMParser();
        let root = parser.parseFromString(contents, "text/xml");

        // Retrieve sped, init, background, objects and programs nodes
        let speed_node = root.getElementsByTagName("speed")[0];
        let init_node = root.getElementsByTagName("init")[0];
        let background_node = root.getElementsByTagName("background")[0];
        let objects_node = root.getElementsByTagName("objects")[0];
        let programs_node = root.getElementsByTagName("programs")[0];

        // If the speed node node exists
        if (speed_node) {
            this.loop_delay = speedAnim(speed_node.textContent);
        }

        // If the init's node exists
        if (init_node) {
            let start_node = init_node.getElementsByTagName("start_button")[0];
            if (start_node) {
                if (start_node.hasAttribute("text")) this.start_button.setText(start_node.hasAttribute("text"));
                if (start_node.hasAttribute("x")) this.start_button.setX(start_node.getAttribute("x"));
                if (start_node.hasAttribute("y")) this.start_button.setY(start_node.getAttribute("y"));
                if (start_node.hasAttribute("present") && start_node.getAttribute("present") == "false") this.start_button.setPresent(false);
            }
        }

        // If the background's node exists
        if (background_node) {
            this.bg_image = background_node.textContent;
            // The image path is relative to the source file's one
            let source_file_path = this.source_file.substr(0, this.source_file.lastIndexOf("/") + 1);
            this.bg_image = source_file_path + this.bg_image;
        } else {
            this.bg_image = "";
        }

        // If the objects' node exists
        if (objects_node) {
            // Create and push each object in the objects' array
            for (let read_object of objects_node.children) {
                let new_object = null;
                // Retrieve the AnimatedObjects' attributes
                let type = read_object.nodeName;
                let id = read_object.textContent;
                if (this.objects.has(id)) console.log("[Animation.js] L'identifiant '" + id + "' a déjà été utilisé par un objet, ce dernier va être écrasé par le nouvel objet");
                let x = parseInt(read_object.getAttribute("x")) | 0;
                let y = parseInt(read_object.getAttribute("y")) | 0;
                let bgcolor = read_object.hasAttribute("bgcolor") ? parseIntArray(read_object.getAttribute("bgcolor")) : [0, 0, 0];
                let bgtransparent = read_object.hasAttribute("bgtransparent") ? read_object.getAttribute("bgtransparent") == "true" || read_object.getAttribute("bgtransparent") == "1" : true;
                let bocolor = read_object.hasAttribute("bocolor") ? parseIntArray(read_object.getAttribute("bocolor")) : [0, 0, 0];
                let botransparent = read_object.hasAttribute("botransparent") ? read_object.getAttribute("botransparent") == "true" || read_object.getAttribute("botransparent") == "1" : true;
                let bosize = parseInt(read_object.getAttribute("bosize")) | 1;
                let layer = parseInt(read_object.getAttribute("layer")) | 0;
                this.layers.add(layer);
                let visible = read_object.hasAttribute("visible") ? read_object.getAttribute("visible") == "true" || read_object.getAttribute("visible") == "1" : false;
                let opacity = parseFloat(read_object.getAttribute("opacity")) | 1;
                let angle = parseFloat(read_object.getAttribute("angle")) | 0;
                // Retrieve the others specific attributes of the object and create the associated animated object
                if (type == "object_text") {
                    let text = read_object.getAttribute("text");
                    let font = read_object.getAttribute("font").split(",");
                    let color = read_object.hasAttribute("color") ? parseIntArray(read_object.getAttribute("color")) : [255, 255, 255];
                    let padding = parseInt(read_object.getAttribute("padding")) | 0;
                    let width = read_object.hasAttribute("width") ? parseInt(read_object.getAttribute("width")) : undefined;
                    let height = read_object.hasAttribute("height") ? parseInt(read_object.getAttribute("height")) : undefined;
                    let halignment = read_object.hasAttribute("halignment") ? read_object.getAttribute("halignment") : "left";
					let valignment = read_object.hasAttribute("valignment") ? read_object.getAttribute("valignment") : "top";
                    new_object = new Text(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, text, font, color, padding, width, height, halignment, valignment);
                } else if (type == "object_image") {
                    let width = read_object.hasAttribute("width") ? parseInt(read_object.getAttribute("width")) : undefined;
                    let height = read_object.hasAttribute("height") ? parseInt(read_object.getAttribute("height")) : undefined;
                    let image = read_object.getAttribute("image");
                    this.objects_image.push(id);
                    new_object = new ImageFile(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, width, height, image);
                } else if (type == "object_rectangle") {
                    let width = parseInt(read_object.getAttribute("width"));
                    let height = parseInt(read_object.getAttribute("height"));
                    let round = parseInt(read_object.getAttribute("round")) | 0;
                    new_object = new Rectangle(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, width, height, round);
                } else if (type == "object_polygon") {
                    let coord_x = parseIntArray(read_object.getAttribute("coord_x"));
                    let coord_y = parseIntArray(read_object.getAttribute("coord_y"));
                    new_object = new Polygon(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, coord_x, coord_y);
                } else if (type == "object_circle") {
                    let radius = parseInt(read_object.getAttribute("radius"));
                    new_object = new Circle(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, radius);
                } else if (type == "object_ellipse") {
                    let width = parseInt(read_object.getAttribute("width"));
                    let height = parseInt(read_object.getAttribute("height"));
                    new_object = new Ellipse(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, width, height);
                } else if (type == "object_landmark") {
                    let width = parseInt(read_object.getAttribute("width"));
                    let height = parseInt(read_object.getAttribute("height"));
                    let scale_x = parseInt(read_object.getAttribute("scale_x"));
                    let scale_y = parseInt(read_object.getAttribute("scale_y"));
                    let unit_x = read_object.getAttribute("unit_x");
                    let unit_y = read_object.getAttribute("unit_y");
                    new_object = new Landmark(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y);
                } else if (type == "object_grid") {
                    let lines = parseInt(read_object.getAttribute("lines"));
                    let columns = parseInt(read_object.getAttribute("columns"));
                    let line_height = parseInt(read_object.getAttribute("line_height"));
                    let column_width = parseInt(read_object.getAttribute("column_width"));
                    new_object = new Grid(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, DEFAULT_STATE, layer, visible, opacity, angle, lines, columns, line_height, column_width);
                } else if (type == "object_copy") {
                    let idcopy = read_object.getAttribute("idcopy");
                    let initial_object = this.objects.get(idcopy);
                    if (initial_object == null) {
                        console.log("[Animation.js] L'objet '" + idcopy + "' à copier n'existe pas (le définir avec l'attribut idcopy)");
                    } else {
                        new_object = initial_object.clone();
                        new_object.setId(id);
                        for (let i = 1; i < read_object.attributes.length; ++i) { // i = 1 in order to avoid the first attribute (which is "object")
                            new SetProperty(null, new_object, read_object.attributes[i].name, read_object.attributes[i].value).execute();
                        }
                    }
                }
                this.objects.set(id, new_object);
            }
        }

        // If the programs' node exists
        if (programs_node) {
            // Create and push each instruction's program in the programs' array
            for (let read_program of programs_node.children) {
                let object_id = read_program.getAttribute("assigned_to");
                let program = new Array();
                for (let read_instruction of read_program.children) {
                    let new_instruction = null;
                    // Retrieve the instruction's type
                    let type = read_instruction.nodeName;
                    // Retrieve the others specific attributes of the instruction and create the associated instruction
                    if (type == "setx") {
                        let x = read_instruction.getAttribute("x"); // don't parse to an int, already did in SetProperty.execution()
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "x", x);
                    } else if (type == "sety") {
                        let y = read_instruction.getAttribute("y");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "y", y);
                    } else if (type == "setxy") {
                        let x = read_instruction.getAttribute("x");
                        let y = read_instruction.getAttribute("y");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "x", x);
                        program.push(new_instruction);
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "y", y);
                    } else if (type == "visible") {
                        let value = read_instruction.getAttribute("value"); // don't parse to a boolean, already did in SetProperty.execution()
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "visible", value);
                    } else if (type == "click") {
                        new_instruction = new Click(this.objects.get(object_id));
                    } else if (type == "label") {
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new Label(null, value);
                    } else if (type == "moveto") {
                        let x = parseInt(read_instruction.getAttribute("x"));
                        let y = parseInt(read_instruction.getAttribute("y"));
                        let dx = parseInt(read_instruction.getAttribute("dx"));
                        let dy = parseInt(read_instruction.getAttribute("dy"));
                        let delay = parseInt(read_instruction.getAttribute("delay"));
                        new_instruction = new MoveTo(this.objects.get(object_id), x, y, dx, dy, delay, this.loop_delay);
                    } else if (type == "wait") {
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new Wait(this.objects.get(object_id), value);
                    } else if (type == "sleep") {
                        let value = parseInt(read_instruction.getAttribute("value"));
                        new_instruction = new Sleep(this.objects.get(object_id), value, this.loop_delay);
                    } else if (type == "state") {
                        console.log("[Animation.js] Attention, instruction state dépréciée");
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new State(this.objects.get(object_id), value);
                    } else if (type == "trigger") {
                        let object = read_instruction.getAttribute("object");
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new Trigger(this.objects.get(object_id), this.objects.get(object), value);
                    } else if (type == "goto") {
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new GoTo(null, value);
                    } else if (type == "up") {
                        let y = parseInt(read_instruction.getAttribute("y"));
                        let dy = parseInt(read_instruction.getAttribute("dy"));
                        new_instruction = new Up(this.objects.get(object_id), y, dy, this.loop_delay);
                    } else if (type == "down") {
                        let y = parseInt(read_instruction.getAttribute("y"));
                        let dy = parseInt(read_instruction.getAttribute("dy"));
                        new_instruction = new Down(this.objects.get(object_id), y, dy, this.loop_delay);
                    } else if (type == "left") {
                        let x = parseInt(read_instruction.getAttribute("x"));
                        let dx = parseInt(read_instruction.getAttribute("dx"));
                        new_instruction = new Left(this.objects.get(object_id), x, dx, this.loop_delay);
                    } else if (type == "right") {
                        let x = parseInt(read_instruction.getAttribute("x"));
                        let dx = parseInt(read_instruction.getAttribute("dx"));
                        new_instruction = new Right(this.objects.get(object_id), x, dx, this.loop_delay);
                    } else if (type == "angle") {
                        let degrees = parseInt(read_instruction.getAttribute("degrees"));
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object_id), "angle", degrees);
                    } else if (type == "setproperty") {
                        let object = read_instruction.getAttribute("object");
                        let property = read_instruction.getAttribute("property");
                        let value = read_instruction.getAttribute("value");
                        new_instruction = new SetProperty(this.objects.get(object_id), this.objects.get(object), property, value);
                    } else if (type == "blink") {
                        let times = parseInt(read_instruction.getAttribute("times"));
                        let delay = parseInt(read_instruction.getAttribute("delay"));
                        new_instruction = new Blink(this.objects.get(object_id), times, delay, this.loop_delay);
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
        let program = this.programs.get(object_id);

        // In case of the program does not contain any instruction, stop its execution right now
        if (this.stop_animation || program.length == 0) {
            return;
        }

        let instruction = program[instruction_number];

        let next_instruction = instruction_number; // the next instruction is by default the current one
        let continue_execution = true; // this program will by default continue
        
        // Execute the instruction if the state of the object is the default one
        if (!this.start_button.getPresent() && this.objects.get(object_id).getState() == DEFAULT_STATE) {
            let instruction_type = instruction.constructor.name;
            if (instruction_type == "Label") {
                labels.set(instruction.getValue(), instruction_number + 1);
                next_instruction = instruction_number + 1;
            } else if (instruction_type == "GoTo") {
                next_instruction = labels.get(instruction.getValue());
            } else if (instruction_type == "Stop") {
                let continue_execution = false;
                this.stop_animation = true;
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

    preload(drawing) {
        // Load the backround image
        if (this.bg_image != "") {
            this.bg_image = drawing.loadImage(this.bg_image);
        }
		
		// Load animation's images
        for (let object_id of this.objects_image) {
            this.objects.get(object_id).loadImage(drawing);
        }

        // Convert and sort the layers set
        this.layers = Array.from(this.layers);
        this.layers.sort();
    }

    setup(drawing) {
        this.canvas = drawing.createCanvas(this.width, this.height);
        this.canvas.parent(this.parent);

        // Remove the loading message
        this.parent.removeChild(this.parent.getElementsByClassName("loading")[0]);
    }

    draw(drawing) {
		// Display the background image
        if (this.bg_image != null) {
            drawing.background(this.bg_image);
        }

        // Display the start button if it has to
        if (this.start_button.getPresent()) {
            this.start_button.draw(drawing);
        } else {
            // Display objects of each layer, if they're set as visible
            for (let layer of this.layers) {
                for (let object of this.objects.values()) {
                    if (object.getLayer() == layer && object.getVisible()) {
                        object.draw(drawing);
                    }
                }
            }
        }
    }

    canvasClicked(drawing) {
        // Get the visible objects that are under the cursor position
        for (let object of this.objects.values()) {
            if (object.getVisible()) {
                if (object.isClicked(drawing.mouseX, drawing.mouseY)) {
                    new Trigger(null, object, WAITING_CLICK_STATE).execute();
                }
            }
        }

        if (this.start_button.getPresent() && this.start_button.isClicked(drawing.mouseX, drawing.mouseY)) {
            this.start_button.setPresent(false);
        }
	}

}
