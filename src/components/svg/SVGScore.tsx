import {
  BASE_COLOR,
} from "src/constants/color";
import {
  AnswerStatus,
  BaseSVGPathProps,
  Note,
  Pitch,
} from "src/types";
import { useStore } from "src/store/gameStore";
import svgStyles from "./SVGScore.module.scss";
import { TrebleStave } from "./TrebleStave";
import { SharpPath } from "./SharpPath";
import { DurationlessPitchPath } from "./DurationlessPitchPath";
import {
  durationlessPitchRadius,
  rootCircleXRadius,
  rootCircleYRadius,
  sharpXOffset,
  sharpYOffset,
  SVGHeight,
  SVGWidth,
} from "src/constants/svg";
import { NoteShapeGroup } from "src/components/svg/NoteShapeGroup";
import { isGuessable } from "src/utils/note";
import { arraysIdentical } from "src/utils/arrayCompare";
import { chosenSong } from "src/constants/chosenSong";
import { ExtraStaveLines } from "./ExtraStaveLines";
import { getBaseXPosition, getBaseYPosition, noteSharpOffset, shouldAddSharp } from "src/utils/score";
import { TimeSignaturePath } from "./TimeSignaturePath";
import { SelectedNoteHighlight } from "./SelectedNoteHighlight";
import { FillDefs } from "./FillDefs";


interface NotePathProps extends BaseSVGPathProps {
  note: Note;
  displayIndex: number;
  staveIndex: number;
  showSharp?: boolean;
}

const NotePath = ({
  note,
  displayIndex,
  color,
  opacity = 1,
  handleClick,
  staveIndex,
  showSharp = true,
}: NotePathProps) => {
  const baseXPosition =
    getBaseXPosition(displayIndex, staveIndex) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);

  return (
    <>
      <NoteShapeGroup
        durations={note.durations}
        baseXPosition={baseXPosition}
        baseYPosition={baseYPosition}
        handleClick={handleClick}
        color={color}
        opacity={opacity}
        staccato={note.staccato}
      />
      {shouldAddSharp(note.pitch) && showSharp && (
        <SharpPath
          xStart={baseXPosition + sharpXOffset}
          yStart={getBaseYPosition(note.pitch) + sharpYOffset}
          handleClick={handleClick}
          color={color}
          strokeWidth={6}
          opacity={opacity}
        />
      )}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="A5"
        increasing
        baseXPosition={baseXPosition}
      />
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="C4"
        increasing={false}
        baseXPosition={baseXPosition}
      />
    </>
  );
};

interface PitchGuessPathProps extends BaseSVGPathProps {
  pitch: Pitch;
  positionIndex: number;
  staveIndex: number;
}

const PitchGuessPath = ({
  pitch,
  positionIndex,
  color,
  opacity = 1,
  handleClick,
  staveIndex,
}: PitchGuessPathProps) => {
  const xStart =
    getBaseXPosition(positionIndex, staveIndex) -
    (rootCircleXRadius + rootCircleYRadius) / 2 +
    noteSharpOffset(pitch) -
    durationlessPitchRadius;
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={xStart}
      handleClick={handleClick}
      color={color}
      opacity={opacity}
    />
  );
};

const CurrentGuessPaths = ({
  notes,
  correctNotes,
  startIndex,
  endIndex,
  staveIndex,
}: {
  notes: Array<Note>;
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const { incorrectDurationsArrays, answerStatuses, setSelectedNoteIndex } =
    useStore();
  const displayNotes = notes.slice(startIndex, endIndex);
  return (
    <>
      {displayNotes.map((note, displayIndex) => {
        let trueIndex = displayIndex + startIndex;
        let color = BASE_COLOR;
        let opacity = 1;
        const handleClick = isGuessable(note)
          ? () => setSelectedNoteIndex(trueIndex)
          : undefined;
        if (incorrectDurationsArrays[trueIndex].includes(note.durations)) {
          color = "url(#INCORRECT_FILL)";
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
          AnswerStatus.GUESSEDCORRECT) {
          if (arraysIdentical(
            note.durations,
            correctNotes[trueIndex].durations
          )) {
            opacity = 0.8;
            color = "url(#CORRECT_FILL)";
          } else {
            color = "url(#INCORRECT_FILL)";
          }
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
          AnswerStatus.UNGUESSABLE &&
          answerStatuses[trueIndex].pitchStatus === AnswerStatus.UNGUESSABLE
        ) {
          opacity = 1;
          color = "url(#CORRECT_FILL)";
        }
        if (!!note.rest) {
          return (
            <NoteShapeGroup
              durations={note.durations}
              baseXPosition={
                getBaseXPosition(displayIndex, staveIndex) +
                noteSharpOffset(note.pitch)
              }
              color={color}
              opacity={opacity}
              baseYPosition={getBaseYPosition("B4")}
              rest
              key={`rest-${trueIndex}-${note.pitch}-${note.durations}`}
            />
          );
        }
        return (
          <NotePath
            note={note}
            displayIndex={displayIndex}
            color={color}
            showSharp={false}
            opacity={opacity}
            key={`note-${trueIndex}-${note.pitch}-${note.durations}`}
            handleClick={handleClick}
            staveIndex={staveIndex}
          />
        );
      })}
    </>
  );
};

const NonIncorrectPaths = ({
  correctNotes,
  startIndex,
  endIndex,
  staveIndex,
}: {
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const {
    guesses,
    answerStatuses,
    setSelectedNoteIndex,
    incorrectPitchesArrays,
  } = useStore();

  return (
    <>
      {answerStatuses
        .slice(startIndex, endIndex)
        .map(({ pitchStatus, durationStatus }, displayIndex) => {
          let trueIndex = startIndex + displayIndex;
          if (!isGuessable(correctNotes[trueIndex])) {
            return <></>;
          }
          if (
            pitchStatus === AnswerStatus.GUESSEDCORRECT &&
            durationStatus === AnswerStatus.GUESSEDCORRECT
          ) {
            return (
              <g key={"non-incorrect-path-" + trueIndex}>
                <PitchGuessPath
                  pitch={correctNotes[trueIndex].pitch}
                  positionIndex={displayIndex}
                  color="url(#CORRECT_PITCH_FILL)"
                  key={`${trueIndex}-${correctNotes[trueIndex].pitch}-non-incorrect`}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  staveIndex={staveIndex}
                />
                {guesses[trueIndex].pitch !== correctNotes[trueIndex].pitch && (
                  <PitchGuessPath
                    pitch={guesses[trueIndex].pitch}
                    positionIndex={displayIndex}
                    color={
                      incorrectPitchesArrays[trueIndex].includes(
                        guesses[trueIndex].pitch
                      )
                        ? "url(#INCORRECT_PITCH_FILL)"
                        : BASE_COLOR
                    }
                    key={`${trueIndex}-pitch-not-necessarily-correct`}
                    handleClick={() => setSelectedNoteIndex(trueIndex)}
                    staveIndex={staveIndex}
                  />
                )}
              </g>
            );
          }
          if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
            return (
              <g key={`${trueIndex}-pitch-group`}>
                <PitchGuessPath
                  pitch={correctNotes[trueIndex].pitch}
                  positionIndex={displayIndex}
                  color="url(#CORRECT_PITCH_FILL)"
                  key={`${trueIndex}-pitch-correct`}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  staveIndex={staveIndex}
                />
                {guesses[trueIndex].pitch !== correctNotes[trueIndex].pitch && (
                  <PitchGuessPath
                    pitch={guesses[trueIndex].pitch}
                    positionIndex={displayIndex}
                    color="url(#INCORRECT_PITCH_FILL)"
                    key={`${trueIndex}-pitch-not-necessarily-correct`}
                    handleClick={() => setSelectedNoteIndex(trueIndex)}
                    staveIndex={staveIndex}
                  />
                )}
              </g>
            );
          }
          return (
            <PitchGuessPath
              pitch={guesses[trueIndex].pitch}
              positionIndex={displayIndex}
              color={
                incorrectPitchesArrays[trueIndex].includes(
                  guesses[trueIndex].pitch
                )
                  ? "url(#INCORRECT_FILL)"
                  : BASE_COLOR
              }
              key={`${trueIndex}-pitch-not-necessarily-correct`}
              handleClick={() => setSelectedNoteIndex(trueIndex)}
              staveIndex={staveIndex}
            />
          );
        })}
    </>
  );
};

const IncorrectPitchPaths = ({
  startIndex,
  endIndex,
  staveIndex,
}: {
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const { incorrectPitchesArrays, guesses, setSelectedNoteIndex } = useStore();
  return (
    <>
      {incorrectPitchesArrays
        .slice(startIndex, endIndex)
        .map((pitchArray, positionIndex) => {
          let trueIndex = startIndex + positionIndex;
          return pitchArray.map((pitch) => {
            if (pitch === guesses[trueIndex].pitch) {
              return (
                <PitchGuessPath
                  pitch={pitch}
                  positionIndex={positionIndex}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  color="url(#INCORRECT_PITCH_FILL)"
                  key={`${positionIndex}-${pitch}`}
                  opacity={1}
                  staveIndex={staveIndex}
                />
              );
            }
            return <g key={`${positionIndex}-${pitch}`}></g>;
          });
        })}
    </>
  );
};

export const SVGScore = ({ correctNotes }: { correctNotes: Array<Note> }) => {
  const { guesses } = useStore();
  const songLength = correctNotes.length;
  const buffer = [];
  const notesPerLine = 4;
  let staveIndex = 0;
  for (let i = 0; i < songLength; i = i + notesPerLine) {
    const startIndex = i;
    const endIndex = Math.min(i + notesPerLine, songLength);
    buffer.push(
      <svg
        viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
        xmlns="<http://www.w3.org/2000/svg>"
        className={svgStyles.svgScore}
        key={`score-svg-index-${i}`}
      >
        <FillDefs />
        <TrebleStave SVGWidth={SVGWidth} />
        {i === 0 && <TimeSignaturePath timeSignature={chosenSong.timeSignature} />}
        <SelectedNoteHighlight
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <CurrentGuessPaths
          notes={guesses}
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <NonIncorrectPaths
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <IncorrectPitchPaths
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
      </svg>
    );
    staveIndex++;
  }
  return <>{buffer}</>;
};
