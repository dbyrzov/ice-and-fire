import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListCardComponent } from './books-list-card.component';

describe('BooksListCardComponent', () => {
  let component: BooksListCardComponent;
  let fixture: ComponentFixture<BooksListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
