import { BASE_COLOR, pitchNames } from "src/constants";
import { AnswerStatus, Note, Pitch } from "src/types";
import { getBaseYPosition, getRootCircleCX, shouldAddSharp } from "src/utils";
import { useStore } from "src/guessStore";
import "./SVGScore.css";
import { NoteShapePath } from "./NoteShapePath";
import { TrebleStave } from "./TrebleStave";
import { SharpPath } from "./SharpPath";
import { DurationlessPitchPath } from "./DurationlessPitchPath";
import { durationlessPitchRadius } from "src/constants/svg";

const SVGWidth = 3540;
const SVGHeight = 440;
const clefLength = 400;
const incorrectPitchLength = 250;

const noteSharpOffset = (pitch: Pitch) => {
  return 35 * (shouldAddSharp(pitch) ? -1 : 1);
};

const distanceBetweenNotes = 280;

const StavePath = ({
  index,
  trackPitch,
}: {
  index: number;
  trackPitch: Pitch;
}) => {
  return (
    <path
      key={`${index}-${trackPitch}-stave-line`}
      strokeWidth="1"
      stroke={BASE_COLOR}
      d={`M${
        clefLength + incorrectPitchLength + index * distanceBetweenNotes - 110
      } ${getBaseYPosition(trackPitch)} H ${
        clefLength + incorrectPitchLength + index * distanceBetweenNotes + 40
      }`}
    />
  );
};

interface ExtraStaveLinesProps {
  pitch: Pitch;
  index: number;
  startPitch: Pitch;
  increasing: Boolean;
}

const ExtraStaveLines = ({
  pitch,
  index,
  startPitch,
  increasing,
}: ExtraStaveLinesProps) => {
  let trackPitch = startPitch;
  const buffer = [];
  let hitEnd = false;
  let newIndex;
  const effectivePitch: Pitch = pitch.replace("#", "") as Pitch;
  const cScale = pitchNames.filter((pitch) => !pitch.includes("#"));
  while (
    cScale.indexOf(effectivePitch) <= cScale.indexOf(trackPitch) &&
    hitEnd === false
  ) {
    buffer.push(
      <StavePath
        index={index}
        trackPitch={trackPitch}
        key={`stave-extra-${trackPitch}`}
      />
    );
    newIndex = cScale.indexOf(trackPitch) + (increasing ? 1 : -1) * 2;
    if (newIndex < 0 || newIndex >= cScale.length) {
      hitEnd = true;
    } else {
      trackPitch = cScale[newIndex];
    }
  }
  return <>{buffer}</>;
};

interface NoteSubpartProps {
  pitch: Pitch;
  color: string;
  opacity?: number;
  index: number;
}

const Sharp = ({ pitch, color, opacity = 1, index }: NoteSubpartProps) => {
  const xStart =
    clefLength +
    incorrectPitchLength +
    index * distanceBetweenNotes -
    150 +
    noteSharpOffset(pitch);
  const yStart = getBaseYPosition(pitch) - 40;
  return (
    <SharpPath
      xStart={xStart}
      yStart={yStart}
      color={color}
      opacity={opacity}
      strokeWidth={6}
    />
  );
};

// const getMiniSharpXStart = (index: number) => {
//   return clefLength + incorrectPitchLength + index * distanceBetweenNotes - 150 + noteSharpOffset("A#3");
// };

const getBaseXPosition = (index: number) => {
  return clefLength + incorrectPitchLength + index * distanceBetweenNotes;
};

interface NotePathProps {
  opacity?: number;
  note: Note;
  index: number;
  color: string;
}

const NotePath = ({ note, index, color, opacity = 1 }: NotePathProps) => {
  const baseXPosition = getBaseXPosition(index) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);
  const { setSelectedNoteIndex } = useStore((state) => state);
  const handleClick = () => setSelectedNoteIndex(index);

  return (
    <>
      <NoteShapePath
        duration={note.duration}
        baseXPosition={baseXPosition}
        baseYPosition={baseYPosition}
        handleClick={handleClick}
        color={color}
        opacity={opacity}
      />
      {shouldAddSharp(note.pitch) && (
        <Sharp
          pitch={note.pitch}
          index={index}
          color={color}
          opacity={opacity}
        />
      )}
      {/* <ExtraStaveLines pitch={note.pitch} startPitch="A5" increasing index={index} /> */}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="C4"
        increasing={false}
        index={index}
      />
    </>
  );
};

interface PitchGuessPathProps {
  pitch: Pitch;
  positionIndex: number;
  color: string;
  opacity?: number;
}

const PitchGuessPath = ({
  pitch,
  positionIndex,
  color,
  opacity = 1,
}: PitchGuessPathProps) => {
  const { setSelectedNoteIndex } = useStore((state) => state);
  const xStart =
    clefLength +
    incorrectPitchLength +
    positionIndex * distanceBetweenNotes -
    38 +
    noteSharpOffset(pitch) -
    durationlessPitchRadius;
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={xStart}
      handleClick={() => setSelectedNoteIndex(positionIndex)}
      color={color}
      opacity={opacity}
    />
  );
};

const CurrentGuessPaths = ({
  notes,
  correctNotes,
}: {
  notes: Array<Note>;
  correctNotes: Array<Note>;
}) => {
  const { incorrectDurationsArrays, answerStatuses } = useStore(
    (state) => state
  );
  return (
    <>
      {notes.map((note, index) => {
        let color = BASE_COLOR;
        let opacity = 1;
        if (incorrectDurationsArrays[index].includes(note.duration)) {
          color = "grey";
        }
        if (
          answerStatuses[index].durationStatus ===
            AnswerStatus.GUESSEDCORRECT &&
          note.duration === correctNotes[index].duration
        ) {
          opacity = 0.8;
          color = "green";
        }
        return (
          <NotePath
            note={note}
            index={index}
            color={color}
            opacity={opacity}
            key={`${index}-${note.pitch}-${note.duration}`}
          />
        );
      })}
    </>
  );
};

const NonIncorrectPaths = ({ correctNotes }: { correctNotes: Array<Note> }) => {
  const { answerStatuses } = useStore((state) => state);
  return (
    <>
      {answerStatuses.map(({ pitchStatus, durationStatus }, index) => {
        if (
          pitchStatus === AnswerStatus.GUESSEDCORRECT &&
          durationStatus === AnswerStatus.GUESSEDCORRECT
        ) {
          return (
            <>
              <PitchGuessPath
                pitch={correctNotes[index].pitch}
                positionIndex={index}
                color="green"
                key={`${index}-${correctNotes[index].pitch}-correct`}
              />
              <NotePath
                opacity={0.5}
                note={correctNotes[index]}
                index={index}
                color="green"
                key={`${index}-${correctNotes[index].pitch}-${correctNotes[index].duration}`}
              />
            </>
          );
        } else if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
          return (
            <PitchGuessPath
              pitch={correctNotes[index].pitch}
              positionIndex={index}
              color="green"
              key={`${index}-${correctNotes[index].pitch}-correct`}
            />
          );
        }
        // else if (durationStatus === AnswerStatus.GUESSEDCORRECT) {
        //   return (
        //     <CorrectDurationGuessPath
        //       duration={correctNotes[index].duration}
        //       positionIndex={index}
        //       color="green"
        //       opacity={0.5}
        //       key={`${index}-${correctNotes[index].duration}-correct`}
        //     />
        //   );
        // }
        return <></>;
      })}
    </>
  );
};

const IncorrectPitchPaths = () => {
  const { incorrectPitchesArrays } = useStore((state) => state);
  return (
    <>
      {incorrectPitchesArrays.map((pitchArray, positionIndex) => {
        return pitchArray.map((pitch) => (
          <PitchGuessPath
            pitch={pitch}
            positionIndex={positionIndex}
            color="grey"
            key={`${positionIndex}-${pitch}`}
            opacity={0.3}
          />
        ));
      })}
    </>
  );
};

const SelectedNoteHighlight = () => {
  const { selectedNoteIndex } = useStore((state) => state);
  return (
    <ellipse
      cx={getRootCircleCX(getBaseXPosition(selectedNoteIndex))}
      cy={getBaseYPosition("B4")}
      rx={120}
      ry={SVGHeight}
      fill="grey"
      opacity={0.2}
    />
  );
};

export const SVGScore = ({ correctNotes }: { correctNotes: Array<Note> }) => {
  const { guesses } = useStore((state) => state);
  return (
    <svg
      viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
      xmlns="<http://www.w3.org/2000/svg>"
      className="svg-score"
    >
      <TrebleStave SVGWidth={SVGWidth} />
      <SelectedNoteHighlight />
      <CurrentGuessPaths notes={guesses} correctNotes={correctNotes} />
      {/* <WrongSpotPitchPaths /> */}
      {/* <WrongSpotDurationPaths /> */}
      <NonIncorrectPaths correctNotes={correctNotes} />
      <IncorrectPitchPaths />
      {/* <IncorrectDurationPaths /> */}
    </svg>
  );
};
