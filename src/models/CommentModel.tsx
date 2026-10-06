class CommentModel {
  private _id: number;
  private _content: string;
  private _createdAt: string;
  private _score: number;
  private _user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  private _replies: CommentModel[];

  constructor(data: CommentModelProps) {
    this._id = data.id;
    this._content = data.content;
    this._createdAt = data.createdAt;
    this._score = data.score;
    this._user = data.user;
    this._replies = data.replies?.map((reply) => new CommentModel(reply)) || [];
  }

  get id(): number {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get score(): number {
    return this._score;
  }

  get user(): { image: { png: string; webp: string }; username: string } {
    return this._user;
  }

  get replies(): CommentModel[] {
    return this._replies;
  }
}

export type CommentModelProps = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: CommentModelProps[];
};

export default CommentModel;
