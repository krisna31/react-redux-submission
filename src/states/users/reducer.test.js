/**
  * Test scenario for usersReducer
  *
  * - usersReducer function
  *   - should return the initial state when given an unknown action
  *   - should return the users when given a RECEIVE_USERS action
  *
  */

import usersReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('usersReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const newState = usersReducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should return the users when given a RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
    const users = [{ id: 1, name: 'Krisna' }, { id: 2, name: 'Putra' }];
    const action = { type: ActionType.RECEIVE_USERS, payload: { users } };

    // Action
    const newState = usersReducer(initialState, action);

    // Assert
    expect(newState).toEqual(users);
  });
});