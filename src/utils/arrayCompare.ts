import { Duration } from "src/types";

export const arraysIdentical = (a1: Array<string>, a2: Array<string>) => {
  if (a1.length !== a2.length) {
    return false;
  }
  const sortedA1 = [...a1].sort();
  const sortedA2 = [...a2].sort();
  return sortedA1.every((value, index) => value === sortedA2[index]);
};

export const arrayIncludes = (
  durationArrayArray: Duration[],
  searchObject: Duration
) => {
  return durationArrayArray.some((durations) =>
    arraysIdentical(searchObject, durations)
  );
};

export const setIncludes = (
  durationsSet: Set<Duration>,
  searchObject: Duration
) => {
  return arrayIncludes(Array.from(durationsSet), searchObject);
};

const containsItem = (arr: Array<any>, item: any) => {
  let found = false;
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(item) === JSON.stringify(arr[i])) {
      found = true;
      break;
    }
  }
  return found;
};

export const pushIfNotIdentical = (
  oldArrayOfArrays: Array<Array<any>>,
  index: number,
  newItem: any
) => {
  const newArray = [...oldArrayOfArrays];
  if (!containsItem(oldArrayOfArrays[index], newItem)) {
    newArray[index].push(newItem);
  }
  return newArray;
};
