import { render } from "@testing-library/react";
import { NoteShapeGroup } from "./NoteShapeGroup";

describe("NoteShapeGroup component", () => {
    it("renders without error with no duration and no non-mandatory props", async () => {
        render(
            <svg>
                <NoteShapeGroup
                    baseXPosition={123} baseYPosition={123} color={"#abc"}
                    durations={[]}
                />
            </svg>
        );
    });

    it("renders notes without error with complex duration and all props", async () => {
        render(
            <svg>
                <NoteShapeGroup
                    baseXPosition={123} baseYPosition={123} color={"#abc"}
                    durations={["2n", "2n.", "2t", "4n."]}
                    rest={false} staccato={true} handleClick={() => { }}
                />
            </svg>
        );
    });

    it("renders rests without error with complex duration and all props", async () => {
        render(
            <svg>
                <NoteShapeGroup
                    baseXPosition={123} baseYPosition={123} color={"#abc"}
                    durations={["2n", "2n.", "2t", "4n.", "8n.", "1n", "16n"]}
                    rest={true} staccato={true} handleClick={() => { }}
                />
            </svg>
        );
    });
});
