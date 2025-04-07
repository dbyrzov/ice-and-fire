import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { API_URL, BACKEND_URL } from '../../common/api.constants';
import { selectProfile } from '../profile/profile..selectors';
import { Book } from './books.models';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private http = inject(HttpClient);
  private store = inject(Store);

  profile$ = this.store.select(selectProfile);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/books`);
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL}/books/${bookId}`);
  }

  getFavoriteBooks(): Observable<number[]> {
    return this.profile$.pipe(
      filter((p) => !!p),
      switchMap((profile) =>
        this.http.get<number[]>(
          `${BACKEND_URL}/users/${profile.id}/favorites/books`
        )
      )
    );
  }

  addRemoveFavorites(bookId: number): Observable<any> {
    return this.http.post(`${BACKEND_URL}/books/favorites`, { bookId });
  }
}
