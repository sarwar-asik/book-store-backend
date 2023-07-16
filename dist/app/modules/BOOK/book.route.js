"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const books_validation_1 = require("./books.validation");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/', (0, validateUserRequest_1.default)(books_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get('/book', book_controller_1.BookController.getBook);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/', book_controller_1.BookController.getALLBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
router.put('/:id', (0, validateUserRequest_1.default)(books_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBook);
exports.BooksRouter = router;
