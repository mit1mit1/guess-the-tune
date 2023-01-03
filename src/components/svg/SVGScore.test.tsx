import { render } from "@testing-library/react";
import { midlyOpusOne } from "src/gameSongs";
import { SVGScore } from "./SVGScore";

describe("Modal component", () => {
    it("renders without error with no correct notes", async () => {
        render(
            <SVGScore
                correctNotes={[]}
            />
        );
    });

    it("renders without error with several correct notes", async () => {
        render(
            <SVGScore
                correctNotes={midlyOpusOne.notes}
            />
        );
    });
});
