import { createAction, props } from '@ngrx/store';

export const loadBooks = createAction('[Books] Load Books');

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: any[] }>()
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: string }>()
);

export const filterBooksByName = createAction(
  '[Books] Filter Books by Name',
  props<{ searchTerm: string }>()
);

export const updateBook = createAction(
  '[Books] Update Book',
  props<{ book: any }>()
);

export const loadFavoriteBooks = createAction('[Books] Load Favorite books');

export const loadFavoriteBooksSuccess = createAction(
  '[Books] Load Favorite Books Success',
  props<{ favoriteBooks: number[] }>()
);
