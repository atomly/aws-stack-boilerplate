import { Base, BaseDocument } from '../base';

export interface User extends Base {
  provider: string;
  providerId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string | null;
}

export type UserDocument = User & BaseDocument;
