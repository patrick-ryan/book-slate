type GroupField = string;
type InputArray1Obj = Record<GroupField | any, any>;
type InputArray2Obj = Record<GroupField | any, any>;

export function zipJoin<T1 extends InputArray1Obj, T2 extends InputArray2Obj>(
  array1: Array<T1>,
  array2: Array<T2>,
  field: GroupField,
): Array<[T1 | null, T2 | null]> {
  let result: Record<string, [T1 | null, T2 | null]> = {};

  array1.map((element) => {
    let fieldVal: string = element[field];
    result[fieldVal] = [element, null];
  });

  array2.map((element) => {
    let fieldVal: string = element[field];
    if (fieldVal in result) {
      result[fieldVal][1] = element;
    } else {
      result[fieldVal] = [null, element];
    }
  });

  return Object.values(result);
}

export function tupleArrayGroupBy<T1 extends string | number | symbol, T2>(
  array1: Array<[T1, T2]>,
  groupPos: 0,
): Record<T1, Array<T2>>;
export function tupleArrayGroupBy<T1, T2 extends string | number | symbol>(
  array1: Array<[T1, T2]>,
  groupPos: 1,
): Record<T2, Array<T1>>;
export function tupleArrayGroupBy(array1: any, groupPos: any): any {
  let result: Record<string | number | symbol, any> = {};

  array1.map((element: [any, any]) => {
    let groupFieldVal: string | number | symbol, fieldVal;
    if (groupPos == 0) {
      [groupFieldVal, fieldVal] = element;
    } else {
      [fieldVal, groupFieldVal] = element;
    }

    if (groupFieldVal in result) {
      result[groupFieldVal].append(fieldVal);
    } else {
      result[groupFieldVal] = [fieldVal];
    }
  });

  return result;
}

export function entriesToObjArray(entries: Iterable<[any, any]>) {
  return Array.from(
    Object.entries(tupleArrayGroupBy(Array.from(entries), 0)),
    ([id, value]) => {
      return { id, value };
    },
  );
}
