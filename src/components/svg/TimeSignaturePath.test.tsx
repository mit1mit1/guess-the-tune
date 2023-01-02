import { render, screen } from "@testing-library/react";
import { TimeSignature } from "src/types";
import { TimeSignaturePath } from "./TimeSignaturePath";

describe("TimeSignaturePath component", () => {
    it("renders correct number for 4/4", async () => {
        render(
            <TimeSignaturePath
                timeSignature={TimeSignature.FOURFOUR}
            />
        );
        const numerator = screen.getAllByText("4");
        expect(numerator).toHaveLength(2);
        const unusedNumber = screen.queryByText("5");
        expect(unusedNumber).not.toBeTruthy();
    });

    it("renders correct numbers for 5/4", async () => {
        render(
            <TimeSignaturePath
                timeSignature={TimeSignature.FIVEFOUR}
            />
        );
        const numerator = screen.getByText("5");
        expect(numerator).toBeTruthy();
        const denominator = screen.getByText("4");
        expect(denominator).toBeTruthy();
    });

    it("renders correct numbers for 3/4", async () => {
        render(
            <TimeSignaturePath
                timeSignature={TimeSignature.THREEFOUR}
            />
        );
        const numerator = screen.getByText("3");
        expect(numerator).toBeTruthy();
        const denominator = screen.getByText("4");
        expect(denominator).toBeTruthy();
    });

    it("renders correct numbers for 2/2", async () => {
        render(
            <TimeSignaturePath
                timeSignature={TimeSignature.TWOTWO}
            />
        );
        const numerator = screen.getAllByText("2");
        expect(numerator).toHaveLength(2);
        const unusedNumber = screen.queryByText("4");
        expect(unusedNumber).not.toBeTruthy();
    });
})
