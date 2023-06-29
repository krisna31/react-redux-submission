import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import { BiCommentDetail, BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

function ThreadDetail({ id, title, body, category, createdAt, upVotesBy, downVotesBy, authUser, totalComments, upVote, downVote, owner }) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteHandler = (event) => {
    event.stopPropagation();
    isDownVoted && downVote();
    upVote();
  };

  const onDownVoteHandler = (event) => {
    event.stopPropagation();
    isUpVoted && upVote();
    downVote();
  };

  return (
    <div className="flex flex-col gap-5 p-6 min-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 w-fit">#{category}</span>
      <Link to={`/threads/${id}`} className="mb-2 text-3xl font-bold tracking-tight text-blue-800 dark:text-white">
        {title}
      </Link>
      <div className="font-normal text-gray-700 dark:text-gray-400">{<div dangerouslySetInnerHTML={{ __html: body.length > 90 ? body.slice(0, 90) + "....." : body }} />}</div>
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
        <div className="flex items-center justify-center gap-1">
          <BiCommentDetail />
          <span>{totalComments}</span>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 w-fit">
          <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
          </svg>
          {postedAt(createdAt)}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 w-fit gap-2 ">
          <IoIosCreate />
          {owner?.name}
        </span>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string,
};

const ThreadDetailShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  owner: PropTypes.shape(userShape),
  totalComments: PropTypes.number,
};

ThreadDetail.propTypes = {
  ...ThreadDetailShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

export default ThreadDetail;
