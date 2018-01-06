// decode URLs

"use strict";

const path = require("path");

const loadImage = function(url, done) {
    const img = document.createElement("img");

    img.src = url;

    img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        done(null, canvas);
    };
};

const endsWithAnyOf = function(str, endings) {
    for (let i = 0; i < endings.length; i++) {
        if (str.endsWith(endings[i])) {
            return true;
        }
    }

    return false;
};

const decode = function(url) {
    const link = document.createElement("a");
    link.setAttribute("href", url);

    return {
        hostname: link.hostname,
        port: link.port,
        search: link.search,
        pathname: link.pathname,
        protocol: link.protocol,
    };
};

const load = function(url, done) {
    const info = decode(url);

    switch (info.protocol) {
        case "http:":
            if (endsWithAnyOf(info.pathname, [".png", ".jpg", ".gif", ".bmp"])) {
                loadImage(url, done);
            } break;
        case "js:":
            {
                const modulePath = `./${path.join("./resources", info.pathname)}`;
                done(null, require(modulePath));
            } break;
        default:
            throw new Error(`Unrecognized resource protocol ${info.protocol}`);
    }
};

module.exports = {
    decode,
    load,
};
