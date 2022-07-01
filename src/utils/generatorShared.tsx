import { durationNames, pitchNames } from "src/constants";
import { GameSong, TimeSignature } from "src/types";

export type SongRepresentation = Array<Array<number>>;

export const getSong = (representation: SongRepresentation, index: number) => {
    // const totalBeats = getTotalBeats(representation)
    const bpm = 95;
    return {
        bpm: Math.floor(bpm),
        timeSignature: TimeSignature.FOURFOUR,
        readyForProduction: true,
        notes: representation.map(noteRep => (
            {
                pitch: pitchNames[noteRep[0]],
                durations: [durationNames[noteRep[1]]]
            }
        )),
        name: "Midly Opus No. " + index.toString(),
    };
}

export const getRepresentation = (gameSong: GameSong): SongRepresentation => {
    return gameSong.notes.map(note => [pitchNames.indexOf(note.pitch), ...note.durations.map(baseDuration => durationNames.indexOf(baseDuration))])
}

export const getPitchesRepresentation = (gameSong: GameSong) => {
    return gameSong.notes.map(note => pitchNames.indexOf(note.pitch));
}

export const getDurationssRepresentation = (gameSong: GameSong) => {
    return gameSong.notes.map(note => note.durations.map(baseDuration => durationNames.indexOf(baseDuration)));
}

export const getIntervals = (pitchesRepresentation: Array<number>) => {
    const intervals = []
    for (let i = 1; i < pitchesRepresentation.length; i++) {
        intervals.push(pitchesRepresentation[i] - pitchesRepresentation[i - 1]);
    }
    return intervals;
}
