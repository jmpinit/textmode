"use strict";

const bitmap = require("./bitmap");

const plane = function*(width, height) {
    let x = 0;
    let y = 0;

    while (true) {
        if (y >= height) {
            break;
        }
        else {
            yield { x, y };
        }

        x++;

        if (x >= width) {
            x = 0;
            y++;

        }
    }
};

const makeTextField = function(width, height) {
    const character = { width: 7, height: 12 };

    const palette = [];
    const bg = [];
    const fg = [];

    [...plane(width, height)].map(({x, y}) => {
        const i = y * width + x;

        bg[i] = Math.floor(Math.random() * 5);
        fg[i] = " ";
    });

    // construct default palette
    (() => {
        const solid = function (r, g, b) {
            const bits = bitmap.make(character.width, character.height);

            for (const {x, y} of plane(bits.width(), bits.height())) {
                bits.set(x, y, r, g, b, 64);
            }

            return bits;
        };

        palette.push(solid(255, 255, 255));
        palette.push(solid(0, 0, 0));
        palette.push(solid(255, 0, 0));
        palette.push(solid(0, 255, 0));
        palette.push(solid(0, 0, 255));
    })();

    // imagelayer is <canvas>
    // textlayer is <p>
    const render = function(imagelayer, textlayer) {
        textlayer.innerHTML = "";
        const text = fg.join("");
        let html = "";

        for (let y = 0; y < text.length; y += width) {
            const row = text.slice(y, y + width);
            html += `${row}<br>`;
        }

        textlayer.innerHTML = html;

        //const bounds = textlayer.getBoundingClientRect();
        const textWidth = 4.6929931640625;// bounds.width / width;
        const textHeight = 15;// bounds.height / height;

        const ctx = imagelayer.getContext("2d");

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = y * width + x;
                const data = palette[bg[i]].toImageData();
                ctx.putImageData(data, x * textWidth, y * textHeight);
            }
        }
    };

    const setFG = function(x, y, c) {
        if (typeof c !== "string" || c.length !== 1) {
            throw new Error("Character must be string of length one");
        }

        if (x < 0 || x >= width || y < 0 || y >= height) {
            throw new Error(`Point (${x}, ${y}) is out of bounds.`);
        }

        const i = y * width + x;
        fg[i] = c;
    };

    return {
        render,
        setFG,
        //setPalette, setBG, setFG,
    };
};

module.exports = {
    make: makeTextField,
};

