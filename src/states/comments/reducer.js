import { ActionType } from './action';

function commentReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments];
    default:
      return comments;
  }
}

export default commentReducer;
