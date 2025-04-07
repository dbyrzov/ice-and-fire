import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPageListComponent } from './books-list.component';

describe('BooksPageListComponent', () => {
  let component: BooksPageListComponent;
  let fixture: ComponentFixture<BooksPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
