export interface User {
  name: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  description: string;
  user: {
    name: string;
  };
  createdAt: string;
  url: string;
}
