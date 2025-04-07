import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadBooks, loadBooksFailure, loadBooksSuccess } from './books.actions';
import { BooksService } from './books.service';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private booksService = inject(BooksService);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        combineLatest([
          this.booksService.getFavoriteBooks(),
          this.booksService.getBooks(),
        ]).pipe(
          map(([favorites, books]) =>
            loadBooksSuccess({
              books: books.map((b) => {
                b.id = Number(b.url.split('/').pop() ?? -1);
                b.favorite = favorites.includes(b.id);

                return b;
              }),
            })
          ),
          catchError((error) =>
            of(loadBooksFailure({ error: 'Something went wrong.' }))
          )
        )
      )
    )
  );
}
