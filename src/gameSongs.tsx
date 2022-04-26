import { GameSong, TimeSignature } from "src/types";

const simpsonsTheme: GameSong = {
  bpm: 172,
  notes: [
    { pitch: "C5", durationObject: { "4n.": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "F#5", durationObject: { "4n": 1 } },
    { pitch: "A5", durationObject: { "8n": 1 } },
    { pitch: "G5", durationObject: { "4n.": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const imperialMarch: GameSong = {
  bpm: 103,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "8n.": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "8n.": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "2n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const hedwigsTheme: GameSong = {
  bpm: 78,
  notes: [
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n.": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "4n.": 1 } },
    { pitch: "B4", durationObject: { "4n.": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const thomasTheTankEngine: GameSong = {
  bpm: 100,
  notes: [
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "G#4", durationObject: { "1n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const theMandalorian: GameSong = {
  bpm: 83,
  notes: [
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    // TODO: Make duration work for combining two below notes
    { pitch: "G4", durationObject: { "4n": 1, "8n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    // TODO: combine below 2 as well
    { pitch: "F4", durationObject: { "4n": 1, "16n": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "F4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

export const gameSongs: Array<GameSong> = [
  simpsonsTheme,
  imperialMarch,
  hedwigsTheme,
  thomasTheTankEngine,
  theMandalorian,
];
