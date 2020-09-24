// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { EMAIL_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Type
import { UserDocument } from './types';

export const userSchema = new BaseSchema<UserDocument>({
  provider:  {
    type: Schema.Types.String,
    // required: true,
  },
  providerId:  {
    type: Schema.Types.String,
    // required: true,
  },
  firstName:  {
    type: Schema.Types.String,
    // required: true,
  },
  lastName:  {
    type: Schema.Types.String,
    // required: true,
  },
  displayName:  {
    type: Schema.Types.String,
    // required: true,
  },
  email:  {
    type: Schema.Types.String,
    required: true,
    unique: true,
    match: [EMAIL_REGEXP, 'Invalid email pattern'],
  },
  password:  { // NOTE: This is a HASH of the password, if any.
    type: Schema.Types.String,
  },
});
