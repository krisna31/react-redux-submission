/**
 * Test scenario for authUser action
 *
 * - asyncSetAuthUser Thunk
 *  - should dispatch SET_AUTH_USER action when login success
 *  - should dispatch alert when login failed
 * - asyncUnsetAuthUser Thunk
 *  - should dispatch UNSET_AUTH_USER action
 *  - should remove access token from api
 */

import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';
import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const fakeAuthUserResponse = {
  id: 'users-1',
  name: 'krisna31',
  email: 'krisnaaaputraaa@gmail.com',
  avatar: 'https://generated-image-url.jpg',
}

const fakeLoginResponse = {
  "status": "success",
  "message": "ok",
  "data": {
      "token": "fake-token"
  }
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser Thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch SET_AUTH_USER action when login success', async () => {
    // Arrange
    // stub
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    api.putAccessToken = () => null;
    const { email, password } = {email: 'krisnaaaputraaa@gmail.com', password: '12345678'};

    // mock
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch alert when login failed', async () => {
    // Arrange
    // stub
    api.login = () => Promise.reject(fakeErrorResponse);
    const { email, password } = {email: 'krisnaaaputraaa@gmail.com', password: '12345678'};

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();
    
    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser Thunk', () => {
  beforeEach(() => {
    api._removeAccessToken = api.removeAccessToken;
  });

  afterEach(() => {
    api.removeAccessToken = api._removeAccessToken;

    // delete backup data
    delete api._removeAccessToken;
  });

  it('should dispatch UNSET_AUTH_USER action', async () => {
    // Arrange
    // stub
    api.removeAccessToken = () => null;

    // mock
    const dispatch = vi.fn();

    // Action
    await asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});