"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Book title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Book author is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Book genre is required',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Book publicationDate is required',
        })
    })
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string({
                required_error: 'Book title is required',
            }).optional(),
            author: zod_1.z.string({
                required_error: 'Book author is required',
            }).optional(),
            genre: zod_1.z.string({
                required_error: 'Book genre is required',
            }).optional(),
            publicationDate: zod_1.z.string({
                required_error: 'Book publicationDate is required',
            }).optional()
        })
    }),
});
exports.BookValidation = { createBookZodSchema, updateBookZodSchema };
