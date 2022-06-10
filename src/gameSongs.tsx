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
  name: "The Simpson's Theme",
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
  name: "The Imperial March",
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
  name: "Hedwig's Theme",
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
  name: "Thomas the Tank Engine's Theme",
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
  name: "The Mandalorian Theme",
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
  name: "Mario Bros: Overworld Theme",
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
  name: "Concerning Hobbits",
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
  name: "A Grand Day Out",
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
  name: "Mission Impossible",
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
  name: "The Raider's March",
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
  name: "Spiderman's Theme (Old)",
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
  name: "Spirited Away, Reprise",
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
  name: "The Pokemon Theme Song",
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
  name: "Married Life",
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
  name: "Korobeiniki (Tetris)",
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
  name: "Zelda: Overworld Theme",
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
  name: "Good Mornin'",
};

const leFestin: GameSong = {
  bpm: 139,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n.": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "2n": 1 } },
  ],
  name: "Le Festin",
};

const theLonelyShepherd: GameSong = {
  bpm: 132,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "A5", durationObject: { "16n": 1 } },
    { pitch: "G5", durationObject: { "16n": 1 } },
    { pitch: "A5", durationObject: { "1n": 1 } },
  ],
  name: "The Lonely Shepherd",
};

const oneSummersDay: GameSong = {
  bpm: 78,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1, "2n.": 1 } },
  ],
  name: "One Summer's Day",
};

const schindlersList: GameSong = {
  bpm: 48,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "F5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "2n": 1 } },
  ],
  name: "Theme from Schindler's List",
};

const theGloryDays: GameSong = {
  bpm: 138,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n.": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "2n": 1, "4n.": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4t": 1 } },
    { pitch: "B4", durationObject: { "4t": 1 } },
    { pitch: "C5", durationObject: { "4t": 1 } },
    { pitch: "B4", durationObject: { "4n.": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "F5", durationObject: { "2n": 1 } },
  ],
  name: "The Glory Days",
};

const avatarLegendOfAang: GameSong = {
  bpm: 60,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
  ],
  name: "Avatar: Legend of Aang",
};

const battleOfTheHeroes: GameSong = {
  bpm: 184,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D4", durationObject: { "2n": 1, "4n.": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "F4", durationObject: { "2n": 1 } },
    { pitch: "F4", durationObject: { "2n.": 1 } },
    { pitch: "E4", durationObject: { "2n.": 1 } },
    { pitch: "C4", durationObject: { "2n.": 1 } },
    { pitch: "E4", durationObject: { "2n.": 1 } },
    { pitch: "E4", durationObject: { "2n.": 1 } },
    { pitch: "D4", durationObject: { "2n.": 1 } },
  ],
  name: "Battle of the Heroes",
};

const sunflower: GameSong = {
  bpm: 85,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
  ],
  name: "Sunflower",
};

const carryOnMyWaywardSon: GameSong = {
  bpm: 123,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "F4", durationObject: { "4n": 1 } },
  ],
  name: "Carry on my Wayward Son",
};

const miiChannel: GameSong = {
  bpm: 114,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "C5", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "E5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "C5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "F4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "F4", durationObject: { "8n": 1 }, staccato: true },
    { pitch: "F4", durationObject: { "8n": 1 }, staccato: true },
  ],
  name: "Mii Channel",
};

const gourmetRace: GameSong = {
  bpm: 186,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durationObject: { "2n": 1 } },
    { pitch: "G4", durationObject: { "2n": 1 } },
    { pitch: "D#4", durationObject: { "4n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "2n": 1 } },
  ],
  name: "Gourmet Race",
};

const heyJude: GameSong = {
  bpm: 75,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "D#4", durationObject: { "4n": 1, "8n": 1 }, rest: true },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
  ],
  name: "Hey Jude",
};

const tossACoinToYourWitcher: GameSong = {
  bpm: 105,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
  ],
  name: "Toss a Coin to Your Witcher",
};

const theChain: GameSong = {
  bpm: 152,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n.": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "2n": 1 } },
  ],
  name: "The Chain",
};

const standByMe: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "F4", durationObject: { "4n.": 1 } },
    { pitch: "F4", durationObject: { "4n.": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "F4", durationObject: { "4n.": 1 } },
    { pitch: "F4", durationObject: { "4n.": 1 } },
  ],
  name: "Stand By Me",
};

const tinyDancer: GameSong = {
  bpm: 125,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "4n": 1 } },
    { pitch: "D4", durationObject: { "4n": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "E4", durationObject: { "4n.": 1 } },
    { pitch: "C4", durationObject: { "2n.": 1 } },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "Tiny Dancer",
};

const theTimeIsNow: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "1n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "1n": 1 } },
  ],
  name: "The Time is Now",
};

const sevenNationArmy: GameSong = {
  bpm: 118,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "4n.": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n.": 1 } },
    { pitch: "E4", durationObject: { "8n.": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "C4", durationObject: { "2n": 1 } },
    { pitch: "B3", durationObject: { "2n": 1 } },
  ],
  name: "Seven Nation Army",
};

const smokeOnTheWater: GameSong = {
  bpm: 115,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n.": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A#4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n.": 1 } },
  ],
  name: "Smoke on the Water",
};

const chameleon: GameSong = {
  bpm: 96,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "8n.": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "G4", durationObject: { "8n.": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "16n": 1 }, staccato: true },
    { pitch: "A4", durationObject: { "8n.": 1 }, staccato: true },
    { pitch: "C5", durationObject: { "8n.": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 }, staccato: true },
  ],
  name: "Chameleon",
};

const lifesIncredibleAgain: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D5", durationObject: { "8t": 1 } },
    { pitch: "E5", durationObject: { "4t": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "A5", durationObject: { "4n": 1 }, staccato: true },
    { pitch: "D5", durationObject: { "8t": 1 } },
    { pitch: "E5", durationObject: { "4t": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "A#5", durationObject: { "4n": 1 }, staccato: true },
  ],
  name: "Life's Incredible Again"
};

const monstersInc: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "8t": 1 } },
    { pitch: "E5", durationObject: { "4t": 1 } },
    { pitch: "F5", durationObject: { "8t": 1 } },
    { pitch: "G5", durationObject: { "4t": 1 } },
    { pitch: "D5", durationObject: { "8t": 1 } },
    { rest: true, pitch: "E5", durationObject: {"4t": 1}},
    { pitch: "D5", durationObject: { "4n.": 1 } },
  ],
  name: "Monsters, Inc"
};

const cantinaBand: GameSong = {
  bpm: 220,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
  ],
  name: "Cantina Band"
};

const furElise: GameSong = {
  bpm: 128,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D#5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D#5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
  ],
  name: "Für Elise"
};

const flyMeToTheMoon: GameSong = {
  bpm: 128,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durationObject: { "4n": 1, "8t": 1 } },
    { pitch: "B4", durationObject: { "8t": 1 } },
    { pitch: "A4", durationObject: { "4t": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "4n": 1 } },
  ],
  name: "Fly Me To The Moon"
};
const cityOfStars: GameSong = {
  bpm: 103,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D4", durationObject: { "4t": 1 } },
    { pitch: "F4", durationObject: { "8t": 1 } },
    { pitch: "A4", durationObject: { "4t": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "D5", durationObject: { "8t": 1 } },
    { pitch: "C5", durationObject: { "4t": 1 } },
    { pitch: "A4", durationObject: { "8t": 1 } },
  ],
  name: "City of Stars",
};

const stayinAliveIntro: GameSong = {
  bpm: 104,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n.": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "E4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
  ],
  name: "Stayin Alive Intro"
};


const stayinAliveChorus: GameSong = {
  bpm: 103,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "8n": 1 } },
    { rest: true, pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { rest: true, pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { rest: true, pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { rest: true, pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "2n": 1 } },
  ],
  name: "test"
};

const underTheMilkyWay: GameSong = {
  bpm: 66,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "B4", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "8n.": 1 } },
    { pitch: "E5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n.": 1 } },
  ],
  name: "Under the Milky Way"
};

const september: GameSong = {
  bpm: 123,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "2n": 1 } },
    { rest: true, pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
  ],
  name: "September"
};

const dancingInTheMoonlight: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "F4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
  ],
  name: "Dancing In the Moonlight"
};


const vertigo: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
    { pitch: "C4", durationObject: { "8n": 1 } },
    { pitch: "D4", durationObject: { "8n": 1 } },
  ],
  name: "test"
};

const letEmIn: GameSong = {
  bpm: 80,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "2n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "2n": 1 } },
  ],
  name: "Let 'Em In"
};

const strangerThings: GameSong = {
  bpm: 80,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A3", durationObject: { "16n": 1 } },
    { pitch: "C4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "16n": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "E4", durationObject: { "16n": 1 } },
    { pitch: "C4", durationObject: { "16n": 1 } },
  ],
  name: "Stranger Things Theme"
};


const delfinoPlaze: GameSong = {
  bpm: 240,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "E5", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F4", durationObject: { "4n.": 1 } },
    { pitch: "D5", durationObject: { "8n": 1, "2n": 1 } },
  ],
  name: "Delfino Plaza Theme"
};

const insideTheCastleWalls: GameSong = {
  bpm: 140,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durationObject: { "4n.": 1 } },
    { pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
    { pitch: "F#4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
  ],
  name: "Inside the Castle Walls"
};

const punchOut: GameSong = {
  bpm: 161,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durationObject: { "2n.": 1 } },
    { pitch: "B4", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "4n": 1 } },
    { pitch: "B4", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n.": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1, "16n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { rest: true, pitch: "A4", durationObject: { "4n": 1 } },
    { pitch: "G4", durationObject: { "16n": 1 } },
    { pitch: "A4", durationObject: { "4n": 1, "16n": 1 } },
    { pitch: "G4", durationObject: { "8n": 1 } },
    { rest: true, pitch: "A4", durationObject: { "4n": 1 } },
  ],
  name: "Punch-Out! Fight Theme"
};

const bobombBattlefield: GameSong = {
  bpm: 113,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "8n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "16n": 1 } },
    { pitch: "C5", durationObject: { "16n": 1 } },
    { rest: true, pitch: "C5", durationObject: { "8t": 1 } },
    { pitch: "E4", durationObject: { "4t": 1 } },
    { pitch: "F4", durationObject: { "8n": 1 } },
    { pitch: "F#4", durationObject: { "8n": 1 } },
    { pitch: "G4", durationObject: { "4n": 1 } },
  ],
  name: "Bob-omb Battlefield Theme"
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
  sunflower,
  theRaidersMarch,
  theChain,
  leFestin,
  standByMe,
  spiritedAwayReprise,
  tetris,
  marriedLife,
  tinyDancer,
  smokeOnTheWater,
  gourmetRace,
  zeldaMainTheme,
  chameleon,
  sevenNationArmy,
  carryOnMyWaywardSon,
  tossACoinToYourWitcher,
  heyJude,
  theLonelyShepherd,
  flyMeToTheMoon,
  oneSummersDay,
  stayinAliveIntro,
  schindlersList,
  furElise,
  avatarLegendOfAang,
  cityOfStars,
  strangerThings,
  dancingInTheMoonlight,
  battleOfTheHeroes,
  theTimeIsNow,
  september,
  cantinaBand,
  theGloryDays,
  underTheMilkyWay,
  pokemonGottaCatchEmAll,
  goodMornin,
  miiChannel,
  punchOut,
  vertigo,
  spidermanSpiderman,
  insideTheCastleWalls,
  monstersInc,
  delfinoPlaze,
  letEmIn,
  stayinAliveChorus,
  lifesIncredibleAgain,
  bobombBattlefield,
];
