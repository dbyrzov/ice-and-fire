import { createAction, props } from '@ngrx/store';
import { UserProfile } from './profile.models';

export const loadProfile = createAction('[Profile] Load Profile');

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ profile: UserProfile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: string }>()
);

export const removeProfile = createAction('[Profile] Remove Profile');
