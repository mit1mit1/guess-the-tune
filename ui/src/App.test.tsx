import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app, title displays", () => {
  render(<App />);
  const title = screen.getByText(/Musicle!/i);
  expect(title).toBeInTheDocument();
});
