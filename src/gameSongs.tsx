import { GameSong, TimeSignature } from "src/types";

const simpsonsTheme: GameSong = {
  bpm: 172,
  notes: [
    { pitch: "C5", durations: ["4n."] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "F#5", durations: ["4n"] },
    { pitch: "A5", durations: ["8n"] },
    { pitch: "G5", durations: ["4n."] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "A4", durations: ["8n"] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "The Simpson's Theme",
};

const imperialMarch: GameSong = {
  bpm: 103,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "F4", durations: ["8n."] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "F4", durations: ["8n."] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "A4", durations: ["2n"] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "The Imperial March",
};

const hedwigsTheme: GameSong = {
  bpm: 78,
  notes: [
    { pitch: "E4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n."] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D5", durations: ["4n."] },
    { pitch: "B4", durations: ["4n."] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "Hedwig's Theme",
};

const thomasTheTankEngine: GameSong = {
  bpm: 100,
  notes: [
    { pitch: "G4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "G#4", durations: ["1n"] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "Thomas the Tank Engine's Theme",
};

const theMandalorian: GameSong = {
  bpm: 83,
  notes: [
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "E4", durations: ["16n"], rest: true },
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["8n"], staccato: true },
    { pitch: "A4", durations: ["8n"], staccato: true },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "G4", durations: ["8n"], rest: true },
    { pitch: "D4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "F4", durations: ["4n"] },
    { pitch: "F4", durations: ["8n."], rest: true },
    { pitch: "G4", durations: ["16n"], staccato: true },
    { pitch: "F4", durations: ["16n"], staccato: true },
    { pitch: "E4", durations: ["16n"], staccato: true },
    { pitch: "D4", durations: ["8n"], staccato: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  name: "The Mandalorian Theme",
};

const marioBrosMainTheme: GameSong = {
  bpm: 180,
  notes: [
    { pitch: "E5", durations: ["8n"], staccato: true },
    { pitch: "E5", durations: ["4n"], staccato: true },
    { pitch: "E5", durations: ["4n"], staccato: true },
    { pitch: "C5", durations: ["8n"], staccato: true },
    { pitch: "E5", durations: ["4n"], staccato: true },
    { pitch: "G5", durations: ["2n"], staccato: true },
    { pitch: "G4", durations: ["2n"], staccato: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "Mario Bros: Overworld Theme",
};

const concerningHobbits: GameSong = {
  bpm: 103,
  notes: [
    { pitch: "C4", durations: ["16n"] },
    { pitch: "D4", durations: ["16n"] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "D4", durations: ["4n"] },
    { pitch: "C4", durations: ["2n."] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "E4", durations: ["4n."] },
    { pitch: "F4", durations: ["16n"] },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "D4", durations: ["4n"] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  name: "Concerning Hobbits",
};

const aGrandDayOut: GameSong = {
  bpm: 110,
  notes: [
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "D4", durations: ["4n"] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "A Grand Day Out",
};

const missionImpossible: GameSong = {
  bpm: 168,
  notes: [
    { pitch: "A4", durations: ["4n."], staccato: true },
    { pitch: "A4", durations: ["4n."], staccato: true },
    { pitch: "C5", durations: ["4n"], staccato: true },
    { pitch: "D5", durations: ["4n"], staccato: true },
    { pitch: "A4", durations: ["4n."], staccato: true },
    { pitch: "A4", durations: ["4n."], staccato: true },
    { pitch: "G4", durations: ["4n"], staccato: true },
    { pitch: "G#4", durations: ["4n"], staccato: true },
  ],
  timeSignature: TimeSignature.FIVEFOUR,
  readyForProduction: true,
  name: "Mission Impossible",
};

const theRaidersMarch: GameSong = {
  bpm: 128,
  notes: [
    { pitch: "E4", durations: ["8n."] },
    { pitch: "F4", durations: ["16n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n", "2n"] },
    { pitch: "D4", durations: ["8n."] },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "F4", durations: ["2n."] },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "The Raider's March",
};

const spidermanSpiderman: GameSong = {
  bpm: 200,
  notes: [
    { pitch: "E4", durations: ["4n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "B4", durations: ["8n", "4n"] },
    { pitch: "B4", durations: ["4n"], rest: true },
    { pitch: "A#4", durations: ["4n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n", "4n"] },
    { pitch: "B4", durations: ["4n"], rest: true },
  ],
  timeSignature: TimeSignature.FOURFOUR,
  name: "Spiderman's Theme (Old)",
};

const spiritedAwayReprise: GameSong = {
  bpm: 110,
  notes: [
    { pitch: "F4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n."] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n."] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "A#4", durations: ["4n"] },
    { pitch: "C5", durations: ["2n"] },
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
    { pitch: "E5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n."] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["4n."] },
  ],
  name: "The Pokemon Theme Song",
};

const marriedLife: GameSong = {
  bpm: 166,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "F5", durations: ["8n"] },
    { pitch: "G5", durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "E5", durations: ["2n.", "4n"] },
    { pitch: "C5", rest: true, durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "G5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "C5", rest: true, durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "C5", durations: ["2n"] },
  ],
  name: "Married Life",
};

const tetris: GameSong = {
  bpm: 149,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["4n"] },
    { pitch: "B3", durations: ["8n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["4n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "B3", durations: ["8n"] },
    { pitch: "A3", durations: ["4n."] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "E4", durations: ["4n"] },
  ],
  name: "Korobeiniki (Tetris)",
};

const zeldaMainTheme: GameSong = {
  bpm: 108,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["4n"] },
    { pitch: "G4", durations: ["4n."] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "D5", durations: ["16n"] },
    { pitch: "E5", durations: ["16n"] },
    { pitch: "F5", durations: ["16n"] },
    { pitch: "G5", durations: ["2n"] },
  ],
  name: "Zelda: Overworld Theme",
};

const goodMornin: GameSong = {
  bpm: 168,
  timeSignature: TimeSignature.TWOTWO,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durations: ["4n"], staccato: true },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "G4", durations: ["2n"], staccato: true },
    { pitch: "G4", durations: ["4n"], staccato: true },
    { pitch: "E5", durations: ["4n."] },
    { pitch: "C5", durations: ["8n", "2n"], staccato: true },
  ],
  name: "Good Mornin'",
};

const leFestin: GameSong = {
  bpm: 139,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n."] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["4n"] },
    { pitch: "C4", durations: ["2n"] },
  ],
  name: "Le Festin",
};

const theLonelyShepherd: GameSong = {
  bpm: 132,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "A5", durations: ["16n"] },
    { pitch: "G5", durations: ["16n"] },
    { pitch: "A5", durations: ["1n"] },
  ],
  name: "The Lonely Shepherd",
};

const oneSummersDay: GameSong = {
  bpm: 78,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "D4", durations: ["16n"] },
    { pitch: "D4", durations: ["16n", "2n."] },
  ],
  name: "One Summer's Day",
};

const schindlersList: GameSong = {
  bpm: 48,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "E5", durations: ["2n"] },
  ],
  name: "Theme from Schindler's List",
};

const theGloryDays: GameSong = {
  bpm: 138,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n."] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "E5", durations: ["2n", "4n."] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "A4", durations: ["4t"] },
    { pitch: "B4", durations: ["4t"] },
    { pitch: "C5", durations: ["4t"] },
    { pitch: "B4", durations: ["4n."] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "F5", durations: ["2n"] },
  ],
  name: "The Glory Days",
};

const avatarLegendOfAang: GameSong = {
  bpm: 60,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
  ],
  name: "Avatar: Legend of Aang",
};

const battleOfTheHeroes: GameSong = {
  bpm: 184,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D4", durations: ["2n", "4n."] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "F4", durations: ["2n"] },
    { pitch: "F4", durations: ["2n."] },
    { pitch: "E4", durations: ["2n."] },
    { pitch: "C4", durations: ["2n."] },
    { pitch: "E4", durations: ["2n."] },
    { pitch: "E4", durations: ["2n."] },
    { pitch: "D4", durations: ["2n."] },
  ],
  name: "Battle of the Heroes",
};

const sunflower: GameSong = {
  bpm: 85,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "A4", durations: ["16n"] },
    { pitch: "A4", durations: ["16n"] },
    { pitch: "C5", durations: ["8n"] },
  ],
  name: "Sunflower",
};

const carryOnMyWaywardSon: GameSong = {
  bpm: 123,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A4", durations: ["16n"] },
    { pitch: "G4", durations: ["16n"] },
    { pitch: "F4", durations: ["4n"] },
  ],
  name: "Carry on my Wayward Son",
};

const miiChannel: GameSong = {
  bpm: 114,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n"], staccato: true },
    { pitch: "C5", durations: ["8n"], staccato: true },
    { pitch: "E5", durations: ["4n"], staccato: true },
    { pitch: "C5", durations: ["4n"], staccato: true },
    { pitch: "A4", durations: ["8n"], staccato: true },
    { pitch: "F4", durations: ["8n"], staccato: true },
    { pitch: "F4", durations: ["8n"], staccato: true },
    { pitch: "F4", durations: ["8n"], staccato: true },
  ],
  name: "Mii Channel",
};

const gourmetRace: GameSong = {
  bpm: 186,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["2n"] },
    { pitch: "G4", durations: ["2n"] },
    { pitch: "D#4", durations: ["4n"] },
    { pitch: "D4", durations: ["4n"] },
    { pitch: "C4", durations: ["2n"] },
  ],
  name: "Gourmet Race",
};

const heyJude: GameSong = {
  bpm: 75,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durations: ["4n"] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "D#4", durations: ["4n", "8n"], rest: true },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "D4", durations: ["4n"] },
  ],
  name: "Hey Jude",
};

const tossACoinToYourWitcher: GameSong = {
  bpm: 105,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n"] },
  ],
  name: "Toss a Coin to Your Witcher",
};

const theChain: GameSong = {
  bpm: 152,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n."] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "E4", durations: ["2n"] },
  ],
  name: "The Chain",
};

const standByMe: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "F4", durations: ["4n."] },
    { pitch: "F4", durations: ["4n."] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "F4", durations: ["4n."] },
    { pitch: "F4", durations: ["4n."] },
  ],
  name: "Stand By Me",
};

const tinyDancer: GameSong = {
  bpm: 135,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "C4", durations: ["4n"] },
    { pitch: "D4", durations: ["4n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "E4", durations: ["4n."] },
    { pitch: "D4", durations: ["2n."] },
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
    { pitch: "A4", durations: ["4n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A4", durations: ["1n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A4", durations: ["1n"] },
  ],
  name: "The Time is Now",
};

const sevenNationArmy: GameSong = {
  bpm: 118,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["4n."] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n."] },
    { pitch: "E4", durations: ["8n."] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "C4", durations: ["2n"] },
    { pitch: "B3", durations: ["2n"] },
  ],
  name: "Seven Nation Army",
};

const smokeOnTheWater: GameSong = {
  bpm: 115,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n."] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A#4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n."] },
  ],
  name: "Smoke on the Water",
};

const chameleon: GameSong = {
  bpm: 96,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["16n"], staccato: true },
    { pitch: "A4", durations: ["8n."], staccato: true },
    { pitch: "G4", durations: ["16n"], staccato: true },
    { pitch: "G4", durations: ["8n."], staccato: true },
    { pitch: "A4", durations: ["16n"], staccato: true },
    { pitch: "A4", durations: ["8n."], staccato: true },
    { pitch: "C5", durations: ["8n."] },
    { pitch: "A4", durations: ["8n"], staccato: true },
  ],
  name: "Chameleon",
};

const lifesIncredibleAgain: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D5", durations: ["8t"] },
    { pitch: "E5", durations: ["4t"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "A5", durations: ["4n"], staccato: true },
    { pitch: "D5", durations: ["8t"] },
    { pitch: "E5", durations: ["4t"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "A#5", durations: ["4n"], staccato: true },
  ],
  name: "Life's Incredible Again",
};

const monstersInc: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durations: ["8t"] },
    { pitch: "E5", durations: ["4t"] },
    { pitch: "F5", durations: ["8t"] },
    { pitch: "G5", durations: ["4t"] },
    { pitch: "D5", durations: ["8t"] },
    { rest: true, pitch: "E5", durations: ["4t"] },
    { pitch: "D5", durations: ["4n."] },
  ],
  name: "Monsters, Inc",
};

const cantinaBand: GameSong = {
  bpm: 220,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "E4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "E4", durations: ["8n"] },
  ],
  name: "Cantina Band",
};

const furElise: GameSong = {
  bpm: 128,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D#5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D#5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
  ],
  name: "Für Elise",
};

const flyMeToTheMoon: GameSong = {
  bpm: 128,
  timeSignature: TimeSignature.THREEFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["4n", "8t"] },
    { pitch: "B4", durations: ["8t"] },
    { pitch: "A4", durations: ["4t"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["4n"] },
  ],
  name: "Fly Me To The Moon",
};
const cityOfStars: GameSong = {
  bpm: 103,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D4", durations: ["4t"] },
    { pitch: "F4", durations: ["8t"] },
    { pitch: "A4", durations: ["4t"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "D5", durations: ["8t"] },
    { pitch: "C5", durations: ["4t"] },
    { pitch: "A4", durations: ["8t"] },
  ],
  name: "City of Stars",
};

const stayinAliveIntro: GameSong = {
  bpm: 104,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durations: ["16n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n."] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "E4", durations: ["8n"] },
    { pitch: "D4", durations: ["16n"] },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "G4", durations: ["8n"] },
  ],
  name: "Stayin Alive Intro",
};

const stayinAliveChorus: GameSong = {
  bpm: 103,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durations: ["8n"] },
    { rest: true, pitch: "E5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { rest: true, pitch: "E5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { rest: true, pitch: "E5", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { rest: true, pitch: "E5", durations: ["8n"] },
    { pitch: "B4", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "C5", durations: ["2n"] },
  ],
  name: "Stayin' Alive (Chorus)",
};

const underTheMilkyWay: GameSong = {
  bpm: 66,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["16n"] },
    { pitch: "A4", durations: ["16n"] },
    { pitch: "B4", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n."] },
    { pitch: "E5", durations: ["16n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n."] },
  ],
  name: "Under the Milky Way",
};

const september: GameSong = {
  bpm: 123,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "B4", durations: ["4n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "B4", durations: ["2n"] },
    { rest: true, pitch: "B4", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "A4", durations: ["8n"] },
  ],
  name: "September",
};

const dancingInTheMoonlight: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "F4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
  ],
  name: "Dancing In the Moonlight",
};

const vertigo: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
  ],
  name: "Vertigo",
};

const letEmIn: GameSong = {
  bpm: 80,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "G4", durations: ["2n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "D5", durations: ["4n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "C5", durations: ["2n"] },
  ],
  name: "Let 'Em In",
};

const strangerThings: GameSong = {
  bpm: 80,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A3", durations: ["16n"] },
    { pitch: "C4", durations: ["16n"] },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "G4", durations: ["16n"] },
    { pitch: "A4", durations: ["16n"] },
    { pitch: "G4", durations: ["16n"] },
    { pitch: "E4", durations: ["16n"] },
    { pitch: "C4", durations: ["16n"] },
  ],
  name: "Stranger Things Theme",
};

const delfinoPlaze: GameSong = {
  bpm: 240,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["8n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F4", durations: ["4n."] },
    { pitch: "D5", durations: ["8n", "2n"] },
  ],
  name: "Delfino Plaza Theme",
};

const insideTheCastleWalls: GameSong = {
  bpm: 140,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G4", durations: ["4n."] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["4n"] },
    { pitch: "F#4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
  ],
  name: "Inside the Castle Walls",
};

const punchOut: GameSong = {
  bpm: 161,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["2n."] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "C5", durations: ["4n"] },
    { pitch: "B4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n."] },
    { pitch: "G4", durations: ["16n"] },
    { pitch: "A4", durations: ["4n", "16n"] },
    { pitch: "G4", durations: ["8n"] },
    { rest: true, pitch: "A4", durations: ["4n"] },
    { pitch: "G4", durations: ["16n"] },
    { pitch: "A4", durations: ["4n", "16n"] },
    { pitch: "G4", durations: ["8n"] },
    { rest: true, pitch: "A4", durations: ["4n"] },
  ],
  name: "Punch-Out! Fight Theme",
};

const bobombBattlefield: GameSong = {
  bpm: 113,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { rest: true, pitch: "C5", durations: ["8t"] },
    { pitch: "E4", durations: ["4t"] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "F#4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
  ],
  name: "Bob-omb Battlefield Theme",
};

const blindingLights: GameSong = {
  bpm: 171,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "D5", durations: ["2n"] },
    { pitch: "D5", durations: ["4n."] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "C5", durations: ["4n."] },
  ],
  name: "Blinding Lights",
};

const loveStoryIntro: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
  ],
  name: "Love Story Intro",
};

const shapeOfYouIntro: GameSong = {
  bpm: 190,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n."] },
    { pitch: "C5", durations: ["4n."] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n."] },
    { pitch: "C5", durations: ["4n."] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "A4", durations: ["4n."] },
    { pitch: "C5", durations: ["4n."] },
    { pitch: "A4", durations: ["4n"] },
    { pitch: "B4", durations: ["4n."] },
    { pitch: "A4", durations: ["4n."] },
    { pitch: "G4", durations: ["4n"] },
  ],
  name: "Shape Of You (Intro)",
};

const uptownFunkIntro: GameSong = {
  bpm: 120,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["4n"] },
    { rest: true, durations: ["2n", "8n"], pitch: "F#4" },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "D5", durations: ["8n."] },
    { pitch: "C5", durations: ["8n."] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "D5", durations: ["8n."] },
    { pitch: "C5", durations: ["8n."] },
    { pitch: "G4", durations: ["8n"] },
    { pitch: "A4", durations: ["4n"] },
  ],
  name: "Uptown Funk (Intro)",
};

const myHeartWillGoOnIntro: GameSong = {
  bpm: 90,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "E4", durations: ["8n", "2n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "C4", durations: ["8n"] },
    { pitch: "D4", durations: ["8n"] },
    { pitch: "G4", durations: ["8n", "2n"] },
  ],
  name: "My Heart Will Go On (Intro)",
};

const canYouFeelTheLoveTonight: GameSong = {
  bpm: 64,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "G5", durations: ["4n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "D5", durations: ["4n."] },
    { pitch: "G5", durations: ["8n"] },
    { pitch: "E5", durations: ["4n."] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["4n."] },
  ],
  name: "Can You Feel the Love Tonight"
};

const theOffice: GameSong = {
  bpm: 168,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "F4", durations: ["2n"] },
    { pitch: "F5", durations: ["2n"] },
    { rest: true, pitch: "F5", durations: ["2n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "E5", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["2n"] },
  ],
  name: "The Office Theme"
};

const gavityFallsTheme: GameSong = {
  bpm: 160,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "A4", durations: ["2n."] },
    { pitch: "B4", durations: ["4n"] },
    { pitch: "C5", durations: ["1n"] },
    { pitch: "E5", durations: ["4n."] },
    { pitch: "D5", durations: ["4n."] },
    { pitch: "E5", durations: ["4n"] },
    { pitch: "G4", durations: ["1n"] },
  ],
  name: "Gravity Falls Theme"
};

const midlyOpusOne: GameSong = {
  bpm: 120,
  notes: [
    { pitch: "D5", durations: ["4n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "F5", durations: ["4n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "G5", durations: ["4n"] },
    { pitch: "F5", durations: ["8n"] },
    { pitch: "F#5", durations: ["4n"] }
  ],
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  name: "Midly Opus 1",
};

const gravityFallsIntro: GameSong = {
  bpm: 160,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { "pitch": "F4", durations: ["4n"] },
    { "pitch": "F4", durations: ["4n"] },
    { "pitch": "F4", durations: ["4n"] },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "G4", durations: ["4n"] },
    { "pitch": "F4", durations: ["2n"], staccato: true },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "G4", durations: ["4n"] },
    { "pitch": "A4", durations: ["4n"] },
    { "pitch": "G4", durations: ["4n"] },
    { "pitch": "F4", durations: ["2n"], staccato: true }
  ],
  name: "Gravity Falls Intro"
}

const midlyOpus3: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["4n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 2" };
const midlyOpus4: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["4n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 3" };
const midlyOpus5: GameSong = { "bpm": 120, "notes": [{ "pitch": "D5", "durations": ["8t"] }, { "pitch": "G5", "durations": ["4n."] }, { "pitch": "E5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["16n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["16n"] }, { "pitch": "G#5", "durations": ["4n"] }, { "pitch": "E5", "durations": ["2n", "4n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 4" };
const midlyOpus6: GameSong = { "bpm": 120, "notes": [{ "pitch": "D5", "durations": ["8t"] }, { "pitch": "D5", "durations": ["16n"] }, { "pitch": "E5", "durations": ["4n"] }, { "pitch": "D5", "durations": ["8n"] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["4n."] }, { "pitch": "E4", "durations": ["8n"] }, { "pitch": "F#4", "durations": ["2n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 5" };
const midlyOpus7: GameSong = { "bpm": 120, "notes": [{ "pitch": "B4", "durations": ["16n"] }, { "pitch": "C5", "durations": ["4n."] }, { "pitch": "A4", "durations": ["16n"] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["2n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "E4", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 6" };
const midlyOpus8: GameSong = { "bpm": 120, "notes": [{ "pitch": "E4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["1n"] }, { "pitch": "B4", "durations": ["4n"] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n."] }, { "pitch": "A4", "durations": ["2n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 7" };
const midlyOpus9: GameSong = { "bpm": 120, "notes": [{ "pitch": "C5", "durations": ["4n"] }, { "pitch": "B4", "durations": ["16n"] }, { "pitch": "B4", "durations": ["4n"] }, { "pitch": "C5", "durations": ["8n"] }, { "pitch": "G4", "durations": ["2n."] }, { "pitch": "E4", "durations": ["4n"] }, { "pitch": "C4", "durations": ["8n"] }, { "pitch": "D4", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 8" };
const midlyOpus10: GameSong = { "bpm": 120, "notes": [{ "pitch": "A5", "durations": ["16n"] }, { "pitch": "G5", "durations": ["16n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "D5", "durations": ["8n"] }, { "pitch": "B4", "durations": ["4n."] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 9" };
const midlyOpus11: GameSong = { "bpm": 120, "notes": [{ "pitch": "G4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["16n"] }, { "pitch": "B4", "durations": ["16n"] }, { "pitch": "A4", "durations": ["8n", "2n"] }, { "pitch": "D5", "durations": ["2n."] }, { "pitch": "A4", "durations": ["8n."] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "E4", "durations": ["4n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 10" };
const midlyOpus12: GameSong = { "bpm": 120, "notes": [{ "pitch": "D5", "durations": ["16n"] }, { "pitch": "G5", "durations": ["16n"] }, { "pitch": "B5", "durations": ["8n"] }, { "pitch": "E5", "durations": ["4n."] }, { "pitch": "E5", "durations": ["8n", "2n"] }, { "pitch": "E5", "durations": ["8n"] }, { "pitch": "A4", "durations": ["4n"] }, { "pitch": "D5", "durations": ["4n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 11" };
const midlyOpus13: GameSong = { "bpm": 120, "notes": [{ "pitch": "G4", "durations": ["2n"] }, { "pitch": "G5", "durations": ["2n"] }, { "pitch": "C5", "durations": ["16n"] }, { "pitch": "A4", "durations": ["16n"] }, { "pitch": "E4", "durations": ["8n"] }, { "pitch": "D4", "durations": ["8n"] }, { "pitch": "F4", "durations": ["4n."] }, { "pitch": "G4", "durations": ["2n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 12" };
const midlyOpus14: GameSong = { "bpm": 120, "notes": [{ "pitch": "E4", "durations": ["2n"] }, { "pitch": "A4", "durations": ["1n."] }, { "pitch": "E4", "durations": ["4n"] }, { "pitch": "A#5", "durations": ["8n."] }, { "pitch": "A#5", "durations": ["1n"] }, { "pitch": "A5", "durations": ["1n"] }, { "pitch": "D5", "durations": ["1n."] }, { "pitch": "E4", "durations": ["1n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 13" };
const midlyOpus15: GameSong = { "bpm": 120, "notes": [{ "pitch": "E4", "durations": ["8n."] }, { "pitch": "F5", "durations": ["4t"] }, { "pitch": "A5", "durations": ["2n."] }, { "pitch": "A5", "durations": ["2n."] }, { "pitch": "A3", "durations": ["4n."] }, { "pitch": "C4", "durations": ["4n."] }, { "pitch": "B3", "durations": ["8n."] }, { "pitch": "A#5", "durations": ["2n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 14" };
const midlyOpus16: GameSong = { "bpm": 120, "notes": [{ "pitch": "C5", "durations": ["4n"] }, { "pitch": "A4", "durations": ["2n"] }, { "pitch": "B4", "durations": ["8t"] }, { "pitch": "E5", "durations": ["4t"] }, { "pitch": "E5", "durations": ["8t"] }, { "pitch": "E5", "durations": ["4n"] }, { "pitch": "G#5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["4t"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 15" };
const midlyOpus17: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "C5", "durations": ["8n"] }, { "pitch": "C5", "durations": ["2n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "A4", "durations": ["8n", "2n"] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "G#4", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 16" };
const midlyOpus18: GameSong = { "bpm": 120, "notes": [{ "pitch": "D5", "durations": ["8n"] }, { "pitch": "G5", "durations": ["8t"] }, { "pitch": "G5", "durations": ["2n."] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["16n"] }, { "pitch": "D#5", "durations": ["8n"] }, { "pitch": "D#5", "durations": ["8n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 17" };
const midlyOpus19: GameSong = { "bpm": 120, "notes": [{ "pitch": "C4", "durations": ["8n"] }, { "pitch": "C4", "durations": ["16n"] }, { "pitch": "F4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["4n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "F4", "durations": ["8n"] }, { "pitch": "D4", "durations": ["8n"] }, { "pitch": "C4", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 18" };
const midlyOpus20: GameSong = { "bpm": 120, "notes": [{ "pitch": "C5", "durations": ["16n"] }, { "pitch": "C5", "durations": ["16n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "D#5", "durations": ["4n"] }, { "pitch": "C#5", "durations": ["4n"] }, { "pitch": "E5", "durations": ["4n"] }, { "pitch": "D5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["16n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 19" };
const midlyOpus21: GameSong = { "bpm": 120, "notes": [{ "pitch": "A3", "durations": ["8n"] }, { "pitch": "F4", "durations": ["8n"] }, { "pitch": "F4", "durations": ["4n"] }, { "pitch": "D#5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["16n"] }, { "pitch": "E5", "durations": ["4n."] }, { "pitch": "E5", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 20" };
const midlyOpus22: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["8n"] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "B4", "durations": ["8t"] }, { "pitch": "C5", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n."] }, { "pitch": "G4", "durations": ["16n"] }, { "pitch": "C5", "durations": ["2n."] }, { "pitch": "D5", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 21" };
const midlyOpus23: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["8n"] }, { "pitch": "B4", "durations": ["8t"] }, { "pitch": "C5", "durations": ["4n"] }, { "pitch": "D5", "durations": ["2n"] }, { "pitch": "G4", "durations": ["16n"] }, { "pitch": "A4", "durations": ["4n"] }, { "pitch": "A4", "durations": ["4n"] }, { "pitch": "B4", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 22" };
const midlyOpus24: GameSong = { "bpm": 120, "notes": [{ "pitch": "D5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "G5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "F#5", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 23" };
const midlyOpus25: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["4n"] }, { "pitch": "C5", "durations": ["8n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["4n."] }, { "pitch": "B4", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 24" };
const midlyOpus26: GameSong = { "bpm": 120, "notes": [{ "pitch": "E5", "durations": ["16n"] }, { "pitch": "D5", "durations": ["16n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "A4", "durations": ["4n"] }, { "pitch": "F4", "durations": ["4n"] }, { "pitch": "A3", "durations": ["8n"] }, { "pitch": "A3", "durations": ["4n"] }, { "pitch": "A#3", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 25" };
const midlyOpus27: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["4n."] }, { "pitch": "D5", "durations": ["8n"] }, { "pitch": "E5", "durations": ["2n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "D5", "durations": ["16n"] }, { "pitch": "C#5", "durations": ["8n"] }, { "pitch": "B4", "durations": ["4t"] }, { "pitch": "D5", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 26" };
const midlyOpus28: GameSong = { "bpm": 120, "notes": [{ "pitch": "E5", "durations": ["2n"] }, { "pitch": "E5", "durations": ["8n"] }, { "pitch": "G#5", "durations": ["8n"] }, { "pitch": "G#5", "durations": ["4n"] }, { "pitch": "F#5", "durations": ["4n."] }, { "pitch": "E5", "durations": ["8n"] }, { "pitch": "D#5", "durations": ["4n"] }, { "pitch": "C5", "durations": ["8n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 27" };
const midlyOpus29: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["8n"] }, { "pitch": "B4", "durations": ["4n."] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "E4", "durations": ["8n"] }, { "pitch": "D4", "durations": ["8n"] }, { "pitch": "C4", "durations": ["8n"] }, { "pitch": "C#4", "durations": ["4n."] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 28" };
const midlyOpus30: GameSong = { "bpm": 120, "notes": [{ "pitch": "C5", "durations": ["8n"] }, { "pitch": "D5", "durations": ["16n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "G4", "durations": ["16n"] }, { "pitch": "F4", "durations": ["16n"] }, { "pitch": "E4", "durations": ["8n"] }, { "pitch": "G#4", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 29" };
const midlyOpus31: GameSong = { "bpm": 120, "notes": [{ "pitch": "C5", "durations": ["8n"] }, { "pitch": "A4", "durations": ["8n"] }, { "pitch": "A#4", "durations": ["4n."] }, { "pitch": "C5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["8n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "G#5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["8n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 30" };
const midlyOpus32: GameSong = { "bpm": 120, "notes": [{ "pitch": "A4", "durations": ["4n"] }, { "pitch": "D5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "A5", "durations": ["8n"] }, { "pitch": "F5", "durations": ["4n"] }, { "pitch": "G5", "durations": ["4n"] }], "timeSignature": TimeSignature.FOURFOUR, "readyForProduction": true, "name": "Midly Opus 31" };



export const gameSongs: Array<GameSong> = [
  gravityFallsIntro,
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
  blindingLights,
  theGloryDays,
  gavityFallsTheme,
  underTheMilkyWay,
  pokemonGottaCatchEmAll,
  goodMornin,
  uptownFunkIntro,
  miiChannel,
  punchOut,
  vertigo,
  spidermanSpiderman,
  shapeOfYouIntro,
  insideTheCastleWalls,
  myHeartWillGoOnIntro,
  monstersInc,
  delfinoPlaze,
  letEmIn,
  stayinAliveChorus,
  lifesIncredibleAgain,
  canYouFeelTheLoveTonight,
  theOffice,
  bobombBattlefield,
  loveStoryIntro,
  gavityFallsTheme,
  midlyOpusOne,
  midlyOpus3,
  midlyOpus4,
  midlyOpus5,
  midlyOpus6,
  midlyOpus7,
  midlyOpus8,
  midlyOpus9,
  midlyOpus10,
  midlyOpus11,
  midlyOpus12,
  midlyOpus13,
  midlyOpus14,
  midlyOpus15,
  midlyOpus16,
  midlyOpus17,
  midlyOpus18,
  midlyOpus19,
  midlyOpus20,
  midlyOpus21,
  midlyOpus22,
  midlyOpus23,
  midlyOpus24,
  midlyOpus25,
  midlyOpus26,
  midlyOpus27,
  midlyOpus28,
  midlyOpus29,
  midlyOpus30,
  midlyOpus31,
  midlyOpus32,
];
