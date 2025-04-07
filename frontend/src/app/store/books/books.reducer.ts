import { createReducer, on } from '@ngrx/store';
import {
  filterBooksByName,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  updateBook,
} from './books.actions';

export interface BooksState {
  books: any[];
  filteredBooks: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  loading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    filteredBooks: books,
    loading: false,
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(filterBooksByName, (state, { searchTerm }) => ({
    ...state,
    filteredBooks: state.books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })),
  on(updateBook, (state, { book }) => ({
    ...state,
    books: state.books.map((b) => (b.url === book.url ? book : b)),
  }))
);
