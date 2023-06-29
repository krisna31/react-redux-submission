import { useState } from "react";
import PropTypes from "prop-types";
import { MdCategory, MdTitle } from "react-icons/md";
import useInput from "../hooks/useInput";

function ThreadInput({ addThread }) {
  const LIMIT_WORD = 280;
  const [title, handleTitleChange, setTitle] = useInput("");
  const [category, handleCategoryChange, setCategory] = useInput("");
  const [body, setBody] = useState("");

  function addThreadHandler() {
    if (body.trim()) {
      addThread({ title, body, category });
      setBody("");
      setTitle("");
      setCategory("");
    }
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= LIMIT_WORD) {
      setBody(target.value);
    }
  }

  return (
    <div className="flex flex-col gap-5 my-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdTitle />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdCategory />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <textarea
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What's happening?"
        value={body}
        onChange={handleBodyChange}
      ></textarea>
      <p>
        <strong>{body.length}</strong>/{LIMIT_WORD}
      </p>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={addThreadHandler}
      >
        Add Thread
      </button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
