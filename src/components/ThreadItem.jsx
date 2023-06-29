import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { postedAt } from "../utils";

function ThreadItem({ id, title, body, category, createdAt, upVotesBy, downVotesBy, authUser, createdBy, totalComments }) {
  const navigate = useNavigate();
  // const isTalkLiked = upVotesBy.includes(authUser);

  // const onUpVoteHandler = (event) => {
  //   event.stopPropagation();
  //   like(id);
  // };

  // const onTalkClick = () => {
  //   navigate(`/talks/${id}`);
  // };

  // const onTalkPress = (event) => {
  //   if (event.key === "Enter" || event.key === " ") {
  //     navigate(`/talks/${id}`);
  //   }
  // };

  return (
    <Link to={`/threads/${id}`} className="block p-6 min-w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{category}</span>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{<div dangerouslySetInnerHTML={{ __html: body }} />}</p>
      <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
        <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
        </svg>
        {postedAt(createdAt)}
      </span>
    </Link>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  createdBy: PropTypes.shape(userShape).isRequired,
  totalComments: PropTypes.number,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

export default ThreadItem;
