import { render, screen } from "@testing-library/react";
import { Modal } from "./index";

describe("Modal component", () => {
  it("renders correctly, title and content displays", async () => {
    render(
      <Modal visible={true} title={"Test Title"} toggleVisible={() => {}}>
        Test Content
      </Modal>
    );
    const title = screen.getByText(/Test Title/i);
    expect(title).toBeTruthy();
    const content = screen.getByText(/Test Content/i);
    expect(content).toBeTruthy();
  });

  it("still renders (but hidden) if not visible", async () => {
    // TODO Query that catches the changed behavior here.
    render(
      <Modal visible={false} title={"Test Title"} toggleVisible={() => {}}>
        Test Content
      </Modal>
    );
    const title = screen.getByText(/Test Title/i);
    expect(title).toBeTruthy();
    const content = screen.getByText(/Test Content/i);
    expect(content).toBeTruthy();
  });
});
