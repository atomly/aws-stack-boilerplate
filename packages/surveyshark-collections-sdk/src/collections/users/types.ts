import { BaseDocument } from '../base';

export interface UserDocument extends BaseDocument {
  provider: string;
  providerId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string | null;
}
