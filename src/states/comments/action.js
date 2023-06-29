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

function toggleUpVoteCommentActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
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

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(toggleUpVoteCommentActionCreator({ threadId, commentId }));

    try {
      await api.upVoteComment({ threadId, commentId });
      dispatch(toggleUpVoteCommentActionCreator({ threadId, commentId }));
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ threadId, commentId }));
    }
    
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(toggleDownVoteCommentActionCreator({ threadId, commentId }));

    try {
      await api.downVoteComment({ threadId, commentId });
      dispatch(toggleDownVoteCommentActionCreator({ threadId, commentId }));
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ threadId, commentId }));
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
  asyncUpVoteComment,
  asyncDownVoteComment,
}