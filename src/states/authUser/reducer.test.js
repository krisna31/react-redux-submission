/**
  * Test scenario for authUserReducer
  *
  * - authUserReducer function
  *   - should return the initial state when given an unknown action
  *   - should return the authUser when given a SET_AUTH_USER action
  *  - should return null when given a UNSET_AUTH_USER action
  *
  */

import authUserReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const newState = authUserReducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should return the authUser when given a SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const authUser = { id: 1, name: 'Krisna' };
    const action = { type: ActionType.SET_AUTH_USER, payload: { authUser } };

    // Action
    const newState = authUserReducer(initialState, action);

    // Assert
    expect(newState).toEqual(authUser);
  });

  it('should return null when given a UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = { id: 1, name: 'Krisna' };
    const action = { type: ActionType.UNSET_AUTH_USER };

    // Action
    const newState = authUserReducer(initialState, action);

    // Assert
    expect(newState).toEqual(null);
  });
});