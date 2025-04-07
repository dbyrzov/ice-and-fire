import { createReducer, on } from '@ngrx/store';
import {
  loadProfileFailure,
  loadProfileSuccess,
  removeProfile,
} from './profile.actions';
import { UserProfile } from './profile.models';

// Define the initial state
export interface ProfileState {
  profile: UserProfile | null;
  error: string | null;
  loading: boolean;
}

export const initialState: ProfileState = {
  profile: null,
  error: null,
  loading: false,
};

// Create the reducer function
export const profileReducer = createReducer(
  initialState,
  on(loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
    error: null,
  })),
  on(loadProfileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(removeProfile, (state) => ({ ...state, profile: null }))
);
