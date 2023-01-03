import { render } from "@testing-library/react";
import { ExtraStaveLines } from "./ExtraStaveLines";

describe("Modal component", () => {
    it("renders lines above the clef without error", async () => {
        render(
            <ExtraStaveLines
                pitch={"B5"}
                baseXPosition={0}
                startPitch={"A5"}
                increasing
            />
        );
    });

    it("renders lines below the clef without error", async () => {
        render(
            <ExtraStaveLines
                pitch={"A#3"}
                baseXPosition={0}
                startPitch={"C4"}
                increasing={false}
            />
        );
    });

    it("renders without error when pitch is in the clef", async () => {
        render(
            <ExtraStaveLines
                pitch={"G4"}
                baseXPosition={0}
                startPitch={"E4"}
                increasing
            />
        );
    });
});
