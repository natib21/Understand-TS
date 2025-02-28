"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello, world!');
});
router.post('/', (req, res) => {
    res.send('Hello, world!');
});
router.patch('/', (req, res) => {
    res.send('Hello, world!');
});
router.delete('/', (req, res) => {
    res.send('Hello, world!');
});
exports.default = router;
