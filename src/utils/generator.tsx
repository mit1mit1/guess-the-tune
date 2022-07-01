import { durationNames, pitchNames } from "src/constants";
import { BaseDuration, GameSong, TimeSignature } from "src/types";

const durationToNumber = (duration: BaseDuration) => {
    switch (duration) {
        case "16n":
            return 1;
        case "8n":
            return 2;
        case "8n.":
            return 3;
        case "4n":
            return 4;
        case "4n.":
            return 6;
        case "2n":
            return 8;
        case "2n.":
            return 12;
        case "1n":
            return 16;
        case "1n.":
            return 24;
        case "2t":
            return 5.33;
        case "4t":
            return 2.67;
        case "8t":
            return 1.33;
        case "16t":
            return 0.67;
    }
};
type SongRepresentation = Array<Array<number>>;

const getTotalBeats = (representation: SongRepresentation) =>  representation.reduce((previousValue, currentValue) => previousValue + durationToNumber(durationNames[currentValue[1]]), 0) / 4;

const getSong = (representation: SongRepresentation, index: number) => {
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

const getNextRepresentation = (representation: SongRepresentation) => {
    const newRep = JSON.parse(JSON.stringify(representation));
    for (let i = 0; i < newRep.length; i++) {
        for (let j = 0; j < newRep[i].length; j++) {
            if ((j === 0)) {
                newRep[i][j] = Math.floor(Math.random() * (pitchNames.length - 10)) + 5;
            } else {
                newRep[i][j] = Math.floor(Math.random() * (durationNames.length - 8));
            }
        }
    }
    return newRep;
}

const isBanger = (representation: SongRepresentation) => {
    const pitches = representation.map(subarray => subarray[0]);
    let sharpCount = 0;
    for (let i = 0; i < pitches.length; i++) {
        if (pitchNames[pitches[i]].includes('#')) {
            sharpCount++;
        }
    }
    if (pitchNames[pitches[0]].includes('#')) {
        return false;
    }
    if (pitchNames[pitches[pitches.length - 1]].includes('#')) {
        return false;
    }
    if (sharpCount > 2) {
        return false;
    }
    const pitchSet = new Set(pitches);
    const uniquePitchCount = pitchSet.size;
    if (uniquePitchCount < 3 || uniquePitchCount > 5) {
        return false;
    }
    const uniquePitches = Array.from(pitchSet);
    let uniqueSharpCount = 0;
    for (let i = 0; i < uniquePitches.length; i++) {
        if (pitchNames[uniquePitches[i]].includes('#')) {
            uniqueSharpCount++;
        }
    }
    if (uniqueSharpCount > 1) {
        return false;
    }
    const range = Math.max(...uniquePitches) - Math.min(...uniquePitches);
    if (range > 12) {
        return false;
    }

    const durations = representation.map(subarray => subarray[1]);
    const durationSet = new Set(durations);
    if (Math.min(...durations) === representation[representation.length - 1][1]) {
        return false;
    }

    const durationCount = durationSet.size;
    if (durationCount < 2 || durationCount > 6) {
        return false;
    }
    if (getTotalBeats(representation) > 13) {
        return false;
    }
    return true;
}

let currentSongRepresentation = [[8, 2], [10, 2], [8, 2], [10, 4], [8, 5], [10, 2], [10, 2], [10, 2]];

const generatingGameSongs: Array<GameSong> = [
];
let i = 1;
while (generatingGameSongs.length < 1) {
    currentSongRepresentation = getNextRepresentation(currentSongRepresentation)
    if (isBanger(currentSongRepresentation)) {
        generatingGameSongs.push(getSong(currentSongRepresentation, i))
    }
}

console.log(generatingGameSongs)
export const generatedGameSongs = [...generatingGameSongs];