import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveThreadDetail, asyncToogleDownVoteThreadDetail, asyncToogleUpVoteThreadDetail } from "../states/threadDetail/action";
import { asyncDownVoteComment, asyncUpVoteComment } from "../states/comments/action";
import NotFoundPages from "./NotFoundPages";
import Loading from "../components/Loading";
import ThreadDetail from "../components/ThreadDetail";

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

  const onUpVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncUpVoteComment({ threadId, commentId }));
  };

  const onDownVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncDownVoteComment({ threadId, commentId }));
  };

  if (!threadDetail) {
    return <NotFoundPages />;
  }

  return (
    <section className="container px-28 flex flex-col justify-center items-center">
      <Loading />
      <ThreadDetail key={threadDetail.id} {...threadDetail} upVote={onUpVoteThreadDetail} downVote={onDownVoteThreadDetail} authUser={authUser.id} />
      {/* {talkDetail.parent && (
        <div className="detail-page__parent">
          <h3>Replying To</h3>
          <TalkItem {...talkDetail.parent} authUser={authUser.id} />
        </div>
      )}
      <TalkDetail {...talkDetail} authUser={authUser.id} likeTalk={onLikeTalk} />
      <TalkReplyInput replyTalk={onReplyTalk} /> */}
    </section>
  );
}

export default DetailPage;
