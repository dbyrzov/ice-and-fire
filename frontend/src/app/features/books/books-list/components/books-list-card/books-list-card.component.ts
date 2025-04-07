import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FavoriteIconComponent } from '../../../../../core/components/favorite-icon/favorite-icon.component';
import { Book } from '../../../../../store/books/books.models';

@Component({
  selector: 'app-books-list-card',
  standalone: true,
  imports: [FavoriteIconComponent, CommonModule],
  templateUrl: './books-list-card.component.html',
  styleUrl: './books-list-card.component.scss',
})
export class BooksListCardComponent {
  book = input.required<Book>();

  updateEvent = output<Book>();

  updateBook(favorite: boolean) {
    const updatedBook = { ...this.book(), favorite: favorite };
    this.updateEvent.emit(updatedBook);
  }
}
