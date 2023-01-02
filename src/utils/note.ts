import { Note } from "src/types";

export const isGuessable = (note: Note) => {
  return !note.rest;
};
