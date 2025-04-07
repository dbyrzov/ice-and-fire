import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { SearchInputComponent } from '../../../core/components/search-input/search-input.component';
import {
  filterBooksByName,
  loadBooks,
  updateBook,
} from '../../../store/books/books.actions';
import { Book } from '../../../store/books/books.models';
import {
  selectBooksError,
  selectBooksLoading,
  selectFilteredBooks,
} from '../../../store/books/books.selectors';
import { BooksService } from '../../../store/books/books.service';
import { BooksListCardComponent } from './components/books-list-card/books-list-card.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchInputComponent,
    BooksListCardComponent,
  ],
})
export class BooksPageListComponent implements OnInit {
  private router = inject(Router);
  private booksService = inject(BooksService);

  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.books$ = this.store.pipe(select(selectFilteredBooks));
    this.loading$ = this.store.pipe(select(selectBooksLoading));
    this.error$ = this.store.pipe(select(selectBooksError));
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  onSearchChange(word: string): void {
    this.store.dispatch(filterBooksByName({ searchTerm: word }));
  }

  gotoBookDetails(url: string) {
    const bookId = url.split('/').pop();
    this.router.navigate([bookId ? `/books/${bookId}` : 'not-found']);
  }

  updateBook(book: Book) {
    this.booksService
      .addRemoveFavorites(book.id)
      .pipe(tap(() => this.store.dispatch(updateBook({ book }))))
      .subscribe();
  }
}
