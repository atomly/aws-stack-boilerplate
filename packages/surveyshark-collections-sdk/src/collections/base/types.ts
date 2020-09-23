import { Document } from 'mongoose';

export interface Base {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseDocument = Base & Document;
