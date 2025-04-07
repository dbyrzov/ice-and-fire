import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

// Feature selector for books state
export const selectBooksState = createFeatureSelector<BooksState>('books');

// Selector to get all books
export const selectAllBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state.books
);

// Selector to check loading status
export const selectBooksLoading = createSelector(
  selectBooksState,
  (state: BooksState) => state.loading
);

// Selector to get error if any
export const selectBooksError = createSelector(
  selectBooksState,
  (state: BooksState) => state.error
);

export const selectFilteredBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state.filteredBooks // After filtering, this will give the filtered books
);
