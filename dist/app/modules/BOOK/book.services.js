"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const getSingleBooks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const deleteBook = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 ~ file: book.services.ts:20 ~ deleteBook ~ email:', email);
    const matchBook = yield book_model_1.Book.findById(id);
    if ((matchBook === null || matchBook === void 0 ? void 0 : matchBook.user) === email) {
        console.log('🚀 ~ file: book.services.ts:25 ~ deleteBook ~ matchBook:', matchBook);
        const result = yield book_model_1.Book.findByIdAndDelete(id);
        return result;
    }
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
//   pagination getAllBook
const getALLBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(filtersData);
    const page = Number(paginationOptions.page || 1);
    const limit = Number(paginationOptions.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = paginationOptions.sortBy || 'createdAt';
    const sortOrder = paginationOptions.sortOrder || 'desc';
    const BookSearchableFields = ['title', 'genre', 'author'];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: BookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // .select({ price: 1, name: 1 });
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const postReview = (id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: reviewData } }, {
        new: true,
    });
    return result;
});
exports.BookService = {
    createBook,
    getSingleBooks,
    deleteBook,
    updateBook,
    getALLBook,
    postReview
};
