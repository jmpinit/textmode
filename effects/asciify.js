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

let imageData;

const run = function(inputs) {
    const ZOOM = 32;

    const img = inputs[0];
    const time = inputs[1].get();

    if (imageData === undefined) {
        const ratio = character.height / character.width;
        const newWidth = img.width / ZOOM;
        const newHeight = img.height / (ZOOM * ratio);
        const canvas = resize(img, newWidth, newHeight);

        const ctx = canvas.getContext("2d");
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    const chars = ".:-=+*#%@";
    const ascii = [];

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const i = y * imageData.width + x;
            const j = i * 4;

            const r = imageData.data[j];
            const g = imageData.data[j+1];
            const b = imageData.data[j+2];

            const brightness = 256 - (r + g + b) / 3;

            const paletteIndex = Math.floor(chars.length * (brightness / 256));
            ascii[i] = chars.charAt((paletteIndex + time) % chars.length);
        }
    }

    return {
        width: imageData.width,
        height: imageData.height,
        text: ascii,
    };
};

module.exports = {
    run,
    signature,
};
