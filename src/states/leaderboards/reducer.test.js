/**
* Test scenario for leaderboardReducer
*
* - leaderboardReducer function
*   - should return the initial state when given an unknown action
*   - should return the leaderboards when given a RECEIVE_LEADERBOARDS action
*
*/

import leaderboardReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('leaderboardReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const newState = leaderboardReducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should return the leaderboards when given a RECEIVE_LEADERBOARDS action', () => {
    // Arrange
    const initialState = [];
    const leaderboards = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    const action = { type: ActionType.RECEIVE_LEADERBOARDS, payload: { leaderboards } };

    // Action
    const newState = leaderboardReducer(initialState, action);

    // Assert
    expect(newState).toEqual(leaderboards);
  });
});