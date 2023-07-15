/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';

import pick from '../../../shared/pick';
import { BookService } from './book.services';
import { IBook } from './book.interface';
import { Book } from './book.model';
const createBook = catchAsync(async (req: Request, res: Response) => {
  const BookData = req.body;
  console.log(
    '🚀 ~ file: book.controller.ts:11 ~ createBook ~ BookData:',
    BookData
  );

  const result = await BookService.createBook(BookData);
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBooks(id);
  console.log(id, 'id');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrieved successfully !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const email = req.query.email;
  // console.log(id, email);

  const result = await BookService.deleteBook(id,email);

 if(result){
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book deleted successfully !',
    data: result,
  });
 }
});

const updateBook = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await BookService.updateBook(id, updatedData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  })
);

//   with pagination ///
const BookFilterableFields = ['searchTerm', 'minPrice', 'maxPrice', 'location'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

const getBook = catchAsync(async (req: Request, res: Response) => {
  // console.log('bbbbbbbbbbbbbbbbbbb');

  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Books retrieved successfully ',
    data: result,
  });
});
const getALLBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getALLBook(filters, paginationOptions);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Books retrieved successfully ',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  createBook,
  getALLBook,
  updateBook,
  getSingleBook,
  deleteBook,
  getBook,
};
