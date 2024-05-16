export interface User {
  id: string;
  token: string;
  username: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  // userIdentity: UserIdentityForm;
  password: string;
  confirm: string;
}
