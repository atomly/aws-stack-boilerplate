// Libraries
import Maybe from 'graphql/tsutils/Maybe';
import { DocumentNode } from 'graphql';

export interface IGqlCallOptions {
  source: string | DocumentNode;
  variableValues?: Maybe<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>;
}
