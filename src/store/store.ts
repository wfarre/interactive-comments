import { createStore } from "@tanstack/react-store";
import type { CommentModelProps } from "../models/CommentModel";
import type { UserProps } from "../models/UserModel";

type Comment = CommentModelProps;
// New comments and replies get their id from the store
type NewComment = Omit<Comment, "id">;
type CommentUpdate = Pick<Comment, "id"> & Partial<Omit<Comment, "replies">>;

export type StoreState = {
  comments: Comment[];
  currentUser: UserProps | null;
};

// Applies `fn` to every comment and reply, so actions work at any depth
const mapDeep = (
  comments: Comment[],
  fn: (comment: Comment) => Comment,
): Comment[] =>
  comments.map((comment) =>
    fn({ ...comment, replies: mapDeep(comment.replies ?? [], fn) }),
  );

const filterDeep = (
  comments: Comment[],
  predicate: (comment: Comment) => boolean,
): Comment[] =>
  comments.filter(predicate).map((comment) => ({
    ...comment,
    replies: filterDeep(comment.replies ?? [], predicate),
  }));

// Highest id across comments and replies, so new ids never collide
const maxId = (comments: Comment[]): number =>
  comments.reduce(
    (max, comment) => Math.max(max, comment.id, maxId(comment.replies ?? [])),
    0,
  );

const initialState: StoreState = {
  comments: [],
  currentUser: null,
};

const store = createStore(initialState, ({ setState }) => ({
  setComments(comments: Comment[]) {
    setState((prev) => ({ ...prev, comments }));
  },
  setCurrentUser(currentUser: UserProps | null) {
    setState((prev) => ({ ...prev, currentUser }));
  },
  addComment(comment: NewComment) {
    setState((prev) => ({
      ...prev,
      comments: [
        ...prev.comments,
        { ...comment, id: maxId(prev.comments) + 1 },
      ],
    }));
  },
  addReply(parentId: number, reply: NewComment) {
    setState((prev) => {
      const newReply: Comment = { ...reply, id: maxId(prev.comments) + 1 };
      return {
        ...prev,
        comments: mapDeep(prev.comments, (comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...(comment.replies ?? []), newReply] }
            : comment,
        ),
      };
    });
  },
  editComment(updatedComment: CommentUpdate) {
    setState((prev) => ({
      ...prev,
      comments: mapDeep(prev.comments, (comment) =>
        comment.id === updatedComment.id
          ? { ...comment, ...updatedComment, replies: comment.replies }
          : comment,
      ),
    }));
  },
  deleteComment(commentId: number) {
    setState((prev) => ({
      ...prev,
      comments: filterDeep(
        prev.comments,
        (comment) => comment.id !== commentId,
      ),
    }));
  },
}));

export default store;
