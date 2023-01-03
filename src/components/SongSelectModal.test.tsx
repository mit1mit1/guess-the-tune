import { render, screen } from "@testing-library/react";
import { SongSelectModal } from "./SongSelectModal";

describe("SongSelectModal component", () => {
    it("renders correctly without error and displays content", async () => {
        render(
            <SongSelectModal />
        );
        const content = screen.getByText("Pick a different song from the archives by changing", { exact: false });
        expect(content).toBeTruthy();
    });
})
