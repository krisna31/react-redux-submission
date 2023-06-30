import PropTypes from "prop-types";
import { postedAt } from "../utils";
import { IoIosCreate } from "react-icons/io";
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from "react-icons/bi";

function CommentItem({ id, content, createdAt, upVotesBy, downVotesBy, authUser, owner, upVote, downVote }) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  console.log(upVotesBy);

  const onUpVoteHandler = (event) => {
    event.stopPropagation();
    isDownVoted && downVote(id);
    upVote(id);
  };

  const onDownVoteHandler = (event) => {
    event.stopPropagation();
    isUpVoted && upVote(id);
    downVote(id);
  };

  return (
    <div className="flex flex-col gap-5 p-6 min-w-full bg-white border-l border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <dir className="flex justify-between">
        <div className="flex gap-5 items-center">
          <img className="w-8 h-8 rounded-full border" src={owner.avatar} alt={owner.name} />
          <span>{owner.name}</span>
        </div>
        <span>{postedAt(createdAt)}</span>
      </dir>
      <span className="text-xl font-medium w-fit">{content}</span>
      <div className="flex gap-5">
        {isUpVoted ? (
          <button onClick={(e) => onUpVoteHandler(e)} className="flex items-center justify-center gap-1">
            <BiSolidUpvote />
            <span>{upVotesBy.length}</span>
          </button>
        ) : (
          <button onClick={(e) => onUpVoteHandler(e)} className="flex items-center justify-center gap-1">
            <BiUpvote />
            <span>{upVotesBy.length}</span>
          </button>
        )}
        {isDownVoted ? (
          <button onClick={(e) => onDownVoteHandler(e)} className="flex items-center justify-center gap-1">
            <BiSolidDownvote />
            <span>{downVotesBy.length}</span>
          </button>
        ) : (
          <button onClick={(e) => onDownVoteHandler(e)} className="flex items-center justify-center gap-1">
            <BiDownvote />
            <span>{downVotesBy.length}</span>
          </button>
        )}
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 w-fit">
          <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
          </svg>
          {postedAt(createdAt)}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 w-fit gap-2 ">
          <IoIosCreate />
          {owner.name}
        </span>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  authUser: PropTypes.string.isRequired,
};

export default CommentItem;
