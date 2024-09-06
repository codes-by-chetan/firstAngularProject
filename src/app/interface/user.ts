export interface User {
  id: number;
  userName: string;
  password: string;
  type: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface LoggedUser {
  id: number;
  userName: string;
  type: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface AuthenticationResponse {
  result: boolean;
  message: string;
  loggedUser?: LoggedUser;
}