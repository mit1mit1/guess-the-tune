import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";

expect.extend(toHaveNoViolations);
test("renders app, title displays", async () => {
  const view = render(<App />);
  const title = screen.getByText(/Musicle!/i);
  expect(title).toBeInTheDocument();

  expect(await axe(view.baseElement)).toHaveNoViolations();
});
