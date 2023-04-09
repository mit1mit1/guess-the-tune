import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";
import { Note } from "../types";

expect.extend(toHaveNoViolations);

test("renders app, title displays, clicking buttons doesn't explode the app", async () => {
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

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /Check Guesses/i }));
  await user.click(screen.getByRole("button", { name: /Support Us/i }));
  await user.click(screen.getByRole("button", { name: /Show Instructions/i }));
});
