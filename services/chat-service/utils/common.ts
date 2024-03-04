export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean) as T[];
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const clone = { ...obj };

  keys.forEach((key) => delete clone[key]);

  return clone;
}

export function isNil<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

export function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) return false;

  if (Object.prototype.toString.call(obj) !== '[object Object]') return false;

  const proto = Object.getPrototypeOf(obj);

  if (proto === null) return true;

  const Ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor;

  return (
    typeof Ctor === 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.call(Ctor) === Function.prototype.call(obj)
  );
}
