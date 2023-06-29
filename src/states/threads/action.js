import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.getAllThreads();
      
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category = 'General' }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(showLoading());
  };
}

function asyncToogleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncToogleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncGetThreads,
  asyncAddThread,
  asyncToogleUpVoteThread,
  asyncToogleDownVoteThread,
};