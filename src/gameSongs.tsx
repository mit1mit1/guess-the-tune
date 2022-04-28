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
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "4n": 1, "8n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    // Todo: 16th below should be rest
    { pitch: "F4", durationObject: { "4n": 1, "8n.": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "F4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "D4", durationObject: { "8n": 1 }, staccato: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const marioBrosMainTheme: GameSong = {
  bpm: 180,
  notes: [
    { pitch: "E5", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "E5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "E5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "C5", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "E5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "G5", durationObject: { "2n": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "2n": 1 }, staccato: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const concerningHobbits: GameSong = {
  bpm: 103,
  notes: [
    { pitch: "C4", durationObject: { "16n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "2n.": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "4n.": 1 } },
    { pitch: "F4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const aGrandDayOut: GameSong = {
  bpm: 110,
  notes: [
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const missionImpossible: GameSong = {
  bpm: 168,
  notes: [
    { pitch: "A4", durationObject: { "4n.": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "4n.": 1 }, staccato: true },
    { pitch: "C5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "D5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "4n.": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "4n.": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "G#4", durationObject: { "4n": 1 }, staccato: true },
  ],
  timeSignature: TimeSignature.FIVEFOUR,
};

const theRaidersMarch: GameSong = {
  bpm: 128,
  notes: [
    { pitch: "E4", durationObject: { "8n.": 1 } },
    { pitch: "F4", durationObject: { "16n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1, "2n": 1 } },
    { pitch: "D4", durationObject: { "8n.": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "F4", durationObject: { "2n.": 1 } },
  ],
  timeSignature: TimeSignature.FIVEFOUR,
};

export const gameSongs: Array<GameSong> = [
  simpsonsTheme,
  imperialMarch,
  hedwigsTheme,
  thomasTheTankEngine,
  theMandalorian,
  marioBrosMainTheme,
  concerningHobbits,
  aGrandDayOut,
  missionImpossible,
  theRaidersMarch,
];
