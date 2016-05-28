"use strict";

const effect = require("./effects/asciify"); // FIXME don't harcode

const go = function() {
    const img = document.createElement("img");
    img.src = "http://i.imgur.com/ktvQaa4.jpg";
    img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const frame = effect.run(canvas);

        const textbox = document.getElementById("crunch");

        textbox.innerHTML = "";
        for (let y = 0; y < frame.text.length; y += frame.width) {
            const row = frame.text.slice(y, y + frame.width);
            textbox.innerHTML += `${row}<br>`;
        }
    };
};

module.exports = {
    go,
};
