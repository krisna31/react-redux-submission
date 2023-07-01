/**
  * Test scenario for isPreloadReducer
  *
  * - isPreloadReducer function
  *   - should return the initial state when given an unknown action
  *   - should return the isPreload when given a SET_IS_PRELOAD action
  *
  */

import isPreloadReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('isPreloadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // Action
    const newState = isPreloadReducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should return the isPreload when given a SET_IS_PRELOAD action', () => {
    // Arrange
    const initialState = true;
    const isPreload = false;
    const action = { type: ActionType.SET_IS_PRELOAD, payload: { isPreload } };

    // Action
    const newState = isPreloadReducer(initialState, action);

    // Assert
    expect(newState).toEqual(isPreload);
  });
});