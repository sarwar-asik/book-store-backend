"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publicationDate: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    reviews: {
        type: [String]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
