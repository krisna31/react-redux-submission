/**
 * Test scenario for users action
 * 
 * - asyncRegisterUser Thunk
 *  - should dispatch alert when register success
 *  - should dispatch alert when register failed
 */

import { asyncRegisterUser } from './action';
import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const fakeUserCreateResponse = {
  "status": "success",
  "message": "User created",
  "data": {
      "user": {
          "id": "user-123",
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": "https://generated-image-url.jpg"
      }
  }
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser Thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    // delete backup data
    delete api._register;
  });

  it('should dispatch alert when register success', async () => {
    // Arrange
    // stub
    api.register = () => Promise.resolve(fakeUserCreateResponse);
    const { name, email, password } = { name: 'krisna31', email: 'krisnaaaputraaa@gmail.com', password: '12345678' };

    // mock
    const dispatch = vi.fn();

    // Action
    await asyncRegisterUser({ name, email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch alert when register failed', async () => {
    // Arrange
    // stub
    api.register = () => Promise.reject(fakeErrorResponse);
    const { name, email, password } = { name: 'krisna31', email: 'krisnaaaputraaa@gmail.com', password: '12345678' };

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Action
    await asyncRegisterUser({ name, email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});