import { Note, AnswerStatus, Duration } from "src/types";
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
  bpm: number;
  guess: Note;
  answerNoteStatus: {
    pitchStatus: AnswerStatus;
    durationStatus: AnswerStatus;
  };
  incorrectPitches: Array<string>;
  incorrectDurations: Array<Duration>;
}

export const GuessInput = ({
  answer,
  setGuess,
  bpm,
  guess,
  answerNoteStatus,
  incorrectPitches,
  incorrectDurations,
}: GuessInputProps) => {
  const [pitchGuess, setPitchGuess] = useState(pitchNames.indexOf(guess.pitch));
  const [durationGuess, setDurationGuess] = useState(
    durationNames.indexOf(guess.duration)
  );

  const playGuess = () => {
    Tone.Transport.bpm.value = bpm;
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
            defaultValue={pitchNames.indexOf(guess.pitch)}
            aria-label="Pitch"
            step={1}
            min={0}
            max={pitchMarks.length - 1}
            marks={pitchMarks}
            onChange={(e, value) => {
              const guess = typeof value === "number" ? value : value[0];
              setPitchGuess(guess);
              playGuess();
              setGuess({
                pitch: pitchNames[pitchGuess],
                duration: durationNames[durationGuess],
              });
            }}
          />
          {answerNoteStatus.pitchStatus === AnswerStatus.CORRECT ? (
            <div>{"Correct Pitch: " + answer.pitch}</div>
          ) : (
            ""
          )}
          {answerNoteStatus.pitchStatus !== AnswerStatus.CORRECT &&
          incorrectPitches &&
          incorrectPitches.length ? (
            <div>{"Incorrect Pitches: " + incorrectPitches?.join(", ")}</div>
          ) : (
            ""
          )}
        </div>
        <div className="duration-slider">
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            defaultValue={durationNames.indexOf(guess.duration)}
            aria-label="Pitch"
            step={1}
            min={0}
            max={durationMarks.length - 1}
            marks={durationMarks}
            onChange={(e, value) => {
              const guess = typeof value === "number" ? value : value[0];
              setDurationGuess(guess);
              playGuess();
              setGuess({
                pitch: pitchNames[pitchGuess],
                duration: durationNames[durationGuess],
              });
            }}
          />
          {answerNoteStatus.durationStatus === AnswerStatus.CORRECT
            ? "Correct Duration: " + answer.duration
            : ""}
          {answerNoteStatus.durationStatus !== AnswerStatus.CORRECT &&
          incorrectDurations &&
          incorrectDurations.length ? (
            <div>
              {"Incorrect Durations: " + incorrectDurations?.join(", ")}
            </div>
          ) : (
            ""
          )}
        </div>
      </Stack>
    </div>
  );
};
