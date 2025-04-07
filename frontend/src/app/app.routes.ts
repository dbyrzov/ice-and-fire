import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { LogoutComponent } from './core/auth/components/logout/logout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { BookDetailsComponent } from './features/books/book-details/book-details.component';
import { BooksPageListComponent } from './features/books/books-list/books-list.component';
import { ExploreComponent } from './features/explore/explore.component';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'explore', component: ExploreComponent },
  {
    path: 'books',
    component: BooksPageListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
