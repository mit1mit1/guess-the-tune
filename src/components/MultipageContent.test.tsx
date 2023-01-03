import { render, screen } from "@testing-library/react";
import { MultipageContent } from "./MultipageContent";
import userEvent from "@testing-library/user-event";

describe("MultipageContent component", () => {
    it("renders correctly without error and displays content", async () => {
        render(
            <MultipageContent pages={[<div>Page 0</div>, <div>Page 1</div>, <div>Page 2</div>,]} />
        );
        const initialContent = screen.getByText("Page 0");
        expect(initialContent).toBeTruthy();
        const nextPageButton = screen.getByRole("button", { name: "Next page" });
        expect(nextPageButton).toBeTruthy();
        const previousPageButton = screen.getByRole("button", { name: "Previous page" });
        expect(previousPageButton).toBeTruthy();
    });

    it("allows you to go forwards through pages and loops", async () => {
        render(
            <MultipageContent pages={[<div>Page 0</div>, <div>Page 1</div>, <div>Page 2</div>,]} />
        );

        expect(screen.getByText("Page 0")).toBeTruthy();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: "Next page" }))
        expect(screen.getByText("Page 1")).toBeTruthy();
        await user.click(screen.getByRole('button', { name: "Next page" }))
        expect(screen.getByText("Page 2")).toBeTruthy();
        await user.click(screen.getByRole('button', { name: "Next page" }))
        expect(screen.getByText("Page 0")).toBeTruthy();
    });

    it("allows you to go backwards through pages and loops", async () => {
        render(
            <MultipageContent pages={[<div>Page 0</div>, <div>Page 1</div>, <div>Page 2</div>,]} />
        );

        expect(screen.getByText("Page 0")).toBeTruthy();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: "Previous page" }))
        expect(screen.getByText("Page 2")).toBeTruthy();
        await user.click(screen.getByRole('button', { name: "Previous page" }))
        expect(screen.getByText("Page 1")).toBeTruthy();
        await user.click(screen.getByRole('button', { name: "Previous page" }))
        expect(screen.getByText("Page 0")).toBeTruthy();
    });
})
