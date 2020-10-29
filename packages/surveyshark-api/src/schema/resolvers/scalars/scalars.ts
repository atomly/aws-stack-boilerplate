// Libraries
import {
  ASTNode,
  GraphQLScalarType,
  Kind,
  print,
} from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

// Dependencies
import {
  identity,
  ensureObject,
  parseObject,
  parseLiteral,
} from './utils';

export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'The `Date` scalar type represents Date objects as specified by [ECMA-262](https://www.ecma-international.org/ecma-262/5.1/#sec-15.9).',
  specifiedByUrl: 'https://www.ecma-international.org/ecma-262/5.1/#sec-15.9',
  parseValue(value: string | number | Date): Date {
    return new Date(value);
  },
  serialize(value: Date): number {
    return value.getTime();
  },
  parseLiteral(ast): number | null {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

/**
 * Forked from: [graphql-type-json](https://github.com/taion/graphql-type-json)
 * By [taion](https://github.com/taion).
 */
export const GraphQLJSON = new GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  specifiedByUrl: 'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
  serialize: identity,
  parseValue: identity,
  parseLiteral: (ast: ASTNode, variables: Maybe<{ [key: string]: unknown }>): unknown => parseLiteral('JSON', ast, variables),
});

/**
 * Forked from: [graphql-type-json](https://github.com/taion/graphql-type-json)
 * By [taion](https://github.com/taion).
 */
export const GraphQLJSONObject = new GraphQLScalarType({
  name: 'JSONObject',
  description: 'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  specifiedByUrl: 'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: (ast: ASTNode, variables: Maybe<{ [key: string]: unknown }>): unknown => {
    if (ast.kind !== Kind.OBJECT) {
      throw new TypeError(
        `JSONObject cannot represent non-object value: ${print(ast)}`,
      );
    }

    return parseObject('JSONObject', ast, variables);
  },
});
