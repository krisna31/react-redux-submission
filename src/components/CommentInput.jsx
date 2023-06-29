import { useState } from "react";
import PropTypes from "prop-types";

function CommentInput({ addComment }) {
  const LIMIT_WORD = 280;
  const [content, setContent] = useState("");

  function addCommentHandler() {
    if (content.trim()) {
      addComment({ content });
      setContent("");
    }
  }

  function handleContentChange({ target }) {
    if (target.value.length <= LIMIT_WORD) {
      setContent(target.value);
    }
  }

  return (
    <div className="flex flex-col gap-5 py-3 w-full border-r border-l justify-center items-center">
      <textarea
        rows="4"
        className="block p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <p className="text-left">
        <strong>{content.length}</strong>/{LIMIT_WORD}
      </p>
      <button
        type="button"
        className="text-white bg-gradient-to-r w-11/12 from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={addCommentHandler}
      >
        Add Comment
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
