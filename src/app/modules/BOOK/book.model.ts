/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema: Schema<IBook> = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique:true
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
    user:{
      type: String,
      required: true
    },
    reviews:{
      type:[String]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
