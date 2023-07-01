/**
 * Test scenario for leaderboards action
 *
 * - asyncReceiveLeaderboards Thunk
 *  - should dispatch RECEIVE_LEADERBOARDS action when fetch leaderboards success
 *  - should dispatch RECEIVE_LEADERBOARDS action when fetch leaderboards failed
 */

import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';
import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';


const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'krisna31',
      email: 'krisnaaaputraaa@gmail.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'krisna41',
      email: 'krisnaaa2putraaa2@gmail.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 20,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveLeaderboards Thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // delete backup data
    delete api._getLeaderboards;
  });

  it('should dispatch RECEIVE_LEADERBOARDS action when fetch leaderboards success', async () => {
    // Arrange
    // stub
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock
    const dispatch = vi.fn();

    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch RECEIVE_LEADERBOARDS action when fetch leaderboards failed', async () => {
    // Arrange
    // stub
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();
    
    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(null);
  });
});