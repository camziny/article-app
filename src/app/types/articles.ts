export interface User {
  name: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  user: User;
}
