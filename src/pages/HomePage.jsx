import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddThread, asyncGetThreads, asyncToogleDownVoteThread, asyncToogleUpVoteThread } from "../states/threads/action";
import ThreadInput from "../components/ThreadInput";
import ThreadList from "../components/ThreadList";

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToogleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToogleDownVoteThread(threadId));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    createdBy: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="container px-28 ">
      <ThreadInput addThread={onAddThread} />
      <ThreadList threads={threadList} upVote={onUpVoteThread} downVote={onDownVoteThread} />
    </section>
  );
}

export default HomePage;
