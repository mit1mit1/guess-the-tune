import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";
import { Note } from "../types";

expect.extend(toHaveNoViolations);

test("renders app, title displays", async () => {
  const view = render(
    <App
      playNotes={(noteArray: Array<Note>, bpm: number) => {
        return;
      }}
    />
  );
  const title = screen.getByText(/Guess the Tune/i);
  expect(title).toBeTruthy();

  expect(await axe(view.baseElement)).toHaveNoViolations();
});
