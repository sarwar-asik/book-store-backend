import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';
import { BookValidation } from './books.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);
router.post(
  '/Review/:id',
  BookController.postReviews
);

router.get(
  '/Review/:id',
  BookController.getReview
);
router.get(
  '/book',
  BookController.getBook
);

router.get(
  '/:id',
  BookController.getSingleBook
);


router.get(
  '/',
  BookController.getALLBook
);
router.delete('/:id', BookController.deleteBook);
router.put(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

export const BooksRouter = router;
