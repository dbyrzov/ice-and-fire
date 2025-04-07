import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  standalone: true,
  imports: [],
  templateUrl: './favorite-icon.component.html',
  styleUrl: './favorite-icon.component.scss',
})
export class FavoriteIconComponent {
  isFavorite = model<boolean>(false);

  toggleEvent = output<boolean>();

  toggleFavorite() {
    this.isFavorite.set(!this.isFavorite());
    this.toggleEvent.emit(this.isFavorite());
  }
}
