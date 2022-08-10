import { camelCase } from "lodash";

export function SortArrayByKey(
  a: any,
  b: any,
  key: string,
  dir: "asc" | "desc"
): number {
  const fieldA = a[key];
  const fieldB = b[key];

  let comparison = 0;
  if (fieldA > fieldB) {
    comparison = 1;
  } else if (fieldA < fieldB) {
    comparison = -1;
  }
  return dir === "desc" ? comparison * -1 : comparison;
}

export function CamelizeJsonKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => CamelizeJsonKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: CamelizeJsonKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
}
