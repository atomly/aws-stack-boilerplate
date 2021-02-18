// Libraries
import {
  Schema,
  SchemaDefinition,
  SchemaOptions,
  Document,
} from 'mongoose';
import { v4 } from 'uuid';

// Dependencies
import { UUID_V4_REGEXP } from '../../regexps';

// Types
import { BaseDocument } from './types';

export class BaseSchema<T extends Document> extends Schema<T> {
  static now(): Date { return new Date(); };

  static definition = {
    uuid: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      match: UUID_V4_REGEXP,
      default(): string { return v4(); },
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default(): Date { return BaseSchema.now(); },
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      default(): Date { return BaseSchema.now(); },
    },
  } as SchemaDefinition;

  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(
      Object.assign(
        {},
        BaseSchema.definition,
        definition,
      ),
      options,
    );

    /**
     * Hook that writes `uuid`, `createdAt`, and `updatedAt` properties before saving.
     */
    this.pre<BaseDocument>('validate', function(next) {
      const now = BaseSchema.now();
      this.uuid = this.uuid ?? v4();
      this.createdAt = this.createdAt ?? now;
      this.updatedAt = now;
      next();
    });

    /**
     * Hook that "refreshes" the `updatedAt` property before updating.
     */
    this.pre<BaseDocument>(/update/g, function(next) {
      this.update({ updatedAt: BaseSchema.now() });
      next();
    });
  }
}
