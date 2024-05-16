export interface User {
  token: string;
  username: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  username: string;
  password: string;
  confirm: string;
}
