import { durationNames, pitchNames } from "src/constants";
import { gameSongsSpare } from "src/gameSongsSpare";
import { GameSong, TimeSignature } from "src/types";
import { getDurationssRepresentation, getIntervals, getPitchesRepresentation, getRepresentation } from "./generatorShared";

const bangerRepresentations = gameSongsSpare.map(gameSong => getRepresentation(gameSong));

const bangerPitches = gameSongsSpare.map(gameSong => getPitchesRepresentation(gameSong));

const bangerDurationss = gameSongsSpare.map(gameSong => getDurationssRepresentation(gameSong));

const bangerIntervals = bangerPitches.map(pitchRepresentation => getIntervals(pitchRepresentation));

const allBangerPitches = ([] as Array<number>).concat.apply([], bangerPitches);

const allBangerIntervals = ([] as Array<number>).concat.apply([], bangerIntervals);

const allBangerDurations = ([] as Array<Array<number>>).concat.apply([], bangerDurationss);

const probabilisticallyGetPitchNumber = () => {
    const index = Math.floor(Math.random() * (allBangerPitches.length - 1))
    return allBangerPitches[index];
}

const probabilisticallyGetInterval = () => {
    const index = Math.floor(Math.random() * (allBangerIntervals.length - 1))
    return allBangerIntervals[index];
}

const probabilisticallyGetDurationss = () => {
    const index = Math.floor(Math.random() * (allBangerDurations.length - 1))
    return allBangerDurations[index];
}

export const probabilisticallyGenerateSong = () => {
    const gameSong: GameSong = {
        bpm: 120,
        notes: [],
        timeSignature: TimeSignature.FOURFOUR,
        readyForProduction: true,
        name: 'Midly Opus 1',
    }
    let pitchNumber = probabilisticallyGetPitchNumber();
    let oldPitchNumber = pitchNumber;
    for (let i = 0; i < 8; i++) {
        if (i !== 0) {
            pitchNumber = oldPitchNumber + probabilisticallyGetInterval();
            if (pitchNumber < 0 || pitchNumber >= pitchNames.length || pitchNames[pitchNumber].includes('#')) {
                pitchNumber = oldPitchNumber + probabilisticallyGetInterval();
            }
            if (pitchNumber < 0 || pitchNumber >= pitchNames.length) {
                pitchNumber = oldPitchNumber + probabilisticallyGetInterval();
            }
            if (pitchNumber < 0 || pitchNumber >= pitchNames.length) {
                pitchNumber = probabilisticallyGetPitchNumber();
            }
            oldPitchNumber = pitchNumber;
        }
        gameSong.notes.push({
            // pitch: pitchNames[pitchNumber],
            // durations: probabilisticallyGetDurationss().map(index => durationNames[index])
            pitch: pitchNames[Math.floor(Math.random() * (pitchNames.length - 1))],
            durations: [durationNames[Math.floor(Math.random() * (durationNames.length - 1))]]
        })
    }
    return gameSong;
}

export const probabilisticGameSongs = [probabilisticallyGenerateSong()]
