import { render } from "@testing-library/react";
import { NoteShapeGroup } from "./NoteShapeGroup";

describe("Modal component", () => {
    it("renders without error with no duration and no non-mandatory props", async () => {
        render(
            <NoteShapeGroup
                baseXPosition={123} baseYPosition={123} color={"#abc"}
                durations={[]}
            />
        );
    });

    it("renders notes without error with complex duration and all props", async () => {
        render(
            <NoteShapeGroup
                baseXPosition={123} baseYPosition={123} color={"#abc"}
                durations={["2n", "2n.", "2t", "4n."]}
                rest={false} staccato={true} handleClick={() => { }}
            />
        );
    });

    it("renders rests without error with complex duration and all props", async () => {
        render(
            <NoteShapeGroup
                baseXPosition={123} baseYPosition={123} color={"#abc"}
                durations={["2n", "2n.", "2t", "4n."]}
                rest={true} staccato={true} handleClick={() => { }}
            />
        );
    });
});
