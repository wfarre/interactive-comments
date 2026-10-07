import { useState } from "react";
import type { CommentModelProps } from "../models/CommentModel";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { useSelector } from "@tanstack/react-store";
import store from "../store/store";

const CommentList = () => {
  const [showReplyFormFor, setShowReplyFormFor] = useState<number | null>(null);
  const comments = useSelector(store, (s) => s.comments);
  const currentUser = useSelector(store, (s) => s.currentUser);
  const [replyContent, setReplyContent] = useState("");
  const handleReply = (commentId: number) => {
    setShowReplyFormFor(commentId);
  };

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the reply submission logic here
    if (showReplyFormFor === null || !currentUser || !replyContent.trim())
      return;
    const parent = comments.find(
      (comment: CommentModelProps) => comment.id === showReplyFormFor,
    );
    // The store assigns the id
    store.actions.addReply(showReplyFormFor, {
      content: replyContent,
      createdAt: "Just now",
      score: 0,
      replyingTo: parent?.user.username,
      user: currentUser,
      replies: [],
    });
    setReplyContent("");
    setShowReplyFormFor(null); // Close the reply form after submission
  };

  return (
    <ul className="flex flex-col gap-4 mb-4">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard
            comment={comment}
            onReply={() => handleReply(comment.id)}
          />
          {showReplyFormFor === comment.id && (
            <CommentForm
              onSubmit={handleReplySubmit}
              currentUser={currentUser}
              postContent={replyContent}
              setPostContent={setReplyContent}
            />
          )}
          {(comment.replies?.length ?? 0) > 0 && (
            <div className="flex gap-4 ml-9 mt-4">
              <div className="border-l-2 border-grey-100 min-h-full"></div>
              <ul className="flex flex-col gap-4 pl-8 w-full ">
                {(comment.replies ?? []).map((reply) => (
                  <li key={reply.id}>
                    <CommentCard comment={reply} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
