import { Note, AnswerStatus } from "src/types";
import React, { useState } from "react";
import * as Tone from "tone";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import {
  pitchNames,
  durationNames,
  pitchMarks,
  durationMarks,
} from "src/constants";
import "./GuessInput.css";

interface GuessInputProps {
  answer: Note;
  setGuess: (guess: Note) => void;
  index: number;
  answerNoteStatus: {
    pitchStatus: AnswerStatus;
    durationStatus: AnswerStatus;
  };
}

export const GuessInput = (props: GuessInputProps) => {
  const [pitchGuess, setPitchGuess] = useState(3);
  const [durationGuess, setDurationGuess] = useState(2);

  const playGuess = () => {
    Tone.Transport.bpm.value = 172;
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(
      pitchNames[pitchGuess],
      durationNames[durationGuess]
    );
  };

  return (
    <div className="guess-box">
      <Stack spacing={2}>
        <div className="pitch-slider">
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            defaultValue={3}
            aria-label="Pitch"
            step={1}
            min={0}
            max={pitchMarks.length - 1}
            marks={pitchMarks}
            onChange={(e, value) => {
              const guess = typeof value === "number" ? value : value[0];
              setPitchGuess(guess);
              playGuess();
              props.setGuess({
                pitch: pitchNames[pitchGuess],
                duration: durationNames[durationGuess],
              });
            }}
          />
          {props.answerNoteStatus.pitchStatus === AnswerStatus.CORRECT
            ? "Correct Pitch"
            : ""}
        </div>
        <div className="duration-slider">
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            defaultValue={2}
            aria-label="Pitch"
            step={1}
            min={0}
            max={durationMarks.length - 1}
            marks={durationMarks}
            onChange={(e, value) => {
              const guess = typeof value === "number" ? value : value[0];
              setDurationGuess(guess);
              playGuess();
              props.setGuess({
                pitch: pitchNames[pitchGuess],
                duration: durationNames[durationGuess],
              });
            }}
          />
          {props.answerNoteStatus.durationStatus === AnswerStatus.CORRECT
            ? "Correct Duration"
            : ""}
        </div>
      </Stack>
    </div>
  );
};
