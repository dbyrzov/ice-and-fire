import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeProfile } from '../../../../store/profile/profile.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent {
  private router = inject(Router);
  private store = inject(Store);

  ngOnInit() {
    localStorage.removeItem('token');
    this.store.dispatch(removeProfile());
    this.router.navigate(['/']);
  }
}
