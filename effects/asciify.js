// make an image into ascii art

"use strict";

const character = { width: 11, height: 18 };

const signature = {
    target: "image",
};

// resizes given image and returns new canvas
const resize = function(image, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.scale(width / image.width, height / image.height);
    ctx.drawImage(image, 0, 0);

    return canvas;
};

const run = function(inputs) {
    const ZOOM = 32;

    const img = inputs[0];

    const ratio = character.height / character.width;
    const newWidth = img.width / ZOOM;
    const newHeight = img.height / (ZOOM * ratio);
    const canvas = resize(img, newWidth, newHeight);

    const ctx = canvas.getContext("2d");
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
