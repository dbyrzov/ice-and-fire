import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';

export const selectProfileState =
  createFeatureSelector<ProfileState>('profile');

// Selector to get the user profile
export const selectProfile = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile
);

// Selector to get the loading state
export const selectProfileLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.loading
);

// Selector to get the error state
export const selectProfileError = createSelector(
  selectProfileState,
  (state: ProfileState) => state.error
);
