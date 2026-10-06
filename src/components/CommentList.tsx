import CommentFactory from "../factories/CommentFactory";
import type CommentModel from "../models/CommentModel";
import type { CommentModelProps } from "../models/CommentModel";
import CommentCard from "./CommentCard";

type Props = {
  initialComments: CommentModelProps[];
};

const CommentList = (props: Props) => {
  // Lazy initializer: runs once on mount, no effect needed
  // const [comments] = useState<CommentModel[]>(() =>
  //   initialComments.map(
  //     (comment) =>
  //       new CommentFactory(comment, "json") as unknown as CommentModel,
  //   ),
  // );

  const comments = props.initialComments.map(
    (comment) => new CommentFactory(comment, "json") as unknown as CommentModel,
  );

  return (
    <ul className="flex flex-col gap-4 w-full">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard comment={comment} />
          {comment.replies.length > 0 && (
            <div className="flex gap-4 w-full mt-4 m-9">
              <div className="border-l-2 border-grey-100 min-h-full"></div>
              <ul className="flex flex-col gap-4 w-full pl-8 ">
                {comment.replies.map((reply) => (
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
