import React from "react";
import type { UserProps } from "../models/UserModel";
import SubmitButton from "./SubmitButton";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  currentUser: UserProps | null;
  postContent: string;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
};

const CommentForm = (props: Props) => {
  //   const [newPost, setNewPost] = React.useState("");
  return (
    <form
      onSubmit={props.onSubmit}
      action=""
      method="post"
      className="flex items-start justify-center gap-4 max-w-182.5 mx-auto bg-white p-6 rounded-lg mb-10"
    >
      <img
        className="h-8 w-8 rounded-full"
        src={props.currentUser?.image.png}
        alt={props.currentUser?.username}
      />
      <textarea
        className="w-full p-4 rounded-lg border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Add a comment..."
        value={props.postContent}
        onChange={(e) => props.setPostContent(e.target.value)}
      ></textarea>
      <SubmitButton>Send</SubmitButton>
    </form>
  );
};

export default CommentForm;
