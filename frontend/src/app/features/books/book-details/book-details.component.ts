import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, delay, of } from 'rxjs';
import { Book } from '../../../store/books/books.models';
import { BooksService } from '../../../store/books/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BookDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private booksService = inject(BooksService);

  error = signal(null);

  book = signal<Book | null>(null);

  ngOnInit(): void {
    this.booksService
      .getBook(Number(this.route.snapshot.paramMap.get('id')!))
      .pipe(
        delay(1000),
        catchError((err) => {
          this.error.set(err);
          this.book.set(null);
          return of(null);
        })
      )
      .subscribe((book) => this.book.set(book));
  }
}
