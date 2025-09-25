export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  user?: IUser | string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}
