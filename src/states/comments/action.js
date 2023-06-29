import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ threadId, commentId,  userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncToogleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addCommentActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncAddComment,
  asyncToogleUpVoteComment,
  asyncToogleDownVoteComment,
};
