import iconMinus from "/images/icon-minus.svg";
import iconPlus from "/images/icon-plus.svg";
import iconReply from "/images/icon-reply.svg";
import type CommentModel from "../models/CommentModel";

interface Props {
  comment: CommentModel;
}

const CommentCard = (props: Props) => {
  return (
    <article className="bg-white p-6 rounded-lg flex gap-4">
      <aside>
        <ul className="flex flex-col items-center gap-2 mb-4 bg-grey-50 p-1 rounded-xl">
          <li>
            <button className="hover:bg-purple-600 hover:rounded-lg w-8 h-8 flex items-center justify-center">
              <img src={iconMinus} alt="Minus icon" />
            </button>
          </li>
          <li className="text-purple-600 font-bold">{props.comment.score}</li>
          <li>
            <button className="hover:bg-purple-600 hover:rounded-lg w-8 h-8 flex items-center justify-center">
              <img src={iconPlus} alt="Plus icon" />
            </button>
          </li>
        </ul>
      </aside>
      <div>
        <header className="flex items-center gap-4 mb-4">
          <img
            src={props.comment.user.image.png}
            className="rounded-full h-8 w-8"
            alt="Vite logo"
          />
          <h2 className="text-grey-800">{props.comment.user.username}</h2>
          <p className="text-grey-500">{props.comment.createdAt}</p>
          <button className="text-purple-600 hover:text-purple-200 ml-auto">
            <img
              src={iconReply}
              alt="Reply icon"
              className="inline-block mr-2"
            />
            Reply
          </button>
        </header>
        <footer>
          <p className="text-grey-500">{props.comment.content}</p>
        </footer>
      </div>
    </article>
  );
};

export default CommentCard;
