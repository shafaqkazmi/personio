import { camelCase } from "lodash";

export function SortArrayByKey(
  fieldA: any,
  fieldB: any,
  key: string,
  dir?: "asc" | "desc"
): number {
  const valueA = fieldA[key];
  const valueB = fieldB[key];

  let comparison = 0;
  if (valueA > valueB) {
    comparison = 1;
  } else if (valueA < valueB) {
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
