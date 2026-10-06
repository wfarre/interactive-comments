import CommentModel, { type CommentModelProps } from "../models/CommentModel";

class CommentFactory {
  constructor(data: CommentModelProps, type: string) {
    if (type === "json") {
      return new CommentModel(data);
    }
  }
}

export default CommentFactory;
