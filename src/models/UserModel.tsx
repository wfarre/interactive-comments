class User {
  _username: string;
  _image: {
    png: string;
    webp: string;
  };

  constructor(data: UserProps) {
    this._username = data.username;
    this._image = data.image;
  }

  get username(): string {
    return this._username;
  }

  get image(): { png: string; webp: string } {
    return this._image;
  }
}

type UserProps = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
};

export default User;
export type { UserProps };
