import { ActionType } from './action';

function threadDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL:
      return {
        ...talkDetail,
        upVotesBy: talkDetail.upVotesBy.includes(action.payload.userId)
          ? talkDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : talkDetail.upVotesBy.concat([action.payload.userId]), 
      };
    case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL:
      return {
        ...talkDetail,
        downVotesBy: talkDetail.downVotesBy.includes(action.payload.userId)
          ? talkDetail.downVotesBy.filter((id) => id !== action.payload.userId)
          : talkDetail.downVotesBy.concat([action.payload.userId]),
      };
    default:
      return talkDetail;
  }
}

export default threadDetailReducer;
