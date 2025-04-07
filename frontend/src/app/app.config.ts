import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { authTokenInterceptor } from './core/auth/interceptors/auth-token.interceptor';
import { BooksEffects } from './store/books/books.effects';
import { booksReducer } from './store/books/books.reducer';
import { ProfileEffects } from './store/profile/profile.effects';
import { profileReducer } from './store/profile/profile.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authTokenInterceptor])
    ),
    provideStore({
      books: booksReducer,
      profile: profileReducer,
    }),
    provideEffects([BooksEffects, ProfileEffects]),
  ],
};

bootstrapApplication(AppComponent, appConfig);
