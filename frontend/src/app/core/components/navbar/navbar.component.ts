import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProfile } from '../../../store/profile/profile..selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    OverlayModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private store = inject(Store);

  user$ = this.store.select(selectProfile);

  menuList: MenuItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Books', link: '/books' },
    { label: 'Logout', link: '/logout' },
  ];

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}

type MenuItem = {
  label: string;
  link: string;
};
