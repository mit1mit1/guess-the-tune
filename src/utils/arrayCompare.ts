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
