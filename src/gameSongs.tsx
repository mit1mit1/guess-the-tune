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
  readyForProduction: true,
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
  readyForProduction: true,
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
  readyForProduction: true,
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
  readyForProduction: true,
};

const theMandalorian: GameSong = {
  bpm: 83,
  notes: [
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 }, rest: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 }, rest: true },
    { pitch: "D4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "F4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "8n.": 1 }, rest: true },
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
  readyForProduction: true,
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
  readyForProduction: true,
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
  readyForProduction: true,
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
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
};

const spidermanSpiderman: GameSong = {
  bpm: 200,
  notes: [
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1, "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 }, rest: true },
    { pitch: "A#4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1, "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 }, rest: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

const spiritedAwayReprise: GameSong = {
  bpm: 110,
  notes: [
    { pitch: "F4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n.": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n.": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "A#4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "2n": 1 } },
  ],
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
};

const pokemonGottaCatchEmAll: GameSong = {
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
};

const marriedLife: GameSong = {
  bpm: 166,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "F5", durationObject: { "8n": 1 } },
    { pitch: "G5", durationObject: { "8n": 1 } },
    { pitch: "F5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "2n.": 1, "4n": 1 } },
    { pitch: "C5", rest: true, durationObject: { "8n": 1 } },
    { pitch: "F5", durationObject: { "8n": 1 } },
    { pitch: "G5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "C5", rest: true, durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "F5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "2n": 1 } },
  ],
};

const tetris: GameSong = {
  bpm: 149,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "B3", durationObject: { "8n": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "B3", durationObject: { "8n": 1 } },
    { pitch: "A3", durationObject: { "4n.": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
  ],
};

const zeldaMainTheme: GameSong = {
  bpm: 108,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: false,
  notes: [
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n.": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "D5", durationObject: { "16n": 1 } },
    { pitch: "E5", durationObject: { "16n": 1 } },
    { pitch: "F5", durationObject: { "16n": 1 } },
    { pitch: "G5", durationObject: { "2n": 1 } },
  ],
};

const goodMornin: GameSong = {
  bpm: 168,
  timeSignature: TimeSignature.TWOTWO,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "2n": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "E5", durationObject: { "4n.": 1 } },
    { pitch: "C5", durationObject: { "8n": 1, "2n": 1 }, staccato: true },
  ],
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
  spidermanSpiderman,
  spiritedAwayReprise,
  tetris,
  marriedLife,
  pokemonGottaCatchEmAll,
  zeldaMainTheme,
  goodMornin,
];
