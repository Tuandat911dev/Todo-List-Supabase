export {};

declare global {
  interface ITodo {
    id: number;
    title: string;
    completed: boolean;
  }

  interface IUser {
    id: string;
    email: string;
    username: string;
    avatar_url: string;
    full_name: string;
  }
}
