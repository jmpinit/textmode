// make an image into ascii art

"use strict";

const character = { width: 11, height: 18 };

const signature = {
    target: "image",
};

const run = function(inputs, state = []) {
    const ZOOM = 32;

    const img = inputs;

    const canvas = document.createElement("canvas");
    canvas.width = img.width / ZOOM;
    canvas.height = img.height / ZOOM;

    const ctx = canvas.getContext("2d");
    const ratio = character.height / character.width;
    ctx.scale(1 / ZOOM, 1 / (ZOOM * ratio));
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const chars = ".:-=+*#%@";
    let text = "";

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const i = (y*canvas.width+x) * 4;

            const r = data.data[i];
            const g = data.data[i+1];
            const b = data.data[i+2];

            const brightness = 256 - (r + g + b) / 3;

            const paletteIndex = Math.floor(chars.length * (brightness / 256));
            text += chars.charAt(paletteIndex);
        }
    }

    return {
        width: canvas.width,
        height: canvas.height,
        text,
    };
};

module.exports = {
    run,
    signature,
};
