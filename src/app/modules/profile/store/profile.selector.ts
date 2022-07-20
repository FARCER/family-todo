import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProfileState } from './profile.state';

export const featureSelector = createFeatureSelector<IProfileState>('profile')

export const profileSelector = createSelector(
  featureSelector, state => state
)

