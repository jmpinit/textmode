"use strict";

const fx = require("./fx");

const canvas = document.getElementById("pop");
const ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, 16, 16);

fx.go();
