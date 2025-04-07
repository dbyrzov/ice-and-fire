// search-input.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SearchInputComponent {
  searchControl: FormControl = new FormControl(''); // FormControl for search input
  @Output() searchChanged = new EventEmitter<string>(); // Output to emit search term

  constructor() {
    // Setup debouncing logic for the search input
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Wait for 500ms after the user stops typing
        distinctUntilChanged() // Only trigger if the value changes
      )
      .subscribe((value) => {
        // Emit the search term back to the parent component
        this.searchChanged.emit(value);
      });
  }
}
