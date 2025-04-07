import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../core/auth/services/auth.service';
import {
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  private authService = inject(AuthService);
  private actions$ = inject(Actions);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      mergeMap(() =>
        this.authService.loadToken().pipe(
          map((profile) => {
            if (profile) {
              return loadProfileSuccess({ profile: profile });
            }

            return loadProfileFailure({ error: 'failed to load profile' });
          })
        )
      )
    )
  );
}
