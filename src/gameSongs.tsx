import { GameSong, TimeSignature } from "src/types";

const testSong: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n.": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n.": 1 } },
  ],
  name: "test"
};

export const gameSongs: Array<GameSong> = [
  testSong,
];
