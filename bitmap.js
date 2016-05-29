"use strict";

const makeBitmap = function(width, height) {
    const data = [];

    for (let i = 0; i < width * height; i++) {
        data.push([0, 0, 0, 255]);
    }

    const get = function(x, y) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            const i = y * width + x;
            return data[i];
        }
        else {
            throw new Error(`Pixel (${x}, ${y}) is out of bounds`);
        }
    };

    const set = function(x, y, r, g, b, a = 255) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            const i = y * width + x;
            data[i] = [r, g, b, a];
        }
        else {
            throw new Error(`Pixel (${x}, ${y}) is out of bounds`);
        }
    };

    const toTypedArray = function() {
        const dataArray = new Uint8ClampedArray(data.length * 4);

        for (let i = 0; i < data.length; i++) {
            dataArray[i * 4] = data[i][0];
            dataArray[i * 4 + 1] = data[i][1];
            dataArray[i * 4 + 2] = data[i][2];
            dataArray[i * 4 + 3] = data[i][3];
        }

        return dataArray;
    };

    const toImageData = function() {
        return new ImageData(toTypedArray(), width, height);
    };

    const toCanvas = function() {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.putImageData(toImageData(), 0, 0);

        return canvas;
    };

    return {
        width: function() { return width; },
        height: function() { return height; },
        get,
        set,
        toImageData,
        toCanvas,
    };
};

module.exports = {
    make: makeBitmap,
};
