/* eslint-disable no-console */
import { SortOrder } from 'mongoose';

import { IBook } from './book.interface';
import { Book } from './book.model';
import { IGenericPaginationResponse } from '../../../interfaces/ICommon';


const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getSingleBooks = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('seller');

  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id).populate('seller');

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

// pagination ./////

type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

type IBookFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: Location;
};

//   pagination getAllBook

const getALLBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<Partial<IBook[]>>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log(filtersData);

  const page = Number(paginationOptions.page || 1);
  const limit = Number(paginationOptions.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = paginationOptions.sortBy || 'createdAt';
  const sortOrder = paginationOptions.sortOrder || 'desc';

  const BookSearchableFields = ['minPrice', 'maxPrice', 'location'];

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

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,

  //     })),
  //   });
  // }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => {
  //       const fieldName =
  //         field === 'minPrice' || field === 'maxPrice' ? 'price' : field;
  //       const NewValue =
  //         field === 'minPrice' || field === 'maxPrice'
  //           ? parseInt(value)
  //           : value;

  //       if (field === 'minPrice') {
  //         return { [fieldName]: { $gt: NewValue } };
  //       }
  //       if (field === 'maxPrice') {
  //         return { [fieldName]: { $lt: NewValue } };
  //       }
  //       return { [fieldName]: value };
  //     }),
  //   });
  // }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('seller');

  // .select({ price: 1, name: 1 });

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getSingleBooks,
  deleteBook,
  updateBook,
  getALLBook,
};
