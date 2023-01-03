import { render, screen } from "@testing-library/react";
import { CongratulationsModal } from "./CongratulationsModal";

describe("CongratulationsModal component", () => {
    it("renders correctly without error and displays content", async () => {
        render(
            <CongratulationsModal />
        );
        const title = screen.getByText("Well done!", { exact: false });
        expect(title).toBeTruthy();
        const submitButton = screen.getByRole("button", { name: "Another!" });
        expect(submitButton).toBeTruthy();
    });
})
