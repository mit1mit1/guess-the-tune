import { render, screen } from "@testing-library/react";
import { OutputModal } from "./OutputModal";

describe("OutputModal component", () => {
    it("renders correctly without error and displays content", async () => {
        render(
            <OutputModal />
        );
        const title = screen.getByText("Share Song", { exact: false });
        expect(title).toBeTruthy();
        const submitButton = screen.getByRole("button", { name: "Copy link" });
        expect(submitButton).toBeTruthy();
    });
})
