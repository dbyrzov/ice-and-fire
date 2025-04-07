import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { API_URL } from '../../common/api.constants';
import { CardSkeletonComponent } from '../../core/components/card-skeleton/card-skeleton.component';
import { Book } from '../../store/books/books.models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardSkeletonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  books = toSignal(
    this.http
      .get<Book[]>(`${API_URL}/books?pageSize=3`)
      .pipe(catchError(() => of([])))
  );
  houses = toSignal(
    this.http
      .get<any[]>(`${API_URL}/houses?pageSize=3`)
      .pipe(catchError(() => of([])))
  );
  characters = toSignal(
    this.http
      .get<any[]>(`${API_URL}/characters?pageSize=3`)
      .pipe(catchError(() => of([])))
  );

  gotoExplore() {
    this.navigate('/explore');
  }

  gotoBooks() {
    this.navigate('/books');
  }

  gotoHouses() {
    this.navigate('/houses');
  }

  gotoCharacters() {
    this.navigate('/characters');
  }

  gotoBookDetails(url: string) {
    const bookId = url.split('/').pop();
    this.navigate(bookId ? `/books/${bookId}` : 'not-found');
  }

  gotoHouseDetails(url: string) {
    const houseId = url.split('/').pop();
    this.navigate(houseId ? `/houses/${houseId}` : 'not-found');
  }

  gotoCharacterDetails(url: string) {
    const characterId = url.split('/').pop();
    this.navigate(characterId ? `/characters/${characterId}` : 'not-found');
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
