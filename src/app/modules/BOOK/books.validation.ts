import { z } from 'zod';


const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Book title is required',
    }),
    author: z.string({
      required_error: 'Book author is required',
    }),
    genre: z.string({
      required_error: 'Book genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Book publicationDate is required',
    })
  })
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Book title is required',
    }).optional(),
    author: z.string({
      required_error: 'Book author is required',
    }).optional(),
    genre: z.string({
      required_error: 'Book genre is required',
    }).optional(),
    publicationDate: z.string({
      required_error: 'Book publicationDate is required',
    }).optional()
  })
});

export const BookValidation = { createBookZodSchema, updateBookZodSchema };
