import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentList({ comments, upVote, downVote, authUser, neutralVote }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} upVote={upVote} downVote={downVote} authUser={authUser} neutralVote={neutralVote} />
        ))}
      </div>
      <div className="border-b" />
    </>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default CommentList;
