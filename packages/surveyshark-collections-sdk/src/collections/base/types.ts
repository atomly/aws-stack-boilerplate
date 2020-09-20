import { Document } from 'mongoose';

export interface BaseDocument extends Document {
  _id: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}
