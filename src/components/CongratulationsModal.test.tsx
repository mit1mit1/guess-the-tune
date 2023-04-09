import { render, screen } from "@testing-library/react";
import { CongratulationsModal } from "./CongratulationsModal";
import userEvent from "@testing-library/user-event";

describe("CongratulationsModal component", () => {
  it("renders without error and allows result to be copied", async () => {
    render(<CongratulationsModal />);
    const title = screen.getByText("Well done!", { exact: false });
    expect(title).toBeTruthy();
    const submitButton = screen.getByRole("button", { name: "Another!" });
    expect(submitButton).toBeTruthy();
    const bragButton = screen.getByRole("button", { name: "Copy Result" });
    expect(bragButton).toBeTruthy();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Copy Result" }));
    expect(screen.getByText("Copied!")).toBeTruthy();
  });
});
