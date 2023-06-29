import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveThreadDetail, asyncToogleDownVoteThreadDetail, asyncToogleUpVoteThreadDetail } from "../states/threadDetail/action";
import { asyncAddComment, asyncDownVoteComment, asyncUpVoteComment } from "../states/comments/action";
import NotFoundPages from "./NotFoundPages";
import Loading from "../components/Loading";
import ThreadDetail from "../components/ThreadDetail";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThreadDetail = () => {
    dispatch(asyncToogleUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncToogleDownVoteThreadDetail());
  };

  const onAddComment = ({ content }) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  if (!threadDetail) {
    return <NotFoundPages />;
  }

  return (
    <section className="container flex flex-col justify-center items-center">
      <Loading />
      <ThreadDetail key={threadDetail.id} {...threadDetail} upVote={onUpVoteThreadDetail} downVote={onDownVoteThreadDetail} authUser={authUser.id} />
      <CommentInput addComment={onAddComment} threadId={id} />
      <CommentList upVote={onUpVoteComment} downVote={onDownVoteComment} comments={threadDetail.comments} authUser={authUser.id} />
    </section>
  );
}

export default DetailPage;
