import { durationNames, pitchNames } from "src/constants";
import { gameSongsSpare } from "src/gameSongsSpare";
import { GameSong, TimeSignature } from "src/types";
import { getDurationssRepresentation, getIntervals, getPitchesRepresentation, getRepresentation } from "./generatorShared";

const bangerRepresentations = gameSongsSpare.map(gameSong => getRepresentation(gameSong));

const bangerPitches = gameSongsSpare.map(gameSong => getPitchesRepresentation(gameSong));

const bangerDurationss = gameSongsSpare.map(gameSong => getDurationssRepresentation(gameSong));

const bangerIntervals = bangerPitches.map(pitchRepresentation => getIntervals(pitchRepresentation));

const allPitches = ([] as Array<number>).concat.apply([], bangerPitches);

const allIntervals = ([] as Array<number>).concat.apply([], bangerIntervals);

const allDurations = ([] as Array<Array<number>>).concat.apply([], bangerDurationss);

const probabilisticallyGetPitchNumber = () => {
    const index = Math.floor(Math.random() * (allPitches.length - 1))
    return allPitches[index];
}

const probabilisticallyGetInterval = () => {
    const index = Math.floor(Math.random() * (allIntervals.length - 1))
    return allIntervals[index];
}

const probabilisticallyGetDurationss = () => {
    const index = Math.floor(Math.random() * (allDurations.length - 1))
    return allDurations[index];
}

const probabilisticallyGenerateSong = () => {
    const gameSong: GameSong = {
        bpm: 120,
        notes: [],
        timeSignature: TimeSignature.FOURFOUR,
        readyForProduction: true,
        name: 'Midly Opus 1',
    }
    for (let i = 0; i < 8; i++) {
        let pitchNumber = 0;
        if (i === 0) {
            pitchNumber = probabilisticallyGetPitchNumber()
        } else {
            pitchNumber = pitchNumber + probabilisticallyGetInterval();
            if (pitchNumber < 0 || pitchNumber >= pitchNames.length) {
                pitchNumber = probabilisticallyGetPitchNumber();
            }
        }
        gameSong.notes.push({
            pitch: pitchNames[pitchNumber],
            durations: probabilisticallyGetDurationss().map(durationNumber => durationNames[durationNumber])
        })
    }
    return gameSong;
}

export const probabilisticGameSongs = [probabilisticallyGenerateSong()]
