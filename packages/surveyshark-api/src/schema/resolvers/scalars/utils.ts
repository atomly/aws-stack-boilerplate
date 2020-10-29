/**
 * Forked from: [graphql-type-json](https://github.com/taion/graphql-type-json)
 * By [taion](https://github.com/taion).
 */

// Libraries
import { ASTNode, Kind, ObjectValueNode, print } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export function identity(value: unknown): unknown {
  return value;
}

export function ensureObject(value: unknown): unknown {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(
      `JSONObject cannot represent non-object value: ${value}`,
    );
  }

  return value;
}

export function parseObject(typeName: 'JSON' | 'JSONObject', ast: ObjectValueNode, variables: Maybe<{ [key: string]: unknown }>): Maybe<unknown> {
  const value = ast.fields.length ? Object.create({}) : Object.create(null);

  ast.fields.forEach((field) => {
    value[field.name.value] = parseLiteral(typeName, field.value, variables);
  });

  return value;
}

export function parseLiteral(typeName: 'JSON' | 'JSONObject', ast: ASTNode, variables: Maybe<{ [key: string]: unknown }>): Maybe<unknown> {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      return parseObject(typeName, ast, variables);
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(typeName, n, variables));
    case Kind.NULL:
      return null;
    case Kind.VARIABLE:
      return variables ? variables[ast.name.value] : undefined;
    default:
      throw new TypeError(`${typeName} cannot represent value: ${print(ast)}`);
  }
}
