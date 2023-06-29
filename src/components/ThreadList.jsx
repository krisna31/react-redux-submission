import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";

function ThreadList({ threads, upVote, downVote }) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} upVote={upVote} downVote={downVote} />
      ))}
    </div>
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

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
