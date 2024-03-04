export type ConstantToPascalCase<T extends string> =
  T extends `${infer First}_${infer Rest}`
    ? First extends `${infer A}${infer B}`
      ? `${Uppercase<A>}${Lowercase<B>}${ConstantToPascalCase<Rest>}`
      : `${Lowercase<First>}${ConstantToPascalCase<Rest>}`
    : T extends `${infer A}${infer B}`
      ? `${Uppercase<A>}${Lowercase<B>}`
      : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Random = any;
