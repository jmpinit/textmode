// build and manage an fx graph

"use strict";

const EventEmitter = require("events").EventEmitter;
const async = require("async");
const resource = require("./resource");

const plug = function(effectName, urls) {
    const emitter = new EventEmitter();
    const effect = require(`./effects/${effectName}`);

    const ticker = function(resources) {
        return () => emitter.emit("frame", effect.run(resources));
    };

    async.map(urls, (url, done) => {
        resource.load(url, done);
    },
    (err, resources) => {
        setInterval(ticker(resources), 16);
    });

    return emitter;
};

module.exports = {
    plug,
};
