"use strict";

const fx = require("./fx");
const textfield = require("./textfield");

const field = textfield.make(128, 128);

const canvas = document.getElementById("pop");
const textbox = document.getElementById("crunch");
field.render(canvas, textbox);

const graph = fx.plug("asciify", ["http://i.imgur.com/ktvQaa4.jpg", "js://time"]);

graph.on("frame", (frame) => {
    for (let y = 0; y < frame.height; y++) {
        for (let x = 0; x < frame.width; x++) {
            const i = y * frame.width + x;
            field.setFG(x, y, frame.text[i]);
        }
    }

    field.render(canvas, textbox);
});
