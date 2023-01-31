import { Request } from 'express';

interface UserInterface {
  _id: string;
  username: string;
}

export interface UserRequest extends Request {
  user: UserInterface;
}
