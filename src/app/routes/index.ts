import express from 'express';
import { BooksRouter } from '../modules/BOOK/book.route';



const router = express.Router();

const modulesRoutes = [
  {
    path: '/book',
    route: BooksRouter,
  }
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
